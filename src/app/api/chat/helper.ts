// Function to fetch and extract content from a URL
export const fetchUrlContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Warren Investment Assistant)',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      return `Error: Could not fetch content from ${url} (Status: ${response.status})`;
    }

    const html = await response.text();

    // Basic content extraction - remove HTML tags and get readable text
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove styles
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Limit content length to prevent token overflow
    const maxLength = 3000;
    const truncatedContent =
      textContent.length > maxLength
        ? textContent.substring(0, maxLength) + '... [content truncated]'
        : textContent;

    return `Content from ${url}:\n\n${truncatedContent}`;
  } catch (error) {
    return `Error: Could not fetch content from ${url}. ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};
