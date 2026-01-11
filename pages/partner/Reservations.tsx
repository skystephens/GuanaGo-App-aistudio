
import React, { useState, useMemo } from 'react';
import { Filter, Search, Calendar, User, Info, X, CheckCircle, Clock, XCircle, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { PARTNER_RESERVATIONS as INITIAL_RESERVATIONS } from '../../constants';
import { Reservation } from '../../types';

type FilterTab = 'upcoming' | 'completed' | 'cancelled';

const PartnerReservations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('upcoming');
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  // Filtrado de reservas según la pestaña activa
  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      if (activeTab === 'upcoming') return res.status === 'confirmed' || res.status === 'pending';
      if (activeTab === 'cancelled') return res.status === 'cancelled';
      // Por ahora no tenemos estado 'completed' en los tipos, pero podemos simularlo o dejarlo vacío
      return false;
    });
  }, [reservations, activeTab]);

  const handleConfirm = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status: 'confirmed' } : res
    ));
    if (selectedRes?.id === id) {
      setSelectedRes(prev => prev ? { ...prev, status: 'confirmed' } : null);
    }
  };

  const handleCancel = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva? Se enviará una alerta inmediata al Super Admin para buscar un proveedor alternativo.");
    
    if (confirmCancel) {
      setReservations(prev => prev.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
      
      // Simulación de alerta al sistema/admin
      console.log(`ALERTA: Reserva ${id} cancelada por el socio. Iniciando protocolo de búsqueda de proveedor alternativo.`);
      alert("Reserva cancelada. El administrador ha sido notificado para reasignar este servicio a otro proveedor.");
      
      if (selectedRes?.id === id) {
        setSelectedRes(null);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'pending': return <Clock size={14} className="text-yellow-500" />;
      case 'cancelled': return <XCircle size={14} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-900/30 text-emerald-400 border-emerald-500/20';
      case 'pending': return 'bg-yellow-900/30 text-yellow-500 border-yellow-500/20';
      case 'cancelled': return 'bg-red-900/30 text-red-400 border-red-500/20';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-24 font-sans relative">
       {/* Header */}
       <header className="px-6 pt-12 pb-4 bg-gray-900 sticky top-0 z-10 border-b border-gray-800">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-xl font-bold">Mis Reservas</h1>
             <button className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
                <Filter size={20} />
             </button>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-6 overflow-x-auto no-scrollbar">
             <button 
               onClick={() => setActiveTab('upcoming')}
               className={`pb-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                 activeTab === 'upcoming' ? 'text-emerald-500 border-emerald-500' : 'text-gray-500 border-transparent'
               }`}
             >
               Próximas
             </button>
             <button 
               onClick={() => setActiveTab('completed')}
               className={`pb-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                 activeTab === 'completed' ? 'text-emerald-500 border-emerald-500' : 'text-gray-500 border-transparent'
               }`}
             >
               Completadas
             </button>
             <button 
               onClick={() => setActiveTab('cancelled')}
               className={`pb-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
                 activeTab === 'cancelled' ? 'text-emerald-500 border-emerald-500' : 'text-gray-500 border-transparent'
               }`}
             >
               Canceladas
             </button>
          </div>
       </header>

       {/* Search Bar */}
       <div className="px-6 py-4">
          <div className="relative">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input 
               type="text" 
               placeholder="Buscar cliente o tour..." 
               className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
             />
          </div>
       </div>

       {/* List of Reservations */}
       <div className="px-6 space-y-4">
          {filteredReservations.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Calendar size={48} className="mb-2 opacity-20" />
                <p className="text-sm">No hay reservas en esta categoría</p>
             </div>
          ) : (
             filteredReservations.map((res) => (
                <div 
                  key={res.id} 
                  className="bg-gray-800 rounded-2xl p-4 border border-gray-700 shadow-sm hover:border-gray-600 transition-all cursor-pointer group"
                  onClick={() => setSelectedRes(res)}
                >
                   <div className="flex justify-between items-start mb-3">
                      <div>
                         <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-emerald-400 transition-colors">{res.clientName}</h3>
                         <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar size={12} />
                            <span>{res.date}</span>
                         </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border flex items-center gap-1.5 uppercase tracking-wider ${getStatusStyles(res.status)}`}>
                         {getStatusIcon(res.status)}
                         {getStatusLabel(res.status)}
                      </span>
                   </div>
                   
                   <p className="text-gray-300 text-sm font-medium mb-4">{res.tourName}</p>
                   
                   <div className="flex gap-2 justify-end">
                      {res.status === 'pending' && (
                        <button 
                           onClick={(e) => handleConfirm(res.id, e)}
                           className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                        >
                           Confirmar
                        </button>
                      )}
                      {(res.status === 'pending' || res.status === 'confirmed') && (
                        <button 
                           onClick={(e) => handleCancel(res.id, e)}
                           className="flex-1 sm:flex-none px-4 py-2.5 bg-red-900/20 hover:bg-red-900/40 text-red-500 rounded-xl text-xs font-bold transition-all border border-red-500/20 active:scale-95"
                        >
                           Cancelar
                        </button>
                      )}
                      <button 
                         onClick={() => setSelectedRes(res)}
                         className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl text-xs font-bold transition-all active:scale-95"
                      >
                         Ver Detalles
                      </button>
                   </div>
                </div>
             ))
          )}
       </div>

       {/* Modal de Detalles */}
       {selectedRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in duration-300">
             <div className="bg-gray-900 w-full max-w-md rounded-3xl border border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="relative h-24 bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 flex justify-between items-start">
                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                      <Calendar size={20} />
                   </div>
                   <button 
                     onClick={() => setSelectedRes(null)}
                     className="bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition-colors"
                   >
                      <X size={20} />
                   </button>
                </div>
                
                <div className="px-6 pb-8 -mt-6">
                   <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 shadow-lg mb-6">
                      <h2 className="text-xl font-bold text-white mb-1">{selectedRes.clientName}</h2>
                      <p className="text-gray-400 text-sm flex items-center gap-2">
                        <Calendar size={14} className="text-emerald-500" />
                        {selectedRes.date}
                      </p>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500">
                            <Info size={18} />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Servicio</p>
                            <p className="text-sm font-medium">{selectedRes.tourName}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500">
                            <Users size={18} />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pax</p>
                            <p className="text-sm font-medium">{selectedRes.people} Personas</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500">
                            <DollarSign size={18} />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Valor Reserva</p>
                            <p className="text-sm font-bold text-emerald-400">${selectedRes.price?.toLocaleString() || '---'} USD</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-emerald-500">
                            <User size={18} />
                         </div>
                         <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estado de Pago</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${getStatusStyles(selectedRes.status)}`}>
                               {getStatusLabel(selectedRes.status)}
                            </span>
                         </div>
                      </div>
                   </div>

                   {selectedRes.status !== 'cancelled' && (
                     <div className="mt-6 bg-red-900/10 p-3 rounded-xl border border-red-500/20 flex gap-3 items-start">
                        <AlertTriangle className="text-red-500 shrink-0" size={16} />
                        <p className="text-[10px] text-red-200 leading-tight">
                           Al cancelar, el sistema notificará al administrador para que busque un reemplazo y el cliente no pierda su experiencia.
                        </p>
                     </div>
                   )}

                   <div className="mt-8 flex flex-col gap-3">
                      <div className="flex gap-3">
                        {selectedRes.status === 'pending' && (
                           <button 
                              onClick={() => handleConfirm(selectedRes.id)}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
                           >
                              Confirmar
                           </button>
                        )}
                        {(selectedRes.status === 'pending' || selectedRes.status === 'confirmed') && (
                           <button 
                              onClick={() => handleCancel(selectedRes.id)}
                              className="flex-1 bg-red-900/40 hover:bg-red-900/60 text-white font-bold py-3 rounded-xl transition-all border border-red-500/30"
                           >
                              Cancelar Reserva
                           </button>
                        )}
                      </div>
                      <button 
                        onClick={() => setSelectedRes(null)}
                        className={`w-full font-bold py-3 rounded-xl transition-all ${
                          selectedRes.status === 'cancelled' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400'
                        }`}
                      >
                         Cerrar
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

export default PartnerReservations;
