export type ExpenseCategory =
    | "transport" | "food" | "software" | "office"
    | "marketing" | "payroll" | "services" | "other";

export interface Expense {
    id: string;
    amount: number;
    currency: string;
    vendor: string;
    category: ExpenseCategory;
    date: string;
    isDeductible: boolean;
    isDuplicate: boolean;
    confidence: number;
}

export const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    transport: { label: "Transporte", color: "#185FA5", bg: "#E6F1FB" },
    food:      { label: "Comida",     color: "#854F0B", bg: "#FAEEDA" },
    software:  { label: "Software",   color: "#0F6E56", bg: "#E1F5EE" },
    office:    { label: "Oficina",    color: "#534AB7", bg: "#EEEDFE" },
    marketing: { label: "Marketing",  color: "#993556", bg: "#FBEAF0" },
    payroll:   { label: "Nómina",     color: "#3B6D11", bg: "#EAF3DE" },
    services:  { label: "Servicios",  color: "#993C1D", bg: "#FAECE7" },
    other:     { label: "Otro",       color: "#5F5E5A", bg: "#F1EFE8" },
};
