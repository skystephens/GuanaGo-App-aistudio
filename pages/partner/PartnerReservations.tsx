
import React, { useState, useMemo } from 'react';
import { Filter, Search, Calendar, User, Info, X, CheckCircle, Clock, XCircle, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { PARTNER_RESERVATIONS as INITIAL_RESERVATIONS } from '../../constants';
import { Reservation } from '../../types';
import BlockchainBadge from '../../components/BlockchainBadge';

type FilterTab = 'upcoming' | 'completed' | 'cancelled';

const PartnerReservations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('upcoming');
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);

  const filteredReservations = useMemo(() => {
    return reservations.filter(res => {
      if (activeTab === 'upcoming') return res.status === 'confirmed' || res.status === 'pending';
      if (activeTab === 'cancelled') return res.status === 'cancelled';
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
    const confirmCancel = window.confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (confirmCancel) {
      setReservations(prev => prev.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));
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
       <header className="px-6 pt-12 pb-4 bg-gray-900 sticky top-0 z-10 border-b border-gray-800">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-xl font-bold">Mis Reservas</h1>
             <button className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors">
                <Filter size={20} />
             </button>
          </div>
          <div className="flex space-x-6 overflow-x-auto no-scrollbar">
             {['upcoming', 'completed', 'cancelled'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab as FilterTab)}
                 className={`pb-2 text-sm font-bold transition-all capitalize border-b-2 ${
                   activeTab === tab ? 'text-emerald-50 border-emerald-500' : 'text-gray-500 border-transparent'
                 }`}
               >
                 {tab === 'upcoming' ? 'Próximas' : tab === 'completed' ? 'Completadas' : 'Canceladas'}
               </button>
             ))}
          </div>
       </header>

       <div className="px-6 py-4">
          <div className="relative">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <input type="text" placeholder="Buscar cliente..." className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none" />
          </div>
       </div>

       <div className="px-6 space-y-4">
          {filteredReservations.map((res) => (
             <div key={res.id} onClick={() => setSelectedRes(res)} className="bg-gray-800 rounded-2xl p-4 border border-gray-700 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h3 className="font-bold text-lg leading-none mb-1">{res.clientName}</h3>
                      <p className="text-gray-400 text-xs">{res.date}</p>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold border ${getStatusStyles(res.status)}`}>
                        {getStatusLabel(res.status)}
                      </span>
                      <BlockchainBadge status={res.auditStatus} transactionId={res.hederaTransactionId} size="sm" />
                   </div>
                </div>
                <p className="text-gray-300 text-sm">{res.tourName}</p>
             </div>
          ))}
       </div>

       {selectedRes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
             <div className="bg-gray-900 w-full max-w-md rounded-3xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Detalle de Reserva</h2>
                      <button onClick={() => setSelectedRes(null)}><X size={24} /></button>
                   </div>
                   <div className="space-y-4">
                      <div>
                         <p className="text-xs text-gray-500 uppercase font-bold">Cliente</p>
                         <p className="font-medium">{selectedRes.clientName}</p>
                      </div>
                      <div>
                         <p className="text-xs text-gray-500 uppercase font-bold">Servicio</p>
                         <p className="font-medium">{selectedRes.tourName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Personas</p>
                            <p className="font-medium">{selectedRes.people}</p>
                         </div>
                         <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                            <p className="font-bold text-emerald-400">${selectedRes.price} USD</p>
                         </div>
                      </div>
                      <div className="pt-2 border-t border-gray-800">
                         <p className="text-xs text-gray-500 uppercase font-bold mb-2">Seguridad Blockchain</p>
                         <BlockchainBadge status={selectedRes.auditStatus} transactionId={selectedRes.hederaTransactionId} />
                      </div>
                   </div>
                   <button onClick={() => setSelectedRes(null)} className="w-full bg-gray-800 py-3 rounded-xl mt-8 font-bold">Cerrar</button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

export default PartnerReservations;
