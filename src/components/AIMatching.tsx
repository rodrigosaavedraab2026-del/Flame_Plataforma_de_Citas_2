import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Sparkles, Heart, Settings, ChevronRight, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function AIMatching() {
  const { setScreen, aiMatchPreferences, setAiMatchPreferences } = useStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [aiMatches, setAiMatches] = useState<{ profile: typeof profiles[0]; score: number; reason: string }[]>([]);

  const lookingForOptions = ['relación seria', 'algo casual', 'amistad', 'no estoy seguro'];
  const interestOptions = ['viajes', 'música', 'arte', 'cocina', 'deportes', 'tecnología', 'lectura', 'cine', 'naturaleza', 'yoga'];

  const toggleInterest = (interest: string) => {
    const current = aiMatchPreferences.interests;
    if (current.includes(interest)) {
      setAiMatchPreferences({ interests: current.filter((i) => i !== interest) });
    } else if (current.length < 5) {
      setAiMatchPreferences({ interests: [...current, interest] });
    }
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Simulate AI matching
      const matches = profiles
        .map((profile) => ({
          profile,
          score: Math.floor(Math.random() * 30) + 70,
          reason: getAIReason(profile),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setAiMatches(matches);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const getAIReason = (profile: typeof profiles[0]): string => {
    const reasons = [
      `Compatibilidad alta en valores y estilo de vida`,
      `Intereses compartidos: ${profile.interests.slice(0, 2).join(', ')}`,
      `Complementariedad en personalidad detectada`,
      `Afinidad en objetivos de relación`,
      `Química basada en patrones de comunicación`,
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Match con IA</h1>
          <p className="text-white/50 text-xs">Inteligencia artificial para encontrar tu match perfecto</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="preferences"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* AI illustration */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-lg font-bold text-white mb-1">Configura tus preferencias</h2>
              <p className="text-white/50 text-sm">Nuestra IA analizará compatibilidad avanzada</p>
            </div>

            {/* Looking for */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
              <label className="text-white/60 text-sm mb-3 block font-medium">¿Qué buscas?</label>
              <div className="flex flex-wrap gap-2">
                {lookingForOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAiMatchPreferences({ lookingFor: option })}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      aiMatchPreferences.lookingFor === option
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Age range */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
              <label className="text-white/60 text-sm mb-3 block font-medium">Rango de edad</label>
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">{aiMatchPreferences.ageRange[0]}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full relative">
                  <div
                    className="absolute h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                    style={{
                      left: `${((aiMatchPreferences.ageRange[0] - 18) / 32) * 100}%`,
                      right: `${100 - ((aiMatchPreferences.ageRange[1] - 18) / 32) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-white font-bold">{aiMatchPreferences.ageRange[1]}</span>
              </div>
            </div>

            {/* Distance */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
              <label className="text-white/60 text-sm mb-3 block font-medium">Distancia máxima</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={aiMatchPreferences.distance}
                  onChange={(e) => setAiMatchPreferences({ distance: parseInt(e.target.value) })}
                  className="flex-1 accent-pink-500"
                />
                <span className="text-white font-bold w-12 text-right">{aiMatchPreferences.distance} km</span>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <label className="text-white/60 text-sm mb-3 block font-medium">Intereses ({aiMatchPreferences.interests.length}/5)</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      aiMatchPreferences.interests.includes(interest)
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Run AI */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runAIAnalysis}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Analizar con IA
            </motion.button>
          </motion.div>
        ) : isAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 mb-6"
            />
            <h3 className="text-xl font-bold text-white mb-2">Analizando compatibilidad...</h3>
            <p className="text-white/50 text-sm text-center max-w-xs">
              Nuestra IA está evaluando personalidad, valores, intereses y más
            </p>
            <div className="mt-6 space-y-2 w-full max-w-xs">
              {['Analizando personalidad', 'Evaluando valores', 'Calculando compatibilidad'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  <span className="text-white/70 text-sm">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-4xl mb-2"
              >
                🧠✨
              </motion.div>
              <h3 className="text-xl font-bold text-white">Tus mejores matches</h3>
              <p className="text-white/50 text-sm">Ordenados por compatibilidad</p>
            </div>

            <div className="space-y-3">
              {aiMatches.map((match, index) => (
                <motion.div
                  key={match.profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-3"
                >
                  {/* Rank */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-300 text-black' : index === 2 ? 'bg-amber-600 text-white' : 'bg-white/10 text-white/60'
                  }`}>
                    #{index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={match.profile.photos[0]} alt={match.profile.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-semibold text-sm">{match.profile.name}, {match.profile.age}</h4>
                      <div className="flex items-center gap-0.5">
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                        <span className="text-pink-400 text-xs font-bold">{match.score}%</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs truncate">{match.reason}</p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-white/30" />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowResults(false)}
                className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20"
              >
                Ajustar preferencias
              </button>
              <button
                onClick={() => setScreen('swipe')}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
              >
                Ver perfiles
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
