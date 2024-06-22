export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          code: string
          created_at: string
          id: number
          product_ids: number[]
          title: string
        }
        Insert: {
          code?: string
          created_at?: string
          id?: number
          product_ids?: number[]
          title?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: number
          product_ids?: number[]
          title?: string
        }
        Relationships: []
      }
      event: {
        Row: {
          created_at: string
          id: string
          picture: string
          product_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          picture?: string
          product_id?: string
          title?: string
        }
        Update: {
          created_at?: string
          id?: string
          picture?: string
          product_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_limitations: {
        Row: {
          ip: string
          search_rank_up_queries: number
        }
        Insert: {
          ip: string
          search_rank_up_queries?: number
        }
        Update: {
          ip?: string
          search_rank_up_queries?: number
        }
        Relationships: []
      }
      product: {
        Row: {
          category_code: string
          category_id: number
          created_at: string
          description: string
          id: string
          in_stock: number
          pictures: string[]
          price: number
          search_rank: number
          title: string
        }
        Insert: {
          category_code: string
          category_id: number
          created_at?: string
          description?: string
          id?: string
          in_stock?: number
          pictures?: string[]
          price: number
          search_rank?: number
          title: string
        }
        Update: {
          category_code?: string
          category_id?: number
          created_at?: string
          description?: string
          id?: string
          in_stock?: number
          pictures?: string[]
          price?: number
          search_rank?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_code_fkey"
            columns: ["category_code"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      increment_product_search_rank: {
        Args: {
          update_term: string
        }
        Returns: undefined
      }
      increment_user_search_up_queries_amount: {
        Args: {
          user_ip: string
        }
        Returns: undefined
      }
      search_product: {
        Args: {
          search_term: string
        }
        Returns: {
          id: string
          created_at: string
          title: string
          price: number
          pictures: string[]
          description: string
          in_stock: number
          category_id: number
          category_code: string
          search_rank: number
          sort_order: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
