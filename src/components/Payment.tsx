import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, Shield, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const tierNames: Record<string, string> = {
  plus: 'Plus',
  gold: 'Gold',
  platinum: 'Platinum',
  select: 'SELECT™',
};

const tierPrices: Record<string, number> = {
  plus: 14.99,
  gold: 29.99,
  platinum: 49.99,
  select: 99.99,
};

export default function Payment() {
  const { membership, setScreen, setPaymentSuccess } = useStore();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '');
    const matches = v.match(/.{1,4}/g);
    return matches ? matches.join(' ').substring(0, 19) : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setPaymentSuccess(true);
      setTimeout(() => {
        setScreen('swipe');
      }, 2500);
    }, 2000);
  };

  const isValid = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvc.length >= 3 && name.length > 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Back button */}
      <button
        onClick={() => setScreen('membership')}
        className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Volver</span>
      </button>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Pago seguro</h1>
              <p className="text-white/60 text-sm mt-1">Tu información está protegida con cifrado SSL</p>
            </div>

            {/* Order summary */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Membresía {tierNames[membership]}</p>
                  <p className="text-white/50 text-sm">Facturación mensual</p>
                </div>
                <p className="text-2xl font-bold text-white">${tierPrices[membership]?.toFixed(2)}</p>
              </div>
              <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                <span className="text-white/60 text-sm">Total hoy</span>
                <span className="text-white font-bold">${tierPrices[membership]?.toFixed(2)}</span>
              </div>
            </div>

            {/* Card form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-4">
              {/* Card number */}
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Número de tarjeta</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                </div>
              </div>

              {/* Expiry and CVC */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Vencimiento</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    placeholder="123"
                    maxLength={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Nombre en la tarjeta</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                />
              </div>
            </div>

            {/* Security badges */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>SSL 256-bit</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40 text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>PCI DSS</span>
              </div>
            </div>

            {/* Pay button */}
            <motion.button
              whileHover={{ scale: isValid ? 1.02 : 1 }}
              whileTap={{ scale: isValid ? 0.98 : 1 }}
              onClick={handleSubmit}
              disabled={!isValid || processing}
              className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg transition-all ${
                isValid
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl shadow-pink-500/20'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Procesando...
                </span>
              ) : (
                `Pagar $${tierPrices[membership]?.toFixed(2)}`
              )}
            </motion.button>

            {/* Guarantee */}
            <p className="text-center text-white/40 text-xs mt-4">
              🔒 Garantía de devolución de 7 días. Cancela cuando quieras.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Pago exitoso!</h2>
            <p className="text-white/60">
              Tu membresía {tierNames[membership]} está activa
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-4xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
