import type { Database } from '@/database.types';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const query = event.context.params!.query;

    await client.rpc('increase_product_search_rank', {
        update_term: query,
    });

    const result = {
        query: query,
        ip: event.context.clientAddress, //not working!
    };
    return result;
});

// to update:
//
// const query = 'a';
//
// const { data: fetchedData } = useFetch(
//     `/api/updateSearchProductStats/${query}`,
// );