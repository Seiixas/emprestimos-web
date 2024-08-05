export interface Loan {
  id: string;
  requestedValue: number;
  interestRate: number;
  installments: number;
  installmentsAmount: number;
  totalInterest: number;
  totalAmount: number;
  bills: Bill[];
  cpf: string;
  birthday: string;
  uf: string;
}

export interface Bill {
  outstandingBalance: number;
  interest: number;
  outstandingBalanceAdjusted: number;
  installmentAmount: number;
  due: string;
}
