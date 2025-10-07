import OpenAI from 'openai';
import { fetchUrlContent } from './helper';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

// URL detection regex
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const DAILY_LIMIT = 1000;
let dailyCount = 0;
let lastReset = Date.now();

const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SYSTEM_PROMPT = `
You are Warren, a knowledgeable and approachable personal assistant focused on investments. 
You can answer questions and provide insights about a wide range of investment topics, including:
- Stocks and stock markets
- ETFs and index funds
- Bonds and government securities
- Cryptocurrencies (e.g., Bitcoin, Ethereum)
- Real estate and property investing
- Commodities and alternative assets

When users share URLs or web content with you:
- Read and analyze the provided content carefully
- Discuss the investment-related aspects of the content
- Provide your insights and perspective on the information
- Point out key takeaways, risks, or opportunities mentioned
- Always reference specific parts of the content when discussing it

If someone asks about something completely unrelated to investing, politely guide the conversation back by saying: 
"I'm here to help with investments — could you rephrase your question in that context?"

Keep your answers clear, practical, and useful. Where relevant, explain trade-offs, risks, and potential strategies, but avoid giving direct financial advice. 
Stay professional, but conversational and easy to understand.
`;

/**
 * Checks if daily rate limit has been exceeded and resets counter if it's a new day
 */
function checkAndUpdateRateLimit(): boolean {
  const now = new Date();
  const lastResetDate = new Date(lastReset);

  // Reset counter if it's a new day
  if (
    now.getUTCFullYear() !== lastResetDate.getUTCFullYear() ||
    now.getUTCMonth() !== lastResetDate.getUTCMonth() ||
    now.getUTCDate() !== lastResetDate.getUTCDate()
  ) {
    dailyCount = 0;
    lastReset = now.getTime();
  }

  // Check if limit exceeded
  if (dailyCount >= DAILY_LIMIT) {
    return false;
  }

  dailyCount += 1;
  return true;
}

/**
 * Creates a rate limit exceeded response
 */
function createRateLimitResponse(): Response {
  return new Response(
    JSON.stringify({
      error: 'Daily request limit reached. Try again tomorrow.',
    }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  );
}

/**
 * Processes user messages to detect URLs and fetch their content
 */
async function processMessagesWithUrls(
  messages: ChatMessage[]
): Promise<ChatMessage[]> {
  const lastMessage = messages[messages.length - 1];

  if (!lastMessage || lastMessage.role !== 'user') {
    return messages;
  }

  const urls = lastMessage.content.match(URL_REGEX);

  if (!urls || urls.length === 0) {
    return messages;
  }

  // Limit to 3 URLs to prevent abuse
  const urlsToProcess = urls.slice(0, 3);

  // Fetch content from all URLs
  const urlContents = await Promise.all(
    urlsToProcess.map((url) => fetchUrlContent(url))
  );

  // Append URL content to the user's message
  const enhancedContent = `${lastMessage.content}\n\n${urlContents.join('\n\n')}`;

  // Update the last message with enhanced content
  return [
    ...messages.slice(0, -1),
    { ...lastMessage, content: enhancedContent },
  ];
}

/**
 * Creates a streaming response from OpenAI
 */
async function createStreamingResponse(
  messages: ChatMessage[]
): Promise<Response> {
  const stream = await openAiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
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
}

/**
 * Creates an error response
 */
function createErrorResponse(error: Error): Response {
  return new Response(JSON.stringify({ error: error.message }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request): Promise<Response> {
  // Check rate limit
  if (!checkAndUpdateRateLimit()) {
    return createRateLimitResponse();
  }

  try {
    const { messages }: ChatRequest = await req.json();

    // Process messages to handle URLs
    const processedMessages = await processMessagesWithUrls(messages);

    // Create and return streaming response
    return await createStreamingResponse(processedMessages);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return createErrorResponse(error);
  }
}
