/**
 * Cloudflare Pages Function: Securely provides the Firebase config to the frontend.
 */
export async function onRequest(context) {
  // This function now handles both GET and OPTIONS requests for broader compatibility.
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const firebaseConfig = {
        apiKey: context.env.FIREBASE_API_KEY,
        authDomain: context.env.FIREBASE_AUTH_DOMAIN,
        projectId: "aiagent-fbfb8", // Project ID is often public
        storageBucket: context.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: context.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: context.env.FIREBASE_APP_ID,
    };

    return new Response(JSON.stringify(firebaseConfig), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Added for cross-origin compatibility
      },
    });
  } catch (error) {
    return new Response('Failed to load Firebase configuration.', { status: 500 });
  }
}
