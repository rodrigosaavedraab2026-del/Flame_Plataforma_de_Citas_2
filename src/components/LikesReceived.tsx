import { motion } from 'framer-motion';
import { Heart, Crown, ArrowLeft, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function LikesReceived() {
  const { likesReceived, setScreen, membership, addToast } = useStore();

  const isGoldOrHigher = membership === 'gold' || membership === 'platinum' || membership === 'select';

  const handleReveal = (profileId: number) => {
    if (!isGoldOrHigher) {
      addToast({ type: 'info', message: 'Actualiza a Gold+ para ver quién te gustó' });
      setScreen('membership');
      return;
    }
    addToast({ type: 'success', message: '¡Like revelado!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Likes Recibidos</h1>
          <p className="text-white/50 text-xs">{likesReceived.length} personas te dieron like</p>
        </div>
      </div>

      {/* Upgrade banner */}
      {!isGoldOrHigher && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-4 border border-yellow-500/30 mb-6"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Desbloquea Likes Recibidos</h3>
              <p className="text-white/60 text-xs">Actualiza a Gold+ para ver quién te gustó</p>
            </div>
            <button
              onClick={() => setScreen('membership')}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold rounded-full"
            >
              Actualizar
            </button>
          </div>
        </motion.div>
      )}

      {/* Likes grid */}
      <div className="grid grid-cols-2 gap-3">
        {likesReceived.map((like, index) => {
          const profile = profiles.find(p => p.id === like.profileId);
          const isBlurred = !isGoldOrHigher;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReveal(like.profileId)}
              className="aspect-[3/4] rounded-2xl overflow-hidden relative border border-white/10"
            >
              {profile && (
                <>
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className={`absolute inset-0 w-full h-full object-cover ${isBlurred ? 'blur-xl' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {isBlurred && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Lock className="w-8 h-8 text-white/60" />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    {!isBlurred && (
                      <>
                        <p className="text-white font-semibold text-sm">{profile.name}, {profile.age}</p>
                        <p className="text-white/60 text-xs truncate">{profile.bio}</p>
                      </>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                      <span className="text-white/50 text-xs">
                        {Math.floor((Date.now() - new Date(like.timestamp).getTime()) / 3600000)}h
                      </span>
                    </div>
                  </div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {likesReceived.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💝</div>
          <h3 className="text-white font-semibold mb-2">Sin likes aún</h3>
          <p className="text-white/50 text-sm">Sigue deslizando para recibir likes</p>
        </div>
      )}
    </div>
  );
}
