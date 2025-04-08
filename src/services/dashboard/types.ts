// Tipos para os dados dos cartões
export interface Card {
  id: string;
  variant: 'dark' | 'light';
  balance: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
}

// Tipos para as transações recentes
export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: 'deposit-card' | 'paypal' | 'money';
  isPositive: boolean;
}

// Tipos para atividade semanal
export interface WeeklyActivity {
  day: string;
  deposit: number;
  withdraw: number;
}

// Tipos para estatísticas de despesas
export interface ExpenseStatistic {
  name: string;
  percentage: number;
  color: string;
}

// Tipos para transferências rápidas
export interface QuickTransferContact {
  id: string;
  name: string;
  avatar: string;
}

// Tipos para histórico de saldo
export interface BalanceHistoryItem {
  month: string;
  balance: number;
}
