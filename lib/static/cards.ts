import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/database';
import { GrimoireCard } from '../../types/GrimoireCard';

export async function getAllCardIdsWithClient(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase
		.from("printings")
		.select("id")
	if (error) { throw error; }

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

	const printings = data.printings ?? [];

	return {
		id: data.id!,
		name: data.name!,
		imgUrl: data.imgurl ?? undefined,
		setName: data.setname ?? undefined,
		setSlug: data.setslug ?? undefined,
		hash: data.hash ?? undefined,
		printings: printings.map(entry => {
			const { id, name, set } = <any>entry;
			return {
				id: <string>id,
				name: <string>name,
				setName: <string>set,
			};
		}),
	};
}
