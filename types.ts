import type { Database } from '@/database.types';

export type SearchedProductResult =
    Database['public']['Functions']['search_product']['Returns'];

export type SearchedInstanceResult = {
    category_code: string;
    category_id: number | null;
    created_at: string;
    description: string;
    id: string;
    in_stock: number | null;
    pictures: string[];
    price: number;
    search_rank: number;
    title: string;
};

export type selectedProduct = {
    category_code: string;
    category_id: number;
    created_at: string;
    description: string;
    id: string;
    in_stock: number;
    pictures: string[];
    price: number;
    search_rank: number;
    title: string;
};
