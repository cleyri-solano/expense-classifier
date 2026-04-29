import { useState, useEffect } from "react";
import type { Expense } from "./types/expense";
import StatsCards from "./components/StatsCards";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseList from "./components/ExpenseList";
import ChatAgent from "./components/ChatAgent";

const API = "http://localhost:3001/api";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    const res = await fetch(`${API}/expenses`);
    setExpenses(await res.json());
  };

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F4F6FA", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "#0f172a", padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: "#6366f1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, border: "2.5px solid #fff", borderRadius: 3 }}></div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Expense Classifier</div>
            <div style={{ fontSize: 12, color: "#475569" }}>Agente de IA · Powered by OpenAI</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#475569" }}>Abril 2026</div>
      </div>

      <div style={{ padding: "28px 32px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Resumen del mes</div>
        <StatsCards expenses={expenses} />

        <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Actividad</div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          <ExpenseList expenses={expenses} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <ExpenseInput onClassified={fetchExpenses} />
            <ChatAgent />
          </div>
        </div>
      </div>
    </div>
  );
}