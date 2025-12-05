import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KISANSEVA_SYSTEM_PROMPT = `You are KisanSeva Plus AI Assistant - a friendly and knowledgeable helper for Indian farmers. You provide information about:

1. **KisanSeva Plus Services:**
   - Equipment booking (tractors, harvesters, rotavators, etc.)
   - Farmer hiring services
   - FPO (Farmer Producer Organization) information
   - Agricultural advisory services

2. **Platform Features:**
   - How to book equipment
   - How to register as a farmer
   - KYC verification process
   - Pricing and payment information

3. **Agricultural Knowledge:**
   - Crop management tips
   - Seasonal farming advice
   - Best practices for Indian agriculture
   - Government schemes for farmers

**Important Guidelines:**
- Respond in the same language the user writes (Hindi, English, or Hinglish)
- Be warm, respectful, and address farmers as "Kisan Bhai" or "Farmer Brother"
- Keep responses concise but helpful
- For specific booking queries, guide them to use the platform's booking feature
- If you don't know something, suggest contacting KisanSeva Plus support

**About KisanSeva Plus:**
- Founded by IIT Madras Students
- Tagline: "Hafto Ka Kaam Ghanto Mein" (Weeks of work in hours)
- Available across multiple states in India
- Provides affordable farm equipment rental and labor services`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: KISANSEVA_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
