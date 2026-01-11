
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, User } from 'lucide-react';
import { Message, Client } from '../types';
import { api } from '../services/api';

interface ChatWindowProps {
   currentUserRole: 'admin' | 'partner' | 'tourist';
   currentUserId: string; // 'admin' or partner ID
   targetUser: Client | { id: string; name: string; role: string; image?: string };
   onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUserRole, currentUserId, targetUser, onClose }) => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [inputText, setInputText] = useState('');
   const [loading, setLoading] = useState(true);
   const [sending, setSending] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      loadMessages();
      const interval = setInterval(loadMessages, 5000); // Poll every 5s for demo
      return () => clearInterval(interval);
   }, [targetUser.id]);

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const loadMessages = async () => {
      try {
         const data = await api.chat.getMessages(currentUserId, targetUser.id);
         setMessages(data);
      } finally {
         setLoading(false);
      }
   };

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   const handleSend = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;

      setSending(true);
      try {
         const newMsg = await api.chat.sendMessage(currentUserId, targetUser.id, inputText);
         setMessages(prev => [...prev, newMsg]);
         setInputText('');
      } catch (err) {
         console.error(err);
      } finally {
         setSending(false);
      }
   };

   const isDark = currentUserRole !== 'tourist';

   return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm`}>
         <div className={`w-full max-w-md h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-2xl ${
            isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
         }`}>
            {/* Header */}
            <div className={`p-4 flex items-center justify-between border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-green-600 text-white border-green-700'}`}>
               <div className="flex items-center gap-3">
                  <div className="relative">
                     {targetUser.image ? (
                        <img src={targetUser.image} alt={targetUser.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                     ) : (
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                           <User size={20} />
                        </div>
                     )}
                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-transparent"></div>
                  </div>
                  <div>
                     <h3 className="font-bold text-sm">{targetUser.name}</h3>
                     <span className="text-xs opacity-80 capitalize">{targetUser.role === 'admin' ? 'Administrador' : targetUser.role === 'partner' ? 'Socio' : 'Turista'}</span>
                  </div>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                  <X size={20} />
               </button>
            </div>

            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
               {loading ? (
                  <div className="flex justify-center pt-10"><Loader2 className="animate-spin text-gray-400" /></div>
               ) : messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-xs mt-10">
                     <p>Inicia la conversación con {targetUser.name}</p>
                  </div>
               ) : (
                  messages.map((msg) => {
                     const isMe = msg.senderId === currentUserId;
                     return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                           <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                              isMe 
                                 ? 'bg-green-600 text-white rounded-br-none' 
                                 : isDark 
                                    ? 'bg-gray-800 text-gray-200 rounded-bl-none' 
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                           }`}>
                              <p>{msg.text}</p>
                              <span className={`text-[10px] block text-right mt-1 opacity-70`}>
                                 {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                           </div>
                        </div>
                     );
                  })
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className={`p-3 border-t flex gap-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
               <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className={`flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                     isDark ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900'
                  }`}
               />
               <button 
                  type="submit" 
                  disabled={!inputText.trim() || sending}
                  className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
               </button>
            </form>
         </div>
      </div>
   );
};

export default ChatWindow;
