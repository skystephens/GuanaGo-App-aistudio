
import React, { useState, useMemo } from 'react';
import { Users, Calculator, Plus, Minus, Home, Car, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const GroupQuote: React.FC = () => {
  const [adults, setAdults] = useState(17);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(1);

  const results = useMemo(() => {
    return api.quotes.calculateGroup({ adults, children, infants, margin: 0.20 });
  }, [adults, children, infants]);

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
       <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Cotización Grupal</h1>
          <p className="text-sm text-gray-500 mt-1">Calculadora Logística Pro (Neto + 20%)</p>
       </div>

       <div className="p-6 space-y-6">
          {/* Input Panel */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users size={14} /> Configuración del Grupo
             </h3>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                   <div>
                      <span className="block font-bold text-gray-800">Adultos</span>
                      <span className="text-[10px] text-gray-400">Mayores de 12 años</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Minus size={14}/></button>
                      <span className="font-bold text-lg w-6 text-center">{adults}</span>
                      <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Plus size={14}/></button>
                   </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                   <div>
                      <span className="block font-bold text-gray-800">Niños</span>
                      <span className="text-[10px] text-gray-400">3 - 11 años</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Minus size={14}/></button>
                      <span className="font-bold text-lg w-6 text-center">{children}</span>
                      <button onClick={() => setChildren(children + 1)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Plus size={14}/></button>
                   </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                   <div>
                      <span className="block font-bold text-gray-800">Infantes</span>
                      <span className="text-[10px] text-gray-400">Menores de 3 años</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <button onClick={() => setInfants(Math.max(0, infants - 1))} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Minus size={14}/></button>
                      <span className="font-bold text-lg w-6 text-center">{infants}</span>
                      <button onClick={() => setInfants(infants + 1)} className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-200"><Plus size={14}/></button>
                   </div>
                </div>
             </div>
          </div>

          {/* Logistics Summary */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-emerald-600 rounded-3xl p-5 text-white shadow-lg shadow-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                   <Home size={18} className="opacity-80" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Alojamiento</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-3xl font-extrabold">{results.roomsNeeded}</span>
                   <span className="text-xs font-medium">Hab.</span>
                </div>
                <p className="text-[9px] mt-2 opacity-80 leading-tight">Calculado para acomodación doble/múltiple.</p>
             </div>

             <div className="bg-orange-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-100">
                <div className="flex items-center gap-2 mb-3">
                   <Car size={18} className="opacity-80" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Traslados</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-3xl font-extrabold">{results.taxisNeeded}</span>
                   <span className="text-xs font-medium">Taxis</span>
                </div>
                <p className="text-[9px] mt-2 opacity-80 leading-tight">Capacidad oficial de 4 pax por vehículo.</p>
             </div>
          </div>

          {/* Financial Breakdown */}
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             
             <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp size={14} /> Análisis Financiero
             </h3>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                         <DollarSign size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-400">Costo Neto Total</span>
                   </div>
                   <span className="font-bold text-lg">${results.totalNeto.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400">
                         <TrendingUp size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-400">Margen Guana (20%)</span>
                   </div>
                   <span className="font-bold text-lg text-emerald-400">+ ${results.marginValue.toLocaleString()}</span>
                </div>

                <div className="pt-4">
                   <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Precio Venta Público (PVP)</p>
                   <div className="flex justify-between items-end">
                      <h2 className="text-4xl font-extrabold text-white">${results.totalPVP.toLocaleString()}</h2>
                      <p className="text-[10px] text-gray-500 mb-1">COP Total</p>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-800 flex items-center gap-3">
                <div className="bg-white/5 p-2 rounded-xl">
                   <ShieldCheck size={20} className="text-emerald-500" />
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                   Esta cotización incluye impuestos y tasas administrativas locales. Válida por 48 horas.
                </p>
             </div>
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-3xl shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2">
             <span>Generar Reserva y Enviar Cotización</span>
             <ArrowRight size={20} />
          </button>
       </div>
    </div>
  );
};

export default GroupQuote;
