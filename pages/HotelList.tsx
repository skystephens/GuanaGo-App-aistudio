import React from 'react';
import { ArrowLeft, Filter, MapPin, Star, Wifi, Droplets } from 'lucide-react';
import { HOTEL_LIST } from '../constants';
import { AppRoute } from '../types';

interface HotelListProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, data?: any) => void;
}

const HotelList: React.FC<HotelListProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       {/* Header */}
       <div className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-6 py-4 flex items-center justify-between shadow-sm">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <ArrowLeft size={20} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Alojamientos</h1>
         </div>
         <button className="p-2 text-gray-500 hover:text-green-600">
            <Filter size={20} />
         </button>
       </div>

       <div className="p-6">
          {/* List */}
          <div className="space-y-6">
             {HOTEL_LIST.map(hotel => (
                <div 
                  key={hotel.id} 
                  onClick={() => onNavigate(AppRoute.HOTEL_DETAIL, hotel)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                >
                   <div className="h-48 relative">
                      <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1 text-white">
                         <MapPin size={12} />
                         <span className="text-xs font-medium truncate max-w-[200px]">{hotel.address}</span>
                      </div>
                   </div>
                   <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 mr-2">{hotel.title}</h3>
                         <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md">
                               <Star size={12} className="text-green-600 fill-current" />
                               <span className="text-xs font-bold text-green-700">{hotel.rating}</span>
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex gap-3 mb-4">
                         {hotel.amenities.slice(0, 3).map(am => (
                            <span key={am} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{am}</span>
                         ))}
                         {hotel.amenities.length > 3 && (
                            <span className="text-xs text-gray-400 py-1">+ {hotel.amenities.length - 3}</span>
                         )}
                      </div>

                      <div className="flex items-end justify-between border-t border-gray-100 pt-3">
                         <p className="text-xs text-gray-500 line-clamp-1 flex-1 mr-4">{hotel.description}</p>
                         <div className="text-right whitespace-nowrap">
                            <span className="text-xl font-bold text-gray-900">${hotel.price}</span>
                            <span className="text-xs text-gray-400 block">/ noche</span>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default HotelList;