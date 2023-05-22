import { DbTable, PaymentLinkType, PaymentStatusType } from './enum';
import { useSupabase } from './use-supabase';
import { MoneyCurrencyEnum } from '@circle-fin/circle-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { createMessage, encrypt as pgpEncrypt, readKey } from 'openpgp';
import {
  CardInformation,
  CardInformationToEncrypt,
  EncryptionKey,
  Payment,
  PaymentLink,
  Transaction,
  Transfer,
  Wallet
} from '@/types';
import { isSuccessResponse } from '@/utils/helper';

const useCircle = () => {
  const { supabase } = useSupabase();
  const [ipAddress, setIpAddress] = useState<string>('');
  const [masterWalletId, setMasterWalletId] = useState<string>('');
  // const [circle] = useState<Circle>(new Circle(`${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`, CircleEnvironments.sandbox));

  useEffect(() => {
    fetchIpAddress();
    getMasterWalletId();
  }, []);


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
        setMasterWalletId(response.data.payments.masterWalletId);
      })
      .catch((err) => console.error(err));
  }

  async function getPaymentLink(link: string): Promise<PaymentLink> {
    let { data, error } = await supabase
      .from(DbTable.payment_links)
      .select('*')
      .match({ slug: link })
      .single();
    if (error) {
      throw Error(error.message);
    }
    return data as PaymentLink;
  }

  ///   Create Payment Or onRamp Link
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


  async function createCryptoPayment(values: Transfer) {
    const body = {
      destination: {
        type: 'verified_blockchain',
        addressId: values.destination.address,
        chain: values.destination.chain
      },
      source: {
        type: 'wallet',
        id: masterWalletId
      },
      amount: {
        amount: parseFloat(values.amount.amount).toFixed(2),
        currency: values.amount.currency
      },
      idempotencyKey: uuidv4()
    };

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

  async function encryptCardInformation(cardInfo: CardInformationToEncrypt) {
    const key = await getEncryptKey();
    if (!key) throw Error('An unexpected error occured');
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
        return {
          encryptedMessage: btoa(ciphertext as string),
          key: key.keyId
        };
      })
      .catch((error) => console.error('Error encrypting message:', error));
  }

  async function createCard(cardInfo: CardInformation) {
    const encryptedData = await encryptCardInformation({
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
            ipAddress: ipAddress
          }
        })
      });

      const data = await response.json();
      return { id: data.data?.id as string, encryptedData };
    } catch (error) {
      if (error instanceof Error) throw  Error(error.message);
      throw Error('An unexpected error occured');
    }
  }

  async function createCardPayment(
    cardInfo: CardInformation,
    user_id: string,
    slug: string
  ) {
    const cardData = await createCard(cardInfo);

    const response = await fetch(
      'https://api-sandbox.circle.com/v1/payments',
      {
        ...httpPostOptions,
        body: JSON.stringify({
          // TODO - add idempotency key, session id and ip address
          idempotencyKey: uuidv4(),
          keyId: cardData?.encryptedData?.key,
          metadata: {
            email: cardInfo.email,
            phoneNumber: cardInfo.phoneNumber,
            paymentLinkId: slug,
            userId: user_id,
            sessionId: 'xxx',
            ipAddress: '172.33.222.1'
          },
          amount: {
            amount: parseFloat(cardInfo.amount),
            currency: MoneyCurrencyEnum.Usd
          },
          verification: 'none',
          source: {
            id: cardData?.id,
            type: 'card'
          }
        })
      }
    );

    const json = await response.json();

    // TODO - move this to backend side
    if (isSuccessResponse(response.status)) {
      const initialPayment = json.data as Payment;
      await supabase
        .from(DbTable.transactions)
        .insert({
          user_id,
          payment_slug: slug,
          id: initialPayment?.id,
          amount: initialPayment?.amount,
          status: initialPayment?.status,
          metadata: {
            ...initialPayment?.metadata,
            userId: user_id
          },
          type: PaymentLinkType.link,
          created_at: initialPayment?.createDate,
          updated_at: initialPayment?.updateDate
        } as Transaction);

      // TODO - move this to backend side and use subscription when implemented
      const payment = await longPullPaymentForConfirmation(initialPayment);

      if (payment.status == PaymentStatusType.confirmed) {
        const thisInstant = new Date().toISOString();
        // TODO - move this to backend side
        const { data: wallet } = await supabase
          .from(DbTable.wallets)
          .select()
          .match({ user_id })
          .single();

        await supabase
          .from(DbTable.wallets)
          .update({
            balance: (wallet as Wallet).balance + parseFloat(payment.amount.amount),
            updated_at: thisInstant
          } as Wallet)
          .match({ user_id });


        await supabase
          .from(DbTable.transactions)
          .update({
            status: PaymentStatusType.success,
            updated_at: thisInstant
          } as Transaction)
          .match({ id: payment.id });
      } else {
        throw Error('Unable to confirm payment');
      }
    } else {
      throw Error(json.message ?? response.statusText);
    }
  }

  async function longPullPaymentForConfirmation(payment: Payment): Promise<Payment> {
    if (payment.status == PaymentStatusType.confirmed) return payment;
    const response = await fetch(`https://api-sandbox.circle.com/v1/payments/${payment.id}`, httpGetOptions);
    const json = await response.json();
    return longPullPaymentForConfirmation(json.data as Payment);
  }

  return {
    getPaymentLink,
    createCard,
    createCardPayment,
    createCryptoPayment
  };
};

export default useCircle;
