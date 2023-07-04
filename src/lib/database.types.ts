export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_post: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          image: string | null
          metaDesc: string | null
          slug: string | null
          subTitle: string | null
          title: string | null
          user: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          metaDesc?: string | null
          slug?: string | null
          subTitle?: string | null
          title?: string | null
          user?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          image?: string | null
          metaDesc?: string | null
          slug?: string | null
          subTitle?: string | null
          title?: string | null
          user?: string | null
        }
        Relationships: []
      }
      blog_post_item: {
        Row: {
          blogPost: number | null
          content: string | null
          id: number
          image: string | null
          subContent: string | null
          subTitle: string | null
          title: string | null
          "urlPath ": string | null
        }
        Insert: {
          blogPost?: number | null
          content?: string | null
          id?: number
          image?: string | null
          subContent?: string | null
          subTitle?: string | null
          title?: string | null
          "urlPath "?: string | null
        }
        Update: {
          blogPost?: number | null
          content?: string | null
          id?: number
          image?: string | null
          subContent?: string | null
          subTitle?: string | null
          title?: string | null
          "urlPath "?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_item_blogPost_fkey"
            columns: ["blogPost"]
            referencedRelation: "blog_post"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          avatar?: string | null
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar?: string | null
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
