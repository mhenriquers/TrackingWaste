export interface Expense {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  category: "credit card" | "debit";
  isWaste: boolean;
}
export type RootStackParamList = {
  Home: undefined;
  ExpenseList: undefined;
};
