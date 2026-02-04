// We need to import the list of posts. 
// Since this is a serverless function in Vercel/Next.js, we might not be able to import directly from src/data if it's not configured in tsconfig/webpack for api routes easily.
// For safety/simplicity in this specific environment, I will duplicate the list here or read it if possible. 
// Let's rely on a shared definition if possible, but to avoid module resolution issues in mixed JS/TS envs without complex config, I'll define it here for now or import it if I'm sure.
// Given the project structure (`api/instagram.js` vs `src/...`), imports can be tricky.
// Better approach: Define the list here for the API to use.

const CURATED_URLS = [
    'https://www.instagram.com/p/DFa_kMItvO-/',
    'https://www.instagram.com/p/DFbA_3RNvO-/',
    'https://www.instagram.com/p/DFblqX6txO-/',
    'https://www.instagram.com/p/DFbZ_3RtXO-/',
    'https://www.instagram.com/p/DFc_kMItvO-/',
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
        // --- STRATEGY 1: AUTOMATIC FEED (Basic Display API) ---
        // Try to fetch latest posts from the connected account (e.g., @ivyjstudio)
        let livePosts = [];
        try {
            const response = await fetch(
                `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count&access_token=${token}&limit=12`
            );

            if (response.ok) {
                const data = await response.json();
                if (data.data && Array.isArray(data.data) && data.data.length > 0) {
                    livePosts = data.data.map(post => ({
                        id: post.id,
                        permalink: post.permalink,
                        mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
                        caption: post.caption || '',
                        likeCount: post.like_count || 0,
                        commentCount: post.comments_count || 0,
                        username: post.username,
                        timestamp: post.timestamp,
                        mediaType: post.media_type,
                        isHot: false
                    }));
                }
            }
        } catch (apiError) {
            console.warn('Basic Display API failed, falling back to Curated List:', apiError);
        }

        // If we found live posts, return them!
        if (livePosts.length > 0) {
            res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30'); // Short cache for live feed
            return res.status(200).json({ data: livePosts });
        }

        // --- STRATEGY 2: FALLBACK TO CURATED LIST (oEmbed) ---
        // If Strategy 1 failed (or account has 0 posts), use the manual list.
        console.log('Using Curated List Fallback (oEmbed)');

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

                return {
                    id: url.split('/p/')[1]?.replace('/', '') || url,
                    permalink: url,
                    mediaUrl: data.thumbnail_url || 'https://placehold.co/600x600?text=No+Image',
                    caption: data.title || 'Germanier Paris 2026',
                    likeCount: 0,
                    commentCount: 0,
                    username: data.author_name || 'Instagram User',
                    timestamp: new Date().toISOString(),
                    mediaType: 'IMAGE',
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
