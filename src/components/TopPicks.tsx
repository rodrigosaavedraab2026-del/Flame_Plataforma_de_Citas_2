import { motion } from 'framer-motion';
import { Star, Crown, ArrowLeft, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function TopPicks() {
  const { topPicks, setScreen, membership, addToast, likeProfile } = useStore();

  const isGoldOrHigher = membership === 'gold' || membership === 'platinum' || membership === 'select';

  const handleLike = (profileId: number) => {
    likeProfile(profileId);
    addToast({ type: 'success', message: '¡Like enviado!' });
  };

  const topPickProfiles = profiles.filter(p => topPicks.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Top Picks del Día</h1>
          <p className="text-white/50 text-xs">Selecciones curadas para ti</p>
        </div>
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-4 border border-yellow-500/30 mb-6"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm">Selecciones Diarias</h3>
            <p className="text-white/60 text-xs">Perfiles altamente compatibles seleccionados por nuestra IA</p>
          </div>
        </div>
      </motion.div>

      {/* Top picks grid */}
      <div className="space-y-4">
        {topPickProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="flex">
              {/* Photo */}
              <div className="w-32 h-40 relative flex-shrink-0">
                <img
                  src={profile.photos[0]}
                  alt={profile.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 text-xs font-bold">Top Pick</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{profile.name}</h3>
                    <span className="text-white/60">{profile.age}</span>
                  </div>
                  <p className="text-white/60 text-sm line-clamp-2 mb-2">{profile.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.slice(0, 2).map((interest) => (
                      <span key={interest} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/60">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Like button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLike(profile.id)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-full flex items-center gap-2 self-start"
                >
                  <Star className="w-4 h-4" />
                  Dar Like
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!isGoldOrHigher && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/50 text-sm mb-3">¿Quieres más Top Picks?</p>
          <button
            onClick={() => setScreen('membership')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-full"
          >
            Actualizar a Gold+
          </button>
        </motion.div>
      )}
    </div>
  );
}
