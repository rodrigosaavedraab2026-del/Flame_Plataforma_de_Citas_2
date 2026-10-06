import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Auth() {
  const { setScreen } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }
    if (password.length < 6) {
      setError('Mínimo 6 caracteres');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen('onboarding');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col">
      <button onClick={() => setScreen('welcome')} className="flex items-center gap-2 text-white/60 mb-8">
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-2">
          {mode === 'login' ? 'Bienvenido' : 'Crear cuenta'}
        </h1>
        <p className="text-white/60 mb-8">
          {mode === 'login' ? 'Inicia sesión' : 'Únete a Flama'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-white/60 text-sm mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
              />
            </div>
          </div>

          <div>
            <label className="text-white/60 text-sm mb-2 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </motion.button>
        </div>

        <p className="text-white/60 text-sm text-center mt-6">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-pink-400 font-semibold">
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
