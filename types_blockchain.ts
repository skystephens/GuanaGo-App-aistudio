
import { AuditStatus } from './types';

export interface AuditRecord {
  transactionId: string;
  timestamp: string;
  ledger: 'Hedera' | 'Binance';
  status: AuditStatus;
  hash?: string;
}

export interface TransactionData {
  orderId: string;
  amountCOP: number;
  amountUSDT: number;
  currency: 'COP' | 'USDT' | 'HBAR';
  method: 'BinancePay' | 'HederaNetwork' | 'PayU';
}

export interface PaymentStatus {
  success: boolean;
  audit?: AuditRecord;
  error?: string;
}

/**
 * Utilidad para formatear moneda y calcular conversión estimada.
 * Tasa fija de referencia para demo: 1 USDT = 4000 COP
 */
export const formatCurrency = (amount: number) => {
  const USDT_RATE = 4000;
  const cop = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);

  const usdt = (amount / USDT_RATE).toFixed(2);

  return {
    cop,
    usdt: `${usdt} USDT`,
    rawUsdt: parseFloat(usdt)
  };
};
