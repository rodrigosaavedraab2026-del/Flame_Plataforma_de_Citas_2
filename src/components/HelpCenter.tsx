import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Shield, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';

const faqs = [
  {
    category: 'Cuenta',
    questions: [
      { q: '¿Cómo cambio mi contraseña?', a: 'Ve a Configuración > Seguridad > Cambiar contraseña. Necesitarás tu contraseña actual y la nueva.' },
      { q: '¿Cómo elimino mi cuenta?', a: 'Ve a Configuración > Cuenta > Eliminar cuenta. Ten en cuenta que esta acción es irreversible.' },
      { q: '¿Cómo verifico mi perfil?', a: 'Sube una selfie sosteniendo un papel con el código que te proporcionamos. La verificación tarda 24-48 horas.' },
    ],
  },
  {
    category: 'Membresías',
    questions: [
      { q: '¿Cómo cancelo mi suscripción?', a: 'Ve a Configuración > Suscripción > Cancelar. Mantendrás acceso hasta el final del período.' },
      { q: '¿Puedo cambiar de plan?', a: 'Sí, puedes actualizar o degradar tu plan en cualquier momento desde la sección Membresías.' },
      { q: '¿Hay garantía de devolución?', a: 'Sí, ofrecemos 7 días de garantía. Si no estás satisfecho, te reembolsamos el 100%.' },
    ],
  },
  {
    category: 'Seguridad',
    questions: [
      { q: '¿Cómo bloqueo a alguien?', a: 'En el perfil del usuario, toca los 3 puntos > Bloquear. No verás más su contenido.' },
      { q: '¿Cómo reporto comportamiento inapropiado?', a: 'En el perfil o chat, toca Reportar y selecciona el motivo. Nuestro equipo lo revisará.' },
      { q: '¿Mis datos están seguros?', a: 'Sí, usamos encriptación de extremo a extremo y cumplimos con GDPR y regulaciones de privacidad.' },
    ],
  },
  {
    category: 'Funciones',
    questions: [
      { q: '¿Qué es el Match con IA?', a: 'Nuestro algoritmo analiza compatibilidad basada en personalidad, valores e intereses para sugerirte matches ideales.' },
      { q: '¿Cómo funcionan los eventos?', a: 'Los eventos son actividades presenciales para conocer personas. Regístrate y asiste para socializar.' },
      { q: '¿Qué son los rompehielos?', a: 'Juegos interactivos que te ayudan a romper el hielo con tus matches y conocerlos mejor.' },
    ],
  },
];

export default function HelpCenter() {
  const { setScreen } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 mb-6">
        <button onClick={() => setScreen('profile')} className="text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-white">Centro de Ayuda</h1>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar ayuda..."
          className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500/50"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left"
        >
          <MessageCircle className="w-6 h-6 text-pink-400 mb-2" />
          <p className="text-white font-semibold text-sm">Contactar soporte</p>
          <p className="text-white/50 text-xs">Respuesta en 24h</p>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left"
        >
          <Shield className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-white font-semibold text-sm">Reportar problema</p>
          <p className="text-white/50 text-xs">Seguridad y privacidad</p>
        </motion.button>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        {faqs.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">{category.category}</h3>
            </div>
            <div className="divide-y divide-white/5">
              {category.questions.map((faq, qIndex) => {
                const faqId = `${catIndex}-${qIndex}`;
                const isExpanded = expandedFaq === faqId;
                
                return (
                  <div key={faqId}>
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white/80 text-sm pr-4">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-white/40 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-white/60 text-sm">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-5 border border-pink-500/20 text-center"
      >
        <h3 className="text-white font-semibold mb-2">¿No encontraste lo que buscabas?</h3>
        <p className="text-white/60 text-sm mb-4">Nuestro equipo de soporte está aquí para ayudarte</p>
        <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full text-sm">
          Contactar soporte
        </button>
      </motion.div>
    </div>
  );
}
