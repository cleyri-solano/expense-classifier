import { classifyExpense } from "../infrastructure/classifier";
import { findSimilar, saveExpense } from "../infrastructure/repository";
import { Expense } from "../domain/expense";

export async function processExpense(rawText: string): Promise<Expense> {
  // 1. Classify with AI
  const classified = await classifyExpense(rawText);

  // 2. Detect duplicates
  const existing = await findSimilar(classified.vendor, classified.amount);

  // 3. Persist
  const expense = await saveExpense({
    rawText,
    ...classified,
    isDuplicate: !!existing,
  });

  return expense;
}
