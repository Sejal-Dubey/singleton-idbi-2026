# 🤖 Singleton: Avatar-Driven Wealth Advisory Engine
### **IDBI Innovate 2026 — Track 01: Wealth Advisory & Mobile Banking**

Singleton is an ultra-lightweight, high-performance, avatar-driven wealth management Proof of Concept (POC) designed to integrate natively into mobile banking applications. By parsing transaction logs, the engine assesses a user's *Discretionary Runway* (idle capital) and delivers automated, risk-calibrated asset allocation options via an interactive digital twin.

🚀 **Live Prototype Application:** [Launch Live Viewport](https://singleton-idbi-2026-zcim.vercel.app/)
(please click clear chat if the output takes time to load as free tier deployment has been done)

---

## 💎 Technical Value Propositions & USPs

*   **Insight-to-Fulfillment Loop:** Moving beyond passive information chatbots, Singleton features interactive client elements (`Sweep Now` and `Rebalance & Execute`) that transition conversational insights directly into actionable transactions.
*   **Performance-Optimized Canvas Engine:** Avoids heavy, high-latency 3D WebGL renderers or video streams. The digital twin utilizes a lightweight native HTML5 Canvas drawing loop, keeping the client script core under 45KB for instant rendering over standard mobile connections.
*   **Security Boundary Isolation:** Implements strict regular expression input validation to drop script manipulation or injection vectors at the outer boundary. Financial logs are tokenized on a stateless backend, ensuring sensitive Personal Identifiable Information (PII) is decoupled from advisory workflows.

---

## 🏗️ Architecture Matrix
<img width="3514" height="4390" alt="API-Driven User Interaction-2026-07-13-121407" src="https://github.com/user-attachments/assets/20511693-8c64-40d4-9b50-9e27e5eedd2e" />

### Technology Configuration
*   **Presentation Layer:** React.js, TypeScript, Tailwind CSS (V4 Architecture), HTML5 Canvas Engine.
*   **Application Service Core:** FastAPI (Python 3.11), Uvicorn, Native Regex Input Sanitizer.
*   **State Management:** Synthetic Portfolio State Machines, In-Memory Transient Context Pools.

---

## 📂 Engineering Design & Code Structures

### 1. Python Backend Service (`/backend`)
The backend exposes high-throughput async processing endpoints to evaluate financial health parameters.
*   **Sanitization Matrix:** Filters inbound parameters against a regular expression pattern to neutralize command injections (`< > { } [ ] \ ^ ~`).
*   **Intent Route Orchestration:** Analyzes message keywords case-insensitively to compute real-time discretionary runways or generate custom portfolio split configurations.

### 2. Front-End Viewport Layer (`/frontend`)
Implements a premium dark-mode dashboard tailored to modern mobile application specifications.
*   **Digital Twin Visual States:** Direct vector animations handle transitions between operational parameters (`friendly`, `analytical`, `confident`) smoothly.
*   **Inline Financial Modeling Modules:** Responsive progress systems render real-time comparative analytics (e.g., Spent vs. Runway asset distributions) directly within the conversational flow.

---

## Process Flow diagram

<img width="1007" height="390" alt="Screenshot 2026-07-13 195223" src="https://github.com/user-attachments/assets/369f9773-44c1-4f91-963c-898550a9d8b0" />


## 🖥️ Active Prototype Interface

Below is the interface state processing live transactional feedback:

![Prototype Viewport](https://singleton-idbi-2026-zcim.vercel.app/screenshot.png) 
*(Pro-tip: Save your browser screenshot as `screenshot.png` in the root of your GitHub repository and this image will load automatically here!)*

> 💡 **Sandbox Execution Mode:** The active runtime simulator integrates directly with the cloud service layer, enabling evaluation teams to trigger one-click asset sweeps or portfolio rebalancing flows instantly.

---

## ⚡ Deployment & Initialization Blueprint

### 🟢 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sejal-Dubey/singleton-idbi-2026.git
   cd singleton-idbi-2026
   ```

2. **Boot the FastAPI Backend Server:**
   ```bash
   # Backend requirements and main.py are in the repository root
   pip install -r requirements.txt
   python main.py
   ```

3. **Initialize the React Client Application:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
### 🛠️ Developer Telemetry (Hidden Command)
To prove the efficiency of our edge-deployed architecture and stateless backend, we built a live telemetry interceptor directly into the UI.

**Try it out:**
1. Open the live deployment link.
2. Type `/benchmark` into the chat input and hit send.
3. The UI will instantly render a **System Performance Report**, calculating the live, dynamic API round-trip latency using the browser's native `performance.now()` API, alongside our Core Web Vitals and Regex security overhead.
### ☁️ Cloud Infrastructure Mapping

* **Production Backend (Render / Heroku):**
  * **Binding Core:** Reads dynamic port configurations via `int(os.environ.get("PORT", 8000))` to run seamlessly behind ingress routers.
  * **Execution Strategy:** Stateless workers optimize compute cycles and concurrency.

* **Production Frontend (Vercel):**
  * **Target Pipeline:** Configure the Vercel build environment to include the `VITE_API_URL` environment flag pointing to your cloud backend domain.
  * **Fallback:** Automatically defaults to `http://localhost:8000` if no environment variable is present, ensuring smooth local debugging.

