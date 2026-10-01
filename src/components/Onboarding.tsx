import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, MessageCircle, Shield, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  {
    icon: Heart,
    title: 'Desliza para descubrir',
    description: 'Desliza a la derecha si te gusta, a la izquierda para pasar. ¡Es así de fácil!',
    color: 'from-pink-500 to-rose-500',
    emoji: '💕',
  },
  {
    icon: Star,
    title: 'Super Likes especiales',
    description: '¿Alguien te encantó? Envía un Super Like para destacar entre los demás.',
    color: 'from-blue-500 to-cyan-500',
    emoji: '⭐',
  },
  {
    icon: MessageCircle,
    title: 'Chatea con tus matches',
    description: 'Cuando ambos se gustan, ¡es un match! Inicia una conversación y conoce a esa persona especial.',
    color: 'from-purple-500 to-violet-500',
    emoji: '💬',
  },
  {
    icon: Shield,
    title: 'Seguridad primero',
    description: 'Verificación de perfiles, cifrado de mensajes y reportes. Tu seguridad es nuestra prioridad.',
    color: 'from-green-500 to-emerald-500',
    emoji: '🔒',
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const setScreen = useStore((s) => s.setScreen);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setScreen('swipe');
    }
  };

  const skip = () => setScreen('swipe');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className={`absolute w-96 h-96 rounded-full bg-gradient-to-r ${steps[currentStep].color} opacity-20 blur-3xl top-1/4 left-1/2 -translate-x-1/2 transition-all duration-700`} />
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mt-4 relative z-10">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${steps[i].color}`}
              initial={{ width: '0%' }}
              animate={{ width: i <= currentStep ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={skip}
        className="absolute top-6 right-6 text-white/60 text-sm hover:text-white transition-colors z-10"
      >
        Saltar →
      </motion.button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${steps[currentStep].color} flex items-center justify-center shadow-2xl mb-8`}
            >
              <span className="text-5xl">{steps[currentStep].emoji}</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-4">
              {steps[currentStep].title}
            </h2>

            {/* Description */}
            <p className="text-white/70 text-lg max-w-sm leading-relaxed">
              {steps[currentStep].description}
            </p>

            {/* Step indicator */}
            <p className="text-white/40 text-sm mt-6">
              Paso {currentStep + 1} de {steps.length}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={nextStep}
        className={`w-full py-4 bg-gradient-to-r ${steps[currentStep].color} text-white font-bold text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all relative z-10`}
      >
        {currentStep < steps.length - 1 ? (
          <>
            Siguiente <ChevronRight className="w-5 h-5" />
          </>
        ) : (
          '¡Empezar a deslizar!'
        )}
      </motion.button>
    </div>
  );
}
