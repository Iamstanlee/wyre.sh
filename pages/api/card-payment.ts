import { NextApiRequest, NextApiResponse } from 'next';

import { deserialize } from '@/utils/deserialize';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { DbTable, PaymentLinkType } from '@/utils/enum';
import { CardInformation, Wallet } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import  useCircle  from '@/utils/use-circle'

const httpPostOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_CIRCLE_API_KEY}`
  }}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {createCard} = useCircle()


  const cardInfo = deserialize<CardInformation>(req.body)

  const cardResponse= await createCard(cardInfo);

  try {
    const response = await fetch(
      'https://api-sandbox.circle.com/v1/payments',
      {
        ...httpPostOptions,
        body: JSON.stringify({
          idempotencyKey: uuidv4(),
          keyId: cardResponse?.encryptedData?.key,
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
            id: cardResponse?.id,
            type: 'card'
          }
        })
      }
    );
    if (response.status === 201) {
      const data = await response.json();
      console.log(data.data);
      return res.status(200).json(data.data);
    //   send payment info to database payment table


    } else {
      console.log(response);
      return res.status(500).json({ message: 'Something went wrong.' });

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong.' });

  }

}
