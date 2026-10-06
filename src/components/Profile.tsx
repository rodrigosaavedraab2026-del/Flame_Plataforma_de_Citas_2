import { motion } from 'framer-motion';
import { Shield, Crown, Zap, Edit, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

const tierInfo: Record<string, { name: string; color: string; icon: any }> = {
  free: { name: 'Gratis', color: 'from-gray-500 to-gray-600', icon: Shield },
  plus: { name: 'Plus', color: 'from-blue-500 to-cyan-500', icon: Zap },
  gold: { name: 'Gold', color: 'from-yellow-500 to-amber-500', icon: Crown },
  platinum: { name: 'Platinum', color: 'from-purple-500 to-violet-500', icon: Crown },
  select: { name: 'SELECT™', color: 'from-pink-500 to-rose-500', icon: Crown },
};

export default function Profile() {
  const { membership, setScreen, boostsRemaining, superLikesRemaining, likedProfiles } = useStore();
  const tier = tierInfo[membership];

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
          <h2 className="text-2xl font-bold text-white mt-4">Alejandro, 28</h2>
          <div className={`flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-gradient-to-r ${tier.color}`}>
            <tier.icon className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold">{tier.name}</span>
          </div>
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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mt-4">
        <h3 className="text-white font-semibold mb-3">Sobre mí</h3>
        <p className="text-white/70 text-sm leading-relaxed">Apasionado por la tecnología y los viajes 🌅</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Tecnología', 'Viajes', 'Café', 'Fotografía'].map((interest) => (
            <span key={interest} className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80">{interest}</span>
          ))}
        </div>
      </motion.div>

      {membership === 'free' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-5 border border-pink-500/30 mt-4">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">Hazte Premium</h3>
              <p className="text-white/60 text-sm">Desbloquea todo</p>
            </div>
            <button onClick={() => setScreen('membership')} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-full">
              Ver planes
            </button>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Edit className="w-5 h-5 text-blue-400" />
          <span className="text-white text-sm font-medium">Editar perfil</span>
        </button>
        <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="text-white text-sm font-medium">Configuración</span>
        </button>
      </motion.div>
    </div>
  );
}
