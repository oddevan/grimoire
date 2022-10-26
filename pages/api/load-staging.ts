import type { NextApiRequest, NextApiResponse } from 'next'
import TCGplayer from '../../lib/tcgplayer';

interface loadStagingBody {
	tcgpSetId: number;
	grimoireSetId: number;
	idPrefix: string;
	getAll: boolean;
}

const loadStaging = async (req: NextApiRequest, res: NextApiResponse) => {
  const {tcgpSetId, grimoireSetId, idPrefix, getAll} = <loadStagingBody>req.body;

	let batchOffset = 0;
	const batchQuantity = 100;
	let cardBatch: Array<any>|undefined;
	cardBatch = await TCGplayer.cardsFromSet(tcgpSetId, batchQuantity, batchOffset);
	while (cardBatch) {
		cardBatch.forEach(element => {
			// parse card
			// save main card
			// check for alt and save
		});
		batchOffset += batchQuantity;
		cardBatch = await TCGplayer.cardsFromSet(tcgpSetId, batchQuantity, batchOffset);
	}

	res.status(200).json({success: true})
}

export default loadStaging