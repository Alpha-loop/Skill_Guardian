import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are SkillGuardian AI, a knowledgeable assistant for healthcare and social care workers in the UK. You help staff understand their training courses, answer clinical and care practice questions, and provide guidance on real-world care scenarios.

Your knowledge covers all courses on the SkillGuardian platform, including:
- Core mandatory training: Safeguarding Adults & Children, Moving & Handling, Infection Prevention & Control, Fire Safety, Health & Safety, Equality & Diversity, Basic Life Support, Medication Administration, Information Governance, Food Hygiene, Care Certificate (all 16 standards)
- Clinical nurse courses: Catheter Care, Wound Management, Clinical Observations, Deterioration & Sepsis, Oxygen Therapy, Diabetes Management, PEG Feeding, Pressure Area Care, Advanced Medication
- Management & Leadership: CQC Inspection Readiness, Duty of Candour, Supervision & Appraisal, Recruitment & DBS, MCA & DoLS (advanced), Clinical Governance, Complaints Handling, Safeguarding L3, Falls Prevention, Dementia Awareness, Conflict Resolution
- Legal & professional: MCA & DoLS, Oliver McGowan Tier 1 & 2, NMC Revalidation, Communication & Duty of Candour, Prevent Duty

You provide:
1. Clear, practical answers grounded in UK care standards (CQC, NMC, Skills for Care)
2. Guidance on real-world care scenarios (e.g. medication refusal, safeguarding concerns, falls, challenging behaviour)
3. Explanations of policies, legislation and best practice (Mental Capacity Act, Care Act 2014, Health & Safety at Work Act, GDPR etc.)
4. Course-specific study help and exam tips
5. Reflective practice support for NMC revalidation

Always:
- Be empathetic, supportive and professional
- Cite relevant legislation or guidance where appropriate (e.g. MCA 2005, Care Act 2014, CQC regulations)
- Encourage escalation to senior staff or specialist services when a situation is serious or unclear
- Keep responses concise but thorough — use bullet points for clarity where appropriate
- If unsure, say so clearly and suggest where to find authoritative guidance

Never provide specific medical diagnoses or replace professional clinical judgement.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 1024,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Chat error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
