import { useState } from "react";

const API = "http://localhost:3001/api";

export default function ChatAgent() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChat = async () => {
        if (!question.trim()) return;
        setLoading(true);
        try {
        const res = await fetch(`${API}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });
        const data = await res.json();
        setAnswer(data.answer);
        setQuestion("");
        } finally { setLoading(false); }
    };

    return (
        <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e8eaed", overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Pregúntale al agente</div>
        </div>
        <div style={{ padding: "14px 18px" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: answer ? 10 : 0 }}>
            <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleChat()}
                placeholder='¿Cuánto gasté en servicios?'
                style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, outline: "none", color: "#0f172a", background: "#f8fafc", fontFamily: "inherit" }}
            />
            <button
                onClick={handleChat}
                disabled={loading || !question.trim()}
                style={{ background: loading || !question.trim() ? "#e2e8f0" : "#0f172a", color: loading || !question.trim() ? "#94a3b8" : "#fff", border: "none", borderRadius: 8, padding: "9px 14px", fontSize: 12, fontWeight: 500, cursor: loading || !question.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
            >
                {loading ? "..." : "Enviar"}
            </button>
            </div>
            {answer && (
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "11px 13px", border: "1px solid #e8eaed" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, color: "#6366f1", background: "#eef2ff", padding: "2px 8px", borderRadius: 20, marginBottom: 6 }}>IA</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{answer}</div>
            </div>
            )}
        </div>
        </div>
    );
}