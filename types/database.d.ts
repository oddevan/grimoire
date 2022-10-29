export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      card_pkm: {
        Row: {
          id: string
          created_at: string | null
          signature: string
          name: string
          slug: string
          legal_standard: boolean
          legal_expanded: boolean
          legal_unlimited: boolean
        }
        Insert: {
          id?: string
          created_at?: string | null
          signature: string
          name: string
          slug: string
          legal_standard?: boolean
          legal_expanded?: boolean
          legal_unlimited?: boolean
        }
        Update: {
          id?: string
          created_at?: string | null
          signature?: string
          name?: string
          slug?: string
          legal_standard?: boolean
          legal_expanded?: boolean
          legal_unlimited?: boolean
        }
      }
      collection_entries: {
        Row: {
          id: string
          user_id: string
          collection_id: string
          printing_id: string
          quantity: number
        }
        Insert: {
          id?: string
          user_id: string
          collection_id: string
          printing_id: string
          quantity?: number
        }
        Update: {
          id?: string
          user_id?: string
          collection_id?: string
          printing_id?: string
          quantity?: number
        }
      }
      collections: {
        Row: {
          id: string
          created_at: string | null
          user_id: string
          name: string
          slug: string
          is_public: boolean
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id: string
          name: string
          slug: string
          is_public?: boolean
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string
          name?: string
          slug?: string
          is_public?: boolean
        }
      }
      keval: {
        Row: {
          id: string
          key: string
          value: string
          public: boolean
        }
        Insert: {
          id?: string
          key: string
          value: string
          public?: boolean
        }
        Update: {
          id?: string
          key?: string
          value?: string
          public?: boolean
        }
      }
      market_prices: {
        Row: {
          id: string
          tcgplayer_sku: string
          price: number
          timestamp: string
        }
        Insert: {
          id?: string
          tcgplayer_sku: string
          price?: number
          timestamp?: string
        }
        Update: {
          id?: string
          tcgplayer_sku?: string
          price?: number
          timestamp?: string
        }
      }
      printing_staging: {
        Row: {
          id: number
          name: string | null
          grimoire_id: string
          tcgplayer_sku: string | null
          tcgplayer_product: string | null
          set_id: number | null
          signature_data: string | null
          sequence: string | null
          image_url: string | null
          signature: string | null
        }
        Insert: {
          id?: number
          name?: string | null
          grimoire_id: string
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          set_id?: number | null
          signature_data?: string | null
          sequence?: string | null
          image_url?: string | null
          signature?: string | null
        }
        Update: {
          id?: number
          name?: string | null
          grimoire_id?: string
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          set_id?: number | null
          signature_data?: string | null
          sequence?: string | null
          image_url?: string | null
          signature?: string | null
        }
      }
      printings: {
        Row: {
          dbid: number
          id: string
          name: string
          set_id: number
          sequence: string
          image_url: string | null
          tcgplayer_sku: string | null
          tcgplayer_product: string | null
          signature_data: string
          created_at: string
          updated_at: string
          signature: string | null
        }
        Insert: {
          dbid?: number
          id: string
          name: string
          set_id: number
          sequence: string
          image_url?: string | null
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          signature_data: string
          created_at?: string
          updated_at?: string
          signature?: string | null
        }
        Update: {
          dbid?: number
          id?: string
          name?: string
          set_id?: number
          sequence?: string
          image_url?: string | null
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          signature_data?: string
          created_at?: string
          updated_at?: string
          signature?: string | null
        }
      }
      printings_v1: {
        Row: {
          name: string
          id: string
          tcgplayer_sku: string | null
          tcgplayer_product: string | null
          set_id: number
          signature_data: string
          sequence: string
          image_url: string | null
          created_at: string
          updated_at: string
          signature: string | null
          dbid: number
        }
        Insert: {
          name: string
          id: string
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          set_id: number
          signature_data: string
          sequence?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          signature?: string | null
          dbid?: number
        }
        Update: {
          name?: string
          id?: string
          tcgplayer_sku?: string | null
          tcgplayer_product?: string | null
          set_id?: number
          signature_data?: string
          sequence?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          signature?: string | null
          dbid?: number
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
          website: string | null
          grimoire_admin: boolean
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          grimoire_admin?: boolean
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          grimoire_admin?: boolean
        }
      }
      sets: {
        Row: {
          id: number
          name: string
          slug: string
          code: string | null
          guru_id: string | null
          release_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          code?: string | null
          guru_id?: string | null
          release_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          code?: string | null
          guru_id?: string | null
          release_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      card_page_data: {
        Row: {
          id: string | null
          name: string | null
          imgurl: string | null
          setname: string | null
          setslug: string | null
          hash: string | null
          printings: Json[] | null
          market_price: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
