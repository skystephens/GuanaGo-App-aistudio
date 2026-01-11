
import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Tag, Trophy, Target, Loader2, Gift } from 'lucide-react';
import { api } from '../services/api';
import { Campaign } from '../types';

const Marketplace: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Todas');
  
  const filters = ['Todas', 'Descuento', 'Reto', 'Promoción'];

  useEffect(() => {
     fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
     setLoading(true);
     try {
        const data = await api.campaigns.list();
        // Solo mostramos las que el admin dejó activas
        setCampaigns(data.filter(c => c.active));
     } catch (e) {
        console.error("Error fetching campaigns", e);
     } finally {
        setLoading(false);
     }
  };

  const filteredCampaigns = campaigns.filter(c => {
     if (filter === 'Todas') return true;
     if (filter === 'Descuento') return c.type === 'discount';
     if (filter === 'Reto') return c.type === 'mission';
     return c.type === 'promotion';
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans">
      {/* Header Premium */}
      <header className="px-6 pt-12 pb-6 bg-white sticky top-0 z-10 shadow-sm border-b border-gray-100">
         <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
               <Sparkles size={20} />
            </div>
            <div>
               <h1 className="text-xl font-black text-gray-900 leading-none">Beneficios SAI</h1>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ofertas y Recompensas</p>
            </div>
         </div>
         
         <div className="relative">
           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             type="text" 
             placeholder="Buscar cupones o misiones..." 
             className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
           />
         </div>
      </header>

      <div className="px-6 py-6">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
           {filters.map(f => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-5 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border ${
                 filter === f ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
               }`}
             >
               {f}
             </button>
           ))}
        </div>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-emerald-600" size={32} />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sincronizando ofertas...</p>
           </div>
        ) : filteredCampaigns.length === 0 ? (
           <div className="text-center py-20 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                 <Gift size={40} />
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No hay campañas activas hoy</p>
           </div>
        ) : (
           <div className="space-y-4">
              {filteredCampaigns.map(camp => (
                <div key={camp.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden relative">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-2xl ${
                            camp.type === 'mission' ? 'bg-blue-50 text-blue-600' : 
                            camp.type === 'discount' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
                         }`}>
                            {camp.type === 'mission' ? <Target size={20} /> : camp.type === 'discount' ? <Tag size={20} /> : <Sparkles size={20} />}
                         </div>
                         <div>
                            <h3 className="font-black text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">{camp.title}</h3>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{camp.type === 'mission' ? 'Reto Gamificado' : 'Oferta Limitada'}</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-2">{camp.description}</p>
                   
                   <div className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-tighter">
                         <Trophy size={14} /> {camp.reward || 'Premio Especial'}
                      </div>
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                         Participar
                      </button>
                   </div>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
