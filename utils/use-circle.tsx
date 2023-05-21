import {
  DbTable,
  PaymentLinkType,
  PaymentStatusType,
  TransactionType
} from './enum';
import { useSupabase } from './use-supabase';
import { useUser } from './use-user';
import {
  Circle,
  CircleEnvironments,
  PaymentCreationRequestVerificationEnum,
  TransferRequestBlockchainLocationTypeEnum,
  TransferRequestSourceWalletLocationTypeEnum
} from '@circle-fin/circle-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { createMessage, encrypt as pgpEncrypt, readKey } from 'openpgp';
import {
  CardInformation,
  CardInformationToEncrypt,
  EncryptionKey,
  PaymentLink,
  Transaction,
  Transfer
} from '@/types';
import { exampleCards } from '@/data/mock';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { getRandomLink } from '@/utils/random';

const useCircle = () => {
  ///   Circle initialization
  const circle = new Circle(
    process.env.NEXT_PUBLIC_CIRCLE_API_KEY ?? '',
    CircleEnvironments.sandbox // API base url
  );

  ///   HTTP Get Options
  const httpGetOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`
    }
  };

  ///   HTTP POST Options
  const httpPostOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`
    }
  };

  ///   Fetch and Update IP Address
  const [ipAddress, setIpAddress] = useState(null);
  const [masterWalletId, setMasterWalletId] = useState<string>('');
  useEffect(() => {
    fetchIpAddress();
    getMasterWalletId();
  }, []);

  const { supabase, supabaseUser } = useSupabase();
  const { user } = useUser();

  /// Get User IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  async function getMasterWalletId() {
    fetch('https://api-sandbox.circle.com/v1/configuration', httpGetOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMasterWalletId(response.data.payments.masterWalletId);
      })
      .catch((err) => console.error(err));
  }

  ///   Fetch Payment Link Address
  async function getPaymentLink(link: string | string[]) {
    let { data, error } = await supabase
      .from(DbTable.payment_links)
      .select('*')
      .match({ slug: link })
      .single();

    return { data, error };
  }

  ///   Create Temporary Payment Link
  // async function createPaymentLink(
  //   receiver: string,
  //   amount: string,
  //   description: string
  // ) {
  //   const paymentLink = getRandomLink();
  //   const linkNotAvailable = await getPaymentLink(paymentLink);
  //
  //   if (linkNotAvailable.data) {
  //     createPaymentLink(receiver, amount, description);
  //   } else {
  //     let { data, error } = await supabase
  //       .from(DbTable.payment_link)
  //       .insert({
  //         id: uuidv4(),
  //         link: paymentLink,
  //         user_id: supabaseUser?.id,
  //         type: PaymentLinkType.temp,
  //         amount: amount,
  //         status: PaymentStatusType.created,
  //         metadata: {
  //           receiver,
  //           description,
  //           user_name: `${user?.first_name} ${user?.last_name}`,
  //           user_email: user?.email_address
  //         }
  //       })
  //       .select('link')
  //       .single();
  //
  //     if (error) {
  //       //todo
  //       return { error: error.message };
  //     } else {
  //       //todo
  //       return { data: data };
  //     }
  //   }
  // }

  ///   Make Payment Using Circle API
  async function makePaymentViaCard() {
    const { data } = await circle.payments.createPayment({
      idempotencyKey: uuidv4(),
      keyId: uuidv4(),
      metadata: {
        email: '',
        phoneNumber: '',
        sessionId: '',
        ipAddress: ''
      },
      amount: {
        amount: 'string',
        currency: 'USD'
      },
      autoCapture: true,
      verification: PaymentCreationRequestVerificationEnum.Cvv,
      verificationSuccessUrl: '',
      verificationFailureUrl: '',
      source: { id: '', type: 'card' },
      description: '',
      encryptedData: '',
      channel: ''
    });
  }

  ///   Get xula wallet balance for user (Every user has one account)
  async function getWalletBalance() {
    let { data, error } = await supabase
      .from(DbTable.wallets)
      .select(`*`)
      .eq('id', supabaseUser?.id)
      .single();
  }

  ///   Transfer from a circle wallet to a crypto account
  // async function createCryptoPayment(values: Transfer) {
  //   const { data } = await circle.transfers.createTransfer({
  //     idempotencyKey: uuidv4(),
  //     source: {
  //       type: TransferRequestSourceWalletLocationTypeEnum.Wallet,
  //       id: masterWalletId,

  //       ///Nor sure say I know wetien this one be oo
  //       identities: []
  //     },
  //     destination: {
  //       type: TransferRequestBlockchainLocationTypeEnum.Blockchain,
  //       address: values.destination.address,
  //       addressTag: values.destination.addressTag,
  //       chain: values.destination.chain
  //     },
  //     amount: {
  //       amount: values.amount.amount,
  //       currency: values.amount.currency
  //     }
  //   });

  //   console.log(data);
  // }

  async function createCryptoPayment(values: Transfer) {
    console.log(parseFloat(values.amount.amount).toFixed(2));
    const body = {
      destination: {
        type: 'verified_blockchain',
        addressId: values.destination.address
        // chain: values.destination.chain
      },
      // source: {
      //   type: 'wallet',
      //   id: masterWalletId
      // },
      amount: {
        amount: parseFloat(values.amount.amount).toFixed(2),
        currency: values.amount.currency
      },
      idempotencyKey: uuidv4()
    };

    console.log(body);
    
    
    fetch('https://api-sandbox.circle.com/v1/businessAccount/transfers', {
      ...httpPostOptions,
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  ///   Get public key for encryption
  async function getEncryptKey() {
    try {
      const response = await fetch(
        'https://api-sandbox.circle.com/v1/encryption/public',
        httpGetOptions
      );

      const data = await response.json();
      return data.data as EncryptionKey;
    } catch (err) {
      console.error(err);
    }
  }

  ///   Encrypt card details
  async function encryptCardDetails(cardInfo: CardInformationToEncrypt) {
    const key = await getEncryptKey();
    if (!key) return;
    const decodedPublicKey = await readKey({
      armoredKey: atob(key?.publicKey)
    });
    const message = await createMessage({
      text: JSON.stringify(cardInfo)
    });

    return pgpEncrypt({
      message,
      encryptionKeys: decodedPublicKey
    })
      .then((ciphertext) => {
        console.log('ciphertext', btoa(ciphertext as string));

        return {
          encryptedMessage: btoa(ciphertext as string),
          key: key.keyId
        };
      })
      .catch((error) => console.error('Error encrypting message:', error));
  }

  ///   Create card - save card details
  async function createCard(cardInfo: CardInformation) {
    const encryptedData = await encryptCardDetails({
      number: cardInfo.number,
      cvv: cardInfo.cvv
    });

    try {
      const response = await fetch('https://api-sandbox.circle.com/v1/cards', {
        ...httpPostOptions,
        body: JSON.stringify({
          idempotencyKey: uuidv4(),
          keyId: encryptedData?.key,
          encryptedData: encryptedData?.encryptedMessage as string,
          billingDetails: {
            name: cardInfo.name,
            line1: cardInfo.line1,
            line2: '',
            district: cardInfo.district,
            country: cardInfo.country,
            city: cardInfo.city,
            postalCode: cardInfo.postalCode
          },
          expMonth: parseInt(cardInfo.expMonth),
          expYear: parseInt(cardInfo.expYear),
          metadata: {
            email: cardInfo.email,
            phoneNumber: cardInfo.phoneNumber,
            sessionId: 'xxx',
            ipAddress: '172.33.222.1'
          }
        })
      });

      const data = await response.json();

      console.log(data.data);

      return { id: data.data?.id as string, encryptedData };
    } catch (error) {
      console.log(error);
    }
  }

  ///   Card payment - card to USDC using payment link
  async function createCardPayment(
    cardInfo: CardInformation,
    user_id: string,
    slug: string
  ) {
    console.log(cardInfo);

    const cardData = await createCard(cardInfo);

    try {
      const response = await fetch(
        'https://api-sandbox.circle.com/v1/payments',
        {
          ...httpPostOptions,
          body: JSON.stringify({
            idempotencyKey: uuidv4(),
            keyId: cardData?.encryptedData?.key,
            metadata: {
              email: cardInfo.email,
              phoneNumber: cardInfo.phoneNumber,
              sessionId: 'xxx',
              ipAddress: '172.33.222.1'
            },
            amount: {
              amount: parseFloat(cardInfo.amount).toFixed(2),
              currency: 'USD'
            },
            verification: 'none',
            source: {
              id: cardData?.id,
              type: 'card'
            }
          })
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        console.log(data.data);

        // insert payment in transaction table
        const { data: transactionData, error: transactionError } =
          await supabase
            .from(DbTable.transactions)
            .insert({
              id: data.data.id,
              amount: data.data.amount.amount,
              status: PaymentStatusType.pending,
              metadata: data.data.metadata,
              source: data.data.source,
              user_id,
              updated_at: data.data.updateDate,
              // refunds: data.data.refunds,
              type: TransactionType.link,
              payment_slug: slug
            })
            .select()
            .single();

        if (transactionData) {
          console.log(transactionData);
          return transactionData;
        }

        if (transactionError) {
          return { error: 'something went wrong' };
        }
      } else {
        console.log(response);
        return { error: 'something went wrong' };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // createPaymentLink,
    makePaymentViaCard,
    getWalletBalance,
    getPaymentLink,
    encryptCardDetails,
    createCard,
    createCardPayment,
    createCryptoPayment
  };
};

export default useCircle;
