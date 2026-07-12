import re
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Singleton Wealth Advisor API",
    description="Conversational AI Backend for Track 01: Wealth Advisory (IDBI Innovate 2026)",
    version="1.0.0"
)


# Robust CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# User Profile Context (Static / Synthetic memory)
USER_PROFILE = {
    "name": "Sejal",
    "income": 85000,
    "savings": 120000,
    "discretionary_runway": 24000,
    "high_burn_spending": {
        "food_delivery": 8500,  # Zomato & Swiggy
        "entertainment": 4500,
        "shopping": 3000
    }
}

class ChatRequest(BaseModel):
    query: str

def sanitize_input(text: str) -> str:
    """
    Robust input sanitization layer.
    Filters out special character injection vectors (< > { } [ ] \ ^ ~).
    """
    if not text:
        return ""
    # Pattern to matches injection-prone characters
    pattern = r'[<>{}\[\]\\^~]'
    # Strip characters out
    sanitized = re.sub(pattern, '', text)
    return sanitized.strip()

@app.post("/api/advisory/chat")
async def chat_advisory(request: ChatRequest):
    raw_query = request.query
    sanitized_query = sanitize_input(raw_query)
    
    # Case-insensitive query parsing
    query_lower = sanitized_query.lower()
    
    avatar_state = "friendly"
    speech_text = ""
    metrics = {}
    
    if not query_lower:
        avatar_state = "friendly"
        speech_text = (
            f"Hello {USER_PROFILE['name']}! Ready to supercharge your wealth? "
            f"Currently, your monthly income is ₹{USER_PROFILE['income']:,} and you have an idle "
            f"discretionary runway of ₹{USER_PROFILE['discretionary_runway']:,}. Ask me to "
            f"'Analyze my spending' or 'Optimize my investments' to get started."
        )
        metrics = {
            "income": USER_PROFILE["income"],
            "savings": USER_PROFILE["savings"],
            "runway": USER_PROFILE["discretionary_runway"]
        }
    
    elif "spending" in query_lower or "analyze" in query_lower or "spent" in query_lower:
        avatar_state = "analytical"
        food_spend = USER_PROFILE["high_burn_spending"]["food_delivery"]
        runway = USER_PROFILE["discretionary_runway"]
        sweep_suggestion = 5000
        
        speech_text = (
            f"Analysis complete. I've detected high-burn spending of ₹{food_spend:,} on Zomato & Swiggy, "
            f"which consumes roughly 35.4% of your ₹{runway:,} discretionary runway. "
            f"I recommend keeping a lid on this and sweeping ₹{sweep_suggestion:,} immediately into "
            f"a high-yield mutual fund to clock 12% inflation-adjusted returns. Ready to execute?"
        )
        
        metrics = {
            "type": "spending_analysis",
            "discretionary_runway": runway,
            "dining_spend": food_spend,
            "dining_percentage": round((food_spend / runway) * 100, 1),
            "sweep_amount": sweep_suggestion,
            "remaining_runway": runway - food_spend
        }
        
    elif "optimize" in query_lower or "investment" in query_lower or "portfolio" in query_lower:
        avatar_state = "confident"
        speech_text = (
            f"Here is your customized asset allocation matrix tailored for optimal compounding. "
            f"I suggest a risk-calibrated split of 40% in Fixed Income (specifically IDBI High-Yield FDs "
            f"to lock in secure yields) and 60% in Equities (Diversified Index & Flexi-cap mutual funds) "
            f"for wealth growth. This balances capital preservation with high growth."
        )
        
        metrics = {
            "type": "investment_optimization",
            "fixed_income_pct": 40,
            "equities_pct": 60,
            "allocation_legend": [
                {"name": "Fixed Income (IDBI FDs)", "value": 40, "color": "from-orange-500 to-amber-500"},
                {"name": "Equities", "value": 60, "color": "from-emerald-500 to-teal-500"}
            ]
        }
        
    else:
        # Catch-all friendly response
        avatar_state = "friendly"
        speech_text = (
            f"Hi {USER_PROFILE['name']}! I'm here. Try asking me to 'Analyze my spending' to see "
            f"how the Zomato/Swiggy bills affect your savings, or type 'Optimize my investments' "
            f"to view your IDBI asset allocation roadmap."
        )
        metrics = {
            "income": USER_PROFILE["income"],
            "savings": USER_PROFILE["savings"],
            "runway": USER_PROFILE["discretionary_runway"]
        }

    return {
        "avatar_state": avatar_state,
        "speech_text": speech_text,
        "metrics": metrics,
        "query_received": raw_query,
        "query_sanitized": sanitized_query
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    # Disable reload in production to optimize performance/resources
    is_prod = os.environ.get("ENV") == "production"
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=not is_prod)

