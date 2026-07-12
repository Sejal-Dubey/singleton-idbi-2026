# Singleton Wealth Advisory AI POC
## IDBI Innovate 2026 - Track 01: Wealth Advisory

This document contains a comprehensive review of the Singleton Wealth Advisory application codebase built for **IDBI Innovate 2026 Hackathon (National-Level FinTech Challenge)**.
https://singleton-idbi-2026-zcim.vercel.app/
---

## 🏗️ Architecture Stack
1. **Frontend:** React.js, Tailwind CSS (V4), HTML5 Canvas-driven Digital Twin Avatar engine, custom transitions. Runs locally on port `5173`.
2. **Backend:** FastAPI (Python 3.11) with regex-based input filtering, synthetic portfolio state management, and CORS middleware for zero-latency communication. Runs on port `8000`.

---

## 📂 Implementation Details

### 1. Python Backend: [main.py](file:///c:/Users/Sejal/.gemini/antigravity/scratch/singleton-advisor/main.py)
The FastAPI backend serves single POST advisory logs. Key components:
- **Sanitization Layer:** Uses native regular expressions to strip out potential remote attacks and unsafe characters (`< > { } [ ] \ ^ ~`).
- **State Machine Parsing:** Detects patterns for `spending` (runs discretionary runway computations) and `optimize` (provides asset allocation matrices) case-insensitively.

### 2. React UI: [App.jsx](file:///c:/Users/Sejal/.gemini/antigravity/scratch/singleton-advisor/frontend/src/App.jsx)
Implements the premium dark-mode dashboard inside a mobile banking container viewport.
- **Micro-animations & Canvas Twin:** Animates dynamic vector states (`friendly`, `analytical`, `confident`) via direct canvas draws and React rendering loops without external libraries.
- **Embedded Visual Charts:** 
  - Spent vs Runway warning bar.
  - Multi-tier progressive asset split progress bar (40% FD / 60% Equity) with action buttons.

---

## 🖥️ Browser Verification Screenshot

Below is the verified screenshot captured from the live instance:

![Final Viewport Screenshot](C:\Users\Sejal\.gemini\antigravity\brain\03f42f94-fbd7-4f9b-a06d-c9341a2f17b1\final_viewport_state_1783881534304.png)

> [!NOTE]
> The sandbox simulator connects seamlessly to the FastAPI process, enabling users to execute spending sweep transfers or portfolio asset rebalancing actions using real-time components.

---

## ⚡ Cloud Deployment Checklist

### Backend (Render / Heroku)
The backend is set up to listen on a dynamic port assigned by cloud providers:
- **Port Binding:** Reads `os.environ.get("PORT", 8000)` dynamically.
- **Environments:** Toggle reload rules with `ENV=production` inside your configuration environment.

### Frontend (Vercel / Netlify)
Vite query endpoints dynamically scale:
- Set `VITE_API_URL` to point to your live backend domain (e.g. `https://singleton-backend.onrender.com`).
- The application will automatically fall back to `http://localhost:8000` during local tests.

