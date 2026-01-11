
import React from 'react';
import { ArrowLeft, Filter, Star, Check } from 'lucide-react';
import { POPULAR_PACKAGES } from '../constants';
import { AppRoute } from '../types';

interface PackageListProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, data?: any) => void;
}

const PackageList: React.FC<PackageListProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       {/* Header */}
       <div className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={20} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Paquetes Turísticos</h1>
         </div>
         <button className="p-2 text-gray-500 hover:text-green-600">
            <Filter size={20} />
         </button>
       </div>

       <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">Encuentra la combinación perfecta de alojamiento y actividades para tu viaje.</p>

          <div className="grid grid-cols-1 gap-6">
             {POPULAR_PACKAGES.map(pkg => (
                <div 
                  key={pkg.id} 
                  onClick={() => onNavigate(AppRoute.PACKAGE_DETAIL, pkg)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                   <div className="relative h-56 overflow-hidden">
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                         <h3 className="text-xl font-bold leading-tight mb-1">{pkg.title}</h3>
                         <p className="text-xs text-gray-300 opacity-90">{pkg.duration}</p>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                         <Star size={12} className="text-yellow-400 fill-current" />
                         <span className="text-xs font-bold text-gray-900">{pkg.rating}</span>
                      </div>
                   </div>
                   
                   <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                      
                      <div className="space-y-2 mb-4">
                         <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Check size={14} className="text-green-500" />
                            <span>Hotel: <span className="font-semibold">{pkg.hotelName}</span></span>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Check size={14} className="text-green-500" />
                            <span>{pkg.includedTours.length} Actividades incluidas</span>
                         </div>
                         {pkg.transferIncluded && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                               <Check size={14} className="text-green-500" />
                               <span>Traslado Aeropuerto-Hotel-Aeropuerto</span>
                            </div>
                         )}
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                         <div>
                            <span className="text-xs text-gray-400 block">Precio Total</span>
                            <span className="text-xl font-bold text-green-600">${pkg.price}</span>
                         </div>
                         <button className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-200 transition-colors">
                            Ver Paquete
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default PackageList;
