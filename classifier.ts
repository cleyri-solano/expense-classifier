import Anthropic from "@anthropic-ai/sdk";
import { ClassifyResult } from "../domain/expense";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expense classification agent for a finance team.
Given raw expense text, extract and return ONLY a JSON object with this exact shape:
{
  "amount": number,
  "currency": "MXN" | "USD" | "EUR",
  "vendor": string,
  "category": "transport" | "food" | "software" | "office" | "marketing" | "payroll" | "services" | "other",
  "date": "YYYY-MM-DD",
  "isDeductible": boolean,
  "confidence": number between 0 and 1
}
No explanation. No markdown. Only the JSON object.`;

export async function classifyExpense(rawText: string): Promise<ClassifyResult> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001", // cheapest + fastest for classification
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: rawText }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = JSON.parse(text);

  return {
    ...parsed,
    date: new Date(parsed.date),
  };
}

export async function chatWithExpenses(
  question: string,
  expensesSummary: string
): Promise<string> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    system: `You are a finance assistant. Answer questions about the user's expenses concisely.
Expenses data: ${expensesSummary}`,
    messages: [{ role: "user", content: question }],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
