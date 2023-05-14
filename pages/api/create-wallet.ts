import { NextApiRequest, NextApiResponse } from 'next';

import { deserialize } from '@/utils/deserialize';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { DbTable, PaymentLinkType } from '@/utils/enum';
import { Wallet } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, user_id, username, name, email } = deserialize<{
    id: string;
    user_id: string;
    username: string;
    name: string;
    email: string;
  }>(req.body);

  try {
    ///   create user wallet
    let { error: createWalletError } = await supabaseAdmin
      .from(DbTable.wallets)
      .insert(<Wallet>{
        id,
        balance: 0.0,
        user_id,
        unresolved: 0.0
      });

    if (createWalletError) {
      console.error(createWalletError, 'Failed to create wallet.');
      return res.status(500).json({ message: 'Failed to create wallet.' });
    } else {
      ///     create payment link
      let { error: paymentLinkError } = await supabaseAdmin
        .from(DbTable.payment_link)
        .insert({
          id: uuidv4(),
          link: username,
          user_id,
          type: PaymentLinkType.parmanent,
          metadata: {
            user_name: name,
            user_email: email
          }
        });

      if (paymentLinkError) {
        console.error(createWalletError, 'Failed to payment link.');
        return res.status(500).json({ message: 'Failed to payment link.' });
      } else {
        ///   update user tables with the newly created wallet_id
        let { error: updateUserError } = await supabaseAdmin
          .from(DbTable.users)
          .upsert({ wallet_id: id, payment_link: username })
          .eq('id', user_id);

        if (updateUserError) {
          console.error(updateUserError, 'Failed to update user table.');
          return res
            .status(500)
            .json({ message: 'Failed to update user table.' });
        } else {
          //       create payment link
          return res.status(200).json('Account created successfully!');
        }
      }
    }
  } catch (error) {
    console.error(error, 'Failed to create wallet.');
    return res.status(500).json({ message: 'Failed to create wallet.' });
  }
}
