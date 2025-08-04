/**
 * Cloudflare Pages Function: Securely proxies requests to the Gemini API.
 */
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const GEMINI_API_KEY = context.env.GEMINI_API_KEY; // Securely accessed from Cloudflare environment variables

    if (!GEMINI_API_KEY) {
      return new Response('API key not configured', { status: 500 });
    }

    const MODEL_NAME = "gemini-2.5-flash-preview-05-20";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

    const geminiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const geminiData = await geminiResponse.json();

    return new Response(JSON.stringify(geminiData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('An internal error occurred', { status: 500 });
  }
}
