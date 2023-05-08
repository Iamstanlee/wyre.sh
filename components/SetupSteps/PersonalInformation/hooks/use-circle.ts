import { DbTable, PaymentLinkType } from '@/utils/enum';
import { useSupabase } from '@/utils/use-supabase';
import { useUser } from '@/utils/use-user';
import { Circle, CircleEnvironments, Identity, PaymentCreationRequestVerificationEnum, TransferRequestBlockchainLocationTypeEnum, TransferRequestSourceWalletLocationTypeEnum } from '@circle-fin/circle-sdk';
import { v4 as uuidv4 } from 'uuid';
import { env } from 'process';
import { useState, useEffect } from 'react';
import openpgp from 'openpgp';


const useCircle = () => {
  ///Circle initialization
  const circle = new Circle(
    env.NEXT_PUBLIC_CIRCLE_API_KEY ?? '',
    CircleEnvironments.sandbox // API base url
  );

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
    let { error } = await supabase.from(DbTable.payments).insert({
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

  ///create temporary payment link
  function createPaymentLink() { }

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


  ///Get public key for encryption
  async function getEncryptKey(): Promise<string> {
    const data = (await circle.encryption.getPublicKey()).data.data;
    return data?.publicKey ?? '';
  }


  ///Transfer from a circle wallet to a crypto account
  async function sendFunds() {
    const { data } = await circle.transfers.createTransfer({
      idempotencyKey: uuidv4(),
      source: {
        type: TransferRequestSourceWalletLocationTypeEnum.Wallet,
        ///walllet id to transfar from
        id: '',
        ///Nor sure say I know wetien this one be oo
        identities: [],
      },
      destination: {
        type: TransferRequestBlockchainLocationTypeEnum.Blockchain,
        address: '',
        addressTag: '',
        chain: 'ALGO',
      },
      amount: {
        amount: '',
        currency: 'BTC'
      }
    });
  }


  async function encryptCardDetails(cardDetails: any) {

    const pubK = await getEncryptKey();

    try {
      const message = openpgp.createMessage({ text: '', format: 'binary' });

      // const encrypted = await openpgp.encrypt({
      //   message,
      //   publicKeys: [pubK],
      // });

    } catch (error) {
      console.error('Error encrypting message:', error);
    }
  }


  return {
    initAccount,
    createXulaWallet,
    createPaymentLink,
    makePaymentViaCard,
    getWalletBalance,
  };
};

export default useCircle;
