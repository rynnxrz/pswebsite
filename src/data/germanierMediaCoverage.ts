// src/data/germanierMediaCoverage.ts
// 媒体报道数据 - 严格核实针对 2026年1月29日 Germanier SS26 Haute Couture 大秀的评价

export interface MediaCoverage {
    id: string;
    outlet: string;
    url: string;
    headline: string;
    excerpt?: string;
    quote?: string; // 关于头冠/配饰的精选评语
    quoteAuthor?: string;
    date: string; // ISO format YYYY-MM-DD
    impactScore: number; // 1-10, 10 being highest impact (e.g. Vogue, WWD, NYT)
    language?: string;
    verified: boolean;
    blocksIframe?: boolean; // Sites that block iframe embedding
    type?: 'instagram'; // Special type for Instagram embed
}

// 按媒体重要性排序，仅包含欧洲权威媒体针对 2026-01-29 大秀的真实评价
// 按照三列布局排序: 左列(1,4,7), 中列(2,5,8), 右列(3,6,9)
// WWD entries moved to end as they block iframe embedding
export const germanierMediaCoverage: MediaCoverage[] = [
    // Row 1
    {
        id: 'lofficiel-review-ss26',
        outlet: "L'Officiel",
        url: 'https://www.lofficiel.com/fashion-week/chez-germanier-la-souverainete-indocile-des-chardonneuses',
        headline: 'Chez Germanier, la souveraineté indocile des Chardonneuses',
        excerpt: "Pour le Printemps-Été 2026, Germanier signe avec Les Chardonneuses une collection couture où l'héritage se déconstruit pour renaître en formes souveraines, radicales et poétiques.",
        date: '2026-01-30',
        impactScore: 9,
        language: 'fr',
        verified: true
    },
    {
        id: 'saywho-review-ss26',
        outlet: 'Say Who',
        url: 'https://saywho.fr/evenements/le-defile-sensationnel-de-germanier-cloture-la-haute-couture-week/',
        headline: 'Le défilé sensationnel de Germanier clôture la Haute Couture Week',
        excerpt: 'Kévin Germanier a offert à la semaine de la Haute Couture un grand final digne de ce nom.',
        quote: "Le show s'ouvrait sur Lisa Rinna, qui portait un justaucorps bleu nuit, une immense jupe en tulle et un chapeau à branches : un look qui donne le ton.",
        date: '2026-01-29',
        impactScore: 9,
        language: 'fr',
        verified: true
    },
    {
        id: 'fashion-network-ss26',
        outlet: 'Fashion Network',
        url: 'https://us.fashionnetwork.com/news/Paris-couture-final-day-ashi-studio-and-germanier,1802926.html',
        headline: 'Paris Couture Final Day: Ashi Studio and Germanier',
        excerpt: 'A deep dive into how Kevin Germanier transforms waste into haute couture masterpieces.',
        date: '2026-01-30',
        impactScore: 8,
        language: 'en',
        verified: true
    },
    // Row 2
    {
        id: 'elle-brasil-ss26',
        outlet: 'ELLE Brasil',
        url: 'https://elle.com.br/desfiles/germanier-verao-2026-alta-costura',
        headline: 'Germanier, verão 2026 alta-costura',
        excerpt: 'Germanier encerra calendário de alta-costura de verão 2026 com upcycling.',
        date: '2026-01-30',
        impactScore: 10,
        language: 'pt',
        verified: true
    },
    {
        id: 'vogue-gallery-ss26',
        outlet: 'Vogue',
        url: 'https://www.vogue.com/fashion-shows/spring-2026-couture/germanier',
        headline: 'Germanier Spring 2026 Couture Collection',
        excerpt: 'Germanier Spring 2026 Couture collection, runway looks, beauty, models, and reviews.',
        date: '2026-01-29',
        impactScore: 10,
        language: 'en',
        verified: true
    },
    // WWD sources - at end, block iframe embedding, show preview style
    {
        id: 'wwd-review-ss26',
        outlet: 'WWD',
        url: 'https://wwd.com/runway/spring-couture-2026/paris/germanier/review/',
        headline: 'Germanier Spring 2026 Couture: Taking Stock',
        excerpt: 'Kevin Germanier upcycled leftover products from LVMH-owned fashion houses, including some of Berluti Olympic uniforms.',
        quote: 'Lisa Rinna opened the show in a black off-the-shoulder bodysuit paired with a drop-waisted tulle skirt and a crown of black hawthorns made from plastic bottles.',
        quoteAuthor: 'Joelle Diderich, WWD Paris Bureau Chief',
        date: '2026-01-29',
        impactScore: 10,
        language: 'en',
        verified: true,
        blocksIframe: true
    },
    {
        id: 'wwd-backstage-ss26',
        outlet: 'WWD Backstage',
        url: 'https://wwd.com/beauty-industry-news/beauty-features/gallery/backstage-at-germanier-spring-2026-spring-couture-1238531541/',
        headline: 'Backstage at Germanier Spring 2026 Couture',
        excerpt: 'Backstage at Germanier Spring 2026 Spring Couture at Paris Couture Week. Photography by Mirella Malaguti/WWD.',
        date: '2026-01-29',
        impactScore: 10,
        language: 'en',
        verified: true,
        blocksIframe: true
    }
];

export const lastUpdated = '2026-01-30T20:55:00Z';
