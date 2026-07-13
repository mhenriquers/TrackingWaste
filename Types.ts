export interface Type {
  id: string;
  title: string;
  amount: number;
  createdAt: Date;
  category: "credit card" | "debit";
  observacao?: string;
}
export type RootStackParamList = {
  Home: undefined;
  ExpenseList: undefined;
  Bills: undefined;
};

export interface InterfaceBill {
  nome: string;
  valor: number;
  venc: string;
  obs: string;
  id: string;
  description: string;
  amount: number;
  dueDate?: string;
  category?: string;
}
