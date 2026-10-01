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
  videoUrl?: string;
  hasVideo?: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  type?: 'text' | 'voice' | 'image';
  voiceDuration?: number;
  voicePlaying?: boolean;
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
  type: 'match' | 'like' | 'message' | 'boost' | 'event' | 'story' | 'ai' | 'compatibility';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
}

export interface Story {
  id: string;
  profileId: number;
  name: string;
  avatar: string;
  content: string;
  type: 'photo' | 'video' | 'text';
  timestamp: Date;
  viewed: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  category: 'social' | 'dating' | 'networking' | 'fun';
  price: number;
  isVIP: boolean;
  registered: boolean;
}

export interface CompatibilityResult {
  profileId: number;
  name: string;
  avatar: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
    icon: string;
  }[];
  strengths: string[];
  suggestions: string[];
}

export type Screen = 'welcome' | 'onboarding' | 'swipe' | 'membership' | 'payment' | 'chat' | 'chatDetail' | 'notifications' | 'profile' | 'consumables' | 'stories' | 'storyViewer' | 'events' | 'eventDetail' | 'iceBreaker' | 'aiMatching' | 'compatibility' | 'bffMode' | 'linkedinVerify' | 'analytics' | 'videoProfile';
export type MembershipTier = 'free' | 'plus' | 'gold' | 'platinum' | 'select';
export type AppMode = 'dating' | 'bff' | 'business';

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
  sendMessage: (chatId: number, text: string, type?: 'text' | 'voice') => void;
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
  paymentSuccess: boolean;
  setPaymentSuccess: (val: boolean) => void;
  // Phase 2 & 3
  stories: Story[];
  addStory: (story: Story) => void;
  viewStory: (id: string) => void;
  currentStoryIndex: number;
  setCurrentStoryIndex: (index: number) => void;
  events: Event[];
  registerEvent: (id: string) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  compatibilityResults: CompatibilityResult[];
  setCompatibilityResults: (results: CompatibilityResult[]) => void;
  linkedinVerified: boolean;
  setLinkedinVerified: (val: boolean) => void;
  aiMatchPreferences: {
    lookingFor: string;
    ageRange: [number, number];
    distance: number;
    interests: string[];
  };
  setAiMatchPreferences: (prefs: Partial<AppState['aiMatchPreferences']>) => void;
  iceBreakerActive: boolean;
  setIceBreakerActive: (val: boolean) => void;
  iceBreakerScore: number;
  setIceBreakerScore: (score: number) => void;
  analyticsData: {
    totalLikes: number;
    totalMatches: number;
    totalMessages: number;
    responseRate: number;
    avgResponseTime: number;
    topInterests: string[];
    weeklyActivity: number[];
    matchRate: number;
  };
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
  sendMessage: (chatId, text, type = 'text') => set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          text,
          sender: 'me',
          timestamp: new Date(),
          type,
          voiceDuration: type === 'voice' ? Math.floor(Math.random() * 30) + 5 : undefined,
        };
        return { ...chat, messages: [...chat.messages, newMessage], lastMessage: type === 'voice' ? '🎤 Nota de voz' : text };
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
  
  paymentSuccess: false,
  setPaymentSuccess: (val) => set({ paymentSuccess: val }),

  // Phase 2 & 3
  stories: [
    { id: '1', profileId: 1, name: 'Valentina', avatar: 'https://image.qwenlm.ai/generated-images/785aca5c-2087-4dd6-97af-bd605a56ed66/_result.png', content: '¡Buen día desde la playa! 🏖️', type: 'text', timestamp: new Date(Date.now() - 3600000), viewed: false },
    { id: '2', profileId: 2, name: 'Camila', avatar: 'https://image.qwenlm.ai/generated-images/79333052-d163-4f53-a93e-13d3fc2e330b/_result.png', content: 'Nuevo set en el club 🎧', type: 'photo', timestamp: new Date(Date.now() - 7200000), viewed: false },
    { id: '3', profileId: 3, name: 'Sofía', avatar: 'https://image.qwenlm.ai/generated-images/311f7977-e596-409f-93c0-c052ee52237f/_result.png', content: 'Probando receta nueva 🍝', type: 'photo', timestamp: new Date(Date.now() - 10800000), viewed: true },
    { id: '4', profileId: 5, name: 'Mariana', avatar: 'https://image.qwenlm.ai/generated-images/586f70d3-2d2f-4d44-b3af-daca2caac393/_result.png', content: 'Atardecer mágico 📸', type: 'photo', timestamp: new Date(Date.now() - 14400000), viewed: false },
  ],
  addStory: (story) => set((state) => ({ stories: [story, ...state.stories] })),
  viewStory: (id) => set((state) => ({
    stories: state.stories.map((s) => s.id === id ? { ...s, viewed: true } : s),
  })),
  currentStoryIndex: 0,
  setCurrentStoryIndex: (index) => set({ currentStoryIndex: index }),

  events: [
    { id: '1', title: 'Speed Dating Madrid', description: 'Conoce 10 personas nuevas en una noche. Formato de citas rápidas de 5 minutos cada una.', date: new Date(Date.now() + 86400000 * 3), location: 'Rooftop Bar, Gran Vía', attendees: 18, maxAttendees: 24, image: '🥂', category: 'dating', price: 29.99, isVIP: false, registered: false },
    { id: '2', title: 'Noche de Tango', description: 'Clase de tango para parejas + milonga. No necesitas pareja, te asignamos un compañero.', date: new Date(Date.now() + 86400000 * 5), location: 'Sala Tango, Malasaña', attendees: 32, maxAttendees: 40, image: '💃', category: 'social', price: 19.99, isVIP: false, registered: false },
    { id: '3', title: 'VIP Wine & Dine', description: 'Cena exclusiva de 5 tiempos con maridaje de vinos premium. Solo 12 invitados.', date: new Date(Date.now() + 86400000 * 7), location: 'Restaurante Estrella Michelin', attendees: 8, maxAttendees: 12, image: '🍷', category: 'dating', price: 149.99, isVIP: true, registered: false },
    { id: '4', title: 'Networking Creativos', description: 'Conecta con diseñadores, fotógrafos y artistas. Ideal para hacer amigos y colaboradores.', date: new Date(Date.now() + 86400000 * 10), location: 'Co-working Space, Salamanca', attendees: 45, maxAttendees: 60, image: '🎨', category: 'networking', price: 0, isVIP: false, registered: false },
    { id: '5', title: 'Escape Room para Solteros', description: 'Resuelve misterios en equipo. La química surge cuando trabajas juntos bajo presión.', date: new Date(Date.now() + 86400000 * 4), location: 'Escape City, Chamberí', attendees: 12, maxAttendees: 16, image: '🔐', category: 'fun', price: 24.99, isVIP: false, registered: false },
  ],
  registerEvent: (id) => set((state) => ({
    events: state.events.map((e) => e.id === id ? { ...e, registered: !e.registered, attendees: e.registered ? e.attendees - 1 : e.attendees + 1 } : e),
  })),
  selectedEventId: null,
  setSelectedEventId: (id) => set({ selectedEventId: id }),

  appMode: 'dating',
  setAppMode: (mode) => set({ appMode: mode }),

  compatibilityResults: [],
  setCompatibilityResults: (results) => set({ compatibilityResults: results }),

  linkedinVerified: false,
  setLinkedinVerified: (val) => set({ linkedinVerified: val }),

  aiMatchPreferences: {
    lookingFor: 'relación seria',
    ageRange: [22, 32],
    distance: 15,
    interests: ['viajes', 'música', 'arte'],
  },
  setAiMatchPreferences: (prefs) => set((state) => ({
    aiMatchPreferences: { ...state.aiMatchPreferences, ...prefs },
  })),

  iceBreakerActive: false,
  setIceBreakerActive: (val) => set({ iceBreakerActive: val }),
  iceBreakerScore: 0,
  setIceBreakerScore: (score) => set({ iceBreakerScore: score }),

  analyticsData: {
    totalLikes: 127,
    totalMatches: 23,
    totalMessages: 89,
    responseRate: 78,
    avgResponseTime: 12,
    topInterests: ['Viajes', 'Música', 'Fotografía', 'Cocina', 'Deportes'],
    weeklyActivity: [12, 18, 8, 22, 15, 28, 20],
    matchRate: 18,
  },
}));
