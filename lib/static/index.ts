
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/database';
import { getAllCardIdsWithClient, getCardInfoWithClient } from "./cards"
import { getSetCardsWithClient, getSetSlugsWithClient, getSetsWithClient } from './sets';

const supabase = createBrowserSupabaseClient<Database>();

export const getAllCardIds = async () => getAllCardIdsWithClient(supabase);
export const getCardInfo = async (cardId: string) => getCardInfoWithClient(cardId, supabase);

export const getSetSlugs = async () => getSetSlugsWithClient(supabase);
export const getSets = async () => getSetsWithClient(supabase);
export const getSetCards = async (slug: string) => getSetCardsWithClient(slug, supabase);