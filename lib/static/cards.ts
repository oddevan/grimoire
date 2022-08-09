import { GrimoireCard } from '../../types/GrimoireCard';
import { api } from '../utils';

export async function getAllCardIdsWithClient() : Promise<string[]> {
	return await api.get('/routes/printings');
}

export async function getCardInfoWithClient(id: string) : Promise<GrimoireCard | undefined> {
	return await api.get(`/printings/${id}`);
}
