
import React from 'react';
import { ArrowLeft, Utensils, Clock } from 'lucide-react';

interface MapboxRestaurantsProps {
  onBack: () => void;
}

const MapboxRestaurants: React.FC<MapboxRestaurantsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen relative flex flex-col font-sans">
       <div className="absolute top-12 left-4 right-4 z-10 flex gap-2">
          <button 
             onClick={onBack}
             className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all"
          >
             <ArrowLeft size={24} />
          </button>
          <div className="flex-1 bg-white rounded-2xl shadow-xl flex items-center px-4 gap-3 border border-gray-100">
             <Utensils size={20} className="text-emerald-500" />
             <div className="flex-1 min-w-0">
                <h1 className="text-sm font-bold text-gray-800 leading-tight">Mapa de Gastronomía</h1>
                <p className="text-[10px] text-gray-500 font-medium truncate">Módulo suspendido</p>
             </div>
          </div>
       </div>

       <div className="flex-1 bg-orange-50 flex flex-col items-center justify-center p-10 text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
            <Utensils size={48} />
          </div>
          <h2 className="text-2xl font-bold text-orange-900 mb-3">Sabores de San Andrés</h2>
          <p className="text-orange-800 text-sm max-w-sm mb-8 leading-relaxed">
            Estamos integrando las cartas dinámicas y reservas en tiempo real de los mejores restaurantes raizales.
          </p>
          <div className="flex items-center gap-2 bg-white/60 px-6 py-3 rounded-2xl text-orange-700 text-xs font-extrabold border border-orange-200">
            <Clock size={16} /> PRÓXIMA ACTUALIZACIÓN
          </div>
       </div>
    </div>
  );
};

export default MapboxRestaurants;
