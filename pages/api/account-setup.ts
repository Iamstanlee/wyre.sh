import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { deserialize } from '@/utils/deserialize';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { DbTable, PaymentLinkType } from '@/utils/enum';
import { PaymentLink, Wallet } from '@/types';
import { User } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { wallet_id, user_id, username, email_address, first_name, last_name } =
    deserialize<{
      wallet_id: string;
      user_id: string;
      username: string;
      email_address: string;
      first_name: string;
      last_name: string;
    }>(req.body);

  try {
    ///   create user wallet
    let { error: createWalletError } = await supabaseAdmin
      .from(DbTable.wallets)
      .insert(<Wallet>{
        id: wallet_id,
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
        .insert(<PaymentLink>{
          id: uuidv4(),
          link: username,
          user_id,
          type: PaymentLinkType.parmanent,
          metadata: {
            user_name: `${first_name} ${last_name}`,
            user_email: email_address
          }
        });

      if (paymentLinkError) {
        console.error(createWalletError, 'Failed to payment link.');
        return res.status(500).json({ message: 'Failed to payment link.' });
      } else {
        ///   update user tables with the wallet_id, payment_ink and toher user info
        let { error: updateUserError } = await supabaseAdmin
          .from(DbTable.users)
          .upsert(<User>{
            id: user_id,
            first_name,
            last_name,
            email_address,
            username,
            wallet_id,
            payment_link: username
          })
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
    console.error(error, 'Failed to setup account.');
    return res.status(500).json({ message: 'Failed to setup account.' });
  }
}
