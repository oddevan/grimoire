import { PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';
import { GrimoireCard } from '../../types/GrimoireCard';

export async function getAllCardIdsWithClient(supabase: SupabaseClient<Database>) {
	let start = 0;
	let end = 999;
	let results: PostgrestResponse<{ id: string; }>;
	let data: Array<{ id: string }> = []
	do {
		results = await supabase
			.from("printings")
			.select("id")
			.range(start, end)
		if (results.error) { throw results.error; }

		data = data.concat(results.data);
		start += 1000;
		end += 1000;
	} while (results.data?.length && results.data.length > 0);

	return data.map(({ id }) => {
		return { params: { id } };
	});
}

export async function getCardInfoWithClient(id: string, supabase: SupabaseClient<Database>) : Promise<GrimoireCard | undefined> {
	const { data, error } = await supabase
		.from("card_page_data")
		.select("*")
		.eq('id', id)
		.single()
	if (error) { throw error; }

	const printings = data?.printings ?? [];

	if (!data) { return undefined; }

	return {
		id: data.id!,
		name: data.name!,
		imgUrl: data.imgurl ?? undefined,
		setName: data.setname ?? undefined,
		setSlug: data.setslug ?? undefined,
		hash: data.hash ?? undefined,
		price: data.market_price ?? undefined,
		printings: printings.map(entry => {
			const { id, name, setname } = <any>entry;
			return {
				id: <string>id,
				name: <string>name,
				setName: <string>setname,
			};
		}),
	};
}
