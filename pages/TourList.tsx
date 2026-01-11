
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Filter, Star, Clock, Anchor } from 'lucide-react';
import { api } from '../services/api';
import { AppRoute, Tour } from '../types';

interface TourListProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, data?: any) => void;
}

const TourList: React.FC<TourListProps> = ({ onBack, onNavigate }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     // Only show 'tour' category items that are active
     api.services.listPublic().then(allServices => {
        setTours(allServices.filter(s => s.category === 'tour'));
        setLoading(false);
     });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       {/* Header */}
       <div className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={20} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Tours y Actividades</h1>
         </div>
         <button className="p-2 text-gray-500 hover:text-green-600">
            <Filter size={20} />
         </button>
       </div>

       <div className="p-6">
          {/* Tags */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
             {['Todos', 'Acuáticos', 'Culturales', 'Aventura', 'Gastronomía'].map((tag, i) => (
                <button 
                  key={tag} 
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                >
                  {tag}
                </button>
             ))}
          </div>

          {/* List */}
          <div className="grid grid-cols-1 gap-6">
             {loading ? (
                <div className="text-center py-10 text-gray-400">Cargando tours...</div>
             ) : tours.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Anchor size={48} className="mb-2 opacity-20" />
                    <p>No hay tours disponibles.</p>
                </div>
             ) : (
                tours.map(tour => (
                    <div 
                    key={tour.id} 
                    onClick={() => onNavigate(AppRoute.TOUR_DETAIL, tour)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    >
                    <div className="relative h-48 overflow-hidden">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{tour.title}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                            <Clock size={14} />
                            <span>{tour.duration || '4 horas'}</span>
                            <span>•</span>
                            <span>Cancelación gratis</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div>
                                <span className="text-xs text-gray-400 block">Desde</span>
                                <span className="text-xl font-bold text-green-600">${tour.price}</span>
                            </div>
                            <button className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                    </div>
                ))
             )}
          </div>
       </div>
    </div>
  );
};

export default TourList;
