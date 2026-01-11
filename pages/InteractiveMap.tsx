
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Utensils, Pill, DollarSign, Bed, Navigation, Star, Phone, Clock, ChevronRight, X, Map as MapIcon, Grid } from 'lucide-react';
import { DIRECTORY_DATA } from '../constants';

const InteractiveMap: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categories = [
    { id: 'Todos', icon: <Grid size={16} /> },
    { id: 'Restaurante', icon: <Utensils size={16} />, label: 'Comida' },
    { id: 'Hotel', icon: <Bed size={16} />, label: 'Hospedaje' },
    { id: 'Cajero', icon: <DollarSign size={16} />, label: 'Cajeros' },
    { id: 'Droguería', icon: <Pill size={16} />, label: 'Salud' },
  ];

  // Mapeo manual para el mock ya que en constants usamos categorías de 'Tour' para iconos
  const getIcon = (cat: string) => {
    if (cat.includes('Alemana') || cat.includes('Salud') || cat.includes('Droguería')) return <Pill size={18} className="text-red-500" />;
    if (cat.includes('Cajero') || cat.includes('Banco')) return <DollarSign size={18} className="text-blue-500" />;
    if (cat.includes('Hotel')) return <Bed size={18} className="text-emerald-500" />;
    return <Utensils size={18} className="text-orange-500" />;
  };

  const filteredPlaces = DIRECTORY_DATA.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'Todos') return matchesSearch;
    if (activeCategory === 'Cajero') return matchesSearch && place.name.includes('Cajero');
    if (activeCategory === 'Droguería') return matchesSearch && place.name.includes('Droguería');
    return matchesSearch && place.category === activeCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans overflow-x-hidden">
      {/* Header Sticky con Búsqueda */}
      <header className="bg-white px-6 pt-12 pb-6 sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900">Directorio SAI</h1>
          <button 
            onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
            className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100"
          >
            {viewMode === 'list' ? <MapIcon size={20} /> : <Grid size={20} />}
          </button>
        </div>

        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Farmacias, cajeros, comida..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-emerald-200'
              }`}
            >
              {cat.icon}
              {cat.label || cat.id}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="p-6">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredPlaces.length > 0 ? filteredPlaces.map((place) => (
              <div 
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-[0.98] transition-all group"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-emerald-50 transition-colors">
                  {getIcon(place.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{place.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><MapPin size={10} className="text-emerald-500" /> 250m</span>
                    <span className="flex items-center gap-1"><Clock size={10} className="text-emerald-500" /> Abierto</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-200" />
              </div>
            )) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Search size={32} />
                </div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[2px]">No hay resultados cerca de ti</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-[40px] h-[60vh] border-4 border-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center p-12">
            {/* Simulación de Mapa con Pines Reales */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i9994!3i12479!2m3!1e0!2sm!3i615284451!3m8!2ses-US!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover"></div>
            
            {filteredPlaces.slice(0, 5).map((p, i) => (
               <div 
                key={p.id}
                className="absolute transition-all animate-bounce"
                style={{ 
                  top: `${20 + i * 15}%`, 
                  left: `${20 + (i % 3) * 20}%` 
                }}
                onClick={() => setSelectedPlace(p)}
               >
                  <div className="bg-white p-2 rounded-2xl shadow-xl border-2 border-emerald-500">
                    {getIcon(p.name)}
                  </div>
               </div>
            ))}

            <div className="relative z-10">
              <Navigation size={48} className="text-emerald-400 mx-auto mb-4 animate-pulse" />
              <h3 className="font-black text-emerald-900 uppercase text-xs tracking-[3px]">Exploración Activa</h3>
              <p className="text-[10px] text-emerald-600 mt-2 font-bold uppercase">Pulsa en un pin para ver detalles</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalle de Establecimiento */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10">
            <div className="h-40 bg-emerald-600 p-8 flex justify-between items-start text-white relative">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg">
                {getIcon(selectedPlace.name)}
              </div>
              <button 
                onClick={() => setSelectedPlace(null)}
                className="bg-black/10 p-2 rounded-full hover:bg-black/20"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8">
                 <h2 className="text-xl font-black">{selectedPlace.name}</h2>
                 <p className="text-[10px] font-black uppercase opacity-80 tracking-widest mt-1">Establecimiento Verificado</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                 <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100 flex flex-col items-center">
                    <Star size={16} className="text-yellow-500 mb-1" />
                    <span className="text-xs font-black">4.8</span>
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Rating</span>
                 </div>
                 <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100 flex flex-col items-center">
                    <Navigation size={16} className="text-emerald-500 mb-1" />
                    <span className="text-xs font-black">250m</span>
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Distancia</span>
                 </div>
                 <div className="flex-1 bg-gray-50 p-4 rounded-3xl border border-gray-100 flex flex-col items-center">
                    <Clock size={16} className="text-emerald-500 mb-1" />
                    <span className="text-xs font-black">8-20h</span>
                    <span className="text-[8px] text-gray-400 uppercase font-bold">Horario</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><MapPin size={18}/></div>
                    <span className="text-xs font-bold">Avenida Newball #4-25, San Andrés</span>
                 </div>
                 <div className="flex items-center gap-4 text-gray-600">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><Phone size={18}/></div>
                    <span className="text-xs font-bold">+57 312 456 7890</span>
                 </div>
              </div>

              <div className="flex gap-3">
                 <button className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest">
                    ¿Cómo llegar?
                 </button>
                 <button className="flex-1 bg-gray-900 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-widest">
                    Ver Menú/Info
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
