import { motion } from 'framer-motion';
import { Heart, MessageCircle, Star, Zap, Bell, CheckCheck, Calendar, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

const iconMap: Record<string, any> = {
  match: Heart,
  like: Star,
  message: MessageCircle,
  boost: Zap,
  event: Calendar,
  story: Sparkles,
  ai: Brain,
  compatibility: TrendingUp,
};

const colorMap: Record<string, string> = {
  match: 'from-pink-500 to-rose-500',
  like: 'from-yellow-500 to-amber-500',
  message: 'from-blue-500 to-cyan-500',
  boost: 'from-purple-500 to-violet-500',
  event: 'from-green-500 to-emerald-500',
  story: 'from-orange-500 to-red-500',
  ai: 'from-indigo-500 to-blue-500',
  compatibility: 'from-teal-500 to-cyan-500',
};

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, setScreen } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-pink-400 text-sm hover:text-pink-300 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Marcar todas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔔</div>
          <h3 className="text-white font-semibold mb-2">Sin notificaciones</h3>
          <p className="text-white/50 text-sm mb-6">Cuando recibas likes o matches, aparecerán aquí</p>
          <button
            onClick={() => setScreen('swipe')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
          >
            Empezar a deslizar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification, index) => {
            const Icon = iconMap[notification.type] || Bell;
            const color = colorMap[notification.type] || 'from-gray-500 to-gray-600';
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  notification.read
                    ? 'bg-white/5 border-white/5'
                    : 'bg-white/10 border-white/10'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm ${notification.read ? 'text-white/70' : 'text-white'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-white/50 text-sm truncate">{notification.description}</p>
                  <p className="text-white/30 text-xs mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Avatar if match */}
                {notification.avatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={notification.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
