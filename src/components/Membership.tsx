import { motion } from 'framer-motion';
import { Crown, Check, X, Zap, Star, Sparkles, Shield } from 'lucide-react';
import { useStore, MembershipTier } from '../store/useStore';

const plans = [
  { id: 'plus' as MembershipTier, name: 'Plus', price: 14.99, color: 'from-blue-500 to-cyan-500', icon: Zap, popular: false, features: ['Likes ilimitados', '5 Super Likes/día', '1 Boost/mes', 'Sin anuncios'] },
  { id: 'gold' as MembershipTier, name: 'Gold', price: 29.99, color: 'from-yellow-500 to-amber-500', icon: Crown, popular: true, features: ['Todo Plus', 'Ve quién te gustó', '10 Super Likes/día', '5 Boosts/mes', 'Top Picks'] },
  { id: 'platinum' as MembershipTier, name: 'Platinum', price: 49.99, color: 'from-purple-500 to-violet-500', icon: Star, popular: false, features: ['Todo Gold', 'Mensaje antes del match', 'Super Likes ilimitados', 'Boosts ilimitados', 'Soporte 24/7'] },
  { id: 'select' as MembershipTier, name: 'SELECT™', price: 99.99, color: 'from-pink-500 to-rose-500', icon: Sparkles, popular: false, exclusive: true, features: ['Todo Platinum', 'Top 1% exclusivo', 'Casamentero personal', 'Eventos VIP'] },
];

export default function Membership() {
  const { setScreen, setMembership } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Elige tu plan</h1>
        <p className="text-white/60">Desbloquea funciones premium</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">Garantía 7 días</span>
        </div>
      </motion.div>

      <div className="space-y-4 max-w-lg mx-auto">
        {plans.map((plan, index) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`relative rounded-2xl overflow-hidden border ${plan.popular ? 'border-yellow-500/50' : 'border-white/10'}`}>
            {plan.popular && <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-xl">MÁS POPULAR</div>}
            {plan.exclusive && <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">EXCLUSIVO</div>}
            
            <div className="bg-white/5 backdrop-blur-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                    <p className="text-white/50 text-sm">${plan.price.toFixed(2)}<span className="text-white/30">/mes</span></p>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setMembership(plan.id); setScreen('payment'); }} className={`px-5 py-2 rounded-full bg-gradient-to-r ${plan.color} text-white font-semibold text-sm`}>
                  Elegir
                </motion.button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-xs text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
