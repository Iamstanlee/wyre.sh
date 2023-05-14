import { NextApiRequest, NextApiResponse } from 'next';

import { deserialize } from '@/utils/deserialize';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { DbTable } from '@/utils/enum';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id } = deserialize<{
    user_id: string;
  }>(req.body);

  try {
    let { data, error } = await supabaseAdmin
      .from(DbTable.wallets)
      .select(`*`)
      .eq('id', user_id)
      .single();

    if (error) {
      console.error(error, 'Failed to fetch wallet balance.');
      return res
        .status(500)
        .json({ message: 'Failed to fetch wallet balance.' });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error, 'Failed to fetch wallet balance.');
    return res.status(500).json({ message: 'Failed to fetch wallet balance.' });
  }
}
