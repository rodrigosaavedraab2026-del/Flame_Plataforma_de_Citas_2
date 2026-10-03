import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, X, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProfileSetup() {
  const { setScreen, user, updateProfile } = useStore();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const availableInterests = ['Viajes', 'Música', 'Café', 'Fotografía', 'Arte', 'Cocina', 'Deportes', 'Lectura', 'Yoga', 'Cine', 'Naturaleza', 'Tecnología', 'Baile', 'Moda', 'Gaming'];

  const handleAddPhoto = () => {
    if (photos.length < 6) {
      // Simulate adding a photo
      const mockPhotos = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      ];
      setPhotos([...photos, mockPhotos[photos.length % mockPhotos.length]]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else if (interests.length < 5) {
      setInterests([...interests, interest]);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save and go to swipe
      if (user) {
        updateProfile({ name: user.name });
      }
      setScreen('swipe');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canContinue = () => {
    if (step === 1) return photos.length >= 1;
    if (step === 2) return bio.length >= 10;
    if (step === 3) return interests.length >= 3;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: step >= s ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Agrega tus fotos</h1>
            <p className="text-white/60 mb-8">Muestra tu mejor lado (mínimo 1 foto)</p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-pink-500 rounded-full text-[10px] text-white font-semibold">
                      Principal
                    </div>
                  )}
                </div>
              ))}
              {photos.length < 6 && (
                <button
                  onClick={handleAddPhoto}
                  className="aspect-square rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                >
                  <Camera className="w-6 h-6 text-white/40" />
                  <span className="text-white/40 text-xs">Agregar</span>
                </button>
              )}
            </div>

            <p className="text-white/40 text-xs text-center">
              {photos.length}/6 fotos • Las fotos con buena iluminación tienen 3x más matches
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Escribe tu bio</h1>
            <p className="text-white/60 mb-8">Cuéntanos sobre ti (mínimo 10 caracteres)</p>

            <div className="relative mb-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Soy una persona apasionada por..."
                rows={5}
                maxLength={300}
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 resize-none"
              />
              <p className="absolute bottom-3 right-3 text-white/40 text-xs">
                {bio.length}/300
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-2">💡 Tips para una buena bio:</p>
              <ul className="space-y-1 text-white/40 text-xs">
                <li>• Menciona tus pasiones e intereses</li>
                <li>• Sé auténtico y específico</li>
                <li>• Usa humor si es tu estilo</li>
                <li>• Evita clichés como "me gusta viajar"</li>
              </ul>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Tus intereses</h1>
            <p className="text-white/60 mb-8">Selecciona al menos 3 (máximo 5)</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {availableInterests.map((interest) => (
                <motion.button
                  key={interest}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    interests.includes(interest)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  {interest}
                </motion.button>
              ))}
            </div>

            <p className="text-white/40 text-xs text-center">
              {interests.length}/5 seleccionados
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: canContinue() ? 1.02 : 1 }}
          whileTap={{ scale: canContinue() ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!canContinue()}
          className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-xl shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {step === 3 ? (
            <>
              <Check className="w-5 h-5" />
              Finalizar
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
