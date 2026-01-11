import React, { useEffect, useRef, useState } from 'react';
import { MapPin, X, Phone, Clock, MapPinIcon, Navigation } from 'lucide-react';
import { api } from '../services/api';
import { DIRECTORY_DATA } from '../constants';

interface DirectoryItem {
  id: string;
  nombre?: string;
  name?: string;
  categoria?: string;
  category?: string;
  latitude?: number;
  lng?: number;
  longitude?: number;
  lat?: number;
  telefono?: string;
  phone?: string;
  direccion?: string;
  address?: string;
  horario?: string;
  hours?: string;
  descripcion?: string;
  description?: string;
  [key: string]: any;
}

interface DirectoryMapboxProps {
  activeCategory?: string;
  searchQuery?: string;
}

const DirectoryMapbox: React.FC<DirectoryMapboxProps> = ({ activeCategory = 'Todos', searchQuery = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<DirectoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [directoryData, setDirectoryData] = useState<DirectoryItem[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<DirectoryItem[]>([]);
  const [internalCategory, setInternalCategory] = useState<string>(activeCategory || 'Todos');
  const [internalSearch, setInternalSearch] = useState<string>(searchQuery || '');

  // Cargar datos de Airtable con fallback a datos locales
  useEffect(() => {
    const loadDirectoryData = async () => {
      setIsLoading(true);
      try {
        console.log('Attempting to load data from Airtable...');
        const data = await api.directory.getDirectoryMap();
        if (data && data.length > 0) {
          setDirectoryData(data);
          console.log(`✓ Loaded ${data.length} items from Airtable`);
        } else {
          console.warn('No data from Airtable, using local fallback');
          setDirectoryData(DIRECTORY_DATA);
        }
      } catch (err) {
        console.error('Error loading from Airtable:', err);
        console.log('Using local fallback data...');
        setDirectoryData(DIRECTORY_DATA);
      }
      setIsLoading(false);
    };

    loadDirectoryData();
  }, []);

  // Obtener color según categoría
  const getCategoryColor = (category: string): string => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('farmacia') || cat.includes('droguería') || cat.includes('salud')) {
      return '#ef4444'; // rojo
    } else if (cat.includes('cajero') || cat.includes('banco')) {
      return '#3b82f6'; // azul
    } else if (cat.includes('hotel') || cat.includes('hospedaje')) {
      return '#10b981'; // verde
    } else if (cat.includes('restaurante') || cat.includes('comida')) {
      return '#f97316'; // naranja
    } else if (cat.includes('transporte') || cat.includes('taxi')) {
      return '#8b5cf6'; // púrpura
    }
    return '#6b7280'; // gris por defecto
  };

  const getCategoryBgColor = (category: string) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('farmacia') || cat.includes('droguería') || cat.includes('salud')) return 'bg-red-50 border-red-200';
    if (cat.includes('cajero') || cat.includes('banco')) return 'bg-blue-50 border-blue-200';
    if (cat.includes('hotel') || cat.includes('hospedaje')) return 'bg-emerald-50 border-emerald-200';
    if (cat.includes('restaurante') || cat.includes('comida')) return 'bg-orange-50 border-orange-200';
    if (cat.includes('transporte') || cat.includes('taxi')) return 'bg-purple-50 border-purple-200';
    return 'bg-gray-50 border-gray-200';
  };

  // Filtrar datos
  useEffect(() => {
    if (directoryData.length === 0) return;

    const filtered = directoryData.filter((place) => {
      const name = (place.nombre || place.name || '').toLowerCase();
      const category = (place.categoria || place.category || '').toLowerCase();
      const matchesSearch = name.includes(internalSearch.toLowerCase());
      
      if (internalCategory === 'Todos') return matchesSearch;
      if (internalCategory === 'Cajero') return matchesSearch && (category.includes('cajero') || category.includes('banco'));
      if (internalCategory === 'Droguería') return matchesSearch && (category.includes('farmacia') || category.includes('droguería'));
      if (internalCategory === 'Restaurante') return matchesSearch && category.includes('restaurante');
      if (internalCategory === 'Hotel') return matchesSearch && (category.includes('hotel') || category.includes('hospedaje'));
      
      return matchesSearch && category.includes(internalCategory.toLowerCase());
    });

    setFilteredPlaces(filtered);
    console.log(`📍 Displaying ${filtered.length} places`);
  }, [internalCategory, internalSearch, directoryData]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl overflow-hidden">
      {/* Grid de puntos */}
      <div className="absolute inset-0 grid grid-cols-4 gap-4 p-6 overflow-y-auto no-scrollbar">
        {isLoading ? (
          <div className="col-span-4 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-emerald-600 font-bold text-sm">Cargando directorio...</p>
            </div>
          </div>
        ) : filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <button
              key={place.id}
              onClick={() => setSelectedMarker(place)}
              className="bg-white rounded-2xl p-4 shadow-md border-2 border-transparent hover:border-emerald-500 hover:shadow-lg transition-all active:scale-95 flex flex-col items-center text-center gap-2 group"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform"
                style={{ backgroundColor: getCategoryColor(place.categoria || place.category) }}
              >
                📍
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">{place.nombre || place.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{place.categoria || place.category}</p>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-4 flex items-center justify-center h-full">
            <div className="text-center">
              <MapPin size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 font-bold text-sm">No hay resultados</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedMarker && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4 rounded-3xl">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white relative">
              <button
                onClick={() => setSelectedMarker(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-black pr-8">{selectedMarker.nombre || selectedMarker.name}</h2>
              <p className="text-[11px] font-bold uppercase opacity-90 tracking-wider mt-2">{selectedMarker.categoria || selectedMarker.category}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {(selectedMarker.direccion || selectedMarker.address) && (
                  <div className="flex gap-3 items-start">
                    <MapPin size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-sm text-gray-700">{selectedMarker.direccion || selectedMarker.address}</span>
                  </div>
                )}
                {(selectedMarker.telefono || selectedMarker.phone) && (
                  <div className="flex gap-3 items-center">
                    <Phone size={16} className="text-emerald-500 flex-shrink-0" />
                    <a
                      href={`tel:${selectedMarker.telefono || selectedMarker.phone}`}
                      className="text-sm text-emerald-600 font-semibold hover:underline"
                    >
                      {selectedMarker.telefono || selectedMarker.phone}
                    </a>
                  </div>
                )}
                {(selectedMarker.horario || selectedMarker.hours) && (
                  <div className="flex gap-3 items-center">
                    <Clock size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{selectedMarker.horario || selectedMarker.hours}</span>
                  </div>
                )}
              </div>

              {(selectedMarker.descripcion || selectedMarker.description) && (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <p className="text-xs text-gray-600">{selectedMarker.descripcion || selectedMarker.description}</p>
                </div>
              )}

              <button className="w-full bg-emerald-600 text-white rounded-2xl py-3 text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                <Navigation size={14} />
                Ver en Mapa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryMapbox;
