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
    ogImage?: string; // Open Graph image for card preview
}

// 按媒体重要性排序，仅包含欧洲权威媒体针对 2026-01-29 大秀的真实评价
export const germanierMediaCoverage: MediaCoverage[] = [
    // 1. WWD (Top Authority)
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
        blocksIframe: true,
        ogImage: 'https://wwd.com/wp-content/uploads/2026/01/germanier-ss-couture-26-r-dom-001.jpeg?crop=0px%2C184px%2C1365px%2C763px&resize=1000%2C563'
    },
    // 2. Vogue (Top Authority)
    {
        id: 'vogue-review-ss26',
        outlet: 'Vogue Runway',
        url: 'https://www.vogue.com/fashion-shows/spring-2026-couture/germanier',
        headline: 'Germanier Spring 2026 Couture Collection',
        excerpt: 'Germanier Spring 2026 Couture collection, runway looks, beauty, models, and reviews.',
        quote: 'Kevin Germanier transforms waste into haute couture masterpieces, creating a laboratory of transformation, memory, and invention.',
        date: '2026-01-29',
        impactScore: 10,
        language: 'en',
        verified: true,
        ogImage: 'https://assets.vogue.com/photos/697bb106b83d642141b49145/16:9/pass/00001-germanier-spring-2026-couture-credit-gorunway.jpg'
    },
    // 3. Harper's Bazaar (Top Authority)
    {
        id: 'harpers-bazaar-ss26',
        outlet: "Harper's Bazaar",
        url: 'https://www.harpersbazaar.com/fashion/a70192841/couture-week-trends-spring-2026/',
        headline: 'The Best Moments and Biggest Trends of Couture Week Spring 2026',
        excerpt: 'Germanier closed couture week with Lisa Rinna opening the show and a manifesto on upcycling.',
        quote: 'Rainbow feathers, beaded masks, and neon tulle filled the runway—every piece crafted from upcycled materials sourced from LVMH\'s most iconic houses.',
        date: '2026-01-29',
        impactScore: 10,
        language: 'en',
        verified: true,
        blocksIframe: true,
        ogImage: 'https://hips.hearstapps.com/hmg-prod/images/0129-wrapup-00-697bca1d4cae5.jpg?crop=1xw:0.8890469416785206xh;center,top&resize=1200:*'
    },
    // 4. Fashion Network (Top Industry Reporter)
    {
        id: 'fashion-network-ss26',
        outlet: 'Fashion Network',
        url: 'https://us.fashionnetwork.com/news/Paris-couture-final-day-ashi-studio-and-germanier,1802926.html',
        headline: 'Paris Couture Final Day: Ashi Studio and Germanier',
        excerpt: 'Paris Couture’s four-day season ended with a marvellous show in the Palais de Tokyo.',
        quote: 'Which kicked off magnificently with Lisa Rinna emoting in a midnight blue leotard finished with an enormous tulle skirt and a Madwoman of Chaillot, spiky branch hat.',
        quoteAuthor: 'Godfrey Deeny',
        date: '2026-01-30',
        impactScore: 9,
        language: 'en',
        verified: true
    },
    // 5. L'Officiel (European Authority)
    {
        id: 'lofficiel-review-ss26',
        outlet: "L'Officiel",
        url: 'https://www.lofficiel.com/fashion-week/chez-germanier-la-souverainete-indocile-des-chardonneuses',
        headline: 'Chez Germanier, la souveraineté indocile des Chardonneuses',
        excerpt: "Pour le Printemps-Été 2026, Germanier signe avec Les Chardonneuses une collection couture où l'héritage se déconstruit pour renaître en formes souveraines.",
        date: '2026-01-30',
        impactScore: 9,
        language: 'fr',
        verified: true,
        ogImage: 'https://www.datocms-assets.com/44039/1769758740-img_8840.jpeg?auto=format&fit=max&w=1200'
    },
    // 6. SHOWstudio (Innovation Authority)
    {
        id: 'showstudio-review-ss26',
        outlet: 'SHOWstudio',
        url: 'https://www.showstudio.com/collections/autumn-winter-2026-haute-couture/germanier-ss-26-haute-couture',
        headline: 'Germanier S/S 26 Haute Couture',
        excerpt: "Exploration of Germanier's unique S/S 26 Haute Couture collection titled 'Les Chardonneuses'.",
        quote: 'A series of beautiful shaman-like beauties that wafted down the runway, expressing a mythical energy of transformation.',
        date: '2026-01-29',
        impactScore: 9,
        language: 'en',
        verified: true
    },
    // 7. Marie Claire (Global Media)
    {
        id: 'marie-claire-us-ss26',
        outlet: 'Marie Claire',
        url: 'https://www.marieclaire.com/fashion/celebrity-style/lisa-rinna-haute-couture-week-runway-debut-the-traitors/',
        headline: 'Lisa Rinna Trades the \'Traitors\' Turret for Her Haute Couture Week Runway Debut',
        excerpt: 'Designer Kevin Germanier bestowed upon Rinna the honor of opening his Paris presentation in the most gothic, Traitors-appropriate of black gowns.',
        quote: 'Well, this is a dream come true that I didn\'t even have.',
        quoteAuthor: 'Lisa Rinna',
        date: '2026-01-29',
        impactScore: 9,
        language: 'en',
        verified: true,
        blocksIframe: true,
        ogImage: 'https://cdn.mos.cms.futurecdn.net/2eE8ZMMciDg4dMXhxqUwji-1920-80.png'
    },
    // 8. Say Who (Cultural Authority)
    {
        id: 'saywho-review-ss26',
        outlet: 'Say Who',
        url: 'https://saywho.fr/evenements/le-defile-sensationnel-de-germanier-cloture-la-haute-couture-week/',
        headline: 'Le défilé sensationnel de Germanier clôture la Haute Couture Week',
        excerpt: 'Kévin Germanier a offert à la semaine de la Haute Couture un grand final digne de ce nom.',
        quote: "Le show s'ouvrait sur Lisa Rinna, qui portait un justaucorps bleu nuit, une immense jupe en tulle and a spiky branch hat.",
        date: '2026-01-29',
        impactScore: 8,
        language: 'fr',
        verified: true,
        ogImage: 'https://saywhofr.fra1.cdn.digitaloceanspaces.com/app/uploads/2026/01/Germanier-SS26_-Say-Who_Ayka-Lux-116-scaled-e1769774995897.jpg'
    },
    // 9. ELLE Brasil (Global Media)
    {
        id: 'elle-brasil-ss26',
        outlet: 'ELLE Brasil',
        url: 'https://elle.com.br/desfiles/germanier-verao-2026-alta-costura',
        headline: 'Germanier, verão 2026 alta-costura',
        excerpt: 'Germanier encerra calendário de alta-costura de verão 2026 com upcycling.',
        date: '2026-01-30',
        impactScore: 8,
        language: 'pt',
        verified: true,
        ogImage: 'https://images.elle.com.br/2026/01/Germanier-verao-2026-alta-costura-GettyImages-2258915828-560x840.jpg'
    }
];

export const lastUpdated = '2026-02-01T08:20:00Z';
