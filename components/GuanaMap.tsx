
import React, { forwardRef, useImperativeHandle } from 'react';
import { GuanaLocation } from '../types';
import { Map as MapIcon, Clock } from 'lucide-react';

interface GuanaMapProps {
  locations: GuanaLocation[];
  onSelectLocation?: (location: GuanaLocation) => void;
}

export interface GuanaMapHandle {
  flyToLocation: (lat: number, lng: number, zoom?: number) => void;
}

const GuanaMap = forwardRef<GuanaMapHandle, GuanaMapProps>(({ locations, onSelectLocation }, ref) => {
  
  useImperativeHandle(ref, () => ({
    flyToLocation: () => {
      console.log("Map feature suspended");
    }
  }));

  return (
    <div className="w-full h-full bg-emerald-50 flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-pulse">
        <MapIcon size={40} />
      </div>
      <h3 className="text-xl font-bold text-emerald-900 mb-2">Mapa en Mantenimiento</h3>
      <p className="text-sm text-emerald-700 max-w-xs">
        Estamos optimizando la experiencia cartográfica. Esta función estará disponible próximamente.
      </p>
      <div className="mt-6 flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full text-emerald-600 text-xs font-bold border border-emerald-200">
        <Clock size={14} /> V4.0 en desarrollo
      </div>
    </div>
  );
});

export default GuanaMap;
