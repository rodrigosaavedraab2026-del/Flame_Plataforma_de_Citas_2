import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gift, Heart, Star, Crown, Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function GiftMarketplace() {
  const { setScreen, addToast, membership } = useStore();
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [recipient, setRecipient] = useState('');

  const gifts = [
    { id: 1, name: 'Rosa Roja', emoji: '🌹', price: 2.99, description: 'Una rosa roja clásica', color: 'from-red-500 to-pink-500' },
    { id: 2, name: 'Corazón Dorado', emoji: '💛', price: 4.99, description: 'Un corazón brillante', color: 'from-yellow-400 to-orange-500' },
    { id: 3, name: 'Copa de Champagne', emoji: '🥂', price: 6.99, description: 'Brindemos juntos', color: 'from-amber-400 to-yellow-600' },
    { id: 4, name: 'Diamante', emoji: '💎', price: 9.99, description: 'Para alguien especial', color: 'from-cyan-400 to-blue-500' },
    { id: 5, name: 'Corona Real', emoji: '👑', price: 14.99, description: 'Trata como realeza', color: 'from-yellow-500 to-amber-600' },
    { id: 6, name: 'Cohete', emoji: '🚀', price: 19.99, description: 'Lleva tu match a la luna', color: 'from-purple-500 to-pink-500' },
    { id: 7, name: 'Unicornio', emoji: '🦄', price: 24.99, description: 'Mágico y único', color: 'from-pink-400 to-purple-500' },
    { id: 8, name: 'Estrella Fugaz', emoji: '🌟', price: 29.99, description: 'Pide un deseo', color: 'from-yellow-300 to-orange-400' },
  ];

  const handleSendGift = (gift: typeof gifts[0]) => {
    if (!recipient) {
      addToast({ type: 'warning', message: 'Selecciona un destinatario' });
      return;
    }
    addToast({ type: 'success', message: `¡${gift.emoji} enviado a ${recipient}!` });
    setSelectedGift(null);
    setRecipient('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Marketplace de Regalos</h1>
      </div>

      <div className="p-4">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 border border-pink-500/30 mb-6"
        >
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-pink-400" />
            <div>
              <h2 className="text-white font-semibold">Sorprende a tu match</h2>
              <p className="text-white/60 text-sm">Envía regalos virtuales para destacar</p>
            </div>
          </div>
        </motion.div>

        {/* Gifts grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {gifts.map((gift, index) => (
            <motion.button
              key={gift.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedGift(gift.id)}
              className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left"
            >
              <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${gift.color} flex items-center justify-center mb-3`}>
                <span className="text-5xl">{gift.emoji}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{gift.name}</h3>
              <p className="text-white/60 text-xs mb-2">{gift.description}</p>
              <p className="text-pink-400 font-bold">${gift.price.toFixed(2)}</p>
            </motion.button>
          ))}
        </div>

        {/* Send gift modal */}
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-end justify-center z-50"
            onClick={() => setSelectedGift(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-t-3xl p-6 w-full max-w-lg border-t border-white/10"
            >
              {(() => {
                const gift = gifts.find(g => g.id === selectedGift);
                if (!gift) return null;
                return (
                  <>
                    <div className="text-center mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gift.color} flex items-center justify-center mx-auto mb-3`}>
                        <span className="text-4xl">{gift.emoji}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl">{gift.name}</h3>
                      <p className="text-pink-400 font-bold text-lg">${gift.price.toFixed(2)}</p>
                    </div>

                    <div className="mb-4">
                      <label className="text-white/60 text-sm mb-2 block">Enviar a:</label>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Nombre del match"
                        className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 border border-white/20"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedGift(null)}
                        className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleSendGift(gift)}
                        className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl"
                      >
                        Enviar {gift.emoji}
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
