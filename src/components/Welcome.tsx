import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Welcome() {
  const setScreen = useStore((s) => s.setScreen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * 400 - 200,
              y: Math.random() * 800 - 400,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1.2, bounce: 0.5 }}
        className="relative z-10"
      >
        <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/30">
          <Flame className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-6xl font-bold text-white mt-8 tracking-tight relative z-10"
      >
        Flama
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-white/90 text-xl mt-3 font-light relative z-10"
      >
        Enciende la chispa 🔥
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="text-white/70 text-center mt-6 max-w-xs relative z-10 leading-relaxed"
      >
        Conecta con personas increíbles. Encuentra tu match perfecto.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen('onboarding')}
        className="mt-12 px-10 py-4 bg-white text-pink-600 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all relative z-10"
      >
        Comenzar
      </motion.button>

      {/* Already have account */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-white/60 text-sm mt-6 relative z-10"
      >
        ¿Ya tienes cuenta?{' '}
        <span className="text-white font-semibold cursor-pointer hover:underline">
          Iniciar sesión
        </span>
      </motion.p>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-white/40 text-xs text-center"
      >
        <p>Al continuar, aceptas nuestros Términos y Política de Privacidad</p>
      </motion.div>
    </div>
  );
}
