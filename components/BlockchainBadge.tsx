
import React from 'react';
import { Shield, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { AuditStatus } from '../types';

interface BlockchainBadgeProps {
  status: AuditStatus;
  transactionId?: string;
  size?: 'sm' | 'md';
}

const BlockchainBadge: React.FC<BlockchainBadgeProps> = ({ status, transactionId, size = 'md' }) => {
  const isSmall = size === 'sm';
  
  const handleOpenHashScan = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (transactionId) {
      window.open(`https://hashscan.io/mainnet/transaction/${transactionId}`, '_blank');
    }
  };

  if (status === 'pending') {
    return (
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 ${isSmall ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-wider`}>
        <Loader2 size={isSmall ? 10 : 12} className="animate-spin" />
        <span>Verificando Integridad...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 ${isSmall ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-wider`}>
        <AlertCircle size={isSmall ? 10 : 12} />
        <span>Error de Auditoría</span>
      </div>
    );
  }

  return (
    <button 
      onClick={handleOpenHashScan}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 ${isSmall ? 'text-[9px]' : 'text-[10px]'} font-bold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors group cursor-pointer shadow-sm`}
    >
      <Shield size={isSmall ? 10 : 12} className="fill-emerald-500/20" />
      <span>Auditado en Hedera</span>
      <ExternalLink size={isSmall ? 8 : 10} className="opacity-50 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};

export default BlockchainBadge;
