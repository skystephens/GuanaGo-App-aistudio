
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowLeft, Anchor, Bed, Car, ExternalLink, ShieldCheck, Info, X } from 'lucide-react';
import { AppRoute, ItineraryDay, ItineraryActivity } from '../types';
import BlockchainBadge from '../components/BlockchainBadge';

interface ItineraryProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, data?: any) => void;
}

const MyItinerary: React.FC<ItineraryProps> = ({ onBack, onNavigate }) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeVoucher, setActiveVoucher] = useState<ItineraryActivity | null>(null);

  const itinerary: ItineraryDay[] = [
    {
      day: 1,
      date: 'Lun, 12 Oct',
      activities: [
        { id: '1-1', time: '09:00 AM', title: 'Transfer In Aeropuerto', provider: 'Taxis SAI GRP', image: 'https://picsum.photos/id/1072/400/300', status: 'confirmed', txId: '0.0.111222@1625068800' },
        { id: '1-2', time: '11:00 AM', title: 'Check-In Hotel', provider: 'Bahía Sonora', image: 'https://picsum.photos/id/1018/400/300', status: 'confirmed', isRaizal: true, txId: '0.0.111223@1625068801' },
        { id: '1-3', time: '01:00 PM', title: 'Almuerzo Raizal', provider: 'Restaurante Bushi', image: 'https://picsum.photos/id/1080/400/300', status: 'confirmed', isRaizal: true },
        { id: '1-4', time: '07:00 PM', title: 'Noche Blanca Barco', provider: 'Porto SAI', image: 'https://picsum.photos/id/1036/400/300', status: 'confirmed' }
      ]
    },
    {
      day: 2,
      date: 'Mar, 13 Oct',
      activities: [
        { id: '2-1', time: '08:00 AM', title: 'Traslado Miss Trinie', provider: 'Taxis SAI GRP', image: 'https://picsum.photos/id/1071/400/300', status: 'confirmed' },
        { id: '2-2', time: '09:00 AM', title: 'Desayuno Raizal', provider: 'Posada Miss Trinie', image: 'https://picsum.photos/id/1029/400/300', status: 'confirmed', isRaizal: true },
        { id: '2-3', time: '11:00 AM', title: 'Taller Coco Art', provider: 'Bobby R Coco', image: 'https://picsum.photos/id/1053/400/300', status: 'confirmed', isRaizal: true },
        { id: '2-4', time: '01:00 PM', title: 'Almuerzo Cultural', provider: 'Restaurante Bobby R', image: 'https://picsum.photos/id/1056/400/300', status: 'confirmed', isRaizal: true }
      ]
    },
    {
       day: 3,
       date: 'Mié, 14 Oct',
       activities: [
         { id: '3-1', time: '09:00 AM', title: 'Experiencia Granja', provider: 'Carib Farm', image: 'https://picsum.photos/id/1022/400/300', status: 'confirmed', isRaizal: true },
         { id: '3-2', time: '11:30 AM', title: 'Centro Histórico La Loma', provider: 'Guía Nativo', image: 'https://picsum.photos/id/1040/400/300', status: 'confirmed', isRaizal: true },
         { id: '3-3', time: '04:00 PM', title: 'Tour Bahía Interna', provider: 'Porto SAI', image: 'https://picsum.photos/id/1031/400/300', status: 'confirmed' }
       ]
    },
    {
       day: 4,
       date: 'Jue, 15 Oct',
       activities: [
         { id: '4-1', time: '08:00 AM', title: 'Desayuno de Cierre', provider: 'Bahía Sonora', image: 'https://picsum.photos/id/1018/400/300', status: 'confirmed', isRaizal: true },
         { id: '4-2', time: '10:00 AM', title: 'Rondón Tour (Almuerzo)', provider: 'El Cove Raizal', image: 'https://picsum.photos/id/1056/400/300', status: 'confirmed', isRaizal: true },
         { id: '4-3', time: '03:00 PM', title: 'Transfer Out Aeropuerto', provider: 'Taxis SAI GRP', image: 'https://picsum.photos/id/1072/400/300', status: 'confirmed' }
       ]
    }
  ];

  const currentDayData = itinerary.find(d => d.day === selectedDay);

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
       {/* Header */}
       <div className="bg-white px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 z-30 shadow-sm">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><ArrowLeft size={20}/></button>
          <div>
             <h1 className="text-xl font-bold">Mi Itinerario</h1>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Grupo: Vargas (19 Pax)</p>
          </div>
       </div>

       {/* Day Selector */}
       <div className="px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-sm sticky top-[100px] z-20 border-b border-gray-100">
          {itinerary.map(d => (
             <button 
               key={d.day}
               onClick={() => setSelectedDay(d.day)}
               className={`px-5 py-3 rounded-2xl flex flex-col items-center min-w-[100px] transition-all ${
                 selectedDay === d.day ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-gray-600 border border-gray-100'
               }`}
             >
                <span className="text-[10px] font-bold uppercase opacity-70">Día {d.day}</span>
                <span className="text-sm font-bold">{d.date.split(',')[1]}</span>
             </button>
          ))}
       </div>

       {/* Timeline */}
       <div className="p-6 space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-emerald-100 -z-10"></div>
          
          {currentDayData?.activities.map((act, idx) => (
             <div key={act.id} className="flex gap-4 animate-in fade-in slide-in-from-left-4" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex flex-col items-center">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                     act.isRaizal ? 'bg-orange-500 text-white ring-4 ring-orange-50' : 'bg-white text-emerald-600'
                   }`}>
                      {act.title.toLowerCase().includes('hotel') ? <Bed size={20}/> : 
                       act.title.toLowerCase().includes('transfer') ? <Car size={20}/> : <Anchor size={20}/>}
                   </div>
                   <span className="text-[9px] font-bold text-gray-400 mt-2">{act.time}</span>
                </div>

                <div className="flex-1 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
                   <div className="flex justify-between items-start">
                      <div className="min-w-0">
                         <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{act.title}</h3>
                            {act.isRaizal && <div className="bg-orange-100 p-1 rounded-md" title="Ruta Raizal"><img src="https://cdn-icons-png.flaticon.com/512/10046/10046429.png" className="w-3 h-3" /></div>}
                         </div>
                         <p className="text-xs text-emerald-600 font-bold">{act.provider}</p>
                      </div>
                      <button 
                        onClick={() => setActiveVoucher(act)}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                      >
                         <ExternalLink size={16} />
                      </button>
                   </div>
                   
                   <div className="h-24 w-full rounded-2xl overflow-hidden relative">
                      <img src={act.image} className="w-full h-full object-cover" />
                      {act.isRaizal && (
                         <div className="absolute top-2 right-2 bg-orange-500/90 text-white text-[8px] font-extrabold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                            <Info size={10} /> SABÍAS QUE...
                         </div>
                      )}
                   </div>

                   {act.isRaizal && (
                      <p className="text-[10px] text-gray-500 italic leading-relaxed border-l-2 border-orange-200 pl-3">
                         {act.title.includes('Loma') ? 'La Iglesia Bautista es la más antigua de la isla, fundada en 1844.' : 
                          act.title.includes('Rondón') ? 'El Rondón es el plato insignia, un guiso de caracol con leche de coco.' :
                          'Este servicio apoya directamente a la economía de las familias nativas.'}
                      </p>
                   )}
                </div>
             </div>
          ))}
       </div>

       {/* Voucher Modal */}
       {activeVoucher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-in fade-in">
             <div className="bg-white w-full max-w-sm rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                <div className={`p-8 text-white flex flex-col items-center ${activeVoucher.isRaizal ? 'bg-orange-500' : 'bg-emerald-600'}`}>
                   <button onClick={() => setActiveVoucher(null)} className="absolute top-6 right-6 p-2 bg-black/10 rounded-full hover:bg-black/20"><X size={20}/></button>
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-xl">
                      {activeVoucher.isRaizal ? <img src="https://cdn-icons-png.flaticon.com/512/10046/10046429.png" className="w-12 h-12" /> : <ShieldCheck size={40} className="text-emerald-600"/>}
                   </div>
                   <h2 className="text-xl font-bold text-center leading-tight mb-2">{activeVoucher.title}</h2>
                   <p className="text-xs opacity-80 font-bold uppercase tracking-widest">{activeVoucher.provider}</p>
                </div>

                <div className="p-8 space-y-6 text-center">
                   <div className="flex flex-col items-center">
                      <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-4 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                            {/* QR Placeholder */}
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v2h-3v-2zm-3 2h2v3h-2v-3zm3 3h3v2h-3v-2zm-3-1h1v1h-1v-1zm2-2h1v1h-1v-1zm1-1h1v1h-1v-1z" /></svg>
                         </div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest">Código de Canje Inmutable</p>
                   </div>

                   <div className="pt-6 border-t border-gray-100">
                      <BlockchainBadge status="verified" transactionId={activeVoucher.txId || '0.0.999999@1625068800'} />
                      <p className="text-[9px] text-gray-400 mt-2">Este voucher ha sido notarizado en <strong>Hedera Hashgraph</strong> para garantizar su transparencia y validez.</p>
                   </div>

                   <button onClick={() => setActiveVoucher(null)} className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg">Listo</button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

export default MyItinerary;
