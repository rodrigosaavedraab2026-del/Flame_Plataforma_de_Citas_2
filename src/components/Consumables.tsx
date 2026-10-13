import { motion } from 'framer-motion';
import { Zap, Star, ArrowLeft, Sparkles, Eye, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const consumables = [
  {
    id: 'boost',
    name: 'Boost',
    price: 4.99,
    description: '30 minutos de visibilidad máxima',
    icon: Zap,
    color: 'from-purple-500 to-violet-500',
    emoji: '⚡',
    details: 'Tu perfil aparece primero en tu zona',
  },
  {
    id: 'super-boost',
    name: 'Super Boost',
    price: 9.99,
    description: '100x más vistas por 30 minutos',
    icon: Sparkles,
    color: 'from-yellow-500 to-amber-500',
    emoji: '🚀',
    details: 'Máxima exposición garantizada',
  },
  {
    id: 'super-like',
    name: 'Super Like',
    price: 1.99,
    description: 'Destaca 3x más que un like normal',
    icon: Star,
    color: 'from-blue-500 to-cyan-500',
    emoji: '⭐',
    details: 'Notificación especial al otro usuario',
  },
  {
    id: 'first-impression',
    name: 'Primera Impresión',
    price: 2.99,
    description: 'Envía un mensaje antes del match',
    icon: MessageCircle,
    color: 'from-pink-500 to-rose-500',
    emoji: '💌',
    details: 'Tu mensaje llega antes de hacer match',
  },
];

export default function Consumables() {
  const { setScreen, useBoost, boostsRemaining } = useStore();

  const handlePurchase = (id: string) => {
    if (id === 'boost') {
      useBoost();
    }
    // In production, this would go to payment
    alert(`¡${id} activado! En producción se procesaría el pago.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Back button */}
      <button
        onClick={() => setScreen('profile')}
        className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6 pt-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Consumibles</h1>
        <p className="text-white/60">Potencia tu experiencia con compras únicas</p>
      </motion.div>

      {/* Items */}
      <div className="space-y-4 max-w-lg mx-auto">
        {consumables.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-2xl">{item.emoji}</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-white font-bold">{item.name}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
                <p className="text-white/40 text-xs mt-1">{item.details}</p>
              </div>

              {/* Price & Buy */}
              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold text-lg">${item.price.toFixed(2)}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(item.id)}
                  className={`mt-1 px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-semibold`}
                >
                  Comprar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto"
      >
        <p className="text-white/50 text-sm">
          💡 <strong className="text-white/70">Tip:</strong> Los consumibles no se renuevan automáticamente. 
          Cómpralos cuando los necesites.
        </p>
      </motion.div>
    </div>
  );
}
