// /.netlify/functions/instagram-feed
export default async (req, context) => {
  const token  = process.env.INSTAGRAM_TOKEN;    // Long-lived token (gratuit)
  const userId = process.env.INSTAGRAM_USER_ID;  // ID utilisateur IG

  if(!token || !userId){
    return new Response(JSON.stringify({ error: 'Missing Instagram env vars' }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
    });
  }

  const fields = [
    'id','caption','media_type','media_url','permalink','thumbnail_url','timestamp'
  ].join(',');

  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=30&access_token=${token}`;

  try {
    const igRes = await fetch(url);
    const txt   = await igRes.text();
    if(!igRes.ok){
      return new Response(JSON.stringify({ error: 'Bad IG response', details: txt }), {
        status: 502,
        headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
      });
    }
    const json  = JSON.parse(txt);
    const items = Array.isArray(json.data) ? json.data : [];
    items.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
        'access-control-allow-origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Fetch failed', details: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
    });
  }
};
