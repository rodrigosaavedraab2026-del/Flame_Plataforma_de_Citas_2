import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Welcome() {
  const setScreen = useStore((s) => s.setScreen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 1.2 }}
      >
        <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center">
          <Flame className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-6xl font-bold text-white mt-8"
      >
        Flama
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/90 text-xl mt-3"
      >
        Enciende la chispa 🔥
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setScreen('auth')}
        className="mt-12 px-10 py-4 bg-white text-pink-600 font-bold text-lg rounded-full shadow-xl"
      >
        Comenzar
      </motion.button>
    </div>
  );
}
