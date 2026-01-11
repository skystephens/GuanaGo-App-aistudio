
import React from 'react';
import { ArrowLeft, Download, ArrowDown, CreditCard } from 'lucide-react';

const PartnerWallet: React.FC = () => {
  const history = [
    { amount: '50,000', id: '#20231026', date: '26 Oct 2023' },
    { amount: '75,000', id: '#20231015', date: '15 Oct 2023' },
    { amount: '100,000', id: '#20230930', date: '30 Sep 2023' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-32 font-sans relative">
       <header className="px-6 pt-12 pb-6 flex items-center gap-4">
          <h1 className="text-xl font-bold">Billetera y Pagos</h1>
       </header>

       <div className="px-6">
          {/* Card */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700 shadow-lg relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
             
             <p className="text-gray-400 text-sm mb-1 relative z-10">Saldo Actual</p>
             <div className="flex items-end gap-2 mb-2 relative z-10">
                <span className="text-4xl font-bold tracking-tight">2,500</span>
                <span className="text-xl font-bold text-green-500 mb-2">$GUANA</span>
             </div>
             <div className="h-px bg-gray-700 my-3"></div>
             <div className="flex justify-between items-center relative z-10">
                <span className="text-sm text-gray-400">Equivalente</span>
                <p className="text-green-500 font-bold text-xl">COP $250,000</p>
             </div>
          </div>

          {/* History Header */}
          <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-lg">Historial de Pagos</h2>
             <button className="flex items-center gap-1.5 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition-colors">
                <Download size={14} />
                <span>Reporte</span>
             </button>
          </div>

          {/* List */}
          <div className="space-y-3">
             {history.map((item, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-xl flex items-center justify-between border border-gray-700 hover:border-gray-600 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center border border-green-900/50">
                         <ArrowDown size={18} className="text-green-500" />
                      </div>
                      <div>
                         <p className="font-bold text-white">COP ${item.amount}</p>
                         <p className="text-xs text-gray-500">Liquidación {item.id}</p>
                      </div>
                   </div>
                   <span className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded">{item.date}</span>
                </div>
             ))}
          </div>
       </div>

       {/* Floating Action Button Container */}
       <div className="fixed bottom-[80px] left-0 right-0 z-30 px-6 max-w-md mx-auto w-full pointer-events-none">
          <button className="pointer-events-auto w-full bg-green-500 hover:bg-green-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
             <CreditCard size={20} />
             <span>Solicitar Liquidación</span>
          </button>
       </div>
    </div>
  );
};

export default PartnerWallet;
