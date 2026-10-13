import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Plus, X, Calendar, MapPin, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function GroupMode() {
  const { setScreen, addToast } = useStore();
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Noche de Karaoke',
      members: ['Tú', 'Valentina', 'Camila'],
      date: 'Sábado 8PM',
      location: 'Karaoke Box, Centro',
      status: 'active',
    },
    {
      id: 2,
      name: 'Ruta de Tapas',
      members: ['Tú', 'Sofía', 'Isabella', 'Mariana'],
      date: 'Domingo 2PM',
      location: 'Barrio Latino',
      status: 'planned',
    },
  ]);
  const [showCreate, setShowCreate] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const availableMembers = ['Valentina', 'Camila', 'Sofía', 'Isabella', 'Mariana', 'Luciana', 'Daniela', 'Andrea'];

  const createGroup = () => {
    if (!newGroupName || selectedMembers.length === 0) {
      addToast({ type: 'warning', message: 'Completa todos los campos' });
      return;
    }
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      members: ['Tú', ...selectedMembers],
      date: 'Próximamente',
      location: 'Por definir',
      status: 'planned',
    };
    setGroups([...groups, newGroup]);
    setShowCreate(false);
    setNewGroupName('');
    setSelectedMembers([]);
    addToast({ type: 'success', message: '¡Grupo creado!' });
  };

  const toggleMember = (member: string) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter(m => m !== member));
    } else if (selectedMembers.length < 5) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Modo Grupo</h1>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="p-4">
        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30 mb-6"
        >
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-white font-semibold">Sal en grupo</h2>
              <p className="text-white/60 text-sm">Planifica salidas con tus matches</p>
            </div>
          </div>
        </motion.div>

        {/* Groups list */}
        <div className="space-y-4">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{group.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm">{group.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm">{group.location}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  group.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {group.status === 'active' ? 'Activo' : 'Planeado'}
                </span>
              </div>

              {/* Members */}
              <div className="flex items-center gap-2">
                {group.members.map((member, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-slate-900"
                    style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: group.members.length - i }}
                  >
                    {member[0]}
                  </div>
                ))}
                <span className="text-white/60 text-sm ml-2">{group.members.length} miembros</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-white/10 text-white text-sm font-semibold rounded-lg">
                  Ver detalles
                </button>
                <button className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold rounded-lg">
                  Invitar más
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No tienes grupos aún</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
            >
              Crear primer grupo
            </button>
          </div>
        )}
      </div>

      {/* Create group modal */}
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
              <h3 className="text-white font-bold text-xl">Crear grupo</h3>
              <button onClick={() => setShowCreate(false)} className="text-white/60">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-white/60 text-sm mb-2 block">Nombre del grupo</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Ej: Noche de cine"
                className="w-full bg-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 border border-white/20"
              />
            </div>

            <div className="mb-6">
              <label className="text-white/60 text-sm mb-2 block">
                Seleccionar miembros ({selectedMembers.length}/5)
              </label>
              <div className="space-y-2">
                {availableMembers.map((member) => (
                  <button
                    key={member}
                    onClick={() => toggleMember(member)}
                    className={`w-full p-3 rounded-xl text-left flex items-center gap-3 ${
                      selectedMembers.includes(member)
                        ? 'bg-pink-500/20 border-pink-500/50'
                        : 'bg-white/5 border-white/10'
                    } border`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {member[0]}
                    </div>
                    <span className="text-white">{member}</span>
                    {selectedMembers.includes(member) && (
                      <div className="ml-auto">
                        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={createGroup}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl"
            >
              Crear grupo
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
