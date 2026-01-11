
import React from 'react';
import { TAXI_ZONES } from '../constants';

interface MapProps {
  selectedZoneId: string;
  onSelectZone: (id: string) => void;
}

const SanAndresMap: React.FC<MapProps> = ({ selectedZoneId, onSelectZone }) => {
  // Helper to get color style
  const getZoneStyle = (zoneId: string, defaultColorClass: string) => {
    const isSelected = selectedZoneId === zoneId;
    const isAnySelected = !!selectedZoneId;
    
    // Color Mapping
    const colorMap: Record<string, string> = {
       'bg-yellow-400': '#FACC15', // Zona 1
       'bg-green-500': '#22C55E',  // Zona 2
       'bg-pink-500': '#EC4899',   // Zona 3
       'bg-blue-400': '#60A5FA',   // Zona 4
       'bg-red-500': '#EF4444',    // Zona 5
    };

    const baseColor = colorMap[defaultColorClass] || '#cbd5e1';

    return {
       fill: baseColor,
       fillOpacity: isSelected ? 0.6 : (isAnySelected ? 0.1 : 0.3), // Highlight selected, dim others
       stroke: isSelected ? '#ffffff' : baseColor,
       strokeWidth: isSelected ? 3 : 1,
       cursor: 'pointer',
       transition: 'all 0.3s ease',
       filter: isSelected ? 'drop-shadow(0px 0px 8px rgba(0,0,0,0.3))' : 'none'
    };
  };

  const getZone = (id: string) => TAXI_ZONES.find(z => z.id === id);

  return (
    <div className="w-full flex justify-center my-4 relative rounded-2xl overflow-hidden border border-gray-200 bg-blue-50">
      
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 350 500" 
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto max-h-[500px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Fondo del Mapa (Imagen Realista) */}
        <image 
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/San_Andr%C3%A9s_Island_map-en.svg/656px-San_Andr%C3%A9s_Island_map-en.svg.png" 
          x="0" 
          y="0" 
          width="350" 
          height="500" 
          opacity="0.8"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* 2. Capas de Zonas (Overlays) */}

        {/* ZONA 1: Norte (Centro, Aeropuerto) */}
        <path 
          d="M 100,50 C 120,20 220,10 260,50 C 280,80 270,130 240,150 L 140,140 C 100,130 90,90 100,50 Z" 
          style={getZoneStyle('z1', getZone('z1')?.color || '')}
          onClick={() => onSelectZone('z1')}
        />
        {/* Etiqueta Z1 */}
        <g pointerEvents="none" opacity={selectedZoneId === 'z1' || !selectedZoneId ? 1 : 0.5}>
           <rect x="150" y="70" width="60" height="20" rx="4" fill="white" fillOpacity="0.8" />
           <text x="180" y="84" fontSize="10" fontWeight="bold" fill="black" textAnchor="middle">ZONA 1</text>
        </g>


        {/* ZONA 2: Este (San Luis) */}
        <path 
          d="M 240,150 L 255,250 C 250,300 230,350 200,380 L 170,360 L 180,200 L 240,150 Z" 
          style={getZoneStyle('z2', getZone('z2')?.color || '')}
          onClick={() => onSelectZone('z2')}
        />
        <g pointerEvents="none" opacity={selectedZoneId === 'z2' || !selectedZoneId ? 1 : 0.5}>
           <rect x="215" y="260" width="50" height="18" rx="4" fill="white" fillOpacity="0.8" />
           <text x="240" y="273" fontSize="9" fontWeight="bold" fill="black" textAnchor="middle">ZONA 2</text>
        </g>


        {/* ZONA 3: Centro (La Loma) */}
        <path 
          d="M 140,140 L 180,200 L 170,360 L 120,340 C 100,300 110,200 140,140 Z" 
          style={getZoneStyle('z3', getZone('z3')?.color || '')}
          onClick={() => onSelectZone('z3')}
        />
        <g pointerEvents="none" opacity={selectedZoneId === 'z3' || !selectedZoneId ? 1 : 0.5}>
           <rect x="125" y="220" width="50" height="18" rx="4" fill="white" fillOpacity="0.8" />
           <text x="150" y="233" fontSize="9" fontWeight="bold" fill="black" textAnchor="middle">ZONA 3</text>
        </g>


        {/* ZONA 5: Oeste (West View, Cove) */}
        <path 
          d="M 100,150 L 140,140 L 120,340 L 80,320 C 60,280 60,200 100,150 Z" 
          style={getZoneStyle('z5', getZone('z5')?.color || '')}
          onClick={() => onSelectZone('z5')}
        />
        <g pointerEvents="none" opacity={selectedZoneId === 'z5' || !selectedZoneId ? 1 : 0.5}>
           <rect x="65" y="240" width="50" height="18" rx="4" fill="white" fillOpacity="0.8" />
           <text x="90" y="253" fontSize="9" fontWeight="bold" fill="black" textAnchor="middle">ZONA 5</text>
        </g>


        {/* ZONA 4: Sur (Punta Sur) */}
        <path 
          d="M 80,320 L 120,340 L 170,360 L 200,380 C 180,420 150,440 130,430 C 100,420 90,380 80,320 Z" 
          style={getZoneStyle('z4', getZone('z4')?.color || '')}
          onClick={() => onSelectZone('z4')}
        />
        <g pointerEvents="none" opacity={selectedZoneId === 'z4' || !selectedZoneId ? 1 : 0.5}>
           <rect x="115" y="390" width="50" height="18" rx="4" fill="white" fillOpacity="0.8" />
           <text x="140" y="403" fontSize="9" fontWeight="bold" fill="black" textAnchor="middle">ZONA 4</text>
        </g>

        {/* Airport Icon Location */}
        <circle cx="230" cy="80" r="4" fill="white" stroke="black" />
        <text x="230" y="75" fontSize="12" textAnchor="middle">✈️</text>

      </svg>

      {/* Leyenda Flotante */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-gray-100 shadow-sm text-[10px]">
         <p className="font-bold text-gray-500 mb-1">Leyenda</p>
         <div className="flex items-center gap-1 mb-0.5"><div className="w-2 h-2 rounded-full bg-yellow-400"></div> Z1 Centro</div>
         <div className="flex items-center gap-1 mb-0.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Z2 San Luis</div>
         <div className="flex items-center gap-1 mb-0.5"><div className="w-2 h-2 rounded-full bg-pink-500"></div> Z3 Loma</div>
         <div className="flex items-center gap-1 mb-0.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Z5 Oeste</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Z4 Sur</div>
      </div>
    </div>
  );
};

export default SanAndresMap;
