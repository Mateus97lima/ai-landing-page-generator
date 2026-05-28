import { usePrompt } from "@/src/hooks/usePrompt";

export async function POST(req: Request) {
    const { texto } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
        {
            role: "system",
            content: usePrompt
        },
        {
        role: "user",
        content: `Crie uma página com Tailwind sobre: ${texto}`,
        },
    ], 
    "temperature": 0.9,
    "max_tokens": 4000

    }),
    });

    const data = await response.json();
    
    const html = data.choices[0].message.content
    .replace(/```html\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();
    return Response.json({html});
}