import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Flag } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function AIModeration() {
  const { setScreen, addToast } = useStore();
  const [scannedContent, setScannedContent] = useState(false);
  const [moderationResults, setModerationResults] = useState({
    totalScanned: 1247,
    flagged: 23,
    blocked: 8,
    accuracy: 98.7,
    recentFlags: [
      { id: 1, type: 'spam', severity: 'low', status: 'removed', time: 'Hace 2h' },
      { id: 2, type: 'inappropriate', severity: 'high', status: 'blocked', time: 'Hace 5h' },
      { id: 3, type: 'fake_profile', severity: 'medium', status: 'under_review', time: 'Hace 1d' },
      { id: 4, type: 'harassment', severity: 'high', status: 'blocked', time: 'Hace 1d' },
      { id: 5, type: 'spam', severity: 'low', status: 'removed', time: 'Hace 2d' },
    ],
  });

  const scanContent = () => {
    setScannedContent(true);
    addToast({ type: 'success', message: 'Escaneo completado' });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-400 bg-yellow-400/20';
      case 'medium': return 'text-orange-400 bg-orange-400/20';
      case 'high': return 'text-red-400 bg-red-400/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'removed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'blocked': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'under_review': return <Eye className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => setScreen('settings')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Moderación IA</h1>
      </div>

      <div className="p-4">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30 mb-6"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-400" />
            <div>
              <h2 className="text-white font-semibold">Protección activa</h2>
              <p className="text-white/60 text-sm">IA moderando contenido 24/7</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <p className="text-white/60 text-sm mb-1">Contenido escaneado</p>
            <p className="text-white text-2xl font-bold">{moderationResults.totalScanned}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <p className="text-white/60 text-sm mb-1">Precisión IA</p>
            <p className="text-green-400 text-2xl font-bold">{moderationResults.accuracy}%</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <p className="text-white/60 text-sm mb-1">Contenido marcado</p>
            <p className="text-yellow-400 text-2xl font-bold">{moderationResults.flagged}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
          >
            <p className="text-white/60 text-sm mb-1">Usuarios bloqueados</p>
            <p className="text-red-400 text-2xl font-bold">{moderationResults.blocked}</p>
          </motion.div>
        </div>

        {/* Recent flags */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
          <h2 className="text-white font-semibold mb-4">Actividad reciente</h2>
          <div className="space-y-3">
            {moderationResults.recentFlags.map((flag, index) => (
              <motion.div
                key={flag.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
              >
                <Flag className="w-5 h-5 text-white/40" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium capitalize">{flag.type.replace('_', ' ')}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(flag.severity)}`}>
                      {flag.severity}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{flag.time}</p>
                </div>
                {getStatusIcon(flag.status)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scan button */}
        {!scannedContent && (
          <button
            onClick={scanContent}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl"
          >
            Escanear contenido ahora
          </button>
        )}

        {/* Info */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="text-white font-semibold mb-2">¿Qué moderamos?</h3>
          <ul className="space-y-2 text-white/60 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Fotos inapropiadas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Mensajes de acoso
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Perfiles falsos
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Spam y scams
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Contenido violento
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
