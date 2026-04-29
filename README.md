# Expense Classifier Agent

Agente de IA que clasifica gastos automáticamente a partir de texto libre.

## ¿Qué hace?

- Recibe texto de un gasto ("Uber $250 MXN, traslado aeropuerto")
- Lo clasifica con IA: categoría, monto, proveedor, fecha, si es deducible
- Detecta gastos duplicados automáticamente
- Permite hacer preguntas en lenguaje natural sobre tus gastos

## Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **IA**: OpenAI GPT-4o-mini
- **Arquitectura**: Hexagonal (domain / application / infrastructure / presentation)

## Cómo correrlo

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/expense-classifier.git
cd expense-classifier
```

### 2. Configurar el backend
```bash
cd backend
npm install
```

Crea un archivo `backend/.env` con tu propia API key:
OPENAI_API_KEY=tu_api_key_aqui

> Obtén tu API key en https://platform.openai.com/api-keys

### 3. Correr el backend
```bash
cd backend
npm run dev
```

### 4. Correr el frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Abrir la app
Ve a `http://localhost:5173` en tu navegador.

## Decisiones técnicas

- **GPT-4o-mini** — modelo rápido y económico (~$0.001 por gasto clasificado)
- **Arquitectura hexagonal** — cambiar de OpenAI a otro proveedor solo requiere modificar `backend/src/infrastructure/classifier.ts`
- **Detección de duplicados** — compara vendor + monto con tolerancia del 5%

## Autor

**Cleyri Solano García** — Full Stack Developer  
[LinkedIn](https://www.linkedin.com/in/cleyri-solano/) · [GitHub](https://github.com/cleyri-solano)