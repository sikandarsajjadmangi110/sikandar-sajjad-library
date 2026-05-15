import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ── Ilm Assistant API Route ──
// Currently returns a structured placeholder.
// To activate: replace the placeholder block with a RAG call to
// Claude claude-sonnet-4-6 with your Shia Islamic embeddings store.

const SYSTEM_PROMPT = `You are the Ilm Assistant for The Sikandar Sajjad Digital Library.

RULES (non-negotiable):
1. Answer ONLY from verified Shia Islamic sources.
2. Every answer MUST include source citations: book name, author, chapter/page when available.
3. Clearly state when you are uncertain or the topic needs further scholarly verification.
4. For fiqh/religious rulings, ALWAYS end with:
   "For final religious rulings, please consult your Marja or a qualified scholar."
5. Never fabricate citations. If you cannot find a verified source, say so.
6. Maintain respectful, scholarly tone.
7. Respond in the language of the question (English, Urdu, or Arabic).

CITATION FORMAT:
[Source: Book Title, Author Name, Chapter X / Page Y]`;

export async function POST(req: NextRequest) {
  try {
    const { question, language } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // Rate limiting: log to Supabase (also guards abuse)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // ── PRODUCTION: Replace this with actual Claude API call ──
    // import Anthropic from "@anthropic-ai/sdk";
    // const client = new Anthropic();
    // const response = await client.messages.create({
    //   model:      "claude-sonnet-4-6",
    //   max_tokens: 1024,
    //   system:     SYSTEM_PROMPT,
    //   messages:   [{ role: "user", content: question }],
    // });
    // const answer = response.content[0].type === "text" ? response.content[0].text : "";

    // ── PLACEHOLDER for local dev ──
    const answer = `This is a placeholder answer for: "${question}"\n\nIn production, this will be answered by Claude claude-sonnet-4-6 using a RAG pipeline built on your verified Shia Islamic book embeddings.\n\nFor final religious rulings, please consult your Marja or a qualified scholar.`;
    const sources = [
      { book: "Nahj al-Balagha", author: "Imam Ali (as)", page: "Sermon 1" },
    ];

    // Log the interaction
    if (user) {
      await supabase.from("ilm_assistant_logs").insert({
        user_id:       user.id,
        question,
        answer,
        sources_cited: sources,
        language:      language ?? "en",
      });
    }

    return NextResponse.json({ answer, sources });

  } catch (error) {
    console.error("Ilm Assistant error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
