import { motion } from 'framer-motion';
import { Shield, Crown, Zap, Star, Heart, Camera, Edit, Settings, Brain, TrendingUp, Calendar, Sparkles, Users, Video, Linkedin, BarChart3, Gamepad2, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';

const tierInfo: Record<string, { name: string; color: string; icon: any }> = {
  free: { name: 'Gratis', color: 'from-gray-500 to-gray-600', icon: Shield },
  plus: { name: 'Plus', color: 'from-blue-500 to-cyan-500', icon: Zap },
  gold: { name: 'Gold', color: 'from-yellow-500 to-amber-500', icon: Crown },
  platinum: { name: 'Platinum', color: 'from-purple-500 to-violet-500', icon: Star },
  select: { name: 'SELECT™', color: 'from-pink-500 to-rose-500', icon: Crown },
};

export default function Profile() {
  const { membership, setScreen, boostsRemaining, superLikesRemaining, likedProfiles, appMode, linkedinVerified } = useStore();
  const tier = tierInfo[membership];

  const features = [
    { icon: Zap, label: 'Consumibles', screen: 'consumables' as const, color: 'text-purple-400' },
    { icon: Sparkles, label: 'Historias', screen: 'stories' as const, color: 'text-orange-400' },
    { icon: Calendar, label: 'Eventos', screen: 'events' as const, color: 'text-green-400' },
    { icon: Gamepad2, label: 'Rompehielos', screen: 'iceBreaker' as const, color: 'text-yellow-400' },
    { icon: Brain, label: 'Match IA', screen: 'aiMatching' as const, color: 'text-indigo-400' },
    { icon: TrendingUp, label: 'Compatibilidad', screen: 'compatibility' as const, color: 'text-teal-400' },
    { icon: Video, label: 'Vídeos', screen: 'videoProfile' as const, color: 'text-pink-400' },
    { icon: Users, label: 'Modo App', screen: 'bffMode' as const, color: 'text-blue-400' },
    { icon: BarChart3, label: 'Analytics', screen: 'analytics' as const, color: 'text-cyan-400' },
    { icon: Linkedin, label: linkedinVerified ? '✓ LinkedIn' : 'LinkedIn', screen: 'linkedinVerify' as const, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mt-4"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-3 border-slate-900">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <button className="absolute -top-1 -right-1 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white mt-4">Alejandro, 28</h2>
          <div className={`flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-gradient-to-r ${tier.color}`}>
            <tier.icon className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-semibold">{tier.name}</span>
          </div>
          {appMode !== 'dating' && (
            <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">
              Modo: {appMode === 'bff' ? '🤝 BFF' : '💼 Business'}
            </div>
          )}
        </div>

        {/* Stats */}
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

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-4"
      >
        <h3 className="text-white font-semibold mb-3 text-sm">Funciones</h3>
        <div className="grid grid-cols-4 gap-2">
          {features.map((feature, index) => (
            <motion.button
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen(feature.screen)}
              className="flex flex-col items-center gap-1.5 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-white/70 text-[10px] text-center leading-tight">{feature.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Info section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mt-4"
      >
        <h3 className="text-white font-semibold mb-3">Sobre mí</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Apasionado por la tecnología y los viajes. Busco conexiones reales y conversaciones profundas. Amante del buen café y las puestas de sol. 🌅
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {['Tecnología', 'Viajes', 'Café', 'Fotografía', 'Música', 'Deportes'].map((interest) => (
            <span key={interest} className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80">
              {interest}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 mt-4"
      >
        <h3 className="text-white font-semibold mb-3">Detalles</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Signo zodiacal</span>
            <span className="text-white text-sm">♏ Escorpio</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Himno musical</span>
            <span className="text-white text-sm">🎵 Coldplay - Yellow</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Ubicación</span>
            <span className="text-white text-sm">Madrid, España</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50 text-sm">Idiomas</span>
            <span className="text-white text-sm">Español, Inglés</span>
          </div>
        </div>
      </motion.div>

      {/* Upgrade CTA */}
      {membership === 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-5 border border-pink-500/30 mt-4"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">Hazte Premium</h3>
              <p className="text-white/60 text-sm">Desbloquea todas las funciones</p>
            </div>
            <button
              onClick={() => setScreen('membership')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-full"
            >
              Ver planes
            </button>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 space-y-2"
      >
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
