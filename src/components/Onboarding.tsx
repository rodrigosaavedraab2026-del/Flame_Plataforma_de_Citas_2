import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

const steps = [
  { title: 'Desliza para descubrir', description: 'Derecha = Like, Izquierda = Pass', emoji: '💕' },
  { title: 'Super Likes', description: 'Destaca enviando un Super Like', emoji: '⭐' },
  { title: 'Chatea con matches', description: 'Cuando ambos se gustan, ¡es match!', emoji: '💬' },
  { title: 'Seguridad primero', description: 'Perfiles verificados y cifrado', emoji: '🔒' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const setScreen = useStore((s) => s.setScreen);

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else setScreen('swipe');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col">
      <div className="flex gap-2 mt-4">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{ width: i <= currentStep ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      <button onClick={() => setScreen('swipe')} className="absolute top-6 right-6 text-white/60 text-sm">
        Saltar →
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
            <div className="text-6xl mb-6">{steps[currentStep].emoji}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
            <p className="text-white/70 text-lg">{steps[currentStep].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={next}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
      >
        {currentStep < steps.length - 1 ? <>Siguiente <ChevronRight className="w-5 h-5" /></> : '¡Empezar!'}
      </motion.button>
    </div>
  );
}
