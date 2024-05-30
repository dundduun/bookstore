import type { Database } from '@/database.types';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const query = event.context.params!.query;

    return `Hello, ${query}!`
});