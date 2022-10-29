import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/database'

const BuyCardTcgp = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient<Database>({
    req,
    res,
  });
	const { id } = req.query;

	const { data, error } = await supabaseServerClient
		.from("printings")
		.select("tcgplayer_product")
		.eq("id", id)
		.single();
	
	if (error) { throw error; }

	if (!data?.tcgplayer_product) {
		res.status(400).end({error: "A valid Grimoire ID was not provided."});
		return;
	}

	const queryString = 'Language=English&utm_campaign=affiliate&utm_medium=oddEvan&utm_source=oddEvan';
	res.redirect(301, `https://www.tcgplayer.com/product/${data.tcgplayer_product}?${queryString}`);
}

export default BuyCardTcgp;