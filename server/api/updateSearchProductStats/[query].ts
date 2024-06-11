import type { Database } from '@/database.types';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const query = decodeURIComponent(event.context.params!.query);

    if (query.length <= 4) return;

    const { data: preciseSearch } = await client
        .from('product')
        .select('id')
        .ilike('title', `%${query}%`)
        .single();

    if (!preciseSearch) return;

    const userIp = event.node.req.headers['x-forwarded-for'];

    const { data: user } = await client
        .from('ip_limitations')
        .select()
        .eq('ip', userIp!)
        .single();

    if (user) {
        if (user.search_rank_up_queries < 3) {
            await client.rpc('increment_user_search_up_queries_amount', {
                user_ip: user.ip,
            });
        } else {
            return;
        }
    } else {
        await client
            .from('ip_limitations')
            .insert({ ip: `${userIp}`, search_rank_up_queries: 1 });
    }

    await client.rpc('increment_product_search_rank', {
        update_term: query,
    });
});
