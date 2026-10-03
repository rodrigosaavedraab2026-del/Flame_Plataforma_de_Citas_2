import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function TopPicks() {
  const { setScreen, topPicks, membership } = useStore();
  const isGoldOrHigher = membership === 'gold' || membership === 'platinum' || membership === 'select';
  const topPickProfiles = topPicks.map(id => profiles.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Top Picks del Día</h1>
          <p className="text-white/50 text-xs">Selecciones especiales para ti</p>
        </div>
      </div>

      {/* Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-4 border border-yellow-500/30 mb-6 flex items-center gap-3"
      >
        <Clock className="w-5 h-5 text-yellow-400" />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Nuevas selecciones en</p>
          <p className="text-yellow-400 font-bold">12h 34m</p>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-400" />
      </motion.div>

      {/* Top picks */}
      <div className="space-y-4">
        {topPickProfiles.map((profile, index) => {
          if (!profile) return null;
          
          return (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex"
            >
              {/* Photo */}
              <div className="w-32 h-40 relative flex-shrink-0">
                <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-white text-[10px] font-bold">#{index + 1}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold">{profile.name}</h3>
                  <span className="text-white/60">{profile.age}</span>
                </div>
                <p className="text-white/50 text-xs mb-2 line-clamp-2">{profile.bio}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {profile.interests.slice(0, 2).map(interest => (
                    <span key={interest} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/60">
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">95% match</span>
                  </div>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="text-white/50 text-xs">{profile.distance}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade prompt */}
      {!isGoldOrHigher && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-pink-500/20 text-center"
        >
          <h3 className="text-white font-semibold mb-2">¿Quieres más selecciones?</h3>
          <p className="text-white/60 text-sm mb-4">
            Actualiza a Gold para ver Top Picks ilimitados
          </p>
          <button
            onClick={() => setScreen('membership')}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full text-sm"
          >
            Ver planes
          </button>
        </motion.div>
      )}
    </div>
  );
}
