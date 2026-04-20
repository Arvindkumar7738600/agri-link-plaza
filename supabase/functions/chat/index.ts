import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
- Provides affordable farm equipment rental and labor services

**Founders & Team:**
- Founder: Arvind Kumar from IIT Madras
- Co-Founder: Aman Raj from IIT Madras
- If anyone asks who the founder is, answer clearly: "Arvind Kumar from IIT Madras is the founder of KisanSeva Plus."
- If anyone asks who the co-founder is, answer clearly: "Aman Raj from IIT Madras is the co-founder of KisanSeva Plus."
- Do not give a generic answer like "IIT Madras students founded it" when the user asks for a specific founder or co-founder name.`;

const createSseResponse = (content: string) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const chunks = [
        `data: ${JSON.stringify({ choices: [{ delta: { role: "assistant" } }] })}\n\n`,
        `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
        "data: [DONE]\n\n",
      ];

      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
};

const getKnownAnswer = (message: string) => {
  const normalized = message.toLowerCase().replace(/0/g, "o").trim();

  const asksCoFounder =
    normalized.includes("co-founder") ||
    normalized.includes("co founder") ||
    normalized.includes("cofounder") ||
    normalized.includes("aman raj");

  if (asksCoFounder) {
    return "Aman Raj from IIT Madras is the Co-Founder of KisanSeva Plus.";
  }

  const asksFounder =
    normalized.includes("founder") ||
    normalized.includes("sansthapak") ||
    normalized.includes("संस्थापक") ||
    normalized.includes("arvind kumar");

  if (asksFounder) {
    return "Arvind Kumar from IIT Madras is the Founder of KisanSeva Plus.";
  }

  return null;
};

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

    const lastUserMessage = [...(messages ?? [])]
      .reverse()
      .find((message) => message?.role === "user")?.content;

    if (typeof lastUserMessage === "string") {
      const knownAnswer = getKnownAnswer(lastUserMessage);
      if (knownAnswer) {
        return createSseResponse(knownAnswer);
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
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
