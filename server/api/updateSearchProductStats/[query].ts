import type { Database } from '@/database.types';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const query = decodeURIComponent(event.context.params!.query);

    if (query.length < 2) return;

    await client.rpc('increase_product_search_rank', {
        update_term: query,
    });

    const clientIP = event.node.req.headers['x-forwarded-for'];
    return;
});
