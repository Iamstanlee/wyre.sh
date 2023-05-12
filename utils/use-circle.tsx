import { DbTable, PaymentLinkType, PaymentStatusType } from './enum';
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
import { env } from 'process';
import { useState, useEffect } from 'react';
import openpgp from 'openpgp';
import { createMessage, encrypt as pgpEncrypt, readKey } from 'openpgp';

import { getRandomLink } from './random';
import {
  CardInformationToEncrypt,
  EncryptionKey,
  CardInformation
} from '@/types';

const useCircle = () => {
  ///Circle initialization
  const circle = new Circle(
    process.env.NEXT_PUBLIC_CIRCLE_API_KEY ?? '',
    CircleEnvironments.sandbox // API base url
  );

  const httpGetOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`
    }
  };

  const httpPostOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`
    }
  };

  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    fetchIpAddress();
  }, []);

  const { supabase, supabaseUser } = useSupabase();
  const { user } = useUser();

  /// Get users IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  ///initate user account creating permanent payment link
  async function initAccount() {
    let { error } = await supabase.from(DbTable.payment_link).insert({
      id: uuidv4(),
      link: user?.username,
      user_id: supabaseUser?.id,
      type: PaymentLinkType.parmanent
    });
    if (error) {
      //todo
    } else {
      //todo
    }
  }

  ///create xula wallet hodlings for user funds
  async function createXulaWallet() {
    const id = uuidv4();
    let { error } = await supabase.from(DbTable.wallets).insert({
      id: id,
      balance: 0.0,
      user_id: supabaseUser?.id,
      unresolved: 0.0
    });
    if (error) {
      //todo
    } else {
      ///update user tables with the newly created wallet_id
      let { error } = await supabase
        .from(DbTable.users)
        .upsert({ wallet_id: id })
        .eq('id', supabaseUser?.id);
    }
  }

  async function getPaymentLink(link: string | string[]) {
    let { data, error } = await supabase
      .from(DbTable.payment_link)
      .select('*')
      .match({ link: link })
      .single();

    return { data, error };
  }

  ///create temporary payment link
  async function createPaymentLink(
    receiver: string,
    amount: string,
    description: string
  ) {
    const paymentLink = getRandomLink();
    const linkNotAvailable = await getPaymentLink(paymentLink);

    if (linkNotAvailable.data) {
      createPaymentLink(receiver, amount, description);
    } else {
      let { data, error } = await supabase
        .from(DbTable.payment_link)
        .insert({
          id: uuidv4(),
          link: paymentLink,
          user_id: supabaseUser?.id,
          type: PaymentLinkType.temp,
          amount: amount,
          status: PaymentStatusType.created,
          metadata: {
            receiver,
            description,
            user_name: `${user?.first_name} ${user?.last_name}`,
            user_email: user?.email_address
          }
        })
        .select('link')
        .single();

      if (error) {
        //todo
        return { error: error.message };
      } else {
        //todo
        return { data: data };
      }
    }
  }

  ///make payment using the circle api
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

  ///Get xula wallet balance for user (Every user has one account)
  async function getWalletBalance() {
    let { data, error } = await supabase
      .from(DbTable.wallets)
      .select(`*`)
      .eq('id', supabaseUser?.id)
      .single();
  }

  ///Transfer from a circle wallet to a crypto account
  async function createCryptoPayment() {
    const { data } = await circle.transfers.createTransfer({
      idempotencyKey: uuidv4(),
      source: {
        type: TransferRequestSourceWalletLocationTypeEnum.Wallet,
        ///walllet id to transfar from
        id: '',
        ///Nor sure say I know wetien this one be oo
        identities: []
      },
      destination: {
        type: TransferRequestBlockchainLocationTypeEnum.Blockchain,
        address: '',
        addressTag: '',
        chain: 'ALGO'
      },
      amount: {
        amount: '',
        currency: 'BTC'
      }
    });
  }

  ///Get public key for encryption
  // async function getEncryptKey(): Promise<string> {
  //   const data = (await circle.encryption.getEncryptKey()).data.data;
  //   return data?.publicKey ?? '';
  // }

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

  /// Encrypt card details
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

  /// Create card - save card details
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
          billingDetails: cardInfo.billingDetails,
          expMonth: parseInt(cardInfo.expMonth),
          expYear: parseInt(cardInfo.expYear),
          metadata: cardInfo.metadata
        })
      });

      const data = await response.json();
      // const data = await circle.cards.createCard({
      //   idempotencyKey: uuidv4(),
      //   keyId: encryptedData?.key,
      //   encryptedData: encryptedData?.encryptedMessage as string,
      //   billingDetails: cardInfo.billingDetails,
      //   expMonth: parseInt(cardInfo.expMonth),
      //   expYear: parseInt(cardInfo.expYear),
      //   metadata: cardInfo.metadata
      // });

      console.log(data.data);

      return { id: data.data?.id as string, encryptedData };
    } catch (error) {
      console.log(error);
    }
  }

  /// Card payment - card to USDC using payment link
  async function createCardPayment(cardInfo: CardInformation) {
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
            metadata: cardInfo.metadata,
            amount: { amount: cardInfo.amount.amount, currency: 'USD' },
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
        return data.data;
      } else {
        console.log(response);
        return { error: 'something went wrong' };
      }

      // const data = await circle.payments.createPayment({
      //   idempotencyKey: uuidv4(),
      //   keyId: cardData?.encryptedData?.key,
      //   metadata: cardInfo.metadata,
      //   amount: { amount: cardInfo.amount.amount, currency: 'USD' },
      //   verification: 'none',
      //   source: {
      //     id: cardData?.id,
      //     type: 'card'
      //   }
      // });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    initAccount,
    createXulaWallet,
    createPaymentLink,
    makePaymentViaCard,
    getWalletBalance,
    getPaymentLink,
    encryptCardDetails,
    createCardPayment
  };
};

export default useCircle;
