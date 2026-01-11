
import React from 'react';
import { ArrowLeft, MapPin, ChevronRight, Calculator, Info } from 'lucide-react';
import { TAXI_ZONES } from '../constants';
import { AppRoute } from '../types';

interface TaxiListProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, data?: any) => void;
}

const TaxiList: React.FC<TaxiListProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
       {/* Header */}
       <div className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-6 py-4 flex items-center gap-4 shadow-sm">
         <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
           <ArrowLeft size={20} className="text-gray-800" />
         </button>
         <h1 className="text-lg font-bold text-gray-900">Tarifas Oficiales</h1>
       </div>

       <div className="p-6">
         
         <div className="bg-green-600 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
                <Calculator size={100} />
             </div>
             <h2 className="text-xl font-bold mb-2">Calculadora de Viajes</h2>
             <p className="text-green-100 text-sm mb-4 pr-8 leading-relaxed">
               Cotiza tu traslado exacto desde el aeropuerto según la zona y cantidad de pasajeros.
             </p>
             <button 
               onClick={() => onNavigate(AppRoute.TAXI_DETAIL)}
               className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-green-50 transition-colors flex items-center gap-2"
             >
               <Calculator size={16} />
               Calcular Ahora
             </button>
         </div>

         <div className="flex items-center gap-2 mb-4">
             <Info size={16} className="text-gray-400" />
             <h3 className="font-bold text-gray-900">Guía de Zonas y Precios (Base)</h3>
         </div>

         <div className="space-y-4">
            {TAXI_ZONES.map((zone) => (
               <div 
                  key={zone.id}
                  onClick={() => onNavigate(AppRoute.TAXI_DETAIL)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-green-500 transition-all cursor-pointer group relative overflow-hidden"
               >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${zone.color}`}></div>
                  
                  <div className="flex justify-between items-start mb-2 pl-2">
                      <h3 className="font-bold text-gray-900 text-sm">{zone.name}</h3>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-3 pl-2 leading-relaxed">{zone.sectors}</p>

                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 pl-3">
                     <div className="text-center">
                        <span className="block text-[10px] text-gray-400 uppercase font-bold">Taxi (1-4)</span>
                        <span className="font-bold text-gray-800">${(zone.priceSmall / 1000).toFixed(0)}k</span>
                     </div>
                     <div className="h-6 w-px bg-gray-200"></div>
                     <div className="text-center">
                        <span className="block text-[10px] text-gray-400 uppercase font-bold">Van (5+)</span>
                        <span className="font-bold text-gray-800">${(zone.priceLarge / 1000).toFixed(0)}k</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
       </div>
    </div>
  );
};

export default TaxiList;
