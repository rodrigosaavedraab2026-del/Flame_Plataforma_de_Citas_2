import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Crown, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function LikesReceived() {
  const { setScreen, likesReceived, membership } = useStore();
  const isGoldOrHigher = membership === 'gold' || membership === 'platinum' || membership === 'select';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Likes Recibidos</h1>
          <p className="text-white/50 text-xs">{likesReceived.length} personas te dieron like</p>
        </div>
      </div>

      {!isGoldOrHigher ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Descubre quién te gustó</h2>
          <p className="text-white/60 mb-6 max-w-xs mx-auto">
            Actualiza a Gold o superior para ver todas las personas que te dieron like
          </p>
          <button
            onClick={() => setScreen('membership')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold rounded-full"
          >
            Ver planes
          </button>

          {/* Preview */}
          <div className="mt-8 grid grid-cols-3 gap-3 opacity-30 blur-sm">
            {likesReceived.slice(0, 6).map((like, i) => {
              const profile = profiles.find(p => p.id === like.profileId);
              return profile ? (
                <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src={profile.photos[0]} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null;
            })}
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {likesReceived.map((like, index) => {
            const profile = profiles.find(p => p.id === like.profileId);
            if (!profile) return null;
            
            return (
              <motion.div
                key={like.profileId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Like indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>

                {/* Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold">{profile.name}, {profile.age}</p>
                  <p className="text-white/60 text-xs">
                    {Math.floor((Date.now() - like.timestamp.getTime()) / 3600000)}h atrás
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
