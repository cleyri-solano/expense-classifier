import { Router, Request, Response } from "express";
import { processExpense, getExpenses } from "../application/processExpense";
import { chatWithExpenses } from "../infrastructure/classifier";

const router = Router();

router.post("/expenses", async (req: Request, res: Response) => {
  try {
    console.log("Recibido:", req.body);
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "text es requerido" });
    const expense = await processExpense(text);
    res.json(expense);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: String(err) });
  }
});

router.get("/expenses", async (_req: Request, res: Response) => {
  res.json(getExpenses());
});

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    const expenses = getExpenses();
    const summary = JSON.stringify(expenses.map((e) => ({
      vendor: e.vendor,
      amount: e.amount,
      category: e.category,
      date: e.date,
    })));
    const answer = await chatWithExpenses(question, summary);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;