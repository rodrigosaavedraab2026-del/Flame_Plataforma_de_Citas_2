import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, Star, MapPin, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function SwipeScreen() {
  const { likeProfile, passProfile, likedProfiles, passedProfiles, addNotification, addChat } = useStore();
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
        description: `Tú y ${currentProfile.name} se gustaron`,
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
        lastMessage: '¡Nuevo match! 👋',
        unread: 0,
        isMatch: true,
      });
    }
  };

  const handlePass = () => {
    if (!currentProfile) return;
    passProfile(currentProfile.id);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-2xl font-bold text-white mb-3">¡Has visto a todos!</h2>
          <button
            onClick={() => useStore.setState({ likedProfiles: [], passedProfiles: [] })}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
          >
            Reiniciar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {showMatch && matchProfile && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="text-center">
            <div className="text-6xl mb-4">💕</div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">¡Es un Match!</h2>
            <p className="text-white/70 mb-8">Tú y {matchProfile.name} se gustaron</p>
            <button onClick={() => setShowMatch(false)} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">
              Seguir
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl cursor-grab"
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
            </div>
            <p className="text-white/80 text-sm mb-3">{currentProfile.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {currentProfile.interests.map((interest) => (
                <span key={interest} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">{interest}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-4 pb-6">
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePass} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <X className="w-7 h-7 text-red-400" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={handleLike} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Heart className="w-7 h-7 text-green-400" />
        </motion.button>
      </div>
    </div>
  );
}
