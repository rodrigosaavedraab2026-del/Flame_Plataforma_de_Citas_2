import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Toast() {
  const { toasts, removeToast } = useStore();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-amber-500',
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 space-y-2 max-w-md w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className={`bg-gradient-to-r ${colors[toast.type]} rounded-xl p-4 shadow-2xl flex items-center gap-3`}
            >
              <Icon className="w-5 h-5 text-white flex-shrink-0" />
              <p className="text-white text-sm font-medium flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
