export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          client_address: string | null
          client_name: string
          client_phone: string
          created_at: string
          daily_rate: string | null
          equipment_location: string | null
          equipment_name: string
          equipment_power: string | null
          hourly_rate: string | null
          id: string
          owner_name: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          client_address?: string | null
          client_name: string
          client_phone: string
          created_at?: string
          daily_rate?: string | null
          equipment_location?: string | null
          equipment_name: string
          equipment_power?: string | null
          hourly_rate?: string | null
          id?: string
          owner_name?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          client_address?: string | null
          client_name?: string
          client_phone?: string
          created_at?: string
          daily_rate?: string | null
          equipment_location?: string | null
          equipment_name?: string
          equipment_power?: string | null
          hourly_rate?: string | null
          id?: string
          owner_name?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      equipment_listings: {
        Row: {
          availability_status: string
          brand: string | null
          created_at: string
          daily_rate: number | null
          description: string | null
          district: string | null
          equipment_name: string
          equipment_type: string
          features: string[] | null
          hourly_rate: number | null
          id: string
          is_active: boolean
          location: string | null
          model: string | null
          photos: string[] | null
          power_capacity: string | null
          provider_id: string
          state: string | null
          updated_at: string
        }
        Insert: {
          availability_status?: string
          brand?: string | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          district?: string | null
          equipment_name: string
          equipment_type: string
          features?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          location?: string | null
          model?: string | null
          photos?: string[] | null
          power_capacity?: string | null
          provider_id: string
          state?: string | null
          updated_at?: string
        }
        Update: {
          availability_status?: string
          brand?: string | null
          created_at?: string
          daily_rate?: number | null
          description?: string | null
          district?: string | null
          equipment_name?: string
          equipment_type?: string
          features?: string[] | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          location?: string | null
          model?: string | null
          photos?: string[] | null
          power_capacity?: string | null
          provider_id?: string
          state?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_listings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      expert_farmer_profiles: {
        Row: {
          availability_status: string
          bio: string | null
          certifications: string[] | null
          consultation_fee: number | null
          consultation_modes: string[] | null
          created_at: string
          experience_years: number | null
          expertise_areas: string[]
          id: string
          is_active: boolean
          is_verified_expert: boolean
          languages: string[] | null
          provider_id: string
          qualifications: string[] | null
          updated_at: string
        }
        Insert: {
          availability_status?: string
          bio?: string | null
          certifications?: string[] | null
          consultation_fee?: number | null
          consultation_modes?: string[] | null
          created_at?: string
          experience_years?: number | null
          expertise_areas: string[]
          id?: string
          is_active?: boolean
          is_verified_expert?: boolean
          languages?: string[] | null
          provider_id: string
          qualifications?: string[] | null
          updated_at?: string
        }
        Update: {
          availability_status?: string
          bio?: string | null
          certifications?: string[] | null
          consultation_fee?: number | null
          consultation_modes?: string[] | null
          created_at?: string
          experience_years?: number | null
          expertise_areas?: string[]
          id?: string
          is_active?: boolean
          is_verified_expert?: boolean
          languages?: string[] | null
          provider_id?: string
          qualifications?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_farmer_profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      fpo_provider_profiles: {
        Row: {
          contact_person: string | null
          contact_phone: string | null
          created_at: string
          crops_handled: string[] | null
          description: string | null
          fpo_name: string
          id: string
          is_active: boolean
          member_count: number | null
          operating_areas: string[] | null
          provider_id: string
          registration_number: string | null
          services_offered: string[] | null
          updated_at: string
        }
        Insert: {
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          crops_handled?: string[] | null
          description?: string | null
          fpo_name: string
          id?: string
          is_active?: boolean
          member_count?: number | null
          operating_areas?: string[] | null
          provider_id: string
          registration_number?: string | null
          services_offered?: string[] | null
          updated_at?: string
        }
        Update: {
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          crops_handled?: string[] | null
          description?: string | null
          fpo_name?: string
          id?: string
          is_active?: boolean
          member_count?: number | null
          operating_areas?: string[] | null
          provider_id?: string
          registration_number?: string | null
          services_offered?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fpo_provider_profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          id: string
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_path: string
          file_size: number
          id?: string
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          address: string | null
          approval_status: Database["public"]["Enums"]["approval_status"]
          approved_at: string | null
          approved_by: string | null
          created_at: string
          district: string | null
          email: string | null
          full_name: string
          id: string
          identity_proof_type: string | null
          identity_proof_url: string | null
          latitude: number | null
          longitude: number | null
          phone_number: string
          phone_verified: boolean
          pincode: string | null
          profile_photo_url: string | null
          provider_type: Database["public"]["Enums"]["provider_type"]
          rejection_reason: string | null
          state: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          full_name: string
          id?: string
          identity_proof_type?: string | null
          identity_proof_url?: string | null
          latitude?: number | null
          longitude?: number | null
          phone_number: string
          phone_verified?: boolean
          pincode?: string | null
          profile_photo_url?: string | null
          provider_type: Database["public"]["Enums"]["provider_type"]
          rejection_reason?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          approval_status?: Database["public"]["Enums"]["approval_status"]
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          district?: string | null
          email?: string | null
          full_name?: string
          id?: string
          identity_proof_type?: string | null
          identity_proof_url?: string | null
          latitude?: number | null
          longitude?: number | null
          phone_number?: string
          phone_verified?: boolean
          pincode?: string | null
          profile_photo_url?: string | null
          provider_type?: Database["public"]["Enums"]["provider_type"]
          rejection_reason?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skilled_farmer_profiles: {
        Row: {
          availability_status: string
          bio: string | null
          created_at: string
          daily_rate: number | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          is_active: boolean
          languages: string[] | null
          provider_id: string
          skills: string[]
          specialties: string[] | null
          updated_at: string
        }
        Insert: {
          availability_status?: string
          bio?: string | null
          created_at?: string
          daily_rate?: number | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          languages?: string[] | null
          provider_id: string
          skills: string[]
          specialties?: string[] | null
          updated_at?: string
        }
        Update: {
          availability_status?: string
          bio?: string | null
          created_at?: string
          daily_rate?: number | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean
          languages?: string[] | null
          provider_id?: string
          skills?: string[]
          specialties?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skilled_farmer_profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
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
      approval_status: "pending" | "approved" | "rejected"
      provider_type:
        | "equipment_owner"
        | "skilled_farmer"
        | "expert_farmer"
        | "fpo_provider"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      approval_status: ["pending", "approved", "rejected"],
      provider_type: [
        "equipment_owner",
        "skilled_farmer",
        "expert_farmer",
        "fpo_provider",
      ],
    },
  },
} as const
