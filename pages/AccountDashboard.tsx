
import React, { useState, useEffect } from 'react';
import { User, Award, ShieldCheck, Copy, ExternalLink, Settings, MessageCircle, LogOut, ChevronRight, Mail, Trophy, CreditCard, Ticket, Gift, Zap, Tag, Star, Briefcase, Shield, Loader2, Target, Sparkles, QrCode, Phone, MapPin, X, Globe, UserCheck, IdCard } from 'lucide-react';
import { PARTNER_CLIENTS } from '../constants';
import { AppRoute, UserRole, Client, Campaign } from '../types';
import { api } from '../services/api';
import ChatWindow from '../components/ChatWindow';

interface AccountDashboardProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
  onNavigate?: (route: AppRoute) => void;
}

const AccountDashboard: React.FC<AccountDashboardProps> = ({ isAuthenticated, onLogin, onLogout, onSwitchRole, onNavigate }) => {
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [showDigitalId, setShowDigitalId] = useState(false);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [userData, setUserData] = useState<Client | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  
  // ID de usuario de prueba persistente (Mateo Vargas)
  const TEST_USER_ID = 'c1';

  useEffect(() => {
     if (isAuthenticated) {
        fetchInitialData();
     }
  }, [isAuthenticated]);

  const fetchInitialData = async () => {
      setLoadingUser(true);
      setLoadingCampaigns(true);
      try {
         // 1. Sincronizar datos personales reales desde el proxy (Airtable)
         const profile = await api.users.getProfile(TEST_USER_ID);
         setUserData(profile);

         // 2. Cargar campañas de marketing activas
         const camps = await api.campaigns.list();
         setActiveCampaigns(camps.filter(c => c.active).slice(0, 5));
      } catch (e) {
         console.error("Error sincronizando cuenta", e);
         // Fallback a constante local
         setUserData(PARTNER_CLIENTS.find(c => c.id === TEST_USER_ID) || PARTNER_CLIENTS[0]);
      } finally {
         setLoadingUser(false);
         setLoadingCampaigns(false);
      }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex flex-col justify-center px-8 text-center font-sans pb-24">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 border border-emerald-100 shadow-sm">
          <User size={48} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">¡Hola, Viajero!</h1>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed px-4">
          Inicia sesión para gestionar tus puntos, ver tus reservas pagadas y acceder a beneficios exclusivos.
        </p>
        
        <div className="space-y-4 w-full">
          <button 
            onClick={onLogin}
            className="w-full bg-emerald-600 text-white font-black py-5 rounded-[24px] shadow-xl shadow-emerald-100 uppercase text-sm tracking-widest active:scale-95 transition-all"
          >
            Iniciar Sesión Turista
          </button>

          <div className="pt-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-6">Accesos de Gestión</p>
            <div className="flex gap-4">
              <button 
                onClick={() => onSwitchRole('partner')}
                className="flex-1 bg-gray-50 p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-95 group"
              >
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Briefcase size={20} />
                </div>
                <span className="text-[9px] font-black text-gray-800 uppercase tracking-tighter">Socio Operador</span>
              </button>
              
              <button 
                onClick={() => onSwitchRole('admin')}
                className="flex-1 bg-gray-50 p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:bg-purple-50 hover:border-purple-100 transition-all active:scale-95 group"
              >
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-purple-500 shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[9px] font-black text-gray-800 uppercase tracking-tighter">Administrador</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback user en caso de carga lenta
  const displayUser = userData || PARTNER_CLIENTS[0];

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans overflow-x-hidden">
      {/* Perfil Header */}
      <div className="bg-white px-6 pt-16 pb-8 rounded-b-[48px] shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-[28px] border-4 border-emerald-50 overflow-hidden shadow-lg relative">
            <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover" />
            {loadingUser && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-600" size={20} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">{displayUser.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              <Mail size={14} />
              <span className="text-xs font-medium">{displayUser.email}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <Trophy size={14} className="fill-current" />
                <span className="text-[10px] font-black uppercase">Nivel 4</span>
              </div>
              <button 
                onClick={() => setShowDigitalId(true)}
                className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl flex items-center gap-1.5 border border-emerald-100 active:scale-95 transition-all"
              >
                <QrCode size={14} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Mi QR</span>
              </button>
            </div>
          </div>
        </div>

        {/* GUANA CARD */}
        <div className="bg-gray-900 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden group cursor-pointer" onClick={() => onNavigate?.(AppRoute.WALLET)}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">Saldo Guana Puntos</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black">{displayUser.walletBalance.toLocaleString()}</h3>
                <span className="text-sm font-bold text-emerald-400">$GUANA</span>
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform"><Award size={28} className="text-emerald-400" /></div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <IdCard size={18} />
              </div>
              <div>
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Digital Passport</p>
                <p className="text-xs font-mono font-bold text-gray-300">0.0.344592@164..</p>
              </div>
            </div>
            <ShieldCheck size={20} className="text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-8">
        
        {/* ACCESO A RESERVAS PAGADAS */}
        <button 
          onClick={() => onNavigate && onNavigate(AppRoute.MY_ITINERARY)}
          className="w-full bg-emerald-600 rounded-[32px] p-6 shadow-xl shadow-emerald-100 flex items-center justify-between text-white group active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Ticket size={28} /></div>
             <div className="text-left">
                <h3 className="font-black uppercase text-xs tracking-widest mb-1">Mis Reservas</h3>
                <p className="text-[10px] text-emerald-100 font-medium leading-tight">Vouchers y cronograma del viaje</p>
             </div>
          </div>
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* DINAMIC OFFERS SECTION FROM ADMIN */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
             <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Gift size={16} className="text-orange-500" /> Promociones y Retos
             </h3>
             <button onClick={() => onNavigate?.(AppRoute.MARKETPLACE)} className="text-[10px] font-black text-emerald-600 uppercase">Ver todos</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
             {loadingCampaigns ? (
                <div className="flex-1 flex justify-center py-10"><Loader2 size={24} className="animate-spin text-gray-300"/></div>
             ) : activeCampaigns.length > 0 ? activeCampaigns.map(camp => (
                <div key={camp.id} className="min-w-[220px] bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all group">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      camp.type === 'mission' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                   }`}>
                      {camp.type === 'mission' ? <Target size={20} /> : <Tag size={20} />}
                   </div>
                   <div>
                      <h4 className="font-black text-sm text-gray-800 leading-tight">{camp.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{camp.description}</p>
                   </div>
                   <div className="mt-2 pt-3 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[9px] font-black text-emerald-600 uppercase">{camp.reward}</span>
                      <button className="text-[9px] font-black bg-gray-900 text-white px-3 py-1.5 rounded-lg uppercase active:scale-95 transition-all">Activar</button>
                   </div>
                </div>
             )) : (
                <div className="w-full bg-white p-6 rounded-[32px] border border-gray-100 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                   No hay ofertas disponibles
                </div>
             )}
          </div>
        </section>

        {/* Quick Menu */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 divide-y divide-gray-50">
          <button onClick={() => setShowSupportChat(true)} className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><MessageCircle size={22} /></div>
              <div>
                <p className="font-bold text-sm text-gray-800">Soporte y Ayuda</p>
                <p className="text-[10px] text-gray-400 font-medium">Chat con IA o Agentes</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </button>
          
          <button onClick={onLogout} className="w-full p-5 flex items-center justify-between hover:bg-red-50 transition-colors group text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all"><LogOut size={22} /></div>
              <div><p className="font-bold text-sm text-red-600">Cerrar Sesión</p><p className="text-[10px] text-red-300 font-medium">Salir de tu cuenta</p></div>
            </div>
            <ChevronRight size={20} className="text-red-100" />
          </button>
        </div>

        {/* Accesos rápidos de gestión para perfiles Staff */}
        <div className="pt-4 pb-10">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] text-center mb-6">Zona Staff GuanaGo</p>
          <div className="flex gap-4">
            <button onClick={() => onSwitchRole('partner')} className="flex-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-emerald-200 transition-all active:scale-95 group">
              <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <CreditCard size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Socio</span>
            </button>
            <button onClick={() => onSwitchRole('admin')} className="flex-1 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-purple-200 transition-all active:scale-95 group">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: IDENTIFICACIÓN DIGITAL Y QR (Sincronizado con Admin) */}
      {showDigitalId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[48px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in duration-300">
              <div className="bg-emerald-600 p-8 text-white relative">
                 <button 
                   onClick={() => setShowDigitalId(false)}
                   className="absolute top-6 right-6 p-2 bg-black/10 rounded-full hover:bg-black/20"
                 >
                   <X size={20}/>
                 </button>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-16 h-16 rounded-2xl border-2 border-white/30 overflow-hidden shadow-lg bg-emerald-700">
                      <img src={displayUser.image} alt={displayUser.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h3 className="font-black text-lg leading-tight">{displayUser.name}</h3>
                      <div className="flex items-center gap-1.5 opacity-80">
                         <UserCheck size={12} />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Viajero Verificado</span>
                      </div>
                   </div>
                 </div>
              </div>

              <div className="p-8 flex flex-col items-center text-center">
                 <div className="w-56 h-56 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[40px] flex items-center justify-center mb-8 relative group">
                    <div className="absolute inset-4 bg-gray-900 rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-gray-200 transition-transform group-hover:scale-105 duration-500">
                       <QrCode size={140} />
                    </div>
                 </div>

                 <div className="w-full space-y-4 text-left">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50"><Phone size={18} /></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">WhatsApp / Celular</p>
                          <p className="text-sm font-bold text-gray-800">{displayUser.phone || '+57 301 234 5678'}</p>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50"><IdCard size={18} /></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Identificación (ID)</p>
                          <p className="text-sm font-bold text-gray-800">{displayUser.documentId || 'No suministrado'}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-50"><Globe size={18} /></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Origen</p>
                          <p className="text-sm font-bold text-gray-800">{displayUser.city || 'Bogotá'}, {displayUser.country || 'Colombia'}</p>
                       </div>
                    </div>
                 </div>

                 <p className="text-[10px] text-gray-400 mt-8 font-medium italic">Presenta este QR en muelles y hoteles para tu check-in rápido.</p>
              </div>

              <div className="p-6 pt-0">
                 <button 
                   onClick={() => setShowDigitalId(false)}
                   className="w-full bg-emerald-600 text-white font-black py-4 rounded-3xl shadow-lg active:scale-95 transition-all uppercase text-xs tracking-widest"
                 >
                   Cerrar Identificación
                 </button>
              </div>
           </div>
        </div>
      )}

      {showSupportChat && (
        <ChatWindow 
          currentUserRole="tourist"
          currentUserId={displayUser.id}
          targetUser={{ id: 'admin', name: 'Soporte GuanaGo', role: 'admin', image: 'https://ui-avatars.com/api/?name=Soporte+Guana&background=10B981&color=fff' }}
          onClose={() => setShowSupportChat(false)}
        />
      )}
    </div>
  );
};

export default AccountDashboard;
