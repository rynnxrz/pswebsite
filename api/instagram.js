export default async function handler(req, res) {
    // Set CORS headers to allow requests from the frontend
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const token = process.env.IG_ACCESS_TOKEN;

    // If no token is configured, return 401/Empty so frontend uses fallback mock data
    if (!token) {
        return res.status(200).json({
            error: 'No access token configured',
            usingFallback: true,
            data: []
        });
    }

    try {
        // Fetch media from Instagram Basic Display API
        // Fields: id, caption, media_type, media_url, permalink, thumbnail_url, timestamp, username
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count&access_token=${token}&limit=12`
        );

        const data = await response.json();

        if (data.error) {
            console.error('Instagram API Error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        // Transform data to match our frontend interface
        const posts = data.data.map(post => ({
            id: post.id,
            permalink: post.permalink,
            mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
            caption: post.caption || '',
            // Note: Basic Display API might not return like_count/comments_count for all account types
            // We'll use 0 if missing, frontend can hide or use randomized realistic numbers if preferred
            likeCount: post.like_count || 0,
            commentCount: post.comments_count || 0,
            username: post.username,
            timestamp: post.timestamp,
            mediaType: post.media_type,
            isHot: false // Logic for "hot" can be added here or on frontend
        }));

        // Cache the response for 1 hour (3600 seconds)
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=1800');

        return res.status(200).json({ data: posts });
    } catch (error) {
        console.error('Fetch Error:', error);
        return res.status(500).json({ error: 'Failed to fetch Instagram data' });
    }
}
