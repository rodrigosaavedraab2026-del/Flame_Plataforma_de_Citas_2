import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Camera, Upload } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function VideoProfile() {
  const { setScreen, membership } = useStore();
  const [playingVideo, setPlayingVideo] = useState(false);
  const [muted, setMuted] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);

  const isPlatinumOrHigher = membership === 'platinum' || membership === 'select';

  if (!isPlatinumOrHigher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-6"
        >
          <Camera className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Perfiles de Vídeo</h2>
        <p className="text-white/60 mb-6 max-w-xs">
          Esta función está disponible para miembros Platinum y SELECT™
        </p>
        <button
          onClick={() => setScreen('membership')}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-full"
        >
          Actualizar plan
        </button>
        <button
          onClick={() => setScreen('profile')}
          className="mt-4 text-white/50 text-sm hover:text-white"
        >
          ← Volver
        </button>
      </div>
    );
  }

  if (selectedProfile) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <button onClick={() => setSelectedProfile(null)} className="text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="text-white font-semibold text-sm">{selectedProfile.name}</p>
            <p className="text-white/50 text-xs">Vídeo de perfil</p>
          </div>
          <div className="w-5" />
        </div>

        {/* Video player simulation */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full aspect-[9/16] max-h-screen bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative overflow-hidden">
            {/* Simulated video content */}
            <img
              src={selectedProfile.photos[0]}
              alt={selectedProfile.name}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Play/Pause overlay */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlayingVideo(!playingVideo)}
              className="absolute inset-0 flex items-center justify-center"
            >
              {!playingVideo && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.div>
              )}
            </motion.button>

            {/* Controls */}
            <div className="absolute bottom-20 left-4 right-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setMuted(!muted)} className="text-white/70">
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: playingVideo ? '100%' : '0%' }}
                    transition={{ duration: 30, ease: 'linear' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <span className="text-white/50 text-xs">0:30</span>
              </div>
            </div>

            {/* Profile info */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm">{selectedProfile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-white">Perfiles de Vídeo</h1>
          <p className="text-white/50 text-xs">Descubre personas en movimiento 🎬</p>
        </div>
      </div>

      {/* Upload your video */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-2xl p-5 border border-purple-500/20 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">Sube tu vídeo</h3>
            <p className="text-white/50 text-sm">Muestra tu personalidad en 30 segundos</p>
          </div>
          <button className="px-4 py-2 bg-purple-500 text-white text-sm font-semibold rounded-full">
            Subir
          </button>
        </div>
      </motion.div>

      {/* Video profiles grid */}
      <h3 className="text-white font-semibold mb-3">Vídeos destacados</h3>
      <div className="grid grid-cols-2 gap-3">
        {profiles.filter(p => p.verified).map((profile, index) => (
          <motion.button
            key={profile.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedProfile(profile)}
            className="aspect-[3/4] rounded-2xl overflow-hidden relative"
          >
            <img src={profile.photos[0]} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Play icon */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>

            {/* Name */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-semibold text-sm">{profile.name}, {profile.age}</p>
              <p className="text-white/60 text-xs truncate">{profile.bio}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
