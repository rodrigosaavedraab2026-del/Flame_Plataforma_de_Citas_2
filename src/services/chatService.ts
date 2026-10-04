import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export const chatService = {
  // Send a message
  async sendMessage(chatId: string, senderId: string, content: string, type: 'text' | 'image' | 'voice' = 'text') {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: senderId,
        content,
        type,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get messages for a chat
  async getMessages(chatId: string, limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.reverse(); // Return in chronological order
  },

  // Delete a message
  async deleteMessage(messageId: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;
  },

  // Upload image message
  async uploadImage(chatId: string, senderId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${chatId}/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('chat-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('chat-images')
      .getPublicUrl(fileName);

    // Save message with image URL
    const message = await this.sendMessage(chatId, senderId, publicUrl, 'image');
    return message;
  },

  // Upload voice message
  async uploadVoice(chatId: string, senderId: string, audioBlob: Blob) {
    const fileName = `${chatId}/${Date.now()}.webm`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('voice-messages')
      .upload(fileName, audioBlob, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'audio/webm',
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('voice-messages')
      .getPublicUrl(fileName);

    // Save message with voice URL
    const message = await this.sendMessage(chatId, senderId, publicUrl, 'voice');
    return message;
  },

  // Subscribe to real-time messages
  subscribeToMessages(chatId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel(`chat:${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  },

  // Subscribe to all user's chats
  subscribeToAllChats(userId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel(`user-chats:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  },

  // Get all chats for a user
  async getUserChats(userId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        chat_id,
        sender_id,
        content,
        type,
        created_at,
        profile:profiles!messages_sender_id_fkey(id, name, photos)
      `)
      .in('chat_id', await this.getChatIdsForUser(userId))
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by chat_id and get latest message
    const chats = new Map();
    data.forEach(msg => {
      if (!chats.has(msg.chat_id)) {
        chats.set(msg.chat_id, {
          id: msg.chat_id,
          lastMessage: msg.content,
          lastMessageTime: msg.created_at,
          messageType: msg.type,
          otherUser: msg.sender_id === userId ? msg.profile : null,
        });
      }
    });

    return Array.from(chats.values());
  },

  // Helper: Get all chat IDs for a user
  async getChatIdsForUser(userId: string) {
    const { data: matches } = await supabase
      .from('matches')
      .select('id')
      .eq('status', 'matched')
      .or(`user_id.eq.${userId},matched_user_id.eq.${userId}`);

    return matches?.map(m => m.id) || [];
  },

  // Mark messages as read
  async markAsRead(chatId: string, userId: string) {
    // This would typically update a "read" status
    // For now, we'll just return success
    return { success: true };
  },

  // Get unread message count
  async getUnreadCount(userId: string) {
    // This would typically count unread messages
    // For now, we'll return 0
    return 0;
  },
};
