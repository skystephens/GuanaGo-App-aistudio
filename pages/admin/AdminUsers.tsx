
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, MessageCircle, X, MapPin, Phone, Mail, Calendar, Shield, CheckCircle, XCircle, Clock, ShoppingBag, Briefcase, Building, CreditCard, Tag, User as UserIcon, Globe } from 'lucide-react';
import { PARTNER_CLIENTS, PARTNER_RESERVATIONS } from '../../constants';
import { Client, Reservation } from '../../types';
import ChatWindow from '../../components/ChatWindow';

const AdminUsers: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'tourist' | 'partner' | 'pending'>('all');
  const [selectedChatUser, setSelectedChatUser] = useState<Client | null>(null);
  
  // User Detail Modal State
  const [selectedUser, setSelectedUser] = useState<Client | null>(null);
  
  // Simulated State for users to allow "Approving" in UI
  const [users, setUsers] = useState<Client[]>(PARTNER_CLIENTS);

  const filteredUsers = users.filter(u => {
      if (filter === 'all') return true;
      if (filter === 'pending') return u.status === 'pending';
      return u.role === filter;
  });

  const getRoleBadge = (role: string) => {
      if (role === 'admin') return <span className="bg-purple-900/50 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Admin</span>;
      if (role === 'partner') return <span className="bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Operador</span>;
      return <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Turista</span>;
  };

  const getStatusBadge = (status: string) => {
      if (status === 'active') return <span className="text-green-500 flex items-center gap-1 text-xs font-bold"><CheckCircle size={12}/> Activo</span>;
      if (status === 'pending') return <span className="text-yellow-500 flex items-center gap-1 text-xs font-bold"><Clock size={12}/> Pendiente</span>;
      return <span className="text-red-500 flex items-center gap-1 text-xs font-bold"><XCircle size={12}/> Suspendido</span>;
  };

  // Logic to simulate Approval
  const handleApproveUser = (userId: string) => {
      if (window.confirm('¿Aprobar a este operador? Se le notificará por email.')) {
          setUsers(prev => prev.map(u => u.id === userId ? {...u, status: 'active'} : u));
          setSelectedUser(prev => prev ? {...prev, status: 'active'} : null);
      }
  };

  const getUserHistory = (userId: string, userName: string) => {
      // Mock filtering logic using the static reservations array
      return PARTNER_RESERVATIONS.filter(r => r.clientName === userName);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-24 font-sans relative">
       <header className="px-6 pt-12 pb-4 bg-gray-900 sticky top-0 z-10">
          <h1 className="text-xl font-bold mb-4">Gestión de Usuarios</h1>
          <div className="relative">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Buscar por nombre o email..." className="w-full bg-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none border border-gray-700 focus:border-green-500" />
          </div>
       </header>

       {/* Tabs */}
       <div className="px-6 mb-4 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2">
             <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-xs font-bold ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Todos</button>
             <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-yellow-500'}`}>
                <Clock size={12} /> Pendientes
             </button>
             <button onClick={() => setFilter('partner')} className={`px-4 py-2 rounded-lg text-xs font-bold ${filter === 'partner' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Operadores</button>
             <button onClick={() => setFilter('tourist')} className={`px-4 py-2 rounded-lg text-xs font-bold ${filter === 'tourist' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400'}`}>Turistas</button>
          </div>
       </div>

       <div className="px-6 space-y-4">
          {filteredUsers.length === 0 && (
              <div className="text-center py-10 text-gray-500">No hay usuarios en esta categoría.</div>
          )}
          {filteredUsers.map((user) => (
             <div 
                key={user.id} 
                onClick={() => setSelectedUser(user)}
                className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
             >
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <img src={user.image} alt={user.name} className={`w-12 h-12 rounded-full object-cover border-2 ${user.status === 'pending' ? 'border-yellow-500' : 'border-gray-600'}`} />
                      {user.status === 'pending' && <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold px-1 rounded-full">!</div>}
                   </div>
                   <div>
                      <h3 className="font-bold text-sm">{user.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         {getRoleBadge(user.role)}
                         {getStatusBadge(user.status)}
                      </div>
                   </div>
                </div>
                <button className="text-gray-400 hover:text-white p-2">
                    <MoreHorizontal size={20} />
                </button>
             </div>
          ))}
       </div>

       {/* USER DETAIL MODAL */}
       {selectedUser && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in">
             <div className="bg-gray-900 w-full max-w-lg rounded-3xl border border-gray-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-10">
                 
                 {/* Modal Header */}
                 <div className="relative h-32 bg-gradient-to-r from-gray-800 to-gray-700">
                     <button 
                        onClick={() => setSelectedUser(null)}
                        className="absolute top-4 right-4 bg-black/20 p-2 rounded-full hover:bg-black/40 transition-colors text-white"
                     >
                        <X size={20} />
                     </button>
                     <div className="absolute -bottom-10 left-6">
                        <img 
                            src={selectedUser.image} 
                            alt={selectedUser.name} 
                            className="w-20 h-20 rounded-full border-4 border-gray-900 bg-gray-800 object-cover shadow-xl" 
                        />
                     </div>
                 </div>

                 <div className="pt-12 px-6 pb-6 overflow-y-auto no-scrollbar">
                     <div className="flex justify-between items-start mb-6">
                         <div>
                             <h2 className="text-2xl font-bold text-white leading-none mb-1">{selectedUser.name}</h2>
                             <p className="text-gray-400 text-sm">{selectedUser.email}</p>
                         </div>
                         <div className="flex gap-2">
                             <button 
                                onClick={() => setSelectedChatUser(selectedUser)}
                                className="bg-gray-800 p-2 rounded-lg text-blue-400 hover:bg-gray-700 shadow-sm"
                             >
                                <MessageCircle size={20} />
                             </button>
                         </div>
                     </div>

                     {/* Pending Action Banner */}
                     {selectedUser.status === 'pending' && (
                         <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6 flex items-start gap-3">
                             <Clock className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                             <div>
                                 <h3 className="font-bold text-yellow-500 text-sm">Solicitud de Afiliación</h3>
                                 <p className="text-gray-400 text-xs mt-1 mb-3">Este usuario desea unirse como operador. Valida los datos del negocio a continuación.</p>
                                 <div className="flex gap-2">
                                     <button 
                                        onClick={() => handleApproveUser(selectedUser.id)}
                                        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-green-900/20"
                                     >
                                        Aprobar Operador
                                     </button>
                                     <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-gray-700">
                                        Rechazar
                                     </button>
                                 </div>
                             </div>
                         </div>
                     )}

                     {/* Main Grid: User Info */}
                     <div className="grid grid-cols-2 gap-4 mb-6">
                         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                             <span className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                                 <Shield size={10} /> Rol de Usuario
                             </span>
                             <p className="text-sm font-medium capitalize">{selectedUser.role === 'partner' ? 'operador' : selectedUser.role}</p>
                         </div>
                         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                             <span className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                                 <Calendar size={10} /> Registro
                             </span>
                             <p className="text-sm font-medium">{selectedUser.joinedDate || 'N/A'}</p>
                         </div>
                         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                             <span className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                                 <Phone size={10} /> Teléfono
                             </span>
                             <p className="text-sm font-medium">{selectedUser.phone || 'N/A'}</p>
                         </div>
                         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                             <span className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                                 <Globe size={10} /> Ubicación
                             </span>
                             <p className="text-sm font-medium truncate">{selectedUser.city}, {selectedUser.country}</p>
                         </div>
                     </div>

                     {/* PARTNER INFO SECTION */}
                     {(selectedUser.role === 'partner' || selectedUser.status === 'pending') && (
                        <div className="mb-8">
                           <h3 className="font-bold text-gray-300 text-sm mb-4 flex items-center gap-2">
                               <Briefcase size={18} className="text-emerald-500" /> 
                               Información del Negocio
                           </h3>
                           <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
                              <div className="grid grid-cols-1 divide-y divide-gray-700">
                                 <div className="p-4 flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                       <Building size={16} className="text-gray-500" />
                                       <span className="text-xs text-gray-400">Razón Social</span>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-400">{selectedUser.name}</span>
                                 </div>
                                 <div className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <CreditCard size={16} className="text-gray-500" />
                                       <span className="text-xs text-gray-400">NIT / ID Fiscal</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-200">{selectedUser.documentId || '---'}</span>
                                 </div>
                                 <div className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <Tag size={16} className="text-gray-500" />
                                       <span className="text-xs text-gray-400">RNT (Registro Nal.)</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-200">{selectedUser.rnt || 'No suministrado'}</span>
                                 </div>
                                 <div className="p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <UserIcon size={16} className="text-gray-500" />
                                       <span className="text-xs text-gray-400">Responsable</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-200">{selectedUser.responsible || 'N/A'}</span>
                                 </div>
                                 <div className="p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                       <MapPin size={16} className="text-gray-500" />
                                       <span className="text-xs text-gray-400">Dirección Operativa</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-300 pl-7">{selectedUser.address || selectedUser.location || 'San Andrés Isla'}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Reservation History */}
                     <h3 className="font-bold text-gray-300 text-sm mb-3 flex items-center gap-2">
                         <ShoppingBag size={16} /> Historial de Actividad
                     </h3>
                     <div className="space-y-2 mb-8">
                         {getUserHistory(selectedUser.id, selectedUser.name).length > 0 ? (
                             getUserHistory(selectedUser.id, selectedUser.name).map((h, i) => (
                                 <div key={i} className="bg-gray-800 p-3 rounded-xl flex justify-between items-center text-sm border border-gray-700">
                                     <div>
                                         <p className="font-bold text-gray-200">{h.tourName}</p>
                                         <p className="text-xs text-gray-500">{h.date}</p>
                                     </div>
                                     <div className="text-right">
                                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                             h.status === 'confirmed' ? 'bg-green-900/30 text-green-500' : 
                                             h.status === 'cancelled' ? 'bg-red-900/30 text-red-500' :
                                             'bg-gray-700 text-gray-400'
                                         }`}>
                                             {h.status === 'confirmed' ? 'Confirmado' : h.status}
                                         </span>
                                     </div>
                                 </div>
                             ))
                         ) : (
                             <div className="p-4 bg-gray-800/50 rounded-xl text-center text-xs text-gray-500 italic">
                                 No hay historial de reservas visible.
                             </div>
                         )}
                     </div>

                     <div className="flex gap-3">
                        <button className="flex-1 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 font-bold text-sm hover:bg-gray-700 transition-colors">
                            Editar Perfil
                        </button>
                        <button className="flex-1 py-3 rounded-xl border border-red-900/50 text-red-500 font-bold text-sm hover:bg-red-900/20 transition-colors">
                            Suspender
                        </button>
                     </div>
                 </div>
             </div>
         </div>
       )}

       {/* Chat Modal */}
       {selectedChatUser && (
          <ChatWindow 
             currentUserRole="admin"
             currentUserId="admin"
             targetUser={selectedChatUser}
             onClose={() => setSelectedChatUser(null)}
          />
       )}
    </div>
  );
};

export default AdminUsers;
