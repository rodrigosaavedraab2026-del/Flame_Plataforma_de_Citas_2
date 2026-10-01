import { motion } from 'framer-motion';
import { Flame, Heart, MessageCircle, Bell, User } from 'lucide-react';
import { useStore, Screen } from '../store/useStore';

const navItems: { icon: typeof Flame; screen: Screen; label: string }[] = [
  { icon: Flame, screen: 'swipe', label: 'Descubrir' },
  { icon: Heart, screen: 'membership', label: 'Premium' },
  { icon: MessageCircle, screen: 'chat', label: 'Chat' },
  { icon: Bell, screen: 'notifications', label: 'Alertas' },
  { icon: User, screen: 'profile', label: 'Perfil' },
];

export default function Navigation() {
  const { screen, setScreen, notifications } = useStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = screen === item.screen;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.screen}
                whileTap={{ scale: 0.9 }}
                onClick={() => setScreen(item.screen)}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive ? 'text-pink-400' : 'text-white/40 hover:text-white/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-pink-500/10 rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.screen === 'notifications' && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-pink-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
