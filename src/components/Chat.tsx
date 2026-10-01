import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Smile, Image, Mic } from 'lucide-react';
import { useStore, Message } from '../store/useStore';

const autoReplies = [
  '¡Hola! ¿Cómo estás? 😊',
  '¡Qué lindo perfil tienes!',
  'Me encanta tu foto de perfil 📸',
  '¿Qué planes tienes para hoy?',
  '¡Jaja! Eso es genial 😄',
  '¿Te gusta la música?',
  'Deberíamos salir algún día ☕',
  '¡Qué interesante! Cuéntame más',
  'Me haces reír 😂',
  '¡Eso suena increíble!',
];

export default function Chat() {
  const { chats, selectedChatId, setSelectedChatId, setScreen, sendMessage } = useStore();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const handleSend = () => {
    if (!inputText.trim() || !selectedChatId) return;
    
    sendMessage(selectedChatId, inputText.trim());
    setInputText('');

    // Auto reply after 1-2 seconds
    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      const replyMessage: Message = {
        id: Date.now().toString(),
        text: reply,
        sender: 'them',
        timestamp: new Date(),
      };
      useStore.setState((state) => ({
        chats: state.chats.map((chat) => {
          if (chat.id === selectedChatId) {
            return { ...chat, messages: [...chat.messages, replyMessage], lastMessage: reply };
          }
          return chat;
        }),
      }));
    }, 1000 + Math.random() * 1500);
  };

  if (selectedChatId && selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
          <button
            onClick={() => setSelectedChatId(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{selectedChat.name}</h3>
            <p className="text-green-400 text-xs">En línea</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selectedChat.messages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-white/60 text-sm">¡Envía el primer mensaje!</p>
              <p className="text-white/40 text-xs mt-1">Rompe el hielo con un saludo</p>
            </div>
          )}
          <AnimatePresence>
            {selectedChat.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-white/40'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button className="text-white/40 hover:text-white/60 transition-colors">
              <Image className="w-5 h-5" />
            </button>
            <button className="text-white/40 hover:text-white/60 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink-500/50"
            />
            {inputText.trim() ? (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            ) : (
              <button className="text-white/40 hover:text-white/60 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Chat list
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <h1 className="text-2xl font-bold text-white mb-6 pt-4">Mensajes</h1>

      {chats.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-white font-semibold mb-2">Sin mensajes aún</h3>
          <p className="text-white/50 text-sm mb-6">Haz match con alguien para empezar a chatear</p>
          <button
            onClick={() => setScreen('swipe')}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full"
          >
            Empezar a deslizar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat, index) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedChatId(chat.id)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-semibold">{chat.name}</h3>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-pink-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-sm truncate">{chat.lastMessage}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
