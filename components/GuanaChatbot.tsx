
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Globe } from 'lucide-react';
import { sendMessage } from '../services/chatService';
import { GUANA_LOGO } from '../constants';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'guana';
  timestamp: Date;
}

const CHAT_HISTORY_KEY = 'guanago_chat_history';

const GuanaChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('es');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cargar historial de localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: 'init-1',
        text: "¡Hola! Soy Guana, tu guía. ¿Cómo puedo ayudarte hoy?",
        sender: 'guana',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Guardar historial al cambiar
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-20))); // Solo últimos 20
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendMessage(userMsg.text, selectedLang);
      const guanaMsg: Message = { id: (Date.now() + 1).toString(), text: response.reply, sender: 'guana', timestamp: new Date() };
      setMessages(prev => [...prev, guanaMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-end px-6 max-w-md mx-auto pointer-events-none font-sans">
      <div className="relative pointer-events-auto">
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-emerald-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center relative">
             <img src={GUANA_LOGO} alt="Chat" className="w-10 h-10 object-contain" />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border border-white"></span>
          </button>
        )}

        {isOpen && (
          <div className="absolute bottom-0 right-0 bg-white w-[300px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5">
            <div className="bg-emerald-600 p-4 flex justify-between items-center text-white font-bold">
               <span>Guana AI</span>
               <button onClick={() => setIsOpen(false)}><X size={20}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-100 text-gray-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
               <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Escribe aquí..." className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none" />
               <button type="submit" className="bg-orange-500 p-2 rounded-xl text-white"><Send size={18}/></button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuanaChatbot;
