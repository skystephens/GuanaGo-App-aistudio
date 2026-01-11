
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Power, Edit3, Image as ImageIcon, Anchor, Bed, Car, Package, Gift, Loader2, Trash2 } from 'lucide-react';
import { AppRoute, Tour } from '../../types';
import { api } from '../../services/api';

interface PartnerServicesProps {
   onBack: () => void;
   onNavigate: (route: AppRoute, data?: any) => void;
}

const PartnerServices: React.FC<PartnerServicesProps> = ({ onBack, onNavigate }) => {
   const [services, setServices] = useState<Tour[]>([]);
   const [loading, setLoading] = useState(true);

   // Fetch data on mount
   useEffect(() => {
      fetchServices();
   }, []);

   const fetchServices = async () => {
      setLoading(true);
      // HARDCODED: Simulating we are 'partner-1'
      const data = await api.services.listByPartner('partner-1');
      setServices(data);
      setLoading(false);
   };

   // Toggle Logic
   const toggleService = async (id: string, currentStatus: boolean, e: React.MouseEvent) => {
      e.stopPropagation();
      
      // 1. Optimistic Update (UI changes immediately)
      setServices(prev => prev.map(svc => 
         svc.id === id ? { ...svc, active: !currentStatus } : svc
      ));

      // 2. API Call
      await api.services.update(id, { active: !currentStatus });
   };

   // Delete Logic
   const deleteService = async (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      
      if (window.confirm('¿Estás seguro de que deseas eliminar este servicio permanentemente?')) {
         // 1. Optimistic Update
         setServices(prev => prev.filter(svc => svc.id !== id));
         
         // 2. API Call
         await api.services.delete(id);
      }
   };

   const getTypeIcon = (type: string) => {
      switch (type) {
         case 'hotel': return <Bed size={18} />;
         case 'tour': return <Anchor size={18} />;
         case 'taxi': return <Car size={18} />;
         case 'package': return <Package size={18} />;
         case 'handicraft': return <Gift size={18} />;
         default: return <Anchor size={18} />;
      }
   };

   const getTypeLabel = (type: string) => {
      switch (type) {
         case 'hotel': return 'Alojamiento';
         case 'tour': return 'Tour';
         case 'taxi': return 'Transporte';
         case 'package': return 'Paquete';
         case 'handicraft': return 'Artesanía';
         default: return 'Servicio';
      }
   };

   return (
    <div className="bg-gray-900 min-h-screen text-white pb-24 font-sans">
       <div className="sticky top-0 bg-gray-900 z-10 px-6 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-800 rounded-full">
                <ArrowLeft size={20} />
             </button>
             <h1 className="text-lg font-bold">Mis Servicios</h1>
          </div>
       </div>

       <div className="p-6">
          {loading ? (
             <div className="flex justify-center py-10">
                <Loader2 size={32} className="animate-spin text-green-500" />
             </div>
          ) : (
             <div className="space-y-4">
                {services.map((service) => (
                   <div 
                     key={service.id} 
                     className={`bg-gray-800 rounded-xl p-4 flex items-center justify-between border transition-all ${
                        service.active ? 'border-green-500/30' : 'border-red-500/30 opacity-75'
                     }`}
                   >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                         {/* Icon based on type */}
                         <div className={`p-3 rounded-lg shrink-0 ${
                            service.category === 'hotel' ? 'bg-blue-900/50 text-blue-400' : 
                            service.category === 'tour' ? 'bg-orange-900/50 text-orange-400' :
                            service.category === 'handicraft' ? 'bg-purple-900/50 text-purple-400' :
                            'bg-gray-700 text-gray-300'
                         }`}>
                            {getTypeIcon(service.category)}
                         </div>

                         <div className="truncate pr-2">
                            <h3 className="font-bold text-sm leading-tight truncate">{service.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-gray-400 text-xs font-medium">${service.price.toLocaleString()}</span>
                               <span className="text-gray-600 text-[10px]">•</span>
                               <span className="text-gray-500 text-[10px] uppercase font-bold">{getTypeLabel(service.category)}</span>
                            </div>
                            <span className={`text-[10px] font-bold block mt-1 ${
                               service.active ? 'text-green-400' : 'text-red-400'
                            }`}>
                               {service.active ? '● Disponible' : '● No disponible'}
                            </span>
                         </div>
                      </div>
                         
                      <div className="flex items-center gap-2 ml-2">
                         {/* Toggle Button */}
                         <button 
                            onClick={(e) => toggleService(service.id, service.active, e)}
                            className={`p-2 rounded-full transition-colors ${
                               service.active ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'
                            }`}
                            title={service.active ? "Desactivar" : "Activar"}
                         >
                            <Power size={18} />
                         </button>

                         {/* Edit Button */}
                         <button 
                            onClick={() => onNavigate(AppRoute.PARTNER_SERVICE_DETAIL, service)}
                            className="p-2 bg-gray-700 text-gray-200 rounded-full hover:bg-gray-600 transition-colors"
                            title="Editar"
                         >
                            <Edit3 size={18} />
                         </button>

                         {/* Delete Button */}
                         <button 
                            onClick={(e) => deleteService(service.id, e)}
                            className="p-2 bg-gray-700 text-red-400 rounded-full hover:bg-red-900/50 hover:text-red-500 transition-colors"
                            title="Eliminar"
                         >
                            <Trash2 size={18} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          )}

          {!loading && services.length === 0 && (
             <div className="text-center py-10 text-gray-500">
                <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                <p>No tienes servicios creados</p>
             </div>
          )}
       </div>

       {/* FAB */}
       <div className="fixed bottom-24 left-0 right-0 px-6 flex justify-center z-10 pointer-events-none">
          <button 
             onClick={() => onNavigate(AppRoute.PARTNER_CREATE_SERVICE)}
             className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg shadow-green-500/20 flex items-center gap-2 pointer-events-auto transition-colors"
          >
             <Plus size={20} />
             <span>Crear Nuevo Servicio</span>
          </button>
       </div>
    </div>
  );
};

export default PartnerServices;
