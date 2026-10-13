import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, X, Plus, Edit3 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function EditProfile() {
  const { setScreen, user, updateProfile, profilePhotos, addPhoto, removePhoto } = useStore();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState('Apasionado por la tecnología y los viajes. Busco conexiones reales.');
  const [interests, setInterests] = useState(['Tecnología', 'Viajes', 'Café', 'Fotografía']);
  const [zodiac, setZodiac] = useState('♏ Escorpio');
  const [anthem, setAnthem] = useState('🎵 Coldplay - Yellow');

  const availableInterests = ['Tecnología', 'Viajes', 'Café', 'Fotografía', 'Música', 'Deportes', 'Arte', 'Cocina', 'Lectura', 'Yoga', 'Cine', 'Naturaleza'];

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else if (interests.length < 6) {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = () => {
    if (user) {
      updateProfile({ name });
    }
    setScreen('profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Editar Perfil</h1>
        <button onClick={handleSave} className="text-pink-400 font-semibold">
          Guardar
        </button>
      </div>

      <div className="space-y-6">
        {/* Photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">Fotos</h3>
          <div className="grid grid-cols-3 gap-2">
            {profilePhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-pink-500 rounded-full text-[10px] text-white font-semibold">
                    Principal
                  </div>
                )}
              </div>
            ))}
            {profilePhotos.length < 6 && (
              <button
                onClick={() => addPhoto('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400')}
                className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <Plus className="w-6 h-6 text-white/40" />
              </button>
            )}
          </div>
          <p className="text-white/40 text-xs mt-2">
            {profilePhotos.length}/6 fotos • La primera será tu foto principal
          </p>
        </motion.div>

        {/* Basic info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">Información básica</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={300}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 resize-none"
              />
              <p className="text-white/40 text-xs mt-1">{bio.length}/300</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">Intereses ({interests.length}/6)</h3>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  interests.includes(interest)
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/15'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">Detalles</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Signo zodiacal</label>
              <input
                type="text"
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-2 block">Himno musical</label>
              <input
                type="text"
                value={anthem}
                onChange={(e) => setAnthem(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
