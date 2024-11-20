export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          contact_info: string | null
          created_at: string
          id: number
          name: string | null
          type: string | null
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          id?: number
          name?: string | null
          type?: string | null
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          id?: number
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      movie_partner_agreements: {
        Row: {
          contract_cost: number | null
          contract_date: string | null
          created_at: string
          details: string | null
          id: number
          movie_id: number | null
          partner_id: number | null
        }
        Insert: {
          contract_cost?: number | null
          contract_date?: string | null
          created_at?: string
          details?: string | null
          id?: number
          movie_id?: number | null
          partner_id?: number | null
        }
        Update: {
          contract_cost?: number | null
          contract_date?: string | null
          created_at?: string
          details?: string | null
          id?: number
          movie_id?: number | null
          partner_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movie_partner_argeement_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_partner_argeement_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      movie_staff: {
        Row: {
          created_at: string
          id: number
          movie_id: number | null
          role: string | null
          staff_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id?: number | null
          role?: string | null
          staff_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number | null
          role?: string | null
          staff_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movie_staff_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movie_staff_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          casts: string | null
          category: string | null
          created: string | null
          created_at: string
          current_episode: string | null
          description: string | null
          director: string | null
          group: string | null
          id: number
          language: string | null
          modified: string | null
          name: string | null
          original_name: string | null
          poster_url: string | null
          quality: string | null
          slug: string | null
          thumb_url: string | null
          time: string | null
          total_episodes: number | null
        }
        Insert: {
          casts?: string | null
          category?: string | null
          created?: string | null
          created_at?: string
          current_episode?: string | null
          description?: string | null
          director?: string | null
          group?: string | null
          id?: number
          language?: string | null
          modified?: string | null
          name?: string | null
          original_name?: string | null
          poster_url?: string | null
          quality?: string | null
          slug?: string | null
          thumb_url?: string | null
          time?: string | null
          total_episodes?: number | null
        }
        Update: {
          casts?: string | null
          category?: string | null
          created?: string | null
          created_at?: string
          current_episode?: string | null
          description?: string | null
          director?: string | null
          group?: string | null
          id?: number
          language?: string | null
          modified?: string | null
          name?: string | null
          original_name?: string | null
          poster_url?: string | null
          quality?: string | null
          slug?: string | null
          thumb_url?: string | null
          time?: string | null
          total_episodes?: number | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          id: number
          name: string | null
          thumb_image: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          thumb_image?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          thumb_image?: string | null
          type?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          department: string | null
          id: number
          name: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: number
          name?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: number
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created_at: string
          customer_id: number | null
          details: string | null
          id: number
          movie_id: number | null
          transaction_date: string | null
        }
        Insert: {
          created_at?: string
          customer_id?: number | null
          details?: string | null
          id?: number
          movie_id?: number | null
          transaction_date?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: number | null
          details?: string | null
          id?: number
          movie_id?: number | null
          transaction_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          emailVerified: boolean | null
          id: number
          image: string | null
          name: string | null
          password: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          emailVerified?: boolean | null
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          emailVerified?: boolean | null
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
