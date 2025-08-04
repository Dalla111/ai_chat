/**
 * Cloudflare Pages Function: Securely provides the Firebase config to the frontend.
 */
export async function onRequest(context) {
  // These keys are safe to be public, but managing them here is best practice.
  // For higher security, you would use Cloudflare's environment variables for these too.
  const firebaseConfig = {
      apiKey: context.env.FIREBASE_API_KEY,
      authDomain: context.env.FIREBASE_AUTH_DOMAIN,
      projectId: "aiagent-fbfb8", // Project ID is often public
      storageBucket: context.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: context.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: context.env.FIREBASE_APP_ID,
  };

  return new Response(JSON.stringify(firebaseConfig), {
    headers: { 'Content-Type': 'application/json' },
  });
}
