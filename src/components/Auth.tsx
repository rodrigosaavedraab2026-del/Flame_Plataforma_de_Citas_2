import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Calendar, ArrowLeft, Eye, EyeOff, Globe, Smartphone, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Auth() {
  const { setScreen, login, register } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerAge, setRegisterAge] = useState('');
  const [registerGender, setRegisterGender] = useState<'male' | 'female' | 'other'>('male');
  const [registerLookingFor, setRegisterLookingFor] = useState<'male' | 'female' | 'everyone'>('female');
  const [step, setStep] = useState(1);

  const handleLogin = async () => {
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (loginPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setLoading(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        setScreen('swipe');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    
    if (step === 1) {
      if (!registerName || !registerEmail || !registerPassword) {
        setError('Por favor completa todos los campos');
        return;
      }
      if (registerPassword.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!registerAge) {
        setError('Por favor ingresa tu edad');
        return;
      }
      const age = parseInt(registerAge);
      if (age < 18 || age > 99) {
        setError('Debes tener al menos 18 años');
        return;
      }
      setStep(3);
      return;
    }
    
    if (step === 3) {
      setLoading(true);
      try {
        const success = await register({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          age: parseInt(registerAge),
          gender: registerGender,
          lookingFor: registerLookingFor,
        });
        if (success) {
          setScreen('profileSetup');
        } else {
          setError('Error al crear la cuenta');
        }
      } catch (err) {
        setError('Error al crear la cuenta');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen('swipe');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col">
      {/* Header */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setScreen('welcome')}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 self-start"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </motion.button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Crear cuenta'}
          </h1>
          <p className="text-white/60">
            {mode === 'login' ? 'Inicia sesión para continuar' : 'Únete a la comunidad Flama'}
          </p>
        </motion.div>

        {/* Social login buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 mb-6"
        >
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-medium transition-all disabled:opacity-50"
          >
            <Globe className="w-5 h-5" />
            Continuar con Google
          </button>
          <button
            onClick={() => handleSocialLogin('apple')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-medium transition-all disabled:opacity-50"
          >
            <Smartphone className="w-5 h-5" />
            Continuar con Apple
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-medium transition-all disabled:opacity-50"
          >
            <Share2 className="w-5 h-5" />
            Continuar con Facebook
          </button>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/40 text-sm">o</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Form */}
        {mode === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/60 text-sm mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Forgot password */}
            <button className="text-pink-400 text-sm hover:text-pink-300 transition-colors">
              ¿Olvidaste tu contraseña?
            </button>

            {/* Login button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-xl shadow-xl shadow-pink-500/20 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Progress */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ width: '0%' }}
                    animate={{ width: step >= s ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Age */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Edad</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="number"
                      value={registerAge}
                      onChange={(e) => setRegisterAge(e.target.value)}
                      placeholder="Tu edad"
                      min="18"
                      max="99"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Soy</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'male', label: 'Hombre' },
                      { value: 'female', label: 'Mujer' },
                      { value: 'other', label: 'Otro' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRegisterGender(option.value as 'male' | 'female' | 'other')}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          registerGender === option.value
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/15'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Looking for */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Me interesa conocer</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'male', label: 'Hombres' },
                      { value: 'female', label: 'Mujeres' },
                      { value: 'everyone', label: 'Todos' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRegisterLookingFor(option.value as 'male' | 'female' | 'everyone')}
                        className={`py-3 rounded-xl font-medium transition-all ${
                          registerLookingFor === option.value
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/15'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm text-center">
                    💡 Puedes cambiar estas preferencias más tarde en tu perfil
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20"
                >
                  Atrás
                </button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-xl shadow-pink-500/20 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Creando cuenta...
                  </span>
                ) : step === 3 ? (
                  'Crear cuenta'
                ) : (
                  'Siguiente'
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Switch mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-white/60 text-sm">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
                setStep(1);
              }}
              className="text-pink-400 font-semibold hover:text-pink-300 transition-colors"
            >
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </motion.div>
      </div>

      {/* Terms */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/30 text-xs text-center mt-8"
      >
        Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
      </motion.p>
    </div>
  );
}
