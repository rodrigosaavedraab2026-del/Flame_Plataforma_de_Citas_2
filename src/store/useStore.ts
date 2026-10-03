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

export type Screen = 'welcome' | 'auth' | 'profileSetup' | 'onboarding' | 'swipe' | 'membership' | 'payment' | 'chat' | 'chatDetail' | 'notifications' | 'profile' | 'consumables' | 'stories' | 'storyViewer' | 'events' | 'eventDetail' | 'iceBreaker' | 'aiMatching' | 'compatibility' | 'bffMode' | 'linkedinVerify' | 'analytics' | 'videoProfile' | 'settings' | 'editProfile' | 'likesReceived' | 'search' | 'helpCenter' | 'referral' | 'badges' | 'topPicks';
export type MembershipTier = 'free' | 'plus' | 'gold' | 'platinum' | 'select';
export type AppMode = 'dating' | 'bff' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  lookingFor: 'male' | 'female' | 'everyone';
  avatar?: string;
  verified: boolean;
  createdAt: Date;
}

interface AppState {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'verified' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
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
  // New features
  blockedUsers: number[];
  reportedUsers: { userId: number; reason: string; timestamp: Date }[];
  blockUser: (userId: number) => void;
  unblockUser: (userId: number) => void;
  reportUser: (userId: number, reason: string) => void;
  likesReceived: { profileId: number; timestamp: Date }[];
  addLikeReceived: (profileId: number) => void;
  clearLikesReceived: () => void;
  topPicks: number[];
  setTopPicks: (picks: number[]) => void;
  badges: { id: string; name: string; icon: string; earned: boolean; description: string }[];
  earnBadge: (id: string) => void;
  referralCode: string;
  referralCount: number;
  incrementReferral: () => void;
  profilePhotos: string[];
  addPhoto: (url: string) => void;
  removePhoto: (index: number) => void;
  searchFilters: {
    ageRange: [number, number];
    distance: number;
    interests: string[];
    verified: boolean;
  };
  setSearchFilters: (filters: Partial<AppState['searchFilters']>) => void;
  settings: {
    notifications: {
      matches: boolean;
      messages: boolean;
      likes: boolean;
      events: boolean;
    };
    privacy: {
      showDistance: boolean;
      showAge: boolean;
      incognitoMode: boolean;
    };
    preferences: {
      language: string;
      theme: 'dark' | 'light';
    };
  };
  updateSettings: (updates: Partial<AppState['settings']>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  screen: 'welcome',
  setScreen: (screen) => set({ screen }),
  
  // Auth
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // Simulated login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful login
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
          createdAt: new Date(),
        },
      });
      return true;
    }
    return false;
  },
  register: async (userData) => {
    // Simulated registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate successful registration
    if (userData.email && userData.password.length >= 6 && userData.name) {
      set({
        isAuthenticated: true,
        user: {
          id: 'user_' + Date.now(),
          email: userData.email,
          name: userData.name,
          age: userData.age,
          gender: userData.gender,
          lookingFor: userData.lookingFor,
          verified: false,
          createdAt: new Date(),
        },
      });
      return true;
    }
    return false;
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      screen: 'welcome',
    });
  },
  updateProfile: (updates) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    }));
  },
  
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

  // New features implementation
  blockedUsers: [],
  reportedUsers: [],
  blockUser: (userId) => set((state) => ({ blockedUsers: [...state.blockedUsers, userId] })),
  unblockUser: (userId) => set((state) => ({ blockedUsers: state.blockedUsers.filter(id => id !== userId) })),
  reportUser: (userId, reason) => set((state) => ({
    reportedUsers: [...state.reportedUsers, { userId, reason, timestamp: new Date() }]
  })),

  likesReceived: [
    { profileId: 2, timestamp: new Date(Date.now() - 3600000) },
    { profileId: 5, timestamp: new Date(Date.now() - 7200000) },
    { profileId: 7, timestamp: new Date(Date.now() - 10800000) },
  ],
  addLikeReceived: (profileId) => set((state) => ({
    likesReceived: [{ profileId, timestamp: new Date() }, ...state.likesReceived]
  })),
  clearLikesReceived: () => set({ likesReceived: [] }),

  topPicks: [1, 3, 5, 8],
  setTopPicks: (picks) => set({ topPicks: picks }),

  badges: [
    { id: 'first_match', name: 'Primer Match', icon: '💕', earned: true, description: 'Conseguiste tu primer match' },
    { id: 'social_butterfly', name: 'Mariposa Social', icon: '🦋', earned: true, description: '50 mensajes enviados' },
    { id: 'photographer', name: 'Fotógrafo', icon: '📸', earned: false, description: 'Sube 5 fotos a tu perfil' },
    { id: 'verified', name: 'Verificado', icon: '✓', earned: false, description: 'Verifica tu identidad' },
    { id: 'explorer', name: 'Explorador', icon: '🗺️', earned: false, description: 'Usa Pasaporte en 3 ciudades' },
    { id: 'champion', name: 'Campeón', icon: '🏆', earned: false, description: '100 matches conseguidos' },
  ],
  earnBadge: (id) => set((state) => ({
    badges: state.badges.map(b => b.id === id ? { ...b, earned: true } : b)
  })),

  referralCode: 'FLAMA2026',
  referralCount: 3,
  incrementReferral: () => set((state) => ({ referralCount: state.referralCount + 1 })),

  profilePhotos: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  ],
  addPhoto: (url) => set((state) => ({ profilePhotos: [...state.profilePhotos, url] })),
  removePhoto: (index) => set((state) => ({
    profilePhotos: state.profilePhotos.filter((_, i) => i !== index)
  })),

  searchFilters: {
    ageRange: [18, 40],
    distance: 25,
    interests: [],
    verified: false,
  },
  setSearchFilters: (filters) => set((state) => ({
    searchFilters: { ...state.searchFilters, ...filters }
  })),

  settings: {
    notifications: {
      matches: true,
      messages: true,
      likes: true,
      events: false,
    },
    privacy: {
      showDistance: true,
      showAge: true,
      incognitoMode: false,
    },
    preferences: {
      language: 'es',
      theme: 'dark',
    },
  },
  updateSettings: (updates) => set((state) => ({
    settings: { ...state.settings, ...updates }
  })),
}));
