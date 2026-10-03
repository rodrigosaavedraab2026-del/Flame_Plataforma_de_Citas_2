import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Gift, Users, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Referral() {
  const { setScreen, referralCode, referralCount, incrementReferral } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const message = `¡Únete a Flama! Usa mi código ${referralCode} y obtén 1 mes gratis de Gold 🎉`;
    // In production, this would open share dialogs
    console.log(`Sharing to ${platform}: ${message}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Invita Amigos</h1>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl p-6 border border-pink-500/30 mb-6"
      >
        <div className="text-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-3"
          >
            🎁
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Gana 1 mes gratis</h2>
          <p className="text-white/70 text-sm">
            Por cada amigo que se registre con tu código
          </p>
        </div>

        {/* Referral code */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <p className="text-white/60 text-xs mb-2">Tu código de referido</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-white tracking-wider">{referralCode}</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{referralCount}</p>
            <p className="text-white/60 text-xs">Amigos invitados</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{referralCount}</p>
            <p className="text-white/60 text-xs">Meses ganados</p>
          </div>
        </div>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6"
      >
        <h3 className="text-white font-semibold mb-4">¿Cómo funciona?</h3>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Comparte tu código', desc: 'Envía tu código único a amigos' },
            { step: 2, title: 'Ellos se registran', desc: 'Tus amigos crean su cuenta con tu código' },
            { step: 3, title: 'Ambos ganan', desc: 'Tú recibes 1 mes gratis de Gold' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{item.step}</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-white/50 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Share buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-white font-semibold mb-4">Compartir en</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'WhatsApp', emoji: '💬', color: 'from-green-500 to-green-600' },
            { name: 'Instagram', emoji: '📸', color: 'from-pink-500 to-purple-500' },
            { name: 'Twitter', emoji: '🐦', color: 'from-blue-400 to-blue-500' },
            { name: 'Email', emoji: '📧', color: 'from-red-500 to-red-600' },
          ].map((platform) => (
            <motion.button
              key={platform.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare(platform.name)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                <span className="text-2xl">{platform.emoji}</span>
              </div>
              <span className="text-white/60 text-xs">{platform.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Terms */}
      <p className="text-white/30 text-xs text-center mt-6">
        *Máximo 12 meses gratis por año. Válido para nuevos usuarios.
      </p>
    </div>
  );
}
