import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Plus, X, Video, Coffee } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function DateScheduler() {
  const { setScreen, addToast } = useStore();
  const [dates, setDates] = useState([
    {
      id: 1,
      with: 'Valentina',
      date: '2026-03-15',
      time: '19:00',
      type: 'coffee',
      location: 'Café Central',
      status: 'confirmed',
    },
    {
      id: 2,
      with: 'Camila',
      date: '2026-03-18',
      time: '20:30',
      type: 'video',
      location: 'Videollamada',
      status: 'pending',
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newDate, setNewDate] = useState({
    with: '',
    date: '',
    time: '',
    type: 'coffee',
    location: '',
  });

  const dateTypes = [
    { id: 'coffee', label: 'Café', icon: Coffee, color: 'text-amber-500' },
    { id: 'dinner', label: 'Cena', icon: Coffee, color: 'text-red-500' },
    { id: 'video', label: 'Videollamada', icon: Video, color: 'text-blue-500' },
    { id: 'walk', label: 'Caminata', icon: MapPin, color: 'text-green-500' },
  ];

  const createSchedule = () => {
    if (!newDate.with || !newDate.date || !newDate.time || !newDate.location) {
      addToast({ type: 'warning', message: 'Completa todos los campos' });
      return;
    }
    const schedule = {
      id: dates.length + 1,
      ...newDate,
      status: 'pending',
    };
    setDates([...dates, schedule]);
    setShowCreate(false);
    setNewDate({ with: '', date: '', time: '', type: 'coffee', location: '' });
    addToast({ type: 'success', message: '¡Cita programada!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Mis Citas</h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="p-4">
        {/* Calendar view */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Marzo 2026</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                ←
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
              <div key={day} className="text-white/40 text-sm font-medium">
                {day}
              </div>
            ))}
            {[...Array(31)].map((_, i) => {
              const dayNum = i + 1;
              const hasDate = dates.some(d => {
                const dateObj = new Date(d.date);
                return dateObj.getDate() === dayNum && dateObj.getMonth() === 2;
              });
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                    hasDate
                      ? 'bg-pink-500 text-white font-bold'
                      : 'bg-white/5 text-white/60'
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming dates */}
        <h2 className="text-white font-semibold mb-3">Próximas citas</h2>
        <div className="space-y-3">
          {dates.map((date, index) => {
            const dateType = dateTypes.find(t => t.id === date.type);
            const Icon = dateType?.icon || Coffee;
            return (
              <motion.div
                key={date.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${dateType?.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-bold">Cita con {date.with}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        date.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {date.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(date.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{date.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{date.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg">
                    Ver detalles
                  </button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-lg">
                    Confirmar
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {dates.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No tienes citas programadas</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
            >
              Programar primera cita
            </button>
          </div>
        )}
      </div>

      {/* Create date modal */}
      {showCreate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-end justify-center z-50"
          onClick={() => setShowCreate(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-t-3xl p-6 w-full max-w-lg border-t border-white/10 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">Programar cita</h3>
              <button onClick={() => setShowCreate(false)} className="text-white/60">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Con quién</label>
                <input
                  type="text"
                  value={newDate.with}
                  onChange={(e) => setNewDate({ ...newDate, with: e.target.value })}
                  placeholder="Nombre del match"
                  className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 border border-white/20"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Tipo de cita</label>
                <div className="grid grid-cols-2 gap-2">
                  {dateTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setNewDate({ ...newDate, type: type.id })}
                        className={`p-3 rounded-xl flex items-center gap-2 ${
                          newDate.type === type.id
                            ? 'bg-pink-500/20 border-pink-500/50'
                            : 'bg-white/5 border-white/10'
                        } border`}
                      >
                        <Icon className={`w-5 h-5 ${type.color}`} />
                        <span className="text-white text-sm">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Fecha</label>
                  <input
                    type="date"
                    value={newDate.date}
                    onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white border border-white/20"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Hora</label>
                  <input
                    type="time"
                    value={newDate.time}
                    onChange={(e) => setNewDate({ ...newDate, time: e.target.value })}
                    className="w-full bg-white/10 rounded-xl px-4 py-3 text-white border border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Lugar</label>
                <input
                  type="text"
                  value={newDate.location}
                  onChange={(e) => setNewDate({ ...newDate, location: e.target.value })}
                  placeholder="Nombre del lugar"
                  className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 border border-white/20"
                />
              </div>
            </div>

            <button
              onClick={createSchedule}
              className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl"
            >
              Programar cita
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
