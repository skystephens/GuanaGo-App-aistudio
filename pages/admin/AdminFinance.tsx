
import React, { useState } from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Gift, Search, Download } from 'lucide-react';
import BlockchainBadge from '../../components/BlockchainBadge';

const AdminFinance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'redemptions' | 'payments'>('redemptions');

  // Mock Data for Redemptions (Canjes)
  const redemptions = [
    { id: '1', user: 'Sofia Ramirez', item: 'Cena Romántica', cost: 2500, date: 'Hoy, 10:30 AM', status: 'completed', auditStatus: 'verified', txId: '0.0.987654@1625068805.000000000' },
    { id: '2', user: 'Carlos Mendoza', item: 'Snorkel Tour', cost: 1800, date: 'Ayer, 4:15 PM', status: 'completed', auditStatus: 'verified', txId: '0.0.987655@1625068806.000000000' },
    { id: '3', user: 'Ana Lopez', item: 'Artesanía Coco', cost: 500, date: '28 Jul, 2:00 PM', status: 'pending', auditStatus: 'pending' },
    { id: '4', user: 'Juan Perez', item: 'Alquiler Bici', cost: 300, date: '27 Jul, 11:00 AM', status: 'completed', auditStatus: 'verified', txId: '0.0.987656@1625068807.000000000' },
  ];

  // Mock Data for Payments (Pagos/Ingresos)
  const payments = [
    { id: 'p1', ref: 'ORD-2024-001', type: 'income', amount: 150000, description: 'Reserva: Vuelta a la Isla', date: 'Hoy, 09:00 AM', auditStatus: 'verified', txId: '0.0.888888@1625068808.000000000' },
    { id: 'p2', ref: 'PAY-8821', type: 'payout', amount: 450000, description: 'Pago a Proveedor: EcoTours', date: 'Ayer, 6:00 PM', auditStatus: 'verified', txId: '0.0.888889@1625068809.000000000' },
    { id: 'p3', ref: 'ORD-2024-002', type: 'income', amount: 85000, description: 'Reserva: Acuario', date: '28 Jul, 3:30 PM', auditStatus: 'pending' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white pb-24 font-sans">
       <header className="px-6 pt-12 pb-6 bg-gray-900 sticky top-0 z-10 border-b border-gray-800">
          <div className="flex justify-between items-center mb-4">
             <h1 className="text-2xl font-bold">Finanzas</h1>
             <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-gray-400">
                <Download size={20} />
             </button>
          </div>
          
          <div className="flex p-1 bg-gray-800 rounded-xl">
             <button 
                onClick={() => setActiveTab('redemptions')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                   activeTab === 'redemptions' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
             >
                Canjes de Tokens
             </button>
             <button 
                onClick={() => setActiveTab('payments')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                   activeTab === 'payments' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'
                }`}
             >
                Pagos y Transacciones
             </button>
          </div>
       </header>

       <div className="px-6 py-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4 mb-2">
             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Total Canjeado (Mes)</span>
                <p className="text-xl font-bold text-purple-400 mt-1">12,500 <span className="text-xs">Tokens</span></p>
             </div>
             <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <span className="text-gray-400 text-[10px] uppercase font-bold">Ingresos Netos (Mes)</span>
                <p className="text-xl font-bold text-green-400 mt-1">$4.2M <span className="text-xs">COP</span></p>
             </div>
          </div>

          {activeTab === 'redemptions' ? (
             <div className="space-y-3">
                {redemptions.map(item => (
                   <div key={item.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-500 border border-purple-500/20">
                              <Gift size={18} />
                           </div>
                           <div>
                              <p className="font-bold text-sm">{item.item}</p>
                              <p className="text-xs text-gray-400">{item.user}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-white">-{item.cost}</p>
                           <p className="text-[10px] text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-750 flex justify-end">
                         <BlockchainBadge status={item.auditStatus as any} transactionId={item.txId} size="sm" />
                      </div>
                   </div>
                ))}
             </div>
          ) : (
             <div className="space-y-3">
                {payments.map(pay => (
                   <div key={pay.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                               pay.type === 'income' 
                                  ? 'bg-green-900/30 text-green-500 border-green-500/20' 
                                  : 'bg-red-900/30 text-red-500 border-red-500/20'
                            }`}>
                               {pay.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                            </div>
                            <div>
                               <p className="font-bold text-sm">{pay.description}</p>
                               <p className="text-xs text-gray-500">{pay.ref}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className={`font-bold ${pay.type === 'income' ? 'text-green-400' : 'text-white'}`}>
                               {pay.type === 'income' ? '+' : '-'}${pay.amount.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-gray-500">{pay.date}</p>
                         </div>
                      </div>
                      <div className="pt-2 border-t border-gray-750 flex justify-end">
                         <BlockchainBadge status={pay.auditStatus as any} transactionId={pay.txId} size="sm" />
                      </div>
                   </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
};

export default AdminFinance;
