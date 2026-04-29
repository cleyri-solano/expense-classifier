export type ExpenseCategory =
  | "transport"
  | "food"
  | "software"
  | "office"
  | "marketing"
  | "payroll"
  | "services"
  | "other";

export interface Expense {
  id: string;
  rawText: string;
  amount: number;
  currency: string;
  vendor: string;
  category: ExpenseCategory;
  date: string;
  isDeductible: boolean;
  isDuplicate: boolean;
  confidence: number;
}