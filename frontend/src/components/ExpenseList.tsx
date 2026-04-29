import type { Expense } from "../types/expense";
import { CATEGORY_CONFIG } from "../types/expense";

interface Props {
    expenses: Expense[];
}

export default function ExpenseList({ expenses }: Props) {
    const fmt = (n: number) => "$" + Math.round(n).toLocaleString("es-MX");

    return (
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8eaed", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Gastos recientes</span>
            <span style={{ fontSize: 11, color: "#94a3b8", background: "#f8fafc", padding: "2px 8px", borderRadius: 20, border: "1px solid #e8eaed" }}>{expenses.length} total</span>
        </div>
        <div>
            {expenses.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
                Agrega tu primer gasto
            </div>
            ) : expenses.map((e, i) => {
            const cat = CATEGORY_CONFIG[e.category] || CATEGORY_CONFIG.other;
            return (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: i === expenses.length - 1 ? "none" : "1px solid #f8fafc" }}>
                <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{e.vendor}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4, flexWrap: "wrap" }}>
                    {e.isDuplicate && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 500, background: "#FAEEDA", color: "#854F0B" }}>duplicado</span>}
                    {e.isDeductible && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 500, background: "#EAF3DE", color: "#3B6D11" }}>deducible</span>}
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, fontWeight: 500, background: cat.bg, color: cat.color }}>{cat.label}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{e.date} · {Math.round(e.confidence * 100)}%</span>
                    </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", marginLeft: 12 }}>{fmt(e.amount)} {e.currency}</span>
                </div>
            );
            })}
        </div>
        </div>
    );
}