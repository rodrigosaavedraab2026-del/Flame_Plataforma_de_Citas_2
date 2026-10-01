import { motion } from 'framer-motion';
import { Crown, Check, X, Zap, Star, Sparkles, Shield } from 'lucide-react';
import { useStore, MembershipTier } from '../store/useStore';

const plans = [
  {
    id: 'plus' as MembershipTier,
    name: 'Plus',
    price: 14.99,
    color: 'from-blue-500 to-cyan-500',
    icon: Zap,
    popular: false,
    features: [
      { text: 'Me gusta ilimitados', included: true },
      { text: '5 Super Likes al día', included: true },
      { text: '1 Boost al mes', included: true },
      { text: 'Retroceder (Rebobinar)', included: true },
      { text: 'Pasaporte: cambia ubicación', included: true },
      { text: 'Sin anuncios', included: true },
      { text: 'Ve quién te gustó', included: false },
      { text: 'Prioridad en likes', included: false },
    ],
  },
  {
    id: 'gold' as MembershipTier,
    name: 'Gold',
    price: 29.99,
    color: 'from-yellow-500 to-amber-500',
    icon: Crown,
    popular: true,
    features: [
      { text: 'Todo lo de Plus', included: true },
      { text: 'Ve quién te gustó', included: true },
      { text: '10 Super Likes al día', included: true },
      { text: '5 Boosts al mes', included: true },
      { text: 'Selección semanal Top Picks', included: true },
      { text: 'Ajustes de perfil avanzados', included: true },
      { text: 'Leer recibos', included: true },
      { text: 'Prioridad en likes', included: true },
    ],
  },
  {
    id: 'platinum' as MembershipTier,
    name: 'Platinum',
    price: 49.99,
    color: 'from-purple-500 to-violet-500',
    icon: Star,
    popular: false,
    features: [
      { text: 'Todo lo de Gold', included: true },
      { text: 'Me gusta prioritarios', included: true },
      { text: 'Mensaje antes del match', included: true },
      { text: 'Super Likes ilimitados', included: true },
      { text: 'Boosts ilimitados', included: true },
      { text: 'Acceso a eventos exclusivos', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Perfiles de vídeo', included: true },
    ],
  },
  {
    id: 'select' as MembershipTier,
    name: 'SELECT™',
    price: 99.99,
    color: 'from-pink-500 to-rose-500',
    icon: Sparkles,
    popular: false,
    exclusive: true,
    features: [
      { text: 'Todo lo de Platinum', included: true },
      { text: 'Acceso exclusivo top 1%', included: true },
      { text: 'Mensajes directos sin match', included: true },
      { text: 'Perfil verificado SELECT', included: true },
      { text: 'Eventos VIP privados', included: true },
      { text: 'Casamentero personal', included: true },
      { text: 'Acceso anticipado a funciones', included: true },
      { text: 'Modo incógnito avanzado', included: true },
    ],
  },
];

export default function Membership() {
  const { setScreen, setMembership, membership } = useStore();

  const handleSelect = (tier: MembershipTier) => {
    setMembership(tier);
    setScreen('payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-8 mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Elige tu plan</h1>
        <p className="text-white/60">Desbloquea funciones premium y encuentra tu match perfecto</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">Garantía de 7 días</span>
        </div>
      </motion.div>

      {/* Plans */}
      <div className="space-y-4 max-w-lg mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl overflow-hidden border ${
              plan.popular ? 'border-yellow-500/50' : 'border-white/10'
            } ${plan.id === membership ? 'ring-2 ring-white/30' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                MÁS POPULAR
              </div>
            )}
            {plan.exclusive && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                EXCLUSIVO
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-sm p-5">
              {/* Plan header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                    <p className="text-white/50 text-sm">
                      ${plan.price.toFixed(2)}<span className="text-white/30">/mes</span>
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(plan.id)}
                  className={`px-5 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-semibold text-sm shadow-lg`}
                >
                  Elegir
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-white/30 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${feature.included ? 'text-white/80' : 'text-white/30'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Back button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setScreen('swipe')}
          className="text-white/50 text-sm hover:text-white transition-colors"
        >
          ← Volver a deslizar
        </button>
      </div>
    </div>
  );
}
