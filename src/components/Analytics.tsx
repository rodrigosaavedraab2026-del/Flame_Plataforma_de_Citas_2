import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Heart, MessageCircle, Users, Clock, BarChart3, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Analytics() {
  const { setScreen, analyticsData } = useStore();
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const maxActivity = Math.max(...analyticsData.weeklyActivity);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Analytics</h1>
          <p className="text-white/50 text-xs">Tu rendimiento en Flama</p>
        </div>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-white/50 text-xs">Total Likes</span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.totalLikes}</p>
          <p className="text-green-400 text-xs mt-1">+12% esta semana</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-white/50 text-xs">Matches</span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.totalMatches}</p>
          <p className="text-green-400 text-xs mt-1">+3 esta semana</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-400" />
            <span className="text-white/50 text-xs">Mensajes</span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.totalMessages}</p>
          <p className="text-green-400 text-xs mt-1">+8 hoy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-white/50 text-xs">Tasa Match</span>
          </div>
          <p className="text-2xl font-bold text-white">{analyticsData.matchRate}%</p>
          <p className="text-green-400 text-xs mt-1">Promedio: 15%</p>
        </motion.div>
      </div>

      {/* Weekly activity chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">Actividad Semanal</h3>
          <BarChart3 className="w-4 h-4 text-white/40" />
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {analyticsData.weeklyActivity.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(value / maxActivity) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                className="w-full bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg min-h-[4px]"
              />
              <span className="text-white/40 text-[10px]">{days[i]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Response metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-4"
      >
        <h3 className="text-white font-semibold text-sm mb-4">Métricas de Respuesta</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-white/60 text-sm">Tasa de respuesta</span>
              <span className="text-white font-bold text-sm">{analyticsData.responseRate}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${analyticsData.responseRate}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-white/60 text-sm">Tiempo medio de respuesta</span>
              <span className="text-white font-bold text-sm">{analyticsData.avgResponseTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white/50 text-xs">Excelente - respondes más rápido que el 85% de usuarios</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top interests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-4"
      >
        <h3 className="text-white font-semibold text-sm mb-3">Tus Intereses Top</h3>
        <div className="flex flex-wrap gap-2">
          {analyticsData.topInterests.map((interest, i) => (
            <motion.span
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="px-3 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-xs text-white/80"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-pink-500/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-400" />
          <h3 className="text-white font-semibold text-sm">Insight de la semana</h3>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">
          Tu perfil tiene un <strong className="text-white">40% más de matches</strong> los fines de semana. 
          Considera usar un Boost los sábados por la noche para maximizar tu visibilidad.
        </p>
      </motion.div>
    </div>
  );
}
