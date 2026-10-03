import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Lock, Eye, EyeOff, MapPin, Shield, Globe, Moon, Sun, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Settings() {
  const { setScreen, settings, updateSettings, logout, blockedUsers, membership } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Configuración</h1>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-pink-400" />
            <h3 className="text-white font-semibold">Notificaciones</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'matches', label: 'Matches' },
              { key: 'messages', label: 'Mensajes' },
              { key: 'likes', label: 'Me gusta' },
              { key: 'events', label: 'Eventos' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-white/70 text-sm">{item.label}</span>
                <button
                  onClick={() => updateSettings({
                    notifications: {
                      ...settings.notifications,
                      [item.key]: !settings.notifications[item.key as keyof typeof settings.notifications]
                    }
                  })}
                  className={`w-12 h-6 rounded-full transition-all ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? 'bg-pink-500'
                      : 'bg-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications[item.key as keyof typeof settings.notifications]
                      ? 'translate-x-6'
                      : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold">Privacidad</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Mostrar distancia</span>
              <button
                onClick={() => updateSettings({
                  privacy: { ...settings.privacy, showDistance: !settings.privacy.showDistance }
                })}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.privacy.showDistance ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privacy.showDistance ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Mostrar edad</span>
              <button
                onClick={() => updateSettings({
                  privacy: { ...settings.privacy, showAge: !settings.privacy.showAge }
                })}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.privacy.showAge ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privacy.showAge ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/70 text-sm">Modo incógnito</span>
                {membership === 'free' && (
                  <p className="text-white/40 text-xs">Solo Premium</p>
                )}
              </div>
              <button
                onClick={() => {
                  if (membership !== 'free') {
                    updateSettings({
                      privacy: { ...settings.privacy, incognitoMode: !settings.privacy.incognitoMode }
                    });
                  } else {
                    setScreen('membership');
                  }
                }}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.privacy.incognitoMode ? 'bg-purple-500' : 'bg-white/20'
                } ${membership === 'free' ? 'opacity-50' : ''}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privacy.incognitoMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Preferencias</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Idioma</span>
              <select
                value={settings.preferences.language}
                onChange={(e) => updateSettings({
                  preferences: { ...settings.preferences, language: e.target.value }
                })}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Tema</span>
              <button
                onClick={() => updateSettings({
                  preferences: {
                    ...settings.preferences,
                    theme: settings.preferences.theme === 'dark' ? 'light' : 'dark'
                  }
                })}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5"
              >
                {settings.preferences.theme === 'dark' ? (
                  <>
                    <Moon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Oscuro</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">Claro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blocked users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-white font-semibold">Usuarios bloqueados</h3>
          </div>
          {blockedUsers.length === 0 ? (
            <p className="text-white/50 text-sm">No has bloqueado a nadie</p>
          ) : (
            <p className="text-white/70 text-sm">{blockedUsers.length} usuarios bloqueados</p>
          )}
          <button
            onClick={() => setScreen('profile')}
            className="mt-3 text-pink-400 text-sm hover:text-pink-300"
          >
            Gestionar bloqueos →
          </button>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-white/70 text-sm hover:text-white transition-colors">
              Términos de Servicio
            </button>
            <button className="w-full text-left text-white/70 text-sm hover:text-white transition-colors">
              Política de Privacidad
            </button>
            <button className="w-full text-left text-white/70 text-sm hover:text-white transition-colors">
              Política de Cookies
            </button>
            <button className="w-full text-left text-white/70 text-sm hover:text-white transition-colors">
              Directrices de la Comunidad
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Cerrar sesión</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-white/30 text-xs mt-6">
          Flama v2.0.0 • Build 2026.1
        </p>
      </div>
    </div>
  );
}
