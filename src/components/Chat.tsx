import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useStore, Message } from '../store/useStore';

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
    
    setTimeout(() => {
      const reply: Message = {
        id: Date.now().toString(),
        text: '¡Hola! ¿Cómo estás? 😊',
        sender: 'them',
        timestamp: new Date(),
      };
      useStore.setState((state) => ({
        chats: state.chats.map((chat) => {
          if (chat.id === selectedChatId) {
            return { ...chat, messages: [...chat.messages, reply], lastMessage: reply.text };
          }
          return chat;
        }),
      }));
    }, 1500);
  };

  if (selectedChatId && selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5">
          <button onClick={() => setSelectedChatId(null)} className="text-white/60">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-white font-semibold">{selectedChat.name}</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {selectedChat.messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${msg.sender === 'me' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'bg-white/10 text-white'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none"
            />
            {inputText.trim() && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={handleSend} className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <h1 className="text-2xl font-bold text-white mb-6 pt-4">Mensajes</h1>
      {chats.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-white font-semibold mb-2">Sin mensajes</h3>
          <button onClick={() => setScreen('swipe')} className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full">
            Empezar a deslizar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <button key={chat.id} onClick={() => setSelectedChatId(chat.id)} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold">{chat.name}</h3>
                <p className="text-white/50 text-sm truncate">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
