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
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          user_id: string
          career_id: string
          scores: Json
          answers: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_id: string
          scores: Json
          answers: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_id?: string
          scores?: Json
          answers?: Json
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          career_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_id?: string
          created_at?: string
        }
      }
      learning_progress: {
        Row: {
          id: string
          user_id: string
          career_id: string
          skill_name: string
          progress_percentage: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          career_id: string
          skill_name: string
          progress_percentage?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          career_id?: string
          skill_name?: string
          progress_percentage?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
