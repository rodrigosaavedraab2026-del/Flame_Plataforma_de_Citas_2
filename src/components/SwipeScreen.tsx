import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, Star, MapPin, Shield, RotateCcw, Zap, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function SwipeScreen() {
  const { currentProfileIndex, setCurrentProfileIndex, likeProfile, superLikeProfile, passProfile, likedProfiles, passedProfiles, superLikesRemaining, boostsRemaining, addNotification, addChat } = useStore();
  const [showMatch, setShowMatch] = useState(false);
  const [matchProfile, setMatchProfile] = useState<typeof profiles[0] | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const availableProfiles = profiles.filter(
    (p) => !likedProfiles.includes(p.id) && !passedProfiles.includes(p.id)
  );

  const currentProfile = availableProfiles[0] || null;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!currentProfile) return;
    
    if (info.offset.x > 100) {
      handleLike();
    } else if (info.offset.x < -100) {
      handlePass();
    }
  };

  const handleLike = () => {
    if (!currentProfile) return;
    likeProfile(currentProfile.id);
    
    // Random match (30% chance)
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
        isMatch: true,
      });
    } else {
      addNotification({
        id: Date.now().toString(),
        type: 'like',
        title: 'Like enviado',
        description: `Le enviaste un like a ${currentProfile.name}`,
        timestamp: new Date(),
        read: false,
      });
    }
  };

  const handleSuperLike = () => {
    if (!currentProfile || superLikesRemaining <= 0) return;
    useStore.getState().useSuperLike();
    superLikeProfile(currentProfile.id);
    setMatchProfile(currentProfile);
    setShowMatch(true);
    addNotification({
      id: Date.now().toString(),
      type: 'match',
      title: '¡Super Like!',
      description: `¡${currentProfile.name} también te dio Super Like!`,
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
      lastMessage: '¡Super Match! 💫',
      unread: 0,
      isMatch: true,
    });
  };

  const handlePass = () => {
    if (!currentProfile) return;
    passProfile(currentProfile.id);
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-2xl font-bold text-white mb-3">¡Has visto a todos!</h2>
          <p className="text-white/60 mb-6">Vuelve más tarde para descubrir nuevos perfiles</p>
          <button
            onClick={() => {
              useStore.setState({ likedProfiles: [], passedProfiles: [] });
            }}
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
      {/* Match overlay */}
      {showMatch && matchProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              💕
            </motion.div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              ¡Es un Match!
            </h2>
            <p className="text-white/70 mb-8">
              Tú y {matchProfile.name} se gustaron mutuamente
            </p>
            <div className="flex gap-4 justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500">
                <img src={matchProfile.photos[0]} alt={matchProfile.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowMatch(false)}
                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20"
              >
                Seguir deslizando
              </button>
              <button
                onClick={() => setShowMatch(false)}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
              >
                Enviar mensaje
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          ref={cardRef}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
        >
          {/* Photo */}
          <img
            src={currentProfile.photos[0]}
            alt={currentProfile.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* LIKE stamp */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-6 border-4 border-green-400 rounded-xl px-4 py-2 rotate-[-15deg]"
          >
            <span className="text-green-400 text-3xl font-bold">LIKE</span>
          </motion.div>

          {/* NOPE stamp */}
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-6 border-4 border-red-400 rounded-xl px-4 py-2 rotate-[15deg]"
          >
            <span className="text-red-400 text-3xl font-bold">NOPE</span>
          </motion.div>

          {/* Profile info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-bold text-white">{currentProfile.name}</h2>
              <span className="text-2xl text-white/80">{currentProfile.age}</span>
              {currentProfile.verified && (
                <Shield className="w-5 h-5 text-blue-400" />
              )}
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
                <span
                  key={interest}
                  className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4 pb-6 px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePass}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <X className="w-7 h-7 text-red-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 text-yellow-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSuperLike}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative"
        >
          <Star className="w-7 h-7 text-blue-400" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
            {superLikesRemaining}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Heart className="w-7 h-7 text-green-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center relative"
        >
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
            {boostsRemaining}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
