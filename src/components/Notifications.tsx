import { motion } from 'framer-motion';
import { Heart, MessageCircle, Star, Zap, CheckCheck } from 'lucide-react';
import { useStore } from '../store/useStore';

const iconMap = { match: Heart, like: Star, message: MessageCircle, boost: Zap };
const colorMap = { match: 'from-pink-500 to-rose-500', like: 'from-yellow-500 to-amber-500', message: 'from-blue-500 to-cyan-500', boost: 'from-purple-500 to-violet-500' };

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, setScreen } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <div className="flex items-center justify-between pt-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="flex items-center gap-1.5 text-pink-400 text-sm">
            <CheckCheck className="w-4 h-4" />Marcar todas
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔔</div>
          <h3 className="text-white font-semibold mb-2">Sin notificaciones</h3>
          <button onClick={() => setScreen('swipe')} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">
            Empezar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification, index) => {
            const Icon = iconMap[notification.type];
            return (
              <motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => markAsRead(notification.id)} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer ${notification.read ? 'bg-white/5 border-white/5' : 'bg-white/10 border-white/10'}`}>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colorMap[notification.type]} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm ${notification.read ? 'text-white/70' : 'text-white'}`}>{notification.title}</h3>
                    {!notification.read && <div className="w-2 h-2 bg-pink-500 rounded-full" />}
                  </div>
                  <p className="text-white/50 text-sm truncate">{notification.description}</p>
                </div>
                {notification.avatar && <div className="w-10 h-10 rounded-full overflow-hidden"><img src={notification.avatar} alt="" className="w-full h-full object-cover" /></div>}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
