import type { Database } from '~/database.types';

export type SearchProductResult =
    Database['public']['Functions']['search_product']['Returns'];
