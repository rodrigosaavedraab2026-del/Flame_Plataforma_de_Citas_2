import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowLeft, Crown, X, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

const categoryColors: Record<string, string> = {
  dating: 'from-pink-500 to-rose-500',
  social: 'from-blue-500 to-cyan-500',
  networking: 'from-green-500 to-emerald-500',
  fun: 'from-yellow-500 to-amber-500',
};

const categoryLabels: Record<string, string> = {
  dating: 'Citas',
  social: 'Social',
  networking: 'Networking',
  fun: 'Diversión',
};

export default function Events() {
  const { events, registerEvent, selectedEventId, setSelectedEventId, setScreen } = useStore();
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      <AnimatePresence mode="wait">
        {selectedEvent ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Back */}
            <button
              onClick={() => setSelectedEventId(null)}
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors mb-4 pt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Volver</span>
            </button>

            {/* Event detail */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
              {/* Header image */}
              <div className={`h-48 bg-gradient-to-br ${categoryColors[selectedEvent.category]} flex items-center justify-center relative`}>
                <span className="text-7xl">{selectedEvent.image}</span>
                {selectedEvent.isVIP && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">VIP</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[selectedEvent.category]} text-white`}>
                    {categoryLabels[selectedEvent.category]}
                  </span>
                  {selectedEvent.price === 0 && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                      Gratis
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{selectedEvent.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-pink-400" />
                    <span className="text-white/80 text-sm">
                      {selectedEvent.date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                      {' • '}
                      {selectedEvent.date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-pink-400" />
                    <span className="text-white/80 text-sm">{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-pink-400" />
                    <span className="text-white/80 text-sm">
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees} asistentes
                    </span>
                  </div>
                </div>

                {/* Capacity bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-white/50 mb-1">
                    <span>Capacidad</span>
                    <span>{Math.round((selectedEvent.attendees / selectedEvent.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(selectedEvent.attendees / selectedEvent.maxAttendees) * 100}%` }}
                      className={`h-full rounded-full bg-gradient-to-r ${categoryColors[selectedEvent.category]}`}
                    />
                  </div>
                </div>

                {/* Price & Register */}
                <div className="flex items-center justify-between">
                  <div>
                    {selectedEvent.price > 0 ? (
                      <p className="text-2xl font-bold text-white">${selectedEvent.price.toFixed(2)}</p>
                    ) : (
                      <p className="text-2xl font-bold text-green-400">Gratis</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => registerEvent(selectedEvent.id)}
                    className={`px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 ${
                      selectedEvent.registered
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : `bg-gradient-to-r ${categoryColors[selectedEvent.category]} text-white`
                    }`}
                  >
                    {selectedEvent.registered ? (
                      <>
                        <Check className="w-4 h-4" />
                        Registrado
                      </>
                    ) : (
                      'Registrarse'
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="pt-4 mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">Eventos</h1>
              <p className="text-white/50 text-sm">Conoce personas en persona ✨</p>
            </div>

            {/* Events list */}
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.button
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedEventId(event.id)}
                  className="w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden text-left"
                >
                  <div className="flex">
                    {/* Image */}
                    <div className={`w-24 h-24 bg-gradient-to-br ${categoryColors[event.category]} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-3xl">{event.image}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r ${categoryColors[event.category]} text-white`}>
                          {categoryLabels[event.category]}
                        </span>
                        {event.isVIP && (
                          <Crown className="w-3 h-3 text-yellow-400" />
                        )}
                        {event.registered && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-green-500/20 text-green-400">
                            ✓ Registrado
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-1">{event.title}</h3>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                        <span>•</span>
                        <Users className="w-3 h-3" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <p className="text-white/60 text-xs mt-1">
                        {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Gratis'}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
