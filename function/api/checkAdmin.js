/**
 * Cloudflare Pages Function: Securely checks the admin access code.
 */
export async function onRequestPost(context) {
  try {
    const { code } = await context.request.json();
    const ADMIN_ACCESS_CODE = context.env.ADMIN_ACCESS_CODE; // Securely accessed

    const isAdmin = code === ADMIN_ACCESS_CODE;

    return new Response(JSON.stringify({ isAdmin }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ isAdmin: false }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
