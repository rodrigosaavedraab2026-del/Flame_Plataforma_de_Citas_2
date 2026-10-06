import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Match = Database['public']['Tables']['matches']['Row'];

export const matchService = {
  // Create a like (one-way match)
  async createLike(userId: string, targetUserId: string) {
    const { data, error } = await supabase
      .from('matches')
      .insert({
        user_id: userId,
        matched_user_id: targetUserId,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Check if there's a reverse like (match!)
    const { data: reverseLike } = await supabase
      .from('matches')
      .select('*')
      .eq('user_id', targetUserId)
      .eq('matched_user_id', userId)
      .eq('status', 'pending')
      .single();

    if (reverseLike) {
      // It's a match! Update both records
      await supabase
        .from('matches')
        .update({ status: 'matched' })
        .eq('id', data.id);

      await supabase
        .from('matches')
        .update({ status: 'matched' })
        .eq('id', reverseLike.id);

      return { isMatch: true, match: data };
    }

    return { isMatch: false, match: data };
  },

  // Pass on a user
  async createPass(userId: string, targetUserId: string) {
    const { data, error } = await supabase
      .from('matches')
      .insert({
        user_id: userId,
        matched_user_id: targetUserId,
        status: 'rejected',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all matches for a user
  async getMatches(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        profile:profiles!matches_matched_user_id_fkey(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'matched')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get pending likes (people who liked you)
  async getPendingLikes(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        profile:profiles!matches_user_id_fkey(*)
      `)
      .eq('matched_user_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get users you've liked
  async getLikedUsers(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('matched_user_id')
      .eq('user_id', userId)
      .in('status', ['pending', 'matched']);

    if (error) throw error;
    return data.map(m => m.matched_user_id);
  },

  // Get users you've passed on
  async getPassedUsers(userId: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('matched_user_id')
      .eq('user_id', userId)
      .eq('status', 'rejected');

    if (error) throw error;
    return data.map(m => m.matched_user_id);
  },

  // Undo a like/pass
  async undoAction(userId: string, targetUserId: string) {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('user_id', userId)
      .eq('matched_user_id', targetUserId);

    if (error) throw error;
  },

  // Get match count
  async getMatchCount(userId: string) {
    const { count, error } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'matched');

    if (error) throw error;
    return count || 0;
  },

  // Check if two users are matched
  async isMatched(userId1: string, userId2: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('user_id', userId1)
      .eq('matched_user_id', userId2)
      .eq('status', 'matched')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },
};
