import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Briefcase, Heart, Check, Shield, Linkedin, Award, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function BFFMode() {
  const { setScreen, appMode, setAppMode } = useStore();

  const modes = [
    {
      id: 'dating' as const,
      name: 'Flama Date',
      description: 'Encuentra el amor y conexiones románticas',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      emoji: '💕',
      features: ['Match romántico', 'Citas', 'Relaciones serias', 'Eventos para parejas'],
    },
    {
      id: 'bff' as const,
      name: 'Flama BFF',
      description: 'Encuentra amigos con tus mismos intereses',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      emoji: '🤝',
      features: ['Amistades reales', 'Grupos de interés', 'Actividades compartidas', 'Comunidad local'],
    },
    {
      id: 'business' as const,
      name: 'Flama Biz',
      description: 'Networking profesional y colaboraciones',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      emoji: '💼',
      features: ['Networking profesional', 'Colaboraciones', 'Mentorías', 'Eventos business'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Modo de la App</h1>
          <p className="text-white/50 text-xs">Elige cómo quieres usar Flama</p>
        </div>
      </div>

      {/* Current mode */}
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
        <p className="text-white/50 text-sm mb-2">Modo actual</p>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${modes.find(m => m.id === appMode)?.color} flex items-center justify-center`}>
            <span className="text-2xl">{modes.find(m => m.id === appMode)?.emoji}</span>
          </div>
          <div>
            <h3 className="text-white font-bold">{modes.find(m => m.id === appMode)?.name}</h3>
            <p className="text-white/50 text-sm">{modes.find(m => m.id === appMode)?.description}</p>
          </div>
        </div>
      </div>

      {/* Mode selection */}
      <div className="space-y-4">
        {modes.map((mode, index) => {
          const isActive = appMode === mode.id;
          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setAppMode(mode.id)}
              className={`w-full text-left rounded-2xl p-5 border transition-all ${
                isActive
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{mode.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{mode.name}</h3>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-white/60 text-sm mb-3">{mode.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mode.features.map((feature) => (
                      <span key={feature} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/60">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
        <p className="text-white/50 text-xs text-center">
          💡 Puedes cambiar entre modos en cualquier momento. Cada modo tiene su propio feed y matches.
        </p>
      </div>
    </div>
  );
}

export function LinkedInVerify() {
  const { setScreen, linkedinVerified, setLinkedinVerified } = useStore();
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState(0);

  const startVerification = () => {
    setVerifying(true);
    setStep(1);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => {
      setVerifying(false);
      setLinkedinVerified(true);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Verificación LinkedIn</h1>
          <p className="text-white/50 text-xs">Aumenta tu credibilidad profesional</p>
        </div>
      </div>

      {linkedinVerified ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-6"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Verificado!</h2>
          <p className="text-white/60 mb-6">Tu perfil está vinculado con LinkedIn</p>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left space-y-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 text-sm">Identidad profesional verificada</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 text-sm">Badge visible en tu perfil</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 text-sm">Mayor confianza en matches</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Benefits */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Vincula LinkedIn</h3>
                <p className="text-white/50 text-sm">Verifica tu identidad profesional</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'Badge de verificación en tu perfil',
                'Mayor credibilidad con otros usuarios',
                'Acceso a eventos de networking',
                'Match con profesionales verificados',
              ].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-blue-400" />
                  <span className="text-white/70 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Verification steps */}
          <AnimatePresence>
            {verifying && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6"
              >
                <div className="space-y-4">
                  {[
                    { label: 'Conectando con LinkedIn...', done: step >= 2 },
                    { label: 'Verificando identidad...', done: step >= 3 },
                    { label: 'Completando verificación...', done: step >= 4 },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {s.done ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-6 h-6 rounded-full border-2 border-blue-500/30 border-t-blue-500"
                        />
                      )}
                      <span className={`text-sm ${s.done ? 'text-white/80' : 'text-white/50'}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startVerification}
            disabled={verifying}
            className="w-full py-4 bg-[#0077b5] text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Linkedin className="w-5 h-5" />
            {verifying ? 'Verificando...' : 'Vincular LinkedIn'}
          </motion.button>

          <p className="text-white/30 text-xs text-center mt-4">
            Tu información de LinkedIn se mantiene privada y segura
          </p>
        </>
      )}
    </div>
  );
}
