import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getSystemPrompt() {
    return `Eres un agente clasificador de gastos para un equipo de finanzas.
Dado un texto de gasto, extrae y devuelve SOLO un objeto JSON con esta forma exacta (sin markdown, sin explicación):
{
    "amount": number,
    "currency": "MXN" | "USD" | "EUR",
    "vendor": "string",
    "category": "transport" | "food" | "software" | "office" | "marketing" | "payroll" | "services" | "other",
    "date": "YYYY-MM-DD",
    "isDeductible": boolean,
    "confidence": number entre 0 y 1
}
Si no hay fecha usa la de hoy: ${new Date().toISOString().split("T")[0]}.`;
}

export async function classifyExpense(rawText: string) {
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 300,
        messages: [
        { role: "system", content: getSystemPrompt() },
        { role: "user", content: rawText }
        ],
    });

    const text = response.choices[0].message.content || "";
    return JSON.parse(text);
}

export async function chatWithExpenses(question: string, expensesSummary: string) {
    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 300,
        messages: [
        { role: "system", content: `Eres un asistente de finanzas. Responde preguntas sobre los gastos del usuario de forma concisa. Datos: ${expensesSummary}` },
        { role: "user", content: question }
        ],
    });

    return response.choices[0].message.content || "";
}