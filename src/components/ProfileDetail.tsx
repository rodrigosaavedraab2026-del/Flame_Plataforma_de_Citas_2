import { motion } from 'framer-motion';
import { ArrowLeft, Heart, X, Star, MapPin, Shield, Flag, Ban, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function ProfileDetail() {
  const { setScreen, likeProfile, passProfile, addToast, blockUser, reportUser } = useStore();
  
  // Obtener el perfil actual de la pantalla de swipe
  const currentProfile = profiles[0]; // En producción, esto vendría del estado

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white/60">No hay perfil disponible</p>
      </div>
    );
  }

  const handleLike = () => {
    likeProfile(currentProfile.id);
    addToast({ type: 'success', message: `Le diste like a ${currentProfile.name}` });
    setScreen('swipe');
  };

  const handlePass = () => {
    passProfile(currentProfile.id);
    setScreen('swipe');
  };

  const handleBlock = () => {
    blockUser(currentProfile.id);
    addToast({ type: 'info', message: `${currentProfile.name} ha sido bloqueado` });
    setScreen('swipe');
  };

  const handleReport = () => {
    setScreen('report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header image */}
      <div className="relative h-96">
        <img
          src={currentProfile.photos[0]}
          alt={currentProfile.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => setScreen('swipe')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleReport}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <Flag className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleBlock}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <Ban className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-20 relative z-10">
        {/* Name and basic info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">{currentProfile.name}</h1>
            <span className="text-2xl text-white/80">{currentProfile.age}</span>
            {currentProfile.verified && (
              <Shield className="w-6 h-6 text-blue-400" />
            )}
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <MapPin className="w-4 h-4" />
            <span>{currentProfile.distance}</span>
            <span>•</span>
            <span>{currentProfile.zodiac}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-2">Sobre {currentProfile.name}</h3>
          <p className="text-white/70 leading-relaxed">{currentProfile.bio}</p>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3">Intereses</h3>
          <div className="flex flex-wrap gap-2">
            {currentProfile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Prompts */}
        {currentProfile.prompts && currentProfile.prompts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Prompts</h3>
            <div className="space-y-3">
              {currentProfile.prompts.map((prompt, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">{prompt.question}</p>
                  <p className="text-white">{prompt.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anthem */}
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-2">Himno musical</h3>
          <p className="text-white/70">{currentProfile.anthem}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 pb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePass}
            className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Pasar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-xl shadow-pink-500/20"
          >
            <Heart className="w-5 h-5" />
            Dar Like
          </motion.button>
        </div>
      </div>
    </div>
  );
}
