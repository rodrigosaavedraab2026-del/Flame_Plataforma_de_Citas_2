import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Heart, Zap, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Question {
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const questions: Question[] = [
  { question: '¿Cuál es el destino de viaje más popular?', options: ['París', 'Tokio', 'Bali', 'Nueva York'], correct: 0, emoji: '✈️' },
  { question: '¿Qué harías en una primera cita?', options: ['Cena romántica', 'Café casual', 'Aventura al aire libre', 'Cine en casa'], correct: 1, emoji: '💕' },
  { question: '¿Cuál es tu lenguaje del amor?', options: ['Palabras de afirmación', 'Tiempo de calidad', 'Actos de servicio', 'Contacto físico'], correct: 1, emoji: '❤️' },
  { question: '¿Qué tipo de música prefieres?', options: ['Pop', 'Rock', 'Reggaetón', 'Indie'], correct: 3, emoji: '🎵' },
  { question: '¿Plan ideal de domingo?', options: ['Fiesta', 'Netflix & chill', 'Deporte', 'Explorar la ciudad'], correct: 3, emoji: '🌟' },
  { question: '¿Qué valoras más en una pareja?', options: ['Humor', 'Inteligencia', 'Ambición', 'Bondad'], correct: 0, emoji: '💎' },
  { question: '¿Tu comida favorita?', options: ['Sushi', 'Pizza', 'Pasta', 'Tacos'], correct: 3, emoji: '🍕' },
  { question: '¿Madrugador o noctámbulo?', options: ['Madrugador', 'Noctámbulo', 'Depende del día', 'Siesta siempre'], correct: 1, emoji: '🌙' },
];

export default function IceBreaker() {
  const { setScreen, iceBreakerScore, setIceBreakerScore } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore((s) => s + 10 + streak * 5);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
        setIceBreakerScore(score + (isCorrect ? 10 + streak * 5 : 0));
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setScore(0);
    setStreak(0);
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {!gameOver ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between pt-4 mb-6">
            <button
              onClick={() => setScreen('swipe')}
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-bold">{score}</span>
              </div>
              {streak > 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-orange-500/20 px-2 py-0.5 rounded-full"
                >
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-orange-400 text-xs font-bold">x{streak}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-1 mb-8">
            {questions.map((_, i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: i <= currentQuestion ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                {question.emoji}
              </motion.div>
              <h2 className="text-xl font-bold text-white mb-2">{question.question}</h2>
              <p className="text-white/40 text-sm">Pregunta {currentQuestion + 1} de {questions.length}</p>
            </motion.div>
          </AnimatePresence>

          {/* Options */}
          <div className="space-y-3 max-w-md mx-auto">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showWrong = selectedAnswer !== null && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    showCorrect
                      ? 'bg-green-500/20 border-green-500/50'
                      : showWrong
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showCorrect ? 'bg-green-500 text-white' : showWrong ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`font-medium ${
                      showCorrect ? 'text-green-400' : showWrong ? 'text-red-400' : 'text-white'
                    }`}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </>
      ) : (
        /* Game Over */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[70vh] text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-2">¡Juego terminado!</h2>
          <p className="text-white/60 mb-6">Has completado el rompehielos</p>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8 w-full max-w-xs">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-3xl font-bold text-white">{score}</span>
              <span className="text-white/50">pts</span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="text-center">
                <p className="text-yellow-400 font-bold">{Math.round(score / 10)}</p>
                <p className="text-white/40 text-xs">Correctas</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-orange-400 font-bold">{streak}</p>
                <p className="text-white/40 text-xs">Mejor racha</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Jugar de nuevo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScreen('swipe')}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
            >
              Volver a deslizar
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
