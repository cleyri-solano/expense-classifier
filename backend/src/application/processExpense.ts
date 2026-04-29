import { classifyExpense } from "../infrastructure/classifier";
import { Expense } from "../domain/expense";

const expenses: Expense[] = [];

export async function processExpense(rawText: string): Promise<Expense> {
  // 1. Clasificar con OpenAI
  const classified = await classifyExpense(rawText);

  // 2. Detectar duplicados
  const isDuplicate = expenses.some(
    (e) =>
      e.vendor.toLowerCase() === classified.vendor.toLowerCase() &&
      Math.abs(e.amount - classified.amount) / classified.amount < 0.05
  );

  // 3. Crear el gasto
  const expense: Expense = {
    id: Date.now().toString(),
    rawText,
    ...classified,
    isDuplicate,
  };

  expenses.unshift(expense);
  return expense;
}

export function getExpenses(): Expense[] {
  return expenses;
}