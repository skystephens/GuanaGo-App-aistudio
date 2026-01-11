
import React, { useState } from 'react';
import { QrCode, User, ChevronRight, Coins, ChevronDown, MapPin, Clock, Info } from 'lucide-react';
import { AppRoute } from '../../types';

interface OperationsProps {
   onNavigate: (route: AppRoute) => void;
}

const PartnerOperations: React.FC<OperationsProps> = ({ onNavigate }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const missions = [
    { 
       client: 'Sofia Ramirez', 
       time: '10:00 AM', 
       img: 'https://i.pravatar.cc/150?u=1',
       title: 'Tour de Snorkel VIP',
       location: 'Muelle Toninos',
       details: '2 Adultos, 1 Niño. Incluye almuerzo vegetariano.',
       status: 'confirmed'
    },
    { 
       client: 'Mateo Vargas', 
       time: '11:30 AM', 
       img: 'https://i.pravatar.cc/150?u=2',
       title: 'Alquiler de Mulita',
       location: 'Lobby Hotel Decameron',
       details: 'Entrega de vehículo placa WX-204.',
       status: 'pending'
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-24 font-sans">
       <header className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-bold mb-1">Operaciones</h1>
          <p className="text-gray-400 text-sm">Gestiona el flujo de hoy</p>
       </header>

       <div className="px-6">
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 p-5 rounded-2xl flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <Coins className="text-yellow-500" size={28} />
                <div>
                   <p className="text-xs text-yellow-200 font-bold uppercase tracking-wider">Saldo Venta</p>
                   <p className="text-2xl font-extrabold text-yellow-400">2,500 <span className="text-sm">$GUANA</span></p>
                </div>
             </div>
             <ChevronRight size={20} className="text-yellow-500" />
          </div>

          <button 
            onClick={() => onNavigate(AppRoute.PARTNER_SCANNER)}
            className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg mb-8"
          >
             <QrCode size={24} />
             <span>ESCANEAR QR</span>
          </button>

          <h2 className="text-lg font-bold mb-4">Misiones de Hoy</h2>
          <div className="space-y-4">
             {missions.map((m, idx) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                   <div className="flex items-center gap-4">
                      <img src={m.img} className="w-12 h-12 rounded-full" alt={m.client} />
                      <div>
                         <p className="font-bold text-sm">{m.client}</p>
                         <p className="text-green-400 text-xs">{m.time} - {m.title}</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default PartnerOperations;
