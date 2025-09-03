import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are Ia Nepo, a personal assistant focused exclusively on investments. 
You provide clear and helpful answers about stocks, ETFs, index funds, real estate, or other investment opportunities. 
If a question is unrelated to investments, politely say: "I'm sorry, I only answer questions about investments." 
Always stay on topic and provide accurate, useful information within the investment domain.
`;

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { message } = (await req.json()) as { message: string };
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        { role: 'user', content: message },
      ],
    });

    return NextResponse.json({ reply: response.choices[0].message.content });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
