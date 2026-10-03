import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Camera, CheckCircle, AlertCircle, Loader2, Upload } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function AIVerification() {
  const { setScreen, addToast, updateProfile } = useStore();
  const [step, setStep] = useState<'idle' | 'uploading' | 'analyzing' | 'verified' | 'rejected'>('idle');
  const [photo, setPhoto] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<{
    faceDetected: boolean;
    matchesProfile: boolean;
    quality: number;
    confidence: number;
  } | null>(null);

  const simulateUpload = () => {
    setStep('uploading');
    setTimeout(() => {
      setPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400');
      setStep('analyzing');
      
      // Simulate AI analysis
      setTimeout(() => {
        const results = {
          faceDetected: true,
          matchesProfile: Math.random() > 0.2,
          quality: Math.floor(Math.random() * 20) + 80,
          confidence: Math.floor(Math.random() * 15) + 85,
        };
        setAnalysisResults(results);
        
        if (results.matchesProfile && results.confidence > 80) {
          setStep('verified');
          updateProfile({ verified: true });
          addToast({ type: 'success', message: '¡Verificación exitosa!' });
        } else {
          setStep('rejected');
          addToast({ type: 'error', message: 'No se pudo verificar la identidad' });
        }
      }, 3000);
    }, 2000);
  };

  const reset = () => {
    setStep('idle');
    setPhoto(null);
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Verificación IA</h1>
      </div>

      <div className="p-4">
        {step === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Verifica tu identidad</h2>
            <p className="text-white/60 mb-6">
              Toma una selfie para verificar que eres tú. Nuestro IA analizará tu foto.
            </p>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 text-left">
              <h3 className="text-white font-semibold mb-3">Requisitos:</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Buena iluminación
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Cara visible y centrada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Sin gafas de sol o mascarilla
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Fondo neutro recomendado
                </li>
              </ul>
            </div>

            <button
              onClick={simulateUpload}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Tomar selfie
            </button>
          </motion.div>
        )}

        {step === 'uploading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
            <h2 className="text-white text-xl font-bold mb-2">Subiendo foto...</h2>
            <p className="text-white/60">Por favor espera</p>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            {photo && (
              <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto mb-6 relative">
                <img src={photo} alt="Selfie" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
              </div>
            )}
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <h2 className="text-white text-xl font-bold mb-2">Analizando con IA...</h2>
            <p className="text-white/60">Verificando tu identidad</p>
          </motion.div>
        )}

        {step === 'verified' && analysisResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-white text-2xl font-bold mb-2">¡Verificación exitosa!</h2>
            <p className="text-white/60 mb-6">Tu perfil ahora está verificado</p>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <h3 className="text-white font-semibold mb-3">Resultados del análisis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Cara detectada</span>
                  <span className="text-green-400 font-semibold">✓ Sí</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Coincide con perfil</span>
                  <span className="text-green-400 font-semibold">✓ Sí</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Calidad de imagen</span>
                  <span className="text-white font-semibold">{analysisResults.quality}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Confianza IA</span>
                  <span className="text-green-400 font-semibold">{analysisResults.confidence}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setScreen('profile')}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl"
            >
              Volver al perfil
            </button>
          </motion.div>
        )}

        {step === 'rejected' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Verificación fallida</h2>
            <p className="text-white/60 mb-6">
              No pudimos verificar tu identidad. Asegúrate de que la foto sea clara y coincida con tu perfil.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl"
              >
                Intentar de nuevo
              </button>
              <button
                onClick={() => setScreen('profile')}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
