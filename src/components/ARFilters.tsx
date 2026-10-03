import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Sparkles, RotateCw, Download, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ARFilters() {
  const { setScreen, addToast } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);

  const filters = [
    { id: 'glow', name: 'Brillo Natural', emoji: '✨', color: 'from-yellow-400 to-orange-500' },
    { id: 'smooth', name: 'Piel Suave', emoji: '🌸', color: 'from-pink-400 to-rose-500' },
    { id: 'vintage', name: 'Vintage', emoji: '📷', color: 'from-amber-600 to-orange-700' },
    { id: 'neon', name: 'Neon', emoji: '🌈', color: 'from-purple-500 to-pink-500' },
    { id: 'bw', name: 'Blanco y Negro', emoji: '⚫', color: 'from-gray-600 to-gray-800' },
    { id: 'warm', name: 'Cálido', emoji: '🔥', color: 'from-orange-400 to-red-500' },
    { id: 'cool', name: 'Frío', emoji: '❄️', color: 'from-blue-400 to-cyan-500' },
    { id: 'dreamy', name: 'Soñador', emoji: '💭', color: 'from-purple-400 to-pink-400' },
  ];

  const applyFilter = () => {
    if (!selectedFilter) {
      addToast({ type: 'warning', message: 'Selecciona un filtro primero' });
      return;
    }
    addToast({ type: 'success', message: '¡Filtro aplicado!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Filtros AR</h1>
      </div>

      <div className="p-4">
        {/* Camera preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500 to-pink-500"
        >
          {/* Simulated camera feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/60">Vista previa de la cámara</p>
            </div>
          </div>

          {/* Filter overlay */}
          {selectedFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: intensity / 100 }}
              className={`absolute inset-0 bg-gradient-to-br ${
                filters.find(f => f.id === selectedFilter)?.color
              } mix-blend-overlay`}
            />
          )}

          {/* Filter name */}
          {selectedFilter && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <p className="text-white text-sm font-medium">
                {filters.find(f => f.id === selectedFilter)?.name}
              </p>
            </div>
          )}
        </motion.div>

        {/* Intensity slider */}
        {selectedFilter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6"
          >
            <label className="text-white/60 text-sm mb-2 block">Intensidad: {intensity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </motion.div>
        )}

        {/* Filters grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedFilter(filter.id)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${
                selectedFilter === filter.id
                  ? 'ring-2 ring-pink-500'
                  : ''
              }`}
            >
              <div className={`w-full h-full rounded-xl bg-gradient-to-br ${filter.color} flex items-center justify-center`}>
                <span className="text-3xl">{filter.emoji}</span>
              </div>
              <span className="text-white text-xs mt-1">{filter.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedFilter(null)}
            className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <RotateCw className="w-5 h-5" />
            Resetear
          </button>
          <button
            onClick={applyFilter}
            className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
