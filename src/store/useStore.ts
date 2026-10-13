import { create } from 'zustand';

export type Screen = 
  | 'welcome' 
  | 'auth' 
  | 'profileSetup' 
  | 'swipe' 
  | 'membership' 
  | 'payment'
  | 'chat' 
  | 'notifications' 
  | 'profile' 
  | 'consumables'
  | 'stories'
  | 'events'
  | 'iceBreaker'
  | 'aiMatching'
  | 'compatibility'
  | 'videoCall'
  | 'gifts'
  | 'groupMode'
  | 'spotify'
  | 'arFilters'
  | 'scheduler'
  | 'aiVerification'
  | 'aiModeration';

export type MembershipTier = 'free' | 'plus' | 'gold' | 'platinum' | 'select';

export interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  distance: string;
  interests: string[];
  photos: string[];
  verified: boolean;
  zodiac: string;
  anthem: string;
  prompts: { question: string; answer: string }[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  type?: 'text' | 'voice';
  voiceDuration?: number;
}

export interface Chat {
  id: number;
  profileId: number;
  name: string;
  avatar: string;
  messages: Message[];
  lastMessage: string;
  unread: number;
}

export interface Notification {
  id: string;
  type: 'match' | 'like' | 'message' | 'boost' | 'event';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  lookingFor: 'male' | 'female' | 'everyone';
  verified: boolean;
  profileComplete: boolean;
  createdAt: Date;
}

interface AppState {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { name: string; email: string; password: string; age: number; gender: 'male' | 'female' | 'other'; lookingFor: 'male' | 'female' | 'everyone' }) => Promise<boolean>;
  logout: () => void;
  
  // Profiles
  currentProfileIndex: number;
  likedProfiles: number[];
  superLikedProfiles: number[];
  passedProfiles: number[];
  likeProfile: (id: number) => void;
  superLikeProfile: (id: number) => void;
  passProfile: (id: number) => void;
  
  // Membership
  membership: MembershipTier;
  setMembership: (tier: MembershipTier) => void;
  
  // Chat
  chats: Chat[];
  addChat: (chat: Chat) => void;
  sendMessage: (chatId: number, text: string, type?: 'text' | 'voice') => void;
  selectedChatId: number | null;
  setSelectedChatId: (id: number | null) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  
  // Consumables
  boostsRemaining: number;
  superLikesRemaining: number;
  useBoost: () => void;
  useSuperLike: () => void;
  
  // Payment
  paymentSuccess: boolean;
  setPaymentSuccess: (val: boolean) => void;
  
  // Toast
  toasts: { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }[];
  addToast: (toast: { type: 'success' | 'error' | 'info' | 'warning'; message: string }) => void;
  removeToast: (id: string) => void;
}

export const useStore = create<AppState>()((set, get) => ({
  screen: 'welcome',
  setScreen: (screen) => set({ screen }),
  
  // Auth
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (email && password.length >= 6) {
      set({
        isAuthenticated: true,
        user: {
          id: 'user_' + Date.now(),
          email,
          name: email.split('@')[0],
          age: 28,
          gender: 'male',
          lookingFor: 'female',
          verified: false,
          profileComplete: false,
          createdAt: new Date(),
        },
      });
      return true;
    }
    return false;
  },
  register: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (data.email && data.password.length >= 6 && data.name) {
      set({
        isAuthenticated: true,
        user: {
          id: 'user_' + Date.now(),
          email: data.email,
          name: data.name,
          age: data.age,
          gender: data.gender,
          lookingFor: data.lookingFor,
          verified: false,
          profileComplete: false,
          createdAt: new Date(),
        },
      });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null, screen: 'welcome' }),
  
  // Profiles
  currentProfileIndex: 0,
  likedProfiles: [],
  superLikedProfiles: [],
  passedProfiles: [],
  likeProfile: (id) => set((state) => ({ likedProfiles: [...state.likedProfiles, id] })),
  superLikeProfile: (id) => set((state) => ({ superLikedProfiles: [...state.superLikedProfiles, id] })),
  passProfile: (id) => set((state) => ({ passedProfiles: [...state.passedProfiles, id] })),
  
  // Membership
  membership: 'free',
  setMembership: (tier) => set({ membership: tier }),
  
  // Chat
  chats: [],
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  sendMessage: (chatId, text, type = 'text') => set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text,
          sender: 'me',
          timestamp: new Date(),
          type: type as 'text' | 'voice',
          voiceDuration: type === 'voice' ? Math.floor(Math.random() * 30) + 5 : undefined,
        };
        return { ...chat, messages: [...chat.messages, newMessage], lastMessage: type === 'voice' ? '🎤 Nota de voz' : text };
      }
      return chat;
    }),
  })),
  selectedChatId: null,
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  
  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({ notifications: [notification, ...state.notifications] })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),
  
  // Consumables
  boostsRemaining: 1,
  superLikesRemaining: 5,
  useBoost: () => set((state) => ({ boostsRemaining: Math.max(0, state.boostsRemaining - 1) })),
  useSuperLike: () => set((state) => ({ superLikesRemaining: Math.max(0, state.superLikesRemaining - 1) })),
  
  // Payment
  paymentSuccess: false,
  setPaymentSuccess: (val) => set({ paymentSuccess: val }),
  
  // Toast
  toasts: [],
  addToast: (toast) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));
