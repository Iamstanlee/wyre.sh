import { NextApiRequest, NextApiResponse } from 'next';
import { deserialize } from '@/utils/deserialize';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { DbTable, PaymentLinkType } from '@/utils/enum';
import { PaymentLink, User, Wallet } from '@/types';
import { getRandomLink } from '@/utils/random';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, email_address, first_name, last_name } =
    deserialize<{
      user_id: string;
      email_address: string;
      first_name: string;
      last_name: string;
    }>(req.body);


  try {
    await supabaseAdmin
      .from(DbTable.users)
      .upsert(<User>{
        id: user_id,
        email_address, first_name, last_name
      });

    const {
      data: walletData
    } = await supabaseAdmin
      .from(DbTable.wallets)
      .upsert(<Wallet>{
        user_id,
        balance: 100.0,
        unresolved: 0.0
      }).select('id').single();

    // TODo: generate random slug and check if it exists
    await supabaseAdmin
      .from(DbTable.payment_links)
      .upsert(<PaymentLink>{
        user_id,
        slug: getRandomLink(),
        type: PaymentLinkType.link,
        metadata: {
          user_id,
          user_name: `${first_name} ${last_name}`,
          user_email: email_address
        }
      });

    await supabaseAdmin
      .from(DbTable.users)
      .update(<User>{
        wallet_id: walletData?.id
      });

    return res.status(200).json({ message: 'Account created successfully' });

  } catch (error) {
    console.error(error, 'Failed to setup account.');
    return res.status(500).json({ message: 'Failed to setup account.' });
  }
}
