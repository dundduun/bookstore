export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            category: {
                Row: {
                    code: string | null;
                    created_at: string;
                    id: number;
                    product_ids: number[];
                    title: string;
                };
                Insert: {
                    code?: string | null;
                    created_at?: string;
                    id?: number;
                    product_ids?: number[];
                    title?: string;
                };
                Update: {
                    code?: string | null;
                    created_at?: string;
                    id?: number;
                    product_ids?: number[];
                    title?: string;
                };
                Relationships: [];
            };
            product: {
                Row: {
                    category_id: number | null;
                    created_at: string;
                    description: string;
                    id: string;
                    in_stock: number | null;
                    pictures: string[];
                    price: number;
                    title: string;
                    title_description: string | null;
                };
                Insert: {
                    category_id?: number | null;
                    created_at?: string;
                    description?: string;
                    id?: string;
                    in_stock?: number | null;
                    pictures?: string[];
                    price: number;
                    title: string;
                };
                Update: {
                    category_id?: number | null;
                    created_at?: string;
                    description?: string;
                    id?: string;
                    in_stock?: number | null;
                    pictures?: string[];
                    price?: number;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'product_category_id_fkey';
                        columns: ['category_id'];
                        isOneToOne: false;
                        referencedRelation: 'category';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            gtrgm_compress: {
                Args: {
                    '': unknown;
                };
                Returns: unknown;
            };
            gtrgm_decompress: {
                Args: {
                    '': unknown;
                };
                Returns: unknown;
            };
            gtrgm_in: {
                Args: {
                    '': unknown;
                };
                Returns: unknown;
            };
            gtrgm_options: {
                Args: {
                    '': unknown;
                };
                Returns: undefined;
            };
            gtrgm_out: {
                Args: {
                    '': unknown;
                };
                Returns: unknown;
            };
            search_books: {
                Args: {
                    book_term: string;
                };
                Returns: {
                    id: number;
                    title: string;
                    author: string;
                }[];
            };
            search_product:
                | {
                      Args: {
                          book_term: string;
                      };
                      Returns: {
                          id: number;
                          title: string;
                          author: string;
                      }[];
                  }
                | {
                      Args: {
                          product_term: string;
                      };
                      Returns: {
                          category_id: number | null;
                          created_at: string;
                          description: string;
                          id: string;
                          in_stock: number | null;
                          pictures: string[];
                          price: number;
                          title: string;
                      }[];
                  };
            set_limit: {
                Args: {
                    '': number;
                };
                Returns: number;
            };
            show_limit: {
                Args: Record<PropertyKey, never>;
                Returns: number;
            };
            show_trgm: {
                Args: {
                    '': string;
                };
                Returns: string[];
            };
            title_description: {
                Args: {
                    '': unknown;
                };
                Returns: string;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
            PublicSchema['Views'])
      ? (PublicSchema['Tables'] &
            PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema['Enums']
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never;
