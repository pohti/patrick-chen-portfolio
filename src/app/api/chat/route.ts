import OpenAI from 'openai';

const DAILY_LIMIT = 1000;
let dailyCount = 0;
let lastReset = Date.now();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are Ia Nepo, a personal assistant focused exclusively on investments. 
You provide clear and helpful answers about stocks, ETFs, index funds, real estate, or other investment opportunities. 
If a question is unrelated to investments, politely say: "I'm sorry, I only answer questions about investments." 
Always stay on topic and provide accurate, useful information within the investment domain.
`;

export async function POST(req: Request): Promise<Response> {
  const now = new Date();
  const lastResetDate = new Date(lastReset);

  if (
    now.getUTCFullYear() !== lastResetDate.getUTCFullYear() ||
    now.getUTCMonth() !== lastResetDate.getUTCMonth() ||
    now.getUTCDate() !== lastResetDate.getUTCDate()
  ) {
    dailyCount = 0;
    lastReset = now.getTime();
  }

  if (dailyCount >= DAILY_LIMIT) {
    return new Response(
      JSON.stringify({
        error: 'Daily request limit reached. Try again tomorrow.',
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  dailyCount += 1;

  try {
    const { message } = (await req.json()) as { message: string };

    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message },
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
