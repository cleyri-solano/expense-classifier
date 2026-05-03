import { useState } from "react";

interface Props {
    onClassified: () => void;
}

const API = "https://expense-classifier-production-443b.up.railway.app/api";

export default function ExpenseInput({ onClassified }: Props) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleClassify = async () => {
        if (!input.trim()) return;
        setLoading(true); setStatus("");
        try {
        await fetch(`${API}/expenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input }),
        });
        setInput(""); setStatus("Clasificado");
        setTimeout(() => setStatus(""), 2000);
        onClassified();
        } catch { setStatus("Error, intenta de nuevo"); }
        finally { setLoading(false); }
    };

    return (
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8eaed", overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Clasificar gasto</div>
        </div>
        <div style={{ padding: "14px 18px" }}>
            <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleClassify())}
            placeholder='Ej: "Netflix $219 MXN, suscripción abril"'
            style={{ width: "100%", minHeight: 60, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, resize: "none", boxSizing: "border-box", outline: "none", color: "#0f172a", background: "#f8fafc", fontFamily: "inherit", marginBottom: 10 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
                onClick={handleClassify}
                disabled={loading || !input.trim()}
                style={{ flex: 1, background: loading || !input.trim() ? "#e2e8f0" : "#0f172a", color: loading || !input.trim() ? "#94a3b8" : "#fff", border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 500, cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontFamily: "inherit" }}
            >
                {loading ? "Clasificando..." : "Clasificar con IA"}
            </button>
            {status && <span style={{ fontSize: 11, color: "#10b981", fontWeight: 500 }}>{status}</span>}
            </div>
        </div>
        </div>
    );
}