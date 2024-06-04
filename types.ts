import type { Database } from '~/database.types';

export type SearchedProductResult =
    Database['public']['Functions']['search_product']['Returns'];

export type SearchedInstanceResult = {
    category_id: number | null;
    created_at: string;
    description: string;
    id: string;
    in_stock: number | null;
    pictures: string[];
    price: number;
    title: string;
};
