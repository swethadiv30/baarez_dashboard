import { NextResponse } from "next/server";

export async function POST(req) {
  const { question, dataSummary } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 250,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful sales analyst. Dataset info: " +
            dataSummary,
        },
        { role: "user", content: question },
      ],
    }),
  });

  const data = await res.json();
  const answer = data.choices[0].message.content;

  return NextResponse.json({ answer });
}