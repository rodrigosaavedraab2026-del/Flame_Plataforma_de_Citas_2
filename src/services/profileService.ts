import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  // Create a new profile
  async createProfile(profile: ProfileInsert) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get profile by ID
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update profile
  async updateProfile(userId: string, updates: ProfileUpdate) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete profile
  async deleteProfile(userId: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
  },

  // Get all profiles (for discovery)
  async getProfiles(filters?: {
    gender?: 'male' | 'female' | 'other';
    minAge?: number;
    maxAge?: number;
    interests?: string[];
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.gender) {
      query = query.eq('gender', filters.gender);
    }

    if (filters?.minAge) {
      query = query.gte('age', filters.minAge);
    }

    if (filters?.maxAge) {
      query = query.lte('age', filters.maxAge);
    }

    if (filters?.interests && filters.interests.length > 0) {
      query = query.overlaps('interests', filters.interests);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Upload profile photo
  async uploadPhoto(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName);

    return publicUrl;
  },

  // Delete profile photo
  async deletePhoto(photoUrl: string) {
    const fileName = photoUrl.split('/').pop();
    if (!fileName) throw new Error('Invalid photo URL');

    const { error } = await supabase.storage
      .from('profile-photos')
      .remove([fileName]);

    if (error) throw error;
  },

  // Get verified profiles only
  async getVerifiedProfiles(limit = 20) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('verified', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Search profiles by name or interests
  async searchProfiles(query: string, limit = 20) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,interests.cs.{${query}}`)
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
