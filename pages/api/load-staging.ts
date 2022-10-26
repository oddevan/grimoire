import type { NextApiRequest, NextApiResponse } from 'next'

interface loadStagingBody {
	tcgpSetId: number;
	grimoireSetId: number;
	idPrefix: string;
	getAll: boolean;
}

const loadStaging = (req: NextApiRequest, res: NextApiResponse) => {
  const {tcgpSetId, grimoireSetId, idPrefix, getAll} = <loadStagingBody>req.body;

	res.status(200).json({success: true})
}

export default loadStaging