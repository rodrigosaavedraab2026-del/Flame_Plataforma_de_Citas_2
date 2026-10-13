import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, MessageCircle, Heart, Calendar, Zap, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function PushNotifications() {
  const { setScreen, addToast } = useStore();
  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    likes: true,
    superLikes: true,
    boosts: true,
    events: false,
    promotions: false,
    tips: true,
  });

  const [delivery, setDelivery] = useState({
    push: true,
    email: false,
    sms: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    addToast({ type: 'success', message: 'Preferencias actualizadas' });
  };

  const toggleDelivery = (key: keyof typeof delivery) => {
    setDelivery({ ...delivery, [key]: !delivery[key] });
  };

  const notificationTypes = [
    { key: 'matches', label: 'Nuevos matches', icon: Heart, color: 'text-pink-500', description: 'Cuando alguien te da match' },
    { key: 'messages', label: 'Mensajes nuevos', icon: MessageCircle, color: 'text-blue-500', description: 'Cuando recibes un mensaje' },
    { key: 'likes', label: 'Likes recibidos', icon: Heart, color: 'text-red-500', description: 'Cuando alguien te da like' },
    { key: 'superLikes', label: 'Super Likes', icon: Zap, color: 'text-yellow-500', description: 'Cuando recibes un Super Like' },
    { key: 'boosts', label: 'Boosts activos', icon: Zap, color: 'text-purple-500', description: 'Recordatorios de boosts' },
    { key: 'events', label: 'Eventos', icon: Calendar, color: 'text-green-500', description: 'Eventos cerca de ti' },
    { key: 'promotions', label: 'Promociones', icon: Zap, color: 'text-orange-500', description: 'Ofertas especiales' },
    { key: 'tips', label: 'Tips y consejos', icon: Settings, color: 'text-cyan-500', description: 'Consejos para mejorar tu perfil' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('settings')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Notificaciones Push</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Delivery method */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Método de entrega</h2>
          <div className="space-y-3">
            {Object.entries(delivery).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium capitalize">{key === 'push' ? 'Push' : key === 'email' ? 'Email' : 'SMS'}</p>
                  <p className="text-white/60 text-sm">
                    {key === 'push' ? 'Notificaciones en el dispositivo' : key === 'email' ? 'Enviar por correo' : 'Enviar por mensaje'}
                  </p>
                </div>
                <button
                  onClick={() => toggleDelivery(key as keyof typeof delivery)}
                  className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-pink-500' : 'bg-white/20'}`}
                >
                  <motion.div
                    animate={{ x: value ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification types */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Tipos de notificaciones</h2>
          <div className="space-y-3">
            {notificationTypes.map(({ key, label, icon: Icon, color, description }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <div>
                    <p className="text-white font-medium">{label}</p>
                    <p className="text-white/60 text-xs">{description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification(key as keyof typeof notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? 'bg-pink-500' : 'bg-white/20'}`}
                >
                  <motion.div
                    animate={{ x: notifications[key as keyof typeof notifications] ? 24 : 2 }}
                    className="w-5 h-5 bg-white rounded-full"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet hours */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Horario silencioso</h2>
          <p className="text-white/60 text-sm mb-3">No recibir notificaciones durante estas horas</p>
          <div className="flex items-center gap-3">
            <input
              type="time"
              defaultValue="22:00"
              className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white border border-white/20"
            />
            <span className="text-white/60">a</span>
            <input
              type="time"
              defaultValue="08:00"
              className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white border border-white/20"
            />
          </div>
        </div>

        {/* Test notification */}
        <button
          onClick={() => addToast({ type: 'success', message: '🔔 Notificación de prueba enviada' })}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl"
        >
          Enviar notificación de prueba
        </button>
      </div>
    </div>
  );
}
