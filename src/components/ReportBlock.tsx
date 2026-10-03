import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Flag, Ban, AlertTriangle, Heart, MessageCircle, Camera, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

const reportReasons = [
  { id: 'spam', label: 'Spam o publicidad', icon: '📢' },
  { id: 'inappropriate', label: 'Contenido inapropiado', icon: '🚫' },
  { id: 'fake', label: 'Perfil falso', icon: '🎭' },
  { id: 'harassment', label: 'Acoso o mensajes ofensivos', icon: '⚠️' },
  { id: 'underage', label: 'Menor de edad', icon: '🔞' },
  { id: 'scam', label: 'Estafa o fraude', icon: '💰' },
  { id: 'other', label: 'Otro motivo', icon: '📝' },
];

interface ReportBlockProps {
  userId: number;
  userName: string;
  userAvatar: string;
  onClose: () => void;
}

export default function ReportBlock({ userId, userName, userAvatar, onClose }: ReportBlockProps) {
  const { setScreen, reportUser, blockUser, unblockUser, blockedUsers } = useStore();
  const [mode, setMode] = useState<'select' | 'report' | 'block'>('select');
  const [selectedReason, setSelectedReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isBlocked = blockedUsers.includes(userId);

  const handleSubmitReport = () => {
    if (selectedReason) {
      reportUser(userId, selectedReason);
      setSubmitted(true);
      setTimeout(onClose, 2000);
    }
  };

  const handleBlock = () => {
    if (isBlocked) {
      unblockUser(userId);
    } else {
      blockUser(userId);
    }
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-900 rounded-3xl p-6 border border-white/10"
      >
        {submitted ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4"
            >
              <Shield className="w-8 h-8 text-green-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">¡Enviado!</h3>
            <p className="text-white/60 text-sm">
              {mode === 'report' 
                ? 'Tu reporte será revisado por nuestro equipo'
                : 'Usuario bloqueado exitosamente'}
            </p>
          </div>
        ) : mode === 'select' ? (
          <>
            {/* User info */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{userName}</h3>
                <p className="text-white/50 text-xs">¿Qué deseas hacer?</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <button
                onClick={() => setMode('report')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Flag className="w-5 h-5 text-orange-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Reportar</p>
                  <p className="text-white/50 text-xs">Contenido inapropiado o comportamiento</p>
                </div>
              </button>

              <button
                onClick={() => setMode('block')}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Ban className="w-5 h-5 text-red-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">{isBlocked ? 'Desbloquear' : 'Bloquear'}</p>
                  <p className="text-white/50 text-xs">
                    {isBlocked ? 'Permitir ver su perfil nuevamente' : 'No verás su perfil ni mensajes'}
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-4 py-3 text-white/50 text-sm hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : mode === 'report' ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setMode('select')} className="text-white/60 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-white font-semibold">Reportar a {userName}</h3>
            </div>

            <div className="space-y-2 mb-6">
              {reportReasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedReason === reason.id
                      ? 'bg-pink-500/20 border border-pink-500/50'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{reason.icon}</span>
                  <span className="text-white text-sm">{reason.label}</span>
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitReport}
              disabled={!selectedReason}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl disabled:opacity-50"
            >
              Enviar reporte
            </motion.button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setMode('select')} className="text-white/60 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-white font-semibold">
                {isBlocked ? 'Desbloquear' : 'Bloquear'} a {userName}
              </h3>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <p className="text-white/70 text-sm">
                {isBlocked
                  ? 'Si desbloqueas a este usuario, podrás ver su perfil y recibir mensajes.'
                  : 'Si bloqueas a este usuario, no podrán ver tu perfil ni enviarte mensajes. Tampoco aparecerán en tu feed.'}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBlock}
              className={`w-full py-3 font-semibold rounded-xl ${
                isBlocked
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              }`}
            >
              {isBlocked ? 'Desbloquear usuario' : 'Bloquear usuario'}
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
