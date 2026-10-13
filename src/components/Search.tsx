import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search as SearchIcon, Sliders, MapPin, Shield, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function Search() {
  const { setScreen, searchFilters, setSearchFilters } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profiles.filter((profile) => {
    if (searchQuery && !profile.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (searchFilters.verified && !profile.verified) {
      return false;
    }
    if (searchFilters.interests.length > 0) {
      const hasInterest = searchFilters.interests.some(interest =>
        profile.interests.includes(interest)
      );
      if (!hasInterest) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('swipe')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Buscar</h1>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
            showFilters ? 'bg-pink-500' : 'bg-white/10 border border-white/20'
          }`}
        >
          <Sliders className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6"
        >
          <h3 className="text-white font-semibold mb-4">Filtros</h3>
          
          {/* Age range */}
          <div className="mb-4">
            <label className="text-white/60 text-sm mb-2 block">Rango de edad</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={searchFilters.ageRange[0]}
                onChange={(e) => setSearchFilters({ ageRange: [parseInt(e.target.value), searchFilters.ageRange[1]] })}
                className="w-20 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
                min="18"
                max="99"
              />
              <span className="text-white/40">-</span>
              <input
                type="number"
                value={searchFilters.ageRange[1]}
                onChange={(e) => setSearchFilters({ ageRange: [searchFilters.ageRange[0], parseInt(e.target.value)] })}
                className="w-20 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-center"
                min="18"
                max="99"
              />
            </div>
          </div>

          {/* Distance */}
          <div className="mb-4">
            <label className="text-white/60 text-sm mb-2 block">Distancia máxima</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="100"
                value={searchFilters.distance}
                onChange={(e) => setSearchFilters({ distance: parseInt(e.target.value) })}
                className="flex-1 accent-pink-500"
              />
              <span className="text-white font-bold w-16 text-right">{searchFilters.distance} km</span>
            </div>
          </div>

          {/* Verified only */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-white/70 text-sm">Solo verificados</span>
            </div>
            <button
              onClick={() => setSearchFilters({ verified: !searchFilters.verified })}
              className={`w-12 h-6 rounded-full transition-all ${
                searchFilters.verified ? 'bg-blue-500' : 'bg-white/20'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                searchFilters.verified ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {profile.verified && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-semibold">{profile.name}, {profile.age}</p>
              <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
                <MapPin className="w-3 h-3" />
                <span>{profile.distance}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-white font-semibold mb-2">Sin resultados</h3>
          <p className="text-white/50 text-sm">Intenta ajustar los filtros</p>
        </div>
      )}
    </div>
  );
}
