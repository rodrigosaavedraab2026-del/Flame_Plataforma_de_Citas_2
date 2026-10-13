import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Video, Mic, MicOff, VideoOff, Phone, X, MessageCircle, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { profiles } from '../data/profiles';

export default function VideoCall() {
  const { setScreen, addToast } = useStore();
  const [callState, setCallState] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'them'; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const currentProfile = profiles[0];

  // Simulate call connection
  useState(() => {
    setTimeout(() => setCallState('connected'), 2000);
  });

  // Call duration timer
  useState(() => {
    if (callState === 'connected') {
      const interval = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { text: newMessage, sender: 'me', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
    
    // Simulate reply
    setTimeout(() => {
      const replies = ['¡Hola! 😊', 'Qué lindo verte', '¿Cómo estás?', '¡Me encanta esta llamada!'];
      setMessages((prev) => [...prev, { text: replies[Math.floor(Math.random() * replies.length)], sender: 'them', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  const endCall = () => {
    setCallState('ended');
    addToast({ type: 'info', message: 'Llamada finalizada' });
    setTimeout(() => setScreen('chat'), 1500);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Remote video (simulated) */}
      <div className="absolute inset-0">
        {currentProfile && (
          <img
            src={currentProfile.photos[0]}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Local video (small) */}
      {!videoOff && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4 w-28 h-40 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl"
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
        </motion.div>
      )}

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-36 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <p className="text-white text-sm font-medium">{currentProfile?.name}</p>
            <p className="text-white/60 text-xs">
              {callState === 'connecting' && 'Conectando...'}
              {callState === 'connected' && formatDuration(callDuration)}
              {callState === 'ended' && 'Llamada finalizada'}
            </p>
          </div>
        </div>
      </div>

      {/* Connecting overlay */}
      <AnimatePresence>
        {callState === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4"
            >
              <Video className="w-12 h-12 text-white" />
            </motion.div>
            <p className="text-white text-xl font-semibold mb-2">{currentProfile?.name}</p>
            <p className="text-white/60">Conectando...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ended overlay */}
      <AnimatePresence>
        {callState === 'ended' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
          >
            <div className="text-6xl mb-4">📞</div>
            <p className="text-white text-xl font-semibold mb-2">Llamada finalizada</p>
            <p className="text-white/60">Duración: {formatDuration(callDuration)}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat overlay */}
      <AnimatePresence>
        {showChat && callState === 'connected' && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-24 left-4 right-4 h-64 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col z-10"
          >
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <h3 className="text-white font-semibold text-sm">Chat en vivo</h3>
              <button onClick={() => setShowChat(false)} className="text-white/60">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-xl ${
                    msg.sender === 'me' ? 'bg-pink-500 text-white' : 'bg-white/20 text-white'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-[10px] opacity-60 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-white/40 focus:outline-none"
              />
              <button onClick={sendMessage} className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      {callState === 'connected' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMuted(!muted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              muted ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
            }`}
          >
            {muted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setVideoOff(!videoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              videoOff ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
            }`}
          >
            {videoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(!showChat)}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              showChat ? 'bg-pink-500' : 'bg-white/20 backdrop-blur-sm'
            }`}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
          >
            <Phone className="w-7 h-7 text-white rotate-[135deg]" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
