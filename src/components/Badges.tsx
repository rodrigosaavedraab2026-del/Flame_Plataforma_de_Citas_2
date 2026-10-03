import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Badges() {
  const { setScreen, badges } = useStore();
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Logros</h1>
          <p className="text-white/50 text-xs">{earnedCount}/{badges.length} desbloqueados</p>
        </div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl p-5 border border-yellow-500/30 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1">Tu progreso</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(earnedCount / badges.length) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                />
              </div>
              <span className="text-white font-bold">{Math.round((earnedCount / badges.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Badges grid */}
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center text-center border ${
              badge.earned
                ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            {!badge.earned && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-white/40" />
              </div>
            )}
            <motion.div
              animate={badge.earned ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-4xl mb-2"
            >
              {badge.icon}
            </motion.div>
            <h3 className={`font-semibold text-sm mb-1 ${badge.earned ? 'text-white' : 'text-white/60'}`}>
              {badge.name}
            </h3>
            <p className="text-white/50 text-xs">{badge.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10 text-center"
      >
        <p className="text-white/60 text-sm">
          💡 Gana logros usando la app y desbloquea recompensas exclusivas
        </p>
      </motion.div>
    </div>
  );
}
