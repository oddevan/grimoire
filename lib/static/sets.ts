import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../types/database";
import { GrimoireCard } from "../../types/GrimoireCard";
import { GrimoireSet } from "../../types/GrimoireSet";

export async function getSetSlugsWithClient(supabase: SupabaseClient<Database>) {
	const { data, error } = await supabase.from("sets").select("slug");
	if (error) {
		throw error;
	}

	if (!data) { return []; }

	return data.map(({ slug }) => {
		return { params: { slug } };
	});
}

export async function getSetsWithClient(
	supabase: SupabaseClient<Database>
): Promise<GrimoireSet[]> {
	const { data, error } = await supabase.from("sets").select("name, slug");
	if (error) {
		throw error;
	}

	return data ?? [];
}

export async function getSetCardsWithClient(
	slug: string,
	supabase: SupabaseClient<Database>
): Promise<GrimoireCard[]> {
	const { data, error } = await supabase
		.from("sets")
		.select("printings (id, name)")
		.eq("slug", slug)
		.order("sequence", { foreignTable: "printings", ascending: true });
	if (error) {
		throw error;
	}
	if (!data) { return []; }

	const unpacked = data[0]?.printings ?? [];
	return Array.isArray(unpacked) ? unpacked : [unpacked];
}
