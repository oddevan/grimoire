import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/database'

const CardPrice = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
	const { id } = req.query;
	if (!id) {
		res.status(400).end({error: "A valid Grimoire ID was not provided."});
		return;
	}
	const card_id = Array.isArray(id) ? id[0] : id;

	const { data, error } = await supabaseServerClient.rpc("card_price", { card_id })
	
	if (error) { throw error; }

	res.status(200).json({ price: data });
}

export default CardPrice;