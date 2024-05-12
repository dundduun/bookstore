import type { Database } from '~/database.types';

export type SearchProductResult =
    Database['public']['Functions']['search_product']['Returns'];

export type SearchedInstanceType =
    | { id: number; title: string; author: string }
    | {
          category_id: number | null;
          created_at: string;
          description: string;
          id: string;
          in_stock: number | null;
          pictures: string[];
          price: number;
          title: string;
      };
//     {
//     id: number,
//     title: string,
//     author: string;
// }[] | {
//     category_id: number | null,
//     created_at: string,
//     description: string,
//     id: string,
//     in_stock: number | null,
//     pictures: string[],
//     price: number,
//     title: string,
// }[];
