import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, MapPin, Shield, RotateCcw, Zap, Camera, Plus, CheckCircle, ArrowLeft, MessageCircle, Bell, User, Flame, Crown, Sparkles, Calendar, Brain, TrendingUp, Video, Users, Lock, Send, Smile, Image, Mic, Square, Play, Pause, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

// ============ PROFILE SETUP ============
export function ProfileSetup() {
  const { setScreen, addToast } = useStore();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const allInterests = ['Viajes', 'Música', 'Cine', 'Deportes', 'Cocina', 'Lectura', 'Fotografía', 'Arte', 'Tecnología', 'Yoga'];

  const addPhoto = () => {
    if (photos.length < 6) {
      const fakeUrls = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      ];
      setPhotos([...photos, fakeUrls[photos.length % fakeUrls.length]]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      addToast({ type: 'success', message: '¡Perfil creado exitosamente!' });
      setScreen('swipe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: step >= s ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Agrega tus fotos</h2>
            <p className="text-white/60">Muestra tu mejor lado (máximo 6 fotos)</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <motion.div key={index} initial={{ scale: 0 }} animate={{ scale: 1 }} className="aspect-square rounded-xl overflow-hidden relative">
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
            {photos.length < 6 && (
              <button onClick={addPhoto} className="aspect-square rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-2 hover:border-pink-500/50 transition-colors">
                <Plus className="w-8 h-8 text-white/50" />
                <span className="text-white/50 text-xs">Agregar</span>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Sobre ti</h2>
            <p className="text-white/60">Cuéntanos qué te hace especial</p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Escribe algo interesante sobre ti..."
            maxLength={500}
            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 min-h-[200px] resize-none"
          />
          <p className="text-white/40 text-sm text-right">{bio.length}/500</p>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Tus intereses</h2>
            <p className="text-white/60">Selecciona hasta 5 ({interests.length}/5)</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <motion.button
                key={interest}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (interests.includes(interest)) {
                    setInterests(interests.filter(i => i !== interest));
                  } else if (interests.length < 5) {
                    setInterests([...interests, interest]);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  interests.includes(interest)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20">
            Atrás
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-xl shadow-pink-500/20"
        >
          {step === 3 ? 'Completar perfil' : 'Siguiente'}
        </motion.button>
      </div>
    </div>
  );
}

// ============ SWIPE SCREEN ============
export function SwipeScreen() {
  const { likedProfiles, passedProfiles, likeProfile, passProfile, superLikeProfile, superLikesRemaining, addNotification, addChat, setScreen, useSuperLike } = useStore();
  const [showMatch, setShowMatch] = useState(false);
  const [matchProfile, setMatchProfile] = useState<typeof profiles[0] | null>(null);

  const availableProfiles = profiles.filter((p) => !likedProfiles.includes(p.id) && !passedProfiles.includes(p.id));
  const currentProfile = availableProfiles[0] || null;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!currentProfile) return;
    if (info.offset.x > 100) handleLike();
    else if (info.offset.x < -100) handlePass();
  };

  const handleLike = () => {
    if (!currentProfile) return;
    likeProfile(currentProfile.id);
    if (Math.random() > 0.7) {
      setMatchProfile(currentProfile);
      setShowMatch(true);
      addNotification({
        id: Date.now().toString(),
        type: 'match',
        title: '¡Es un Match!',
        description: `Tú y ${currentProfile.name} se gustaron mutuamente`,
        timestamp: new Date(),
        read: false,
        avatar: currentProfile.photos[0],
      });
      addChat({
        id: Date.now(),
        profileId: currentProfile.id,
        name: currentProfile.name,
        avatar: currentProfile.photos[0],
        messages: [],
        lastMessage: '¡Nuevo match! Saluda 👋',
        unread: 0,
      });
    }
  };

  const handleSuperLike = () => {
    if (!currentProfile || superLikesRemaining <= 0) return;
    useSuperLike();
    superLikeProfile(currentProfile.id);
    setMatchProfile(currentProfile);
    setShowMatch(true);
  };

  const handlePass = () => {
    if (!currentProfile) return;
    passProfile(currentProfile.id);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-2xl font-bold text-white mb-3">¡Has visto a todos!</h2>
          <button
            onClick={() => useStore.setState({ likedProfiles: [], passedProfiles: [] })}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
          >
            Reiniciar perfiles
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col relative overflow-hidden">
      {showMatch && matchProfile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="text-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-6xl mb-4">💕</motion.div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">¡Es un Match!</h2>
            <p className="text-white/70 mb-8">Tú y {matchProfile.name} se gustaron mutuamente</p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowMatch(false)} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20">Seguir deslizando</button>
              <button onClick={() => { setShowMatch(false); setScreen('chat'); }} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">Enviar mensaje</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-3 px-4 pt-3">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setScreen('stories')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-white/70 text-xs">Historias</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setScreen('aiMatching')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/10">
          <Brain className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-white/70 text-xs">Match IA</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setScreen('events')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-green-400" />
          <span className="text-white/70 text-xs">Eventos</span>
        </motion.button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
        >
          <img src={currentProfile.photos[0]} alt={currentProfile.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-6 border-4 border-green-400 rounded-xl px-4 py-2 rotate-[-15deg]">
            <span className="text-green-400 text-3xl font-bold">LIKE</span>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-6 border-4 border-red-400 rounded-xl px-4 py-2 rotate-[15deg]">
            <span className="text-red-400 text-3xl font-bold">NOPE</span>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-bold text-white">{currentProfile.name}</h2>
              <span className="text-2xl text-white/80">{currentProfile.age}</span>
              {currentProfile.verified && <Shield className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex items-center gap-1 text-white/70 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{currentProfile.distance}</span>
              <span className="mx-1">•</span>
              <span>{currentProfile.zodiac}</span>
            </div>
            <p className="text-white/80 text-sm mb-3 line-clamp-2">{currentProfile.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {currentProfile.interests.slice(0, 4).map((interest) => (
                <span key={interest} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">{interest}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-6 px-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handlePass} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <X className="w-7 h-7 text-red-400" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-yellow-400" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleSuperLike} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative">
          <Star className="w-7 h-7 text-blue-400" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">{superLikesRemaining}</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleLike} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Heart className="w-7 h-7 text-green-400" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-purple-400" />
        </motion.button>
      </div>
    </div>
  );
}

// ============ NAVIGATION ============
export function Navigation() {
  const { screen, setScreen, notifications } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { icon: Flame, screen: 'swipe' as const, label: 'Descubrir' },
    { icon: Crown, screen: 'membership' as const, label: 'Premium' },
    { icon: MessageCircle, screen: 'chat' as const, label: 'Chat' },
    { icon: Bell, screen: 'notifications' as const, label: 'Alertas' },
    { icon: User, screen: 'profile' as const, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = screen === item.screen;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.screen}
                whileTap={{ scale: 0.9 }}
                onClick={() => setScreen(item.screen)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-pink-400' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-pink-500/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.screen === 'notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-pink-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ TOAST ============
export function Toast() {
  const { toasts, removeToast } = useStore();

  const icons = {
    success: CheckCircle,
    error: X,
    info: Bell,
    warning: Sparkles,
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-amber-500',
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-2 max-w-md w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`bg-gradient-to-r ${colors[toast.type]} rounded-xl p-4 shadow-2xl flex items-center gap-3`}
            >
              <Icon className="w-5 h-5 text-white flex-shrink-0" />
              <p className="text-white text-sm font-medium flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ============ CHAT ============
export function ChatScreen() {
  const { chats, selectedChatId, setSelectedChatId, setScreen, sendMessage } = useStore();
  const [inputText, setInputText] = useState('');

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChatId) return;
    sendMessage(selectedChatId, inputText.trim(), 'text');
    setInputText('');
    setTimeout(() => {
      const replies = ['¡Hola! 😊', '¡Qué lindo perfil tienes!', '¿Qué planes tienes para hoy?', '¡Jaja! Eso es genial 😄'];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      useStore.setState((state) => ({
        chats: state.chats.map((chat) => {
          if (chat.id === selectedChatId) {
            return {
              ...chat,
              messages: [...chat.messages, { id: Date.now().toString(), text: reply, sender: 'them' as const, timestamp: new Date(), type: 'text' as const }],
              lastMessage: reply,
            };
          }
          return chat;
        }),
      }));
    }, 1500);
  };

  if (selectedChatId && selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <button onClick={() => setSelectedChatId(null)} className="text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{selectedChat.name}</h3>
            <p className="text-green-400 text-xs">En línea</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedChat.messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-white/60 text-sm">¡Envía el primer mensaje!</p>
            </div>
          )}
          <AnimatePresence>
            {selectedChat.messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${msg.sender === 'me' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-white/40'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button className="text-white/40 hover:text-white/60 transition-colors">
              <Image className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white/60 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink-500/50"
            />
            {inputText.trim() ? (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={handleSend} className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            ) : (
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <h1 className="text-2xl font-bold text-white mb-6 pt-4">Mensajes</h1>
      {chats.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-white font-semibold mb-2">Sin mensajes aún</h3>
          <p className="text-white/50 text-sm mb-6">Haz match con alguien para empezar a chatear</p>
          <button onClick={() => setScreen('swipe')} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">
            Empezar a deslizar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat, index) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedChatId(chat.id)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold">{chat.name}</h3>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-pink-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">{chat.unread}</span>
                  )}
                </div>
                <p className="text-white/50 text-sm truncate">{chat.lastMessage}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ NOTIFICATIONS ============
export function NotificationsScreen() {
  const { notifications, markAsRead, markAllAsRead, setScreen } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <div className="flex items-center justify-between pt-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="flex items-center gap-1.5 text-pink-400 text-sm hover:text-pink-300 transition-colors">
            <CheckCircle className="w-4 h-4" />
            Marcar todas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔔</div>
          <h3 className="text-white font-semibold mb-2">Sin notificaciones</h3>
          <p className="text-white/50 text-sm mb-6">Cuando recibas likes o matches, aparecerán aquí</p>
          <button onClick={() => setScreen('swipe')} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">
            Empezar a deslizar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => markAsRead(notification.id)}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                notification.read ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0`}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-sm ${notification.read ? 'text-white/70' : 'text-white'}`}>{notification.title}</h3>
                  {!notification.read && <div className="w-2 h-2 bg-pink-500 rounded-full" />}
                </div>
                <p className="text-white/50 text-sm truncate">{notification.description}</p>
              </div>
              {notification.avatar && (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={notification.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ PROFILE ============
export function ProfileScreen() {
  const { setScreen, boostsRemaining, superLikesRemaining, likedProfiles, user, logout } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mt-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-4xl">👤</div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-3 border-slate-900">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">{user?.name || 'Alejandro'}, {user?.age || 28}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <p className="text-2xl font-bold text-white">{boostsRemaining}</p>
            <p className="text-white/50 text-xs">Boosts</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <p className="text-2xl font-bold text-white">{superLikesRemaining}</p>
            <p className="text-white/50 text-xs">Super Likes</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-xl">
            <p className="text-2xl font-bold text-white">{likedProfiles.length}</p>
            <p className="text-white/50 text-xs">Likes</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 space-y-2">
        <button onClick={() => setScreen('consumables')} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="text-white text-sm font-medium">Comprar consumibles</span>
        </button>
        <button onClick={logout} className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors">
          <X className="w-5 h-5 text-red-400" />
          <span className="text-red-400 text-sm font-medium">Cerrar sesión</span>
        </button>
      </motion.div>
    </div>
  );
}

// ============ MEMBERSHIP ============
export function MembershipScreen() {
  const { setScreen, setMembership } = useStore();

  const plans = [
    { id: 'plus' as const, name: 'Plus', price: 14.99, color: 'from-blue-500 to-cyan-500', icon: Zap },
    { id: 'gold' as const, name: 'Gold', price: 29.99, color: 'from-yellow-500 to-amber-500', icon: Crown, popular: true },
    { id: 'platinum' as const, name: 'Platinum', price: 49.99, color: 'from-purple-500 to-violet-500', icon: Star },
    { id: 'select' as const, name: 'SELECT™', price: 99.99, color: 'from-pink-500 to-rose-500', icon: Sparkles, exclusive: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Elige tu plan</h1>
        <p className="text-white/60">Desbloquea funciones premium</p>
      </motion.div>

      <div className="space-y-4 max-w-lg mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl overflow-hidden border ${plan.popular ? 'border-yellow-500/50' : 'border-white/10'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                MÁS POPULAR
              </div>
            )}
            <div className="bg-white/5 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                    <p className="text-white/50 text-sm">${plan.price.toFixed(2)}<span className="text-white/30">/mes</span></p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMembership(plan.id);
                    setScreen('payment');
                  }}
                  className={`px-5 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-semibold text-sm shadow-lg`}
                >
                  Elegir
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============ PAYMENT ============
export function PaymentScreen() {
  const { membership, setScreen, setPaymentSuccess } = useStore();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setPaymentSuccess(true);
      setTimeout(() => setScreen('swipe'), 2500);
    }, 2000);
  };

  const prices: Record<string, number> = { plus: 14.99, gold: 29.99, platinum: 49.99, select: 99.99 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <button onClick={() => setScreen('membership')} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      {!success ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Pago seguro</h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Membresía {membership}</p>
                <p className="text-white/50 text-sm">Facturación mensual</p>
              </div>
              <p className="text-2xl font-bold text-white">${prices[membership]?.toFixed(2)}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={processing}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-pink-500/20 disabled:opacity-50"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                Procesando...
              </span>
            ) : (
              `Pagar $${prices[membership]?.toFixed(2)}`
            )}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Pago exitoso!</h2>
          <p className="text-white/60">Tu membresía está activa</p>
        </motion.div>
      )}
    </div>
  );
}

// ============ CONSUMABLES ============
export function ConsumablesScreen() {
  const { setScreen, addToast } = useStore();

  const consumables = [
    { id: 'boost', name: 'Boost', price: 4.99, emoji: '⚡', description: '30 minutos de visibilidad máxima' },
    { id: 'super-boost', name: 'Super Boost', price: 9.99, emoji: '🚀', description: '100x más vistas por 30 minutos' },
    { id: 'super-like', name: 'Super Like', price: 1.99, emoji: '⭐', description: 'Destaca 3x más que un like normal' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <button onClick={() => setScreen('profile')} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 pt-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Consumibles</h1>
        <p className="text-white/60">Potencia tu experiencia</p>
      </motion.div>

      <div className="space-y-4 max-w-lg mx-auto">
        {consumables.map((item, index) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{item.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{item.name}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold text-lg">${item.price.toFixed(2)}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToast({ type: 'success', message: `¡${item.name} activado!` })}
                  className="mt-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold"
                >
                  Comprar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============ PLACEHOLDER SCREENS ============
export function StoriesScreen() {
  const { setScreen } = useStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <button onClick={() => setScreen('swipe')} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 pt-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>
      <h1 className="text-2xl font-bold text-white mb-6">Historias</h1>
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📸</div>
        <h3 className="text-white font-semibold mb-2">Historias</h3>
        <p className="text-white/50 text-sm">Comparte momentos con tus matches</p>
      </div>
    </div>
  );
}

export function EventsScreen() {
  const { setScreen } = useStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <button onClick={() => setScreen('swipe')} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 pt-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>
      <h1 className="text-2xl font-bold text-white mb-6">Eventos</h1>
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white font-semibold mb-2">Eventos</h3>
        <p className="text-white/50 text-sm">Conoce personas en persona</p>
      </div>
    </div>
  );
}

export function AIMatchingScreen() {
  const { setScreen } = useStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <button onClick={() => setScreen('swipe')} className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 pt-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>
      <div className="text-center py-20">
        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-xl font-bold text-white mb-2">Match con IA</h2>
        <p className="text-white/60 text-sm">Inteligencia artificial para encontrar tu match perfecto</p>
      </div>
    </div>
  );
}
