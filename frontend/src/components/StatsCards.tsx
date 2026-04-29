import type { Expense } from "../types/expense";
import { CATEGORY_CONFIG } from "../types/expense";

interface Props {
    expenses: Expense[];
}

export default function StatsCards({ expenses }: Props) {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");
    const byCategory = expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
    }, {} as Record<string, number>);
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    const deductibles = expenses.filter(e => e.isDeductible).length;

    const stats = [
        { label: "Total gastos", val: fmt(total) + " MXN", hint: expenses.length + " registro" + (expenses.length !== 1 ? "s" : ""), color: "#6366f1" },
        { label: "Deducibles", val: String(deductibles), hint: "de " + expenses.length + " gastos", color: "#10b981" },
        { label: "Categoría top", val: topCategory ? CATEGORY_CONFIG[topCategory[0]]?.label || topCategory[0] : "—", hint: topCategory ? fmt(topCategory[1]) + " MXN" : "sin datos", color: "#f59e0b" },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map(st => (
            <div key={st.label} style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", border: "1px solid #e8eaed", display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 4, borderRadius: 3, height: 44, background: st.color, flexShrink: 0 }}></div>
            <div>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 }}>{st.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{st.val}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5 }}>{st.hint}</div>
            </div>
            </div>
        ))}
        </div>
    );
}