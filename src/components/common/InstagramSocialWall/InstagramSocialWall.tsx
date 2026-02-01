import { motion } from 'framer-motion';
import { ExternalLink, Heart, MessageCircle, Instagram, Sparkles } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

// Mock data structure for Instagram posts
// In production, this would come from Instagram API via a backend service
interface InstagramPost {
    id: string;
    permalink: string;
    mediaUrl: string;
    caption: string;
    likeCount: number;
    commentCount: number;
    username: string;
    timestamp: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    isHot?: boolean; // Algorithmically determined "hot" posts
}

// Featured posts - curated content showcasing the collaboration
// These would typically come from Instagram API with hashtag filtering
const FEATURED_POSTS: InstagramPost[] = [
    {
        id: '1',
        permalink: 'https://www.instagram.com/p/DE8bpJhNDuN/',
        mediaUrl: 'https://shipbyx.com/images/germanier/look1-front.jpg',
        caption: '✨ Germanier SS26 Opening Look featuring @ivyjstudio 3D printed headpiece worn by @lisarinna #GermanierSS26 #ParisHauteCouture',
        likeCount: 2847,
        commentCount: 156,
        username: 'germanier_official',
        timestamp: '2026-01-29T18:00:00Z',
        mediaType: 'IMAGE',
        isHot: true,
    },
    {
        id: '2',
        permalink: 'https://www.instagram.com/ivyjstudio/',
        mediaUrl: 'https://shipbyx.com/images/germanier/headpiece-detail.jpg',
        caption: 'The making of our Germanier collaboration headpiece 🌟 3D printed wearable art for Paris Haute Couture Week 2026',
        likeCount: 1923,
        commentCount: 89,
        username: 'ivyjstudio',
        timestamp: '2026-01-30T10:30:00Z',
        mediaType: 'IMAGE',
        isHot: true,
    },
    {
        id: '3',
        permalink: 'https://www.instagram.com/p/DE8bpJhNDuN/',
        mediaUrl: 'https://shipbyx.com/images/germanier/runway-moment.jpg',
        caption: 'That moment when @lisarinna opened Germanier in our piece 💫 #WearableArt #3DPrinting',
        likeCount: 1456,
        commentCount: 67,
        username: 'ivyjstudio',
        timestamp: '2026-01-29T20:00:00Z',
        mediaType: 'IMAGE',
    },
    {
        id: '4',
        permalink: 'https://www.instagram.com/germanier_official/',
        mediaUrl: 'https://shipbyx.com/images/germanier/backstage.jpg',
        caption: 'Backstage magic at Paris Haute Couture Week ✨ So honoured to collaborate with @ivyjstudio on this incredible piece',
        likeCount: 1234,
        commentCount: 45,
        username: 'germanier_official',
        timestamp: '2026-01-29T16:00:00Z',
        mediaType: 'IMAGE',
    },
    {
        id: '5',
        permalink: 'https://www.instagram.com/ivyjstudio/',
        mediaUrl: 'https://shipbyx.com/images/germanier/studio-process.jpg',
        caption: 'From digital design to runway reality 🖥️✨ Our computational design process for the Germanier headpiece',
        likeCount: 987,
        commentCount: 34,
        username: 'ivyjstudio',
        timestamp: '2026-01-28T14:00:00Z',
        mediaType: 'IMAGE',
    },
    {
        id: '6',
        permalink: 'https://www.instagram.com/germanier_official/',
        mediaUrl: 'https://shipbyx.com/images/germanier/final-look.jpg',
        caption: 'The complete look - Haute Couture craftsmanship meets 3D printed innovation #GermanierSS26',
        likeCount: 876,
        commentCount: 29,
        username: 'germanier_official',
        timestamp: '2026-01-30T12:00:00Z',
        mediaType: 'IMAGE',
    },
];

// Hashtags being tracked
const TRACKED_HASHTAGS = ['#GermanierSS26', '#IvyJStudio', '#ParisHauteCouture2026', '#3DPrintedFashion'];

interface InstagramSocialWallProps {
    className?: string;
    maxPosts?: number;
    showHashtags?: boolean;
}

export const InstagramSocialWall = ({
    className = '',
    maxPosts = 6,
    showHashtags = true
}: InstagramSocialWallProps) => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredPost, setHoveredPost] = useState<string | null>(null);

    // Load posts from API or Fallback
    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            let apiPosts: InstagramPost[] = [];

            try {
                // Try to fetch from our Vercel API function
                // In local dev without 'vercel dev', this might 404, which is expected
                const response = await fetch('/api/instagram');

                if (response.ok) {
                    const data = await response.json();
                    if (data.data && Array.isArray(data.data)) {
                        apiPosts = data.data;
                    }
                }
            } catch (error) {
                console.log('Using mock/fallback data (API not available or configured)');
            }

            // Combine API posts with Featured posts if API returns few results
            // Or just use Featured posts if API failed
            let finalPosts;

            if (apiPosts.length > 0) {
                // Determine "Hot" posts based on engagement logic (mock logic since simple API doesn't give unlimited history)
                finalPosts = apiPosts.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
            } else {
                // Simulate network delay for mock experience if we fell back instantly
                await new Promise(resolve => setTimeout(resolve, 800));

                // Fallback to purely mock data
                finalPosts = [...FEATURED_POSTS]
                    .sort((a, b) => (b.likeCount + b.commentCount) - (a.likeCount + a.commentCount));
            }

            setPosts(finalPosts.slice(0, maxPosts));
            setIsLoading(false);
        };

        loadPosts();
    }, [maxPosts]);

    const formatCount = useCallback((count: number): string => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    }, []);

    const formatTimeAgo = useCallback((timestamp: string): string => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const diffMs = now.getTime() - postDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1d ago';
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        return `${Math.floor(diffDays / 30)}mo ago`;
    }, []);

    // Skeleton loader
    const SkeletonPost = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square bg-accent/10 rounded-lg overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent skeleton-shimmer" />
        </motion.div>
    );

    return (
        <section className={`instagram-social-wall ${className}`}>
            {/* Section Header */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 mb-4"
                >
                    <Instagram size={18} className="text-[#E4405F]" />
                    <span className="font-mono text-xs tracking-[0.2em] uppercase opacity-60">Social Wall</span>
                </motion.div>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-2xl md:text-3xl font-light tracking-tight mb-4"
                >
                    Join the Conversation
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-sm md:text-base opacity-60 max-w-xl mx-auto"
                >
                    See what people are saying about the Germanier × Ivy J Studio collaboration
                </motion.p>

                {/* Tracked Hashtags */}
                {showHashtags && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-2 mt-6"
                    >
                        {TRACKED_HASHTAGS.map((tag) => (
                            <a
                                key={tag}
                                href={`https://www.instagram.com/explore/tags/${tag.replace('#', '')}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 rounded-full text-xs font-mono tracking-wide transition-all duration-300 hover:scale-105"
                            >
                                {tag}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Posts Grid - Masonry-style */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {isLoading ? (
                    // Skeleton loading state
                    Array.from({ length: maxPosts }).map((_, index) => (
                        <SkeletonPost key={index} />
                    ))
                ) : (
                    posts.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`
                group relative overflow-hidden rounded-lg bg-accent/5 
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} 
                ${post.isHot ? 'ring-2 ring-[#E4405F]/30' : ''}
              `}
                            onMouseEnter={() => setHoveredPost(post.id)}
                            onMouseLeave={() => setHoveredPost(null)}
                        >
                            {/* Aspect ratio container */}
                            <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-square'}`}>
                                {/* Image */}
                                <img
                                    src={post.mediaUrl}
                                    alt={post.caption.substring(0, 50)}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                                {/* Hot badge */}
                                {post.isHot && (
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#E4405F] to-[#F77737] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            <Sparkles size={10} />
                                            Hot
                                        </span>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className={`
                  absolute inset-0 bg-black/60 backdrop-blur-sm
                  flex flex-col items-center justify-center gap-3 p-4
                  transition-opacity duration-300
                  ${hoveredPost === post.id ? 'opacity-100' : 'opacity-0'}
                `}>
                                    {/* Engagement stats */}
                                    <div className="flex items-center gap-6 text-white">
                                        <span className="flex items-center gap-2">
                                            <Heart size={18} fill="white" />
                                            <span className="font-medium">{formatCount(post.likeCount)}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MessageCircle size={18} />
                                            <span className="font-medium">{formatCount(post.commentCount)}</span>
                                        </span>
                                    </div>

                                    {/* Username & time */}
                                    <div className="text-white/80 text-sm flex items-center gap-2">
                                        <span>@{post.username}</span>
                                        <span className="opacity-50">•</span>
                                        <span className="opacity-70">{formatTimeAgo(post.timestamp)}</span>
                                    </div>

                                    {/* View on Instagram */}
                                    <div className="flex items-center gap-2 text-white text-xs uppercase tracking-widest mt-2">
                                        <span>View on Instagram</span>
                                        <ExternalLink size={12} />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))
                )}
            </div>

            {/* CTA to follow */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-12"
            >
                <a
                    href="https://www.instagram.com/ivyjstudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#F77737] text-white rounded-full font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#E4405F]/20"
                >
                    <Instagram size={18} />
                    <span>Follow @ivyjstudio</span>
                </a>
                <p className="text-xs opacity-40 mt-4 font-mono">
                    Use #IvyJStudio to be featured
                </p>
            </motion.div>
        </section>
    );
};

export default InstagramSocialWall;
