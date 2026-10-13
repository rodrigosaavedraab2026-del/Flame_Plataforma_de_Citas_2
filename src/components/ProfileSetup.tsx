import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Plus, X, MapPin, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

const allInterests = [
  'Viajes', 'Música', 'Cine', 'Deportes', 'Cocina', 'Lectura', 'Fotografía',
  'Arte', 'Tecnología', 'Yoga', 'Baile', 'Naturaleza', 'Café', 'Vinos',
  'Fitness', 'Meditación', 'Gaming', 'Moda', 'Animales', 'Aventura'
];

export default function ProfileSetup() {
  const { user, updateProfile, setScreen, addToast } = useStore();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [city, setCity] = useState('');

  const addPhoto = () => {
    // Simular subida de foto
    const fakeUrls = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    ];
    if (photos.length < 6) {
      const randomPhoto = fakeUrls[Math.floor(Math.random() * fakeUrls.length)];
      setPhotos([...photos, randomPhoto]);
    }
  };

  const removePhoto = (index: number) => {
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
    if (step === 1 && photos.length === 0) {
      addToast({ type: 'warning', message: 'Agrega al menos una foto' });
      return;
    }
    if (step === 2 && !bio.trim()) {
      addToast({ type: 'warning', message: 'Escribe algo sobre ti' });
      return;
    }
    if (step === 3 && interests.length === 0) {
      addToast({ type: 'warning', message: 'Selecciona al menos un interés' });
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Guardar perfil
      updateProfile({
        photos,
        bio,
        interests,
        location: { city: city || 'Madrid', country: 'España', lat: 40.4168, lng: -3.7038 },
        profileComplete: true,
      });
      addToast({ type: 'success', message: '¡Perfil creado exitosamente!' });
      setScreen('swipe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: step >= s ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>

      {/* Step 1: Photos */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Agrega tus fotos</h2>
            <p className="text-white/60">Muestra tu mejor lado (máximo 6 fotos)</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="aspect-square rounded-xl overflow-hidden relative"
              >
                <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            ))}
            {photos.length < 6 && (
              <button
                onClick={addPhoto}
                className="aspect-square rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-2 hover:border-pink-500/50 transition-colors"
              >
                <Plus className="w-8 h-8 text-white/50" />
                <span className="text-white/50 text-xs">Agregar</span>
              </button>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm text-center">
              💡 Tip: Las fotos claras y sonrientes tienen 3x más matches
            </p>
          </div>
        </motion.div>
      )}

      {/* Step 2: Bio */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Sobre ti</h2>
            <p className="text-white/60">Cuéntanos qué te hace especial</p>
          </div>

          <div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Escribe algo interesante sobre ti..."
              maxLength={500}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 min-h-[200px] resize-none"
            />
            <p className="text-white/40 text-sm mt-2 text-right">{bio.length}/500</p>
          </div>

          <div className="space-y-2">
            <p className="text-white/60 text-sm">Ideas para tu bio:</p>
            <div className="flex flex-wrap gap-2">
              {['Amante de los viajes', 'Foodie', 'Deportista', 'Creativo', 'Aventurero'].map((idea) => (
                <button
                  key={idea}
                  onClick={() => setBio(bio ? `${bio} ${idea}` : idea)}
                  className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/70 hover:bg-white/20 transition-colors"
                >
                  + {idea}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Interests */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Tus intereses</h2>
            <p className="text-white/60">Selecciona hasta 5 ({interests.length}/5)</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <motion.button
                key={interest}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  interests.includes(interest)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {interest}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 4: Location */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Tu ubicación</h2>
            <p className="text-white/60">¿Dónde te encuentras?</p>
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad"
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
            />
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/60 text-sm text-center">
              📍 Tu ubicación ayuda a encontrar personas cerca de ti
            </p>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl p-4 border border-pink-500/20">
            <h3 className="text-white font-semibold mb-3">Resumen de tu perfil</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Fotos</span>
                <span className="text-white">{photos.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Bio</span>
                <span className="text-white">{bio ? '✓' : '✗'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Intereses</span>
                <span className="text-white">{interests.length}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20"
          >
            Atrás
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-xl shadow-pink-500/20"
        >
          {step === 4 ? 'Completar perfil' : 'Siguiente'}
        </motion.button>
      </div>
    </div>
  );
}
