import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const tierPrices: Record<string, number> = { plus: 14.99, gold: 29.99, platinum: 49.99, select: 99.99 };

export default function Payment() {
  const { membership, setScreen } = useStore();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = (v: string) => {
    const matches = v.replace(/\s/g, '').replace(/\D/g, '').match(/.{1,4}/g);
    return matches ? matches.join(' ').substring(0, 19) : '';
  };

  const formatExpiry = (v: string) => {
    const clean = v.replace(/\D/g, '');
    return clean.length >= 2 ? clean.substring(0, 2) + '/' + clean.substring(2, 4) : clean;
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => setScreen('swipe'), 2500);
    }, 2000);
  };

  const isValid = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvc.length >= 3 && name.length > 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <button onClick={() => setScreen('membership')} className="flex items-center gap-1 text-white/60 mb-6">
        <ArrowLeft className="w-4 h-4" /><span className="text-sm">Volver</span>
      </button>

      {!success ? (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Pago seguro</h1>
            <p className="text-white/60 text-sm mt-1">Cifrado SSL 256-bit</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Membresía {membership}</p>
                <p className="text-white/50 text-sm">Facturación mensual</p>
              </div>
              <p className="text-2xl font-bold text-white">${tierPrices[membership]?.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Número de tarjeta</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Vencimiento</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/AA" maxLength={5} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50" />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">CVC</label>
                <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))} placeholder="123" maxLength={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50" />
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1.5 block">Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Juan Pérez" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-white/40 text-xs"><Lock className="w-3.5 h-3.5" /><span>SSL</span></div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs"><Shield className="w-3.5 h-3.5" /><span>PCI DSS</span></div>
          </div>

          <motion.button whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={!isValid || processing} className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg ${isValid ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/10 text-white/30'}`}>
            {processing ? 'Procesando...' : `Pagar $${tierPrices[membership]?.toFixed(2)}`}
          </motion.button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Pago exitoso!</h2>
          <p className="text-white/60">Tu membresía está activa</p>
        </motion.div>
      )}
    </div>
  );
}
