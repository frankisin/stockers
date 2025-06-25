export function getSiteURL(): string {
  let url =
    import.meta.env.VITE_SITE_URL ?? // Your main site URL
    import.meta.env.VITE_VERCEL_URL ?? // Optional fallback if using Vercel
    'http://localhost:5173/'; // Default to local dev server

  // Make sure to include `https://` when not localhost
  url = url.includes('http') ? url : `https://${url}`;

  // Ensure trailing slash
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
}

