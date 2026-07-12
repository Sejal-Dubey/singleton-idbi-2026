import React, { useState, useEffect, useRef } from "react";

// API Endpoint (FastAPI backend with fallback to localhost)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";


// Fallback Mock Service for instant shortlisting/offline environments
const getMockResponse = (query) => {
  const q = query.toLowerCase();
  if ("spending" in q || "analyze" in q || "spent" in q) {
    return {
      avatar_state: "analytical",
      speech_text: "Analysis complete. I've detected high-burn spending of ₹8,500 on Zomato & Swiggy, which consumes roughly 35.4% of your ₹24,000 discretionary runway. I recommend keeping a lid on this and sweeping ₹5,000 immediately into a high-yield mutual fund to clock 12% inflation-adjusted returns. Ready to execute?",
      metrics: {
        type: "spending_analysis",
        discretionary_runway: 24000,
        dining_spend: 8500,
        dining_percentage: 35.4,
        sweep_amount: 5000,
        remaining_runway: 15500
      }
    };
  } else if ("optimize" in q || "investment" in q || "portfolio" in q) {
    return {
      avatar_state: "confident",
      speech_text: "Here is your customized asset allocation matrix tailored for optimal compounding. I suggest a risk-calibrated split of 40% in Fixed Income (specifically IDBI High-Yield FDs to lock in secure yields) and 60% in Equities (Diversified Index & Flexi-cap mutual funds) for wealth growth. This balances capital preservation with high growth.",
      metrics: {
        type: "investment_optimization",
        fixed_income_pct: 40,
        equities_pct: 60,
        allocation_legend: [
          { name: "Fixed Income (IDBI FDs)", value: 40, color: "from-orange-500 to-amber-500" },
          { name: "Equities", value: 60, color: "from-emerald-500 to-teal-500" }
        ]
      }
    };
  } else {
    return {
      avatar_state: "friendly",
      speech_text: "Hi Sejal! I'm here. Try asking me to 'Analyze my spending' to see how the Zomato/Swiggy bills affect your savings, or type 'Optimize my investments' to view your IDBI asset allocation roadmap.",
      metrics: {
        income: 85000,
        savings: 120000,
        runway: 24000
      }
    };
  }
};

export default function App() {
  const [messages, setMessages] = useState([
    {
      sender: "advisor",
      text: "Hello Sejal! I'm your Singleton Wealth Advisor. Ask me to 'Analyze my spending' to check your cash flow, or 'Optimize my investments' to view your customized asset allocation matrix.",
      state: "friendly",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metrics: {
        income: 85000,
        savings: 120000,
        runway: 24000
      }
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [avatarState, setAvatarState] = useState("friendly");
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendHealthy, setIsBackendHealthy] = useState(true);
  
  const chatEndRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Ping backend to assess connection health
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/advisory/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: "" })
        });
        if (res.ok) {
          setIsBackendHealthy(true);
        } else {
          setIsBackendHealthy(false);
        }
      } catch (err) {
        setIsBackendHealthy(false);
      }
    };
    checkBackend();
  }, []);

  // Canvas Vector-Driven Digital Twin Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let angle = 0;
    let pulse = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      angle += 0.015;
      pulse = Math.sin(angle * 2) * 8;

      if (avatarState === "friendly") {
        // --- FRIENDLY STATE (Warm Orange Cosmic/Nurturer Aura) ---
        // Ambient soft outer glow
        const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 75);
        glow.addColorStop(0, "rgba(249, 115, 22, 0.2)");
        glow.addColorStop(1, "rgba(249, 115, 22, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 80 + pulse, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing main energy rings
        ctx.strokeStyle = "rgba(249, 115, 22, 0.75)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 40 + pulse / 2, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting particles
        ctx.fillStyle = "#faf5ff";
        for (let i = 0; i < 4; i++) {
          const orbitAngle = angle + (i * Math.PI) / 2;
          const px = cx + Math.cos(orbitAngle) * (55 + pulse / 3);
          const py = cy + Math.sin(orbitAngle) * (55 + pulse / 3);
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Smiling digital core
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 5, 2.5, 0, Math.PI * 2);
        ctx.arc(cx + 10, cy - 5, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#f97316";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy + 2, 8, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();

      } else if (avatarState === "analytical") {
        // --- ANALYTICAL STATE (Indigo Digital Scanning Box) ---
        // Ambient Grid Glow
        ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
        ctx.beginPath();
        ctx.arc(cx, cy, 70, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Inner Hexagon / Multi-Layers
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-angle / 2);
        ctx.strokeStyle = "rgba(99, 102, 241, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const hexAngle = (i * Math.PI) / 3;
          const hx = Math.cos(hexAngle) * 45;
          const hy = Math.sin(hexAngle) * 45;
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Secondary crosshair circles
        ctx.strokeStyle = "rgba(129, 140, 248, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 30, 0, Math.PI * 2);
        ctx.arc(cx, cy, 58, 0, Math.PI * 2);
        ctx.stroke();

        // Scanning line sweeping vertically
        const scanY = cy + Math.sin(angle * 4) * 40;
        ctx.strokeStyle = "rgba(165, 180, 252, 0.85)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 50, scanY);
        ctx.lineTo(cx + 50, scanY);
        ctx.stroke();

        // Central analytical matrix blinking core
        ctx.fillStyle = "#6366f1";
        ctx.fillRect(cx - 6, cy - 6, 12, 12);
        ctx.fillStyle = "#e0e7ff";
        ctx.fillRect(cx - 2, cy - 2, 4, 4);

      } else if (avatarState === "confident") {
        // --- CONFIDENT STATE (Emerald Expansion Matrix & Growth Targets) ---
        // Fast Spinning Outer Reticle
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle * 1.5);
        ctx.strokeStyle = "rgba(16, 185, 129, 0.9)";
        ctx.lineWidth = 3;
        // Draw 3 arc dashed lines
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, 48, (i * 2 * Math.PI) / 3, (i * 2 * Math.PI + 1.2) / 3);
          ctx.stroke();
        }
        ctx.restore();

        // Static Target Bounds
        ctx.strokeStyle = "rgba(52, 211, 153, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs lines
        ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
        ctx.beginPath();
        ctx.moveTo(cx - 70, cy); ctx.lineTo(cx - 55, cy);
        ctx.moveTo(cx + 55, cy); ctx.lineTo(cx + 70, cy);
        ctx.moveTo(cx, cy - 70); ctx.lineTo(cx, cy - 55);
        ctx.moveTo(cx, cy + 55); ctx.lineTo(cx, cy + 70);
        ctx.stroke();

        // Upward growth vector path
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-16, 8);
        ctx.lineTo(0, -10 + pulse / 4);
        ctx.lineTo(16, 8);
        ctx.stroke();
        // Arrow tip at core top
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.moveTo(0, -18 + pulse / 4);
        ctx.lineTo(-6, -10 + pulse / 4);
        ctx.lineTo(6, -10 + pulse / 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [avatarState]);

  const handleMessageSubmit = async (queryText) => {
    if (!queryText.trim()) return;
    
    // Append user message
    const userMsg = {
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      let data;
      if (isBackendHealthy) {
        const response = await fetch(`${API_BASE}/api/advisory/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: queryText })
        });
        if (response.ok) {
          data = await response.json();
        } else {
          // fallback to mock client logic if backend outputs error
          data = getMockResponse(queryText);
        }
      } else {
        // backend behaves as offline inside sandbox (local development backup)
        data = getMockResponse(queryText);
      }

      // Add delay for realistic chatbot processing feel
      setTimeout(() => {
        setAvatarState(data.avatar_state);
        setMessages(prev => [...prev, {
          sender: "advisor",
          text: data.speech_text,
          state: data.avatar_state,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: data.metrics
        }]);
        setIsLoading(false);
      }, 700);

    } catch (error) {
      console.error("Communication error", error);
      setTimeout(() => {
        const fallbackData = getMockResponse(queryText);
        setAvatarState(fallbackData.avatar_state);
        setMessages(prev => [...prev, {
          sender: "advisor",
          text: fallbackData.speech_text,
          state: fallbackData.avatar_state,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metrics: fallbackData.metrics
        }]);
        setIsLoading(false);
      }, 700);
    }
  };

  const handleSuggestionClick = (text) => {
    setInputText(text);
    handleMessageSubmit(text);
  };

  const executeSweep = (msgIndex) => {
    // Update message execution state to green success state
    setMessages(prev => prev.map((m, idx) => {
      if (idx === msgIndex) {
        return { ...m, isExecuted: true };
      }
      return m;
    }));

    // Append confirmation message from the avatar twin
    setIsLoading(true);
    setTimeout(() => {
      setAvatarState("confident");
      setMessages(prev => [...prev, {
        sender: "advisor",
        text: "✅ Transaction Confirmed: ₹5,000 swept into IDBI Mutual Fund.",
        state: "confident",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metrics: null
      }]);
      setIsLoading(false);
    }, 600);
  };

  const executeRebalance = (msgIndex) => {
    // Update message execution state to green success state
    setMessages(prev => prev.map((m, idx) => {
      if (idx === msgIndex) {
        return { ...m, isExecuted: true };
      }
      return m;
    }));

    // Append confirmation message from the avatar twin
    setIsLoading(true);
    setTimeout(() => {
      setAvatarState("confident");
      setMessages(prev => [...prev, {
        sender: "advisor",
        text: "✅ Mandate Authorized: Portfolio rebalancing initiated.",
        state: "confident",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metrics: null
      }]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleMessageSubmit(inputText);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-orange-500 selection:text-white font-sans antialiased overflow-hidden relative">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Main Hackathon Device Viewer Container */}
      <div className="max-w-md w-full h-[880px] bg-slate-950/90 border border-slate-800 rounded-[2.5rem] flex flex-col shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Device Status Bar */}
        <div className="px-6 pt-3 pb-1 flex justify-between items-center text-[10px] text-slate-500 font-mono tracking-wider border-b border-slate-900 bg-slate-950">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`}></div>
            <span>{isBackendHealthy ? 'IDBI SECURE LINK ACTIVE' : 'SANDBOX SIMULATOR LOCAL'}</span>
          </div>
          <div className="font-semibold text-slate-400">12:00 PM</div>
          <div className="flex items-center gap-1.5 uppercase font-semibold">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Brand/User Header Card */}
        <div className="p-4 border-b border-slate-900 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* IDBI Mock Logo Emblem */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg text-sm tracking-wider">
              ID
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-slate-100 uppercase tracking-wide">IDBI wealth</h1>
                <span className="text-[9px] bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded font-mono font-bold border border-orange-500/20">V1.0</span>
              </div>
              <p className="text-[10px] text-slate-400">Team Singleton Advisor Twin</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block font-mono">PORTFOLIO</span>
            <span className="text-xs font-bold text-emerald-400">₹2,05,000 Total</span>
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="grid grid-cols-3 gap-1 px-4 py-2 bg-slate-900/40 border-b border-slate-900 text-center font-mono">
          <div className="p-1 px-[2px] bg-slate-950/40 border border-slate-800/40 rounded-lg">
            <span className="text-[9px] text-slate-500 block">INCOME</span>
            <span className="text-xs font-semibold text-slate-300">₹85,000</span>
          </div>
          <div className="p-1 px-[2px] bg-slate-950/40 border border-slate-800/40 rounded-lg">
            <span className="text-[9px] text-slate-500 block">SAVINGS</span>
            <span className="text-xs font-semibold text-slate-300">₹1,20,000</span>
          </div>
          <div className="p-1 px-[2px] bg-slate-950/40 border border-slate-800/40 rounded-lg">
            <span className="text-[9px] text-orange-500 block">RUNWAY (IDLE)</span>
            <span className="text-xs font-bold text-orange-400">₹24,000</span>
          </div>
        </div>

        {/* Canvas & State Ring Container */}
        <div className="h-44 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 to-slate-900/50 border-b border-slate-900/60 overflow-hidden">
          
          {/* Animated Avatar Visual State Outer Border Ring */}
          <div className={`absolute w-32 h-32 rounded-full flex items-center justify-center border transition-all duration-700
            ${avatarState === "friendly" 
              ? "border-orange-500/30 avatar-ring-friendly" 
              : avatarState === "analytical" 
              ? "border-indigo-500/30 avatar-ring-analytical scale-105" 
              : "border-emerald-500/30 avatar-ring-confident rotate-12"
            }
          `}>
            {/* Intermediate glow layer */}
            <div className={`w-28 h-28 rounded-full border border-dashed transition-all duration-700
              ${avatarState === "friendly" 
                ? "border-orange-500/20" 
                : avatarState === "analytical" 
                ? "border-indigo-400/40 rotate-45" 
                : "border-emerald-400/40 -rotate-45"
              }
            `}></div>
          </div>

          {/* HTML5 Vector Canvas for Avatar states */}
          <div className="w-36 h-36 z-10 relative">
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>

          {/* Miniature State Label Pill */}
          <div className="absolute bottom-2 z-10">
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full glass-effect border border-slate-800 font-mono text-[9px] tracking-widest text-slate-300 uppercase shadow-lg">
              <span className={`w-1.5 h-1.5 rounded-full
                ${avatarState === "friendly" 
                  ? "bg-orange-500 animate-ping" 
                  : avatarState === "analytical" 
                  ? "bg-indigo-500" 
                  : "bg-emerald-500"
                }
              `}></span>
              <span>{avatarState === "friendly" ? "ADVISOR: IDLE" : avatarState === "analytical" ? "ADVISOR: CALCULATING" : "ADVISOR: PORTFOLIO"}</span>
            </div>
          </div>
        </div>

        {/* Interactive Chat Log Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={index}
                className={`flex flex-col animate-fade-in ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                {/* Speaker label */}
                <span className="text-[9px] text-slate-500 font-mono mb-1 tracking-wider px-1">
                  {isUser ? "SEJAL" : `SINGLETON TWIN (${msg.state.toUpperCase()})`} • {msg.timestamp}
                </span>

                {/* Main bubble */}
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-md transition-all duration-300 ${
                    isUser
                      ? "bg-gradient-to-tr from-orange-600 to-amber-600 text-white rounded-tr-none font-medium border border-orange-500/20"
                      : "glass-effect rounded-tl-none border-l-2 border-l-orange-500 text-slate-200"
                  } ${
                    !isUser && msg.state === "analytical" ? "border-l-indigo-500" : ""
                  } ${
                    !isUser && msg.state === "confident" ? "border-l-emerald-500" : ""
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line text-left">{msg.text}</p>
                  
                  {/* DYNAMIC CHART INJECTION MODULE */}
                  {!isUser && msg.metrics && (
                    <div className="mt-3.5 pt-3.5 border-t border-slate-900 space-y-3.5 text-left">
                      {/* Scenario 1: Spending Analysis Metrics Breakdown Card */}
                      {msg.metrics.type === "spending_analysis" && (
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-900 font-sans">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">Cash Flow Analyzer</span>
                            <span className="text-xs font-bold text-orange-400 font-mono">
                              ₹{msg.metrics.dining_spend.toLocaleString()} / ₹{msg.metrics.discretionary_runway.toLocaleString()}
                            </span>
                          </div>
                          
                          {/* Segment Progress Bar */}
                          <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800 flex">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${msg.metrics.dining_percentage}%` }}
                            ></div>
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
                            <span>High-Burn Zomato/Swiggy</span>
                            <span className="text-red-400 font-bold">{msg.metrics.dining_percentage}% Eaten</span>
                                   {/* Quick Decision Box */}
                          <div className="mt-3 bg-indigo-950/20 border border-indigo-900/30 rounded-lg p-2.5 flex items-center justify-between gap-1">
                            <div>
                              <span className="text-[9px] text-indigo-400 block font-mono font-semibold tracking-wider">SWEEP ACTION SUGGESTED</span>
                              <span className="text-[11px] text-slate-300 font-semibold block">Transfer unused ₹{msg.metrics.sweep_amount.toLocaleString()} surplus?</span>
                            </div>
                            <button 
                              disabled={msg.isExecuted}
                              onClick={() => executeSweep(index)} 
                              className={`font-bold text-[10px] px-3 py-1.5 rounded-lg transition shadow-lg active:scale-95 ${
                                msg.isExecuted 
                                  ? "bg-emerald-600 text-slate-950 font-extrabold cursor-not-allowed" 
                                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
                              }`}
                            >
                              {msg.isExecuted ? "Executed ✅" : "Sweep Now"}
                            </button>
                          </div>                        </div>
                        </div>
                      )}

                      {/* Scenario 2: Investment Optimization Horizontal Stacked Percentage Bar Chart */}
                      {msg.metrics.type === "investment_optimization" && (
                        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-900">
                          <div className="text-[10px] text-slate-400 font-mono tracking-wide uppercase mb-2">
                            Asset Allocation Matrix
                          </div>

                          {/* Stacked Horizontal Chart */}
                          <div className="h-5 w-full bg-slate-900 rounded-xl overflow-hidden shadow-inner flex border border-slate-800/80">
                            {msg.metrics.allocation_legend.map((item, idx) => (
                              <div
                                key={idx}
                                className={`bg-gradient-to-r ${item.color} h-full transition-all duration-1000 flex items-center justify-center`}
                                style={{ width: `${item.value}%` }}
                                title={`${item.name}: ${item.value}%`}
                              >
                                <span className="text-[8px] font-bold text-slate-950 font-mono opacity-90">
                                  {item.value}%
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Interactive Legend Grid */}
                          <div className="grid grid-cols-2 gap-2 mt-3.5">
                            {msg.metrics.allocation_legend.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 bg-slate-950/80 p-1.5 px-2 rounded-lg border border-slate-900/60">
                                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0Shadow`}></span>
                                <div className="leading-none text-left">
                                  <span className="text-[9px] text-slate-400 block font-medium truncate max-w-[120px]">{item.name}</span>
                                  <span className="text-[11px] font-bold text-slate-200 block font-mono">{item.value}%</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Execution Button */}
                          <button
                            disabled={msg.isExecuted}
                            onClick={() => executeRebalance(index)}
                            className={`w-full mt-3 active:scale-95 font-extrabold text-[11px] py-2 rounded-xl transition shadow-lg tracking-wider ${
                              msg.isExecuted 
                                ? "bg-emerald-600 text-slate-950 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-500 text-slate-950"
                            }`}
                          >
                            {msg.isExecuted ? "Executed ✅" : "Rebalance & Execute Allocation"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loader bubble */}
          {isLoading && (
            <div className="flex flex-col items-start animate-pulse">
              <span className="text-[9px] text-slate-500 font-mono mb-1 tracking-wider">
                SINGLETON SECURE ENGINE
              </span>
              <div className="glass-effect rounded-2xl rounded-tl-none px-4 py-3 text-sm border-l-2 border-l-amber-500 text-slate-400 flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
                <span className="text-[11px] font-mono tracking-wide">Processing secure advisory layer...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggest PII Pills */}
        <div className="px-4 py-3 border-t border-slate-900 bg-slate-950/60 flex flex-col gap-2">
          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 select-none">
            <span>💡 Suggestions:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto select-none no-scrollbar pb-1">
            <button
              onClick={() => handleSuggestionClick("Analyze my spending")}
              className="flex-shrink-0 glass-effect hover:bg-orange-500/10 hover:border-orange-500/30 text-orange-400 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer active:scale-95"
            >
              ⚡ Analyze spending
            </button>
            <button
              onClick={() => handleSuggestionClick("Optimize my investments")}
              className="flex-shrink-0 glass-effect hover:bg-emerald-500/10 hover:border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all cursor-pointer active:scale-95"
            >
              📈 Optimize investments
            </button>
            <button
              onClick={() => {
                setAvatarState("friendly");
                setMessages([
                  {
                    sender: "advisor",
                    text: "System Reset. Hello Sejal! I'm your Singleton Wealth Advisor. Ask me to 'Analyze my spending' to check your cash flow, or 'Optimize my investments' to view your customized asset allocation matrix.",
                    state: "friendly",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    metrics: {
                      income: 85000,
                      savings: 120000,
                      runway: 24000
                    }
                  }
                ]);
              }}
              className="flex-shrink-0 glass-effect hover:bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer active:scale-95"
            >
              🔄 Reset Chat
            </button>
          </div>
        </div>

        {/* Input Bar terminal */}
        <div className="p-4 bg-slate-950 border-t border-slate-900 rounded-b-[2.5rem]">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask Singleton Advisor..."
              className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 font-sans text-slate-200 placeholder-slate-600 disabled:opacity-50"
            />
            <button
              onClick={() => handleMessageSubmit(inputText)}
              disabled={isLoading || !inputText.trim()}
              className="bg-gradient-to-tr from-orange-500 to-amber-500 text-slate-950 font-extrabold w-11 h-11 rounded-xl flex items-center justify-center shadow-lg hover:shadow-orange-500/10 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5l7.5-7.5 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
