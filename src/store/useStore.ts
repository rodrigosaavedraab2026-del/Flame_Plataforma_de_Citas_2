import { create } from 'zustand';

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
}

export interface Chat {
  id: number;
  profileId: number;
  name: string;
  avatar: string;
  messages: Message[];
  lastMessage: string;
  unread: number;
  isMatch: boolean;
}

export interface Notification {
  id: string;
  type: 'match' | 'like' | 'message' | 'boost';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
}

export type Screen = 'welcome' | 'auth' | 'onboarding' | 'swipe' | 'membership' | 'payment' | 'chat' | 'notifications' | 'profile';
export type MembershipTier = 'free' | 'plus' | 'gold' | 'platinum' | 'select';

interface AppState {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  currentProfileIndex: number;
  setCurrentProfileIndex: (index: number) => void;
  likedProfiles: number[];
  superLikedProfiles: number[];
  passedProfiles: number[];
  likeProfile: (id: number) => void;
  superLikeProfile: (id: number) => void;
  passProfile: (id: number) => void;
  membership: MembershipTier;
  setMembership: (tier: MembershipTier) => void;
  chats: Chat[];
  addChat: (chat: Chat) => void;
  sendMessage: (chatId: number, text: string) => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: () => number;
  selectedChatId: number | null;
  setSelectedChatId: (id: number | null) => void;
  boostsRemaining: number;
  superLikesRemaining: number;
  useBoost: () => void;
  useSuperLike: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  screen: 'welcome',
  setScreen: (screen) => set({ screen }),
  
  currentProfileIndex: 0,
  setCurrentProfileIndex: (index) => set({ currentProfileIndex: index }),
  
  likedProfiles: [],
  superLikedProfiles: [],
  passedProfiles: [],
  
  likeProfile: (id) => set((state) => ({ likedProfiles: [...state.likedProfiles, id] })),
  superLikeProfile: (id) => set((state) => ({ superLikedProfiles: [...state.superLikedProfiles, id] })),
  passProfile: (id) => set((state) => ({ passedProfiles: [...state.passedProfiles, id] })),
  
  membership: 'free',
  setMembership: (tier) => set({ membership: tier }),
  
  chats: [],
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  sendMessage: (chatId, text) => set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text,
          sender: 'me',
          timestamp: new Date(),
        };
        return { ...chat, messages: [...chat.messages, newMessage], lastMessage: text };
      }
      return chat;
    }),
  })),
  
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
  })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n),
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
  
  selectedChatId: null,
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  
  boostsRemaining: 1,
  superLikesRemaining: 5,
  useBoost: () => set((state) => ({ boostsRemaining: Math.max(0, state.boostsRemaining - 1) })),
  useSuperLike: () => set((state) => ({ superLikesRemaining: Math.max(0, state.superLikesRemaining - 1) })),
}));
