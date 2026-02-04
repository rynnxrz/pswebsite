// We need to import the list of posts. 
// Since this is a serverless function in Vercel/Next.js, we might not be able to import directly from src/data if it's not configured in tsconfig/webpack for api routes easily.
// For safety/simplicity in this specific environment, I will duplicate the list here or read it if possible. 
// Let's rely on a shared definition if possible, but to avoid module resolution issues in mixed JS/TS envs without complex config, I'll define it here for now or import it if I'm sure.
// Given the project structure (`api/instagram.js` vs `src/...`), imports can be tricky.
// Better approach: Define the list here for the API to use.

const CURATED_URLS = [
    'https://www.instagram.com/p/DUIyoyPiKWD/',
    'https://www.instagram.com/p/DUTOX8PCPhk/',
    'https://www.instagram.com/p/DULc-UjCJOG/',
    'https://www.instagram.com/p/DUImp1cDrV0/',
    'https://www.instagram.com/reel/DUHDqWnioeS/',
    'https://www.instagram.com/reel/DUGybVACniV/',
];

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const token = process.env.IG_ACCESS_TOKEN;

    if (!token) {
        return res.status(200).json({
            error: 'No access token configured',
            usingFallback: true,
            data: []
        });
    }

    try {
        // --- CURATED LIST ONLY (User Request) ---
        // Fetch oEmbed data for the specific URLs provided

        const fetchPromises = CURATED_URLS.map(async (url) => {
            try {
                // Determine media type hint from URL if possible, default to IMAGE
                const apiUrl = `https://graph.facebook.com/v22.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${token}&hidecaption=1&maxwidth=600&omitscript=1`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    console.error(`Failed to fetch oEmbed for ${url}: ${response.status}`);
                    return null;
                }

                const data = await response.json();

                // Extract ID from /p/, /reel/, or /tv/ URLs
                const idMatch = url.match(/\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
                const id = idMatch ? idMatch[1] : url;

                return {
                    id: id,
                    permalink: url,
                    mediaUrl: data.thumbnail_url || 'https://placehold.co/600x600?text=No+Image',
                    caption: data.title || 'Germanier Paris 2026',
                    likeCount: 0,
                    commentCount: 0,
                    username: data.author_name || 'Instagram User',
                    timestamp: new Date().toISOString(),
                    mediaType: data.type === 'video' ? 'VIDEO' : 'IMAGE',
                    isHot: false
                };
            } catch (err) {
                console.error(`Error processing ${url}:`, err);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);
        const curatedPosts = results.filter(post => post !== null);

        // Cache for 1 hour since curated list changes rarely
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');

        return res.status(200).json({ data: curatedPosts });

    } catch (error) {
        console.error('General API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch Instagram data' });
    }
}
