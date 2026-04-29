import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const API = "http://localhost:3001/api";

const COLORS: Record<string, string> = {
  transport: "#6366f1",
  food: "#f59e0b",
  software: "#10b981",
  office: "#3b82f6",
  marketing: "#ec4899",
  payroll: "#8b5cf6",
  services: "#14b8a6",
  other: "#94a3b8",
};

interface Expense {
  id: string;
  rawText: string;
  amount: number;
  currency: string;
  vendor: string;
  category: string;
  date: string;
  isDeductible: boolean;
  isDuplicate: boolean;
  confidence: number;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatAnswer, setChatAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const fetchExpenses = async () => {
    const { data } = await axios.get(`${API}/expenses`);
    setExpenses(data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleClassify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/expenses`, { text: input });
      setInput("");
      await fetchExpenses();
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    try {
      const { data } = await axios.post(`${API}/chat`, { question: chatInput });
      setChatAnswer(data.answer);
    } finally {
      setChatLoading(false);
    }
  };

  // Chart data
  const chartData = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>💸 Expense Classifier</h1>
      <p style={{ color: "#64748b", marginBottom: 32 }}>Powered by Claude AI</p>

      {/* Input */}
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Pega un gasto en texto:</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ej: "Uber $250 MXN, 28 abril, traslado aeropuerto"'
          style={{ width: "100%", height: 80, padding: 12, borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, resize: "none", boxSizing: "border-box" }}
        />
        <button
          onClick={handleClassify}
          disabled={loading}
          style={{ marginTop: 8, background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 600 }}
        >
          {loading ? "Clasificando..." : "Clasificar"}
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20 }}>
          <p style={{ color: "#64748b", marginBottom: 4 }}>Total gastos</p>
          <p style={{ fontSize: 32, fontWeight: 700 }}>${total.toLocaleString()} MXN</p>
          <p style={{ color: "#64748b" }}>{expenses.length} registros</p>
        </div>
        <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20 }}>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={50}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense list */}
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <p style={{ fontWeight: 600, marginBottom: 12 }}>Gastos recientes</p>
        {expenses.length === 0 && <p style={{ color: "#94a3b8" }}>Sin gastos aún.</p>}
        {expenses.map((e) => (
          <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #e2e8f0" }}>
            <div>
              <span style={{ fontWeight: 600 }}>{e.vendor}</span>
              {e.isDuplicate && <span style={{ marginLeft: 8, background: "#fef3c7", color: "#92400e", fontSize: 11, padding: "2px 6px", borderRadius: 4 }}>Duplicado</span>}
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                <span style={{ background: COLORS[e.category] + "22", color: COLORS[e.category], padding: "1px 6px", borderRadius: 4 }}>{e.category}</span>
                {" · "}{new Date(e.date).toLocaleDateString()}
                {" · "}{Math.round(e.confidence * 100)}% confianza
              </p>
            </div>
            <span style={{ fontWeight: 700 }}>${e.amount.toLocaleString()} {e.currency}</span>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 20 }}>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>🤖 Pregúntale al agente</p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChat()}
            placeholder='Ej: "¿Cuánto gasté en transporte este mes?"'
            style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14 }}
          />
          <button
            onClick={handleChat}
            disabled={chatLoading}
            style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 600 }}
          >
            {chatLoading ? "..." : "Enviar"}
          </button>
        </div>
        {chatAnswer && (
          <div style={{ marginTop: 12, background: "#fff", borderRadius: 8, padding: 14, border: "1px solid #e2e8f0" }}>
            {chatAnswer}
          </div>
        )}
      </div>
    </div>
  );
}
