import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Heart, Brain, Star, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function Compatibility() {
  const { setScreen } = useStore();
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    overall: number;
    categories: { name: string; score: number; icon: string }[];
    strengths: string[];
    suggestions: string[];
  } | null>(null);

  const analyzeCompatibility = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const categories = [
        { name: 'Comunicación', score: Math.floor(Math.random() * 30) + 70, icon: '💬' },
        { name: 'Valores', score: Math.floor(Math.random() * 30) + 70, icon: '🎯' },
        { name: 'Estilo de vida', score: Math.floor(Math.random() * 30) + 70, icon: '🌟' },
        { name: 'Intereses', score: Math.floor(Math.random() * 30) + 70, icon: '🎨' },
        { name: 'Emocional', score: Math.floor(Math.random() * 30) + 70, icon: '❤️' },
        { name: 'Futuro', score: Math.floor(Math.random() * 30) + 70, icon: '🔮' },
      ];
      const overall = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);
      
      setResult({
        overall,
        categories,
        strengths: [
          'Ambos valoran las experiencias sobre lo material',
          'Estilos de comunicación compatibles',
          'Intereses compartidos en viajes y cultura',
          'Visión similar del equilibrio vida-trabajo',
        ],
        suggestions: [
          'Explorar actividades al aire libre juntos',
          'Compartir gustos musicales para crear playlists',
          'Planificar viajes cortos para conocerse mejor',
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Análisis de Compatibilidad</h1>
          <p className="text-white/50 text-xs">Descubre tu afinidad con alguien</p>
        </div>
      </div>

      {!selectedProfile ? (
        <>
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">Selecciona un perfil</h2>
            <p className="text-white/50 text-sm">Analiza la compatibilidad con cualquier persona</p>
          </div>

          <div className="space-y-3">
            {profiles.map((profile, index) => (
              <motion.button
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => analyzeCompatibility(profile)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold text-sm">{profile.name}, {profile.age}</h3>
                  <p className="text-white/50 text-xs truncate">{profile.bio}</p>
                </div>
                <Sparkles className="w-5 h-5 text-teal-400" />
              </motion.button>
            ))}
          </div>
        </>
      ) : analyzing ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Analizando...</h3>
          <p className="text-white/50 text-sm text-center">
            Evaluando compatibilidad con {selectedProfile.name}
          </p>
        </div>
      ) : result ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-6 bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={selectedProfile.photos[0]} alt={selectedProfile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{selectedProfile.name}, {selectedProfile.age}</h3>
              <p className="text-white/50 text-sm">Análisis completo</p>
            </div>
            <div className="ml-auto text-center">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">{result.overall}%</p>
              <p className="text-white/40 text-xs">Match</p>
            </div>
          </div>

          {/* Overall score circle */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${result.overall * 2.51} 251`}
                  initial={{ strokeDasharray: '0 251' }}
                  animate={{ strokeDasharray: `${result.overall * 2.51} 251` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{result.overall}%</p>
                  <p className="text-white/40 text-xs">Compatible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
            <h4 className="text-white font-semibold mb-3 text-sm">Desglose por categoría</h4>
            <div className="space-y-3">
              {result.categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm flex items-center gap-2">
                      <span>{cat.icon}</span> {cat.name}
                    </span>
                    <span className="text-white font-bold text-sm">{cat.score}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-green-500/5 rounded-2xl p-4 border border-green-500/20 mb-4">
            <h4 className="text-green-400 font-semibold mb-3 text-sm flex items-center gap-2">
              <Star className="w-4 h-4" /> Puntos fuertes
            </h4>
            <div className="space-y-2">
              {result.strengths.map((s, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-white/70 text-sm flex items-start gap-2"
                >
                  <span className="text-green-400 mt-0.5">✓</span> {s}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-purple-500/5 rounded-2xl p-4 border border-purple-500/20 mb-4">
            <h4 className="text-purple-400 font-semibold mb-3 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Sugerencias
            </h4>
            <div className="space-y-2">
              {result.suggestions.map((s, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-white/70 text-sm flex items-start gap-2"
                >
                  <span className="text-purple-400">💡</span> {s}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { setSelectedProfile(null); setResult(null); }}
              className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 text-sm"
            >
              Analizar otro
            </button>
            <button
              onClick={() => setScreen('swipe')}
              className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full text-sm"
            >
              Volver
            </button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
