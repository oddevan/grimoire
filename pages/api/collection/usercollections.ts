import { withApiAuth } from '@supabase/auth-helpers-nextjs'
import { GrimoireCollection } from '../../../types/GrimoireCollection';

export default withApiAuth(async function UserCollections(req, res, supabase) {
  // RLS will ensure we only get the user's collections.
  const { data: collectionData } = await supabase.from('collections').select('id, name, slug, is_public');
	if (!collectionData) {
		res.json([]);
		return;
	}

	const collections = await Promise.all(collectionData.map(async (collectionRow) => {
		const collection: GrimoireCollection = {
			id: collectionRow.id,
			name: collectionRow.name,
			slug: collectionRow.slug,
			isPublic: collectionRow.is_public,
			cards: [],
		};

		const { data: cardData } = await supabase.
			from('collection_entries').
			select('quantity, card_page_data(*)').
			eq('collection_id', collection.id);
		
		collection.cards = cardData?.map(cardRow => {
			const { quantity, card_page_data: cardPage } = cardRow
			return {
				quantity,
				card: {
					id: cardPage.id!,
					name: cardPage.name!,
					imgUrl: cardPage.imgurl ?? undefined,
					setName: cardPage.setname ?? undefined,
					setSlug: cardPage.setslug ?? undefined,
					hash: cardPage.hash ?? undefined,
					price: cardPage.market_price ?? undefined,
				}
			};
		});

		return collection;
	}));

  res.json(collections);
})