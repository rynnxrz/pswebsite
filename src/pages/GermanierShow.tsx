import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useCallback, useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Clock, Moon, Sun } from 'lucide-react';
import { germanierMediaCoverage, lastUpdated, MediaCoverage } from '../data/germanierMediaCoverage';
import ShimmerButton from '@/components/ui/ShimmerButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SplitText from '@/components/reactbits/SplitText';
import { useTranslation } from 'react-i18next';
import { SlidePanelProvider, SlidePanelManager, useSlidePanels } from '@/components/common/SlidePanel';

import { setTheme } from '@/utils/theme';

// Hide theme toggle on this page
import './GermanierShow.css';

// Click tracking utility - sends event to analytics
const trackClick = (eventName: string, eventData?: Record<string, unknown>) => {
  // Log for future backend integration
  console.log('[TRACK]', eventName, eventData);

  // Store in localStorage for now (can be replaced with backend API)
  const trackingData = JSON.parse(localStorage.getItem('ivyj_tracking') || '[]');
  trackingData.push({
    event: eventName,
    data: eventData,
    timestamp: new Date().toISOString(),
    page: window.location.pathname
  });
  localStorage.setItem('ivyj_tracking', JSON.stringify(trackingData));
};

export const GermanierShow = () => {
  return (
    <SlidePanelProvider>
      <GermanierShowContent />
    </SlidePanelProvider>
  );
};

const GermanierShowContent = () => {
  const { t } = useTranslation();
  const { openPanel, totalOffset } = useSlidePanels();

  // Theme Toggle Logic
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setThemeState(nextTheme);
  }, [theme]);

  // Sync with global theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
          setThemeState(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Preload Instagram Embed Script for performance
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFollowClick = useCallback(() => {
    trackClick('instagram_follow_click', {
      source: 'germanier_show_page',
      button_location: 'sticky_cta'
    });
  }, []);

  const handleIvyJClick = useCallback(() => {
    trackClick('ivyj_studio_click', {
      source: 'germanier_show_page',
      location: 'hero_section'
    });

    // Open as a slide panel instead of a modal
    openPanel({
      id: 'ivyj-instagram-profile',
      outlet: 'Instagram',
      url: 'https://www.instagram.com/ivyjstudio/',
      headline: 'Ivy J Studio (@ivyjstudio)',
      excerpt: 'Official Instagram profile of Ivy J Studio.',
      date: new Date().toISOString().split('T')[0],
      impactScore: 10,
      verified: true,
      language: 'en',
      type: 'instagram'
    });
  }, [openPanel]);

  const { scrollY } = useScroll();
  // Animate in when scrolling past ~300px (adjust based on hero height)
  const titleOpacity = useTransform(scrollY, [300, 450], [0, 1]);
  const titleY = useTransform(scrollY, [300, 450], [20, 0]);
  const titleWidth = useTransform(scrollY, [300, 450], [0, 'auto']); // Animate width to avoid layout jump

  // Inverse transition for Media Coverage title (fades out as others fade in)
  // Max opacity set to 0.6 to match the hero text style
  const mediaTitleOpacity = useTransform(scrollY, [300, 450], [1, 0]);
  const mediaTitleY = useTransform(scrollY, [300, 450], [0, -20]);


  const handleMediaCardClick = useCallback((article: MediaCoverage) => {
    trackClick('media_card_click', {
      outlet: article.outlet,
      url: article.url,
      source: 'germanier_show_page'
    });
    openPanel(article);
  }, [openPanel]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Kevin Germanier Spring 2026 Couture Show",
    "startDate": "2026-01-29",
    "endDate": "2026-01-29",
    "image": "https://shipbyx.com/og-germanier-2026.jpg",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Paris Fashion Week Venue",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      }
    },
    "organizer": {
      "@type": "Person",
      "name": "Kevin Germanier",
      "url": "https://www.kevingermanier.com"
    },
    "performer": [
      {
        "@type": "Person",
        "name": "Lisa Rinna",
        "description": "American actress, opening the show wearing Ivy J Studio headpiece"
      }
    ],
    "contributor": {
      "@type": "Organization",
      "name": "Ivy J Studio",
      "alternateName": "Ivy J",
      "url": "https://ivyjstudio.com",
      "sameAs": [
        "https://www.instagram.com/ivyjstudio",
        "https://ivyjstudio.com/pages/about-ivy"
      ],
      "foundingDate": "2023",
      "description": "London-based 3D printed wearable art studio. Creates body sculpture, jewellery, and headpieces using digital computational generative modelling and innovative 3D printing technology. Featured at Paris Fashion Week 2026 with Kevin Germanier.",
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        }
      },
      "founder": {
        "@type": "Person",
        "name": "Ivy",
        "jobTitle": "Wearable Artist & Architect",
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "The Bartlett School of Architecture, UCL"
          }
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "Ivy J Studio"
        },
        "description": "Architect-trained wearable artist with 9 years of architectural experience. UCL graduate, former Foster + Partners. Specializes in intimate sculptural forms inspired by natural creatures and everyday ecosystems."
      },
      "knowsAbout": [
        "3D printing",
        "wearable body sculpture",
        "computational generative modelling",
        "procedural modelling",
        "jewellery design",
        "headpiece design",
        "haute couture accessories",
        "architectural design",
        "material innovation"
      ]
    },
    "about": {
      "@type": "CreativeWork",
      "name": "3D-Printed Couture Headpiece",
      "creator": {
        "@type": "Organization",
        "name": "Ivy J Studio"
      },
      "description": "Custom 3D-printed wearable body sculpture designed for Paris Fashion Week 2026, blending architectural thinking with intimate sculptural form."
    },
    "description": "The Kevin Germanier Spring 2026 Couture show in Paris, featuring exclusive 3D-printed wearable sculptures designed and crafted by London-based Ivy J Studio for the opening set with Lisa Rinna.",
    "keywords": "Ivy J, Ivy J Studio, Kevin Germanier, Paris Fashion Week 2026, haute couture, 3D printed headpiece, Lisa Rinna, wearable art, body sculpture, London designer, UCL architect"
  };

  // Format the last updated date
  const formattedDate = new Date(lastUpdated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });


  return (
    <>
      <div
        className="min-h-screen bg-background text-foreground transition-all duration-300 ease-out"
        style={{
          marginRight: totalOffset !== 0 ? totalOffset : undefined,
          width: totalOffset !== 0 ? `calc(100% - ${totalOffset})` : undefined
        }}
      >
        <Helmet>
          <title>Kevin Germanier Paris Show 2026 | Ivy J Studio Collaboration</title>
          <meta name="description" content="London-based Ivy J Studio collaborated with Kevin Germanier for the Spring 2026 Couture show in Paris. Featuring the iconic 3D-printed opening headpiece worn by Lisa Rinna, created by UCL-trained architect Ivy." />
          <meta name="keywords" content="Kevin Germanier, Ivy J Studio, Ivy J, Paris Fashion Week 2026, Couture, Lisa Rinna, 3D printed headpiece, wearable art, body sculpture, London designer, UCL architect, haute couture, Foster Partners" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://shipbyx.com/germanier-paris-2026" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://shipbyx.com/germanier-paris-2026" />
          <meta property="og:title" content="Kevin Germanier Paris Show 2026 | Ivy J Studio Collaboration" />
          <meta property="og:description" content="Discover the collaboration between Kevin Germanier and Ivy J Studio for the Spring 2026 Couture show in Paris. Featuring the iconic opening headpiece worn by Lisa Rinna." />
          <meta property="og:image" content="https://shipbyx.com/og-germanier-2026.jpg" />
          <meta property="og:image:alt" content="Germanier × Ivy J Studio - Paris Haute Couture Week 2026 - 3D Printed Wearable Art" />
          <meta property="og:site_name" content="Ivy J Studio" />
          <meta property="og:locale" content="en_US" />
          <meta property="article:published_time" content="2026-01-29" />
          <meta property="article:author" content="Ivy J Studio" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://shipbyx.com/germanier-paris-2026" />
          <meta name="twitter:title" content="Kevin Germanier Paris Show 2026 | Ivy J Studio Collaboration" />
          <meta name="twitter:description" content="Discover the collaboration between Kevin Germanier and Ivy J Studio for the Spring 2026 Couture show in Paris. Featuring the iconic opening headpiece worn by Lisa Rinna." />
          <meta name="twitter:image" content="https://shipbyx.com/og-germanier-2026.jpg" />
          <meta name="twitter:image:alt" content="Germanier × Ivy J Studio - Paris Haute Couture Week 2026 - 3D Printed Wearable Art" />
          <meta name="twitter:site" content="@ivyjstudio" />

          {/* Geo-Targeting Meta Tags */}
          <meta name="geo.region" content="FR-75" />
          <meta name="geo.placename" content="Paris" />
          <meta name="geo.position" content="48.8566;2.3522" />
          <meta name="ICBM" content="48.8566, 2.3522" />

          {/* Multi-Region Targeting with Hreflang */}
          <link rel="alternate" hrefLang="en" href="https://shipbyx.com/germanier-paris-2026" />
          <link rel="alternate" hrefLang="fr" href="https://shipbyx.com/germanier-paris-2026" />
          <link rel="alternate" hrefLang="x-default" href="https://shipbyx.com/germanier-paris-2026" />

          {/* Additional Locale Variants for Fashion Markets */}
          <meta property="og:locale:alternate" content="fr_FR" />
          <meta property="og:locale:alternate" content="en_GB" />
          <meta property="og:locale:alternate" content="zh_CN" />

          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>

        </Helmet>

        {/* Skip Link for Keyboard Accessibility (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:outline-2 focus:outline-offset-2"
        >
          Skip to main content
        </a>

        <header className="h-[85vh] flex items-center justify-center text-center p-8 relative overflow-hidden">


          <div className="max-w-4xl z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-xs tracking-[0.2em] uppercase mb-4 font-bold text-foreground"
            >
              PARIS HAUTE COUTURE WEEK 2026
            </motion.div>
            {/* H1 for WCAG heading hierarchy (WCAG 1.3.1) */}
            <h1 className="font-display text-[clamp(1rem,2.5vw,2.5rem)] font-light leading-[0.9] tracking-[-0.04em] flex flex-col items-center gap-[0.1em] text-foreground">
              <SplitText text="Germanier" className="block uppercase tracking-[0.15em]" delay={0.1} triggerOnScroll={false} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="font-serif italic text-[0.4em] max-sm:text-[0.6em] font-light my-2 inline-block opacity-80"
              >
                ×
              </motion.span>
              <button
                type="button"
                onClick={handleIvyJClick}
                className="bg-transparent border-0 p-0 cursor-pointer transition-opacity hover:opacity-70"
              >
                <SplitText text="Ivy J Studio" className="block" delay={0.2} triggerOnScroll={false} />
              </button>
            </h1>
          </div>
        </header>



        <section id="main-content" className="px-8 pb-32 bg-transparent relative">
          <div className="max-w-[1800px] mx-auto mb-12 flex items-center justify-between border-b border-border/40 pb-4 sticky top-0 z-[60] bg-background/95 backdrop-blur-md pt-4 overflow-hidden -mx-8 px-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] max-sm:pt-[max(1rem,env(safe-area-inset-top))]">

            {/* Mobile: Simplified left-aligned info */}
            <div className="sm:hidden flex flex-col min-w-0">
              <span className="font-display text-xs font-medium leading-tight">GERMANIER × Ivy J</span>
              <span className="font-display text-[10px] opacity-50 mt-0.5">{new Date(lastUpdated).toLocaleDateString()}</span>
            </div>

            {/* Desktop: Original layout */}
            <div className="hidden sm:flex items-center gap-4 min-w-0">
              <motion.div
                style={{ opacity: titleOpacity, y: titleY, width: titleWidth }}
                className="flex flex-col min-w-0 overflow-hidden"
              >
                <span className="font-display text-xs uppercase tracking-widest opacity-60 whitespace-nowrap">Paris Haute Couture Week 2026</span>
                <span className="font-display text-sm font-medium leading-none whitespace-nowrap">GERMANIER × Ivy J Studio</span>
              </motion.div>

              <motion.div
                style={{ opacity: titleOpacity }}
                className="h-8 w-px bg-border/40 shrink-0"
              />
            </div>

            {/* Centered Title - Desktop only */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
              <motion.h2
                style={{ opacity: mediaTitleOpacity, y: mediaTitleY }}
                className="font-mono text-sm uppercase tracking-[0.2em] whitespace-nowrap pointer-events-auto"
              >
                Media Coverage
              </motion.h2>
            </div>

            {/* Right side actions */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="flex items-center gap-4"
            >
              <button
                type="button"
                className={`local-theme-toggle theme-toggle ${theme} !relative !top-auto !left-auto shadow-none border-border/40 !bg-background/50 max-sm:hidden`}
                onClick={toggleTheme}
                aria-label="Switch to dark mode"
                title="Switch to dark mode"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="theme-toggle-icon">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </span>
              </button>

              <ShimmerButton
                href="https://www.instagram.com/ivyjstudio"
                onClick={handleFollowClick}
                variant="instagram"
                size="sm"
                className="pointer-events-auto shadow-none bg-background/50 hover:bg-background/80 border-border/40 text-[11px] tracking-widest h-9 px-4 max-sm:h-8 max-sm:px-3 max-sm:text-[10px]"
              >
                <span className="font-medium">@ivyjstudio</span>
              </ShimmerButton>

              <div className="hidden sm:flex items-center gap-2 text-xs font-display opacity-80 uppercase tracking-widest border-l border-border/40 pl-4 h-8">
                <Clock size={10} />
                <span>Last Updated: {formattedDate}</span>
              </div>
            </motion.div>
          </div>

          <div className={`${totalOffset !== 0 ? 'columns-1 lg:columns-2' : 'columns-1 md:columns-2 lg:columns-3'} gap-8 max-w-[1800px] mx-auto space-y-8`}>
            {germanierMediaCoverage
              .sort((a, b) => {
                // 1. Sort by Impact Score (High to Low)
                if (b.impactScore !== a.impactScore) {
                  return b.impactScore - a.impactScore;
                }
                // 2. Sort by Date (Newest to Oldest)
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="break-inside-avoid h-full mb-8"
                >
                  <button
                    type="button"
                    onClick={() => handleMediaCardClick(article)}
                    className="block group h-full w-full text-left cursor-pointer bg-transparent border-0 p-0"
                  >
                    <Card className="h-full flex flex-col border border-border bg-card p-8 rounded text-card-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:border-primary/50 group-hover:bg-accent/5 relative overflow-hidden">
                      <CardHeader className="p-0 mb-6 pb-6 border-b border-border flex flex-row items-center justify-between space-y-0 shrink-0">
                        <span className="font-display text-xl font-semibold tracking-tight">{article.outlet}</span>
                        <ExternalLink size={16} className="opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                      </CardHeader>
                      <CardContent className="p-0 flex flex-col flex-grow relative">
                        <CardTitle className="font-display text-2xl md:text-[1.75rem] leading-[1.2] mb-4 font-normal">
                          {article.headline}
                        </CardTitle>

                        {article.quote && (
                          <blockquote className="font-display text-lg leading-[1.4] mb-12 pl-0 border-l-0 text-foreground block flex-grow">
                            <span className="block font-serif text-4xl leading-none text-accent opacity-30 mb-2">“</span>
                            {article.quote}
                            {article.quoteAuthor && (
                              <cite className="block not-italic text-sm opacity-80 mt-3 font-sans">— {article.quoteAuthor}</cite>
                            )}
                          </blockquote>
                        )}

                        {!article.quote && article.excerpt && (
                          <CardDescription className="text-base leading-relaxed opacity-80 mb-12 flex-grow">
                            {article.excerpt}
                          </CardDescription>
                        )}

                        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mt-auto">
                          Read Review <ArrowRight size={14} />
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </motion.div>
              ))}
          </div>
        </section>

        <div className="w-full border-t border-border/40" />

        <section className="px-8 pt-24 pb-32 max-w-[1800px] mx-auto">
          <div>
            <h3 className="font-display text-sm tracking-[0.2em] uppercase opacity-50 mb-16 text-center">{t('germanier.credits.title')}</h3>

            {/* Kevin's Official Order - 3 Column Grid */}
            <div className={`${totalOffset !== 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} grid gap-8 mb-16 items-start`}>

              {/* COLUMN 1: Collection + Creative Direction + Styling */}
              <div className="space-y-6">
                {/* Collection */}
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.collection.title')}</span>
                  <p className="font-display text-base font-normal mt-1">{t('germanier.credits.collection.name')}</p>
                  <p className="text-sm opacity-60 mt-1">{t('germanier.credits.collection.desc')}</p>
                </div>
                {/* Creative Direction & Styling */}
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.direction.title')}</span>
                  {(t('germanier.credits.direction.names', { returnObjects: true }) as any[]).map((item: any) => (
                    <a key={item.name} href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  ))}
                </div>
                {/* Hair */}
                {(t('germanier.credits.beauty.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Hair').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{item.label}</span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                    ) : (
                      <p className="font-display text-base font-normal mt-1">{item.name}</p>
                    )}
                  </div>
                ))}
                {/* Make-up */}
                {(t('germanier.credits.beauty.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Make-up').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{item.label}</span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                    ) : (
                      <p className="font-display text-base font-normal mt-1">{item.name}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* COLUMN 2: 3D Headpieces → Shoes → Casting → Music → Production → Models → Press → Photo */}
              <div className="space-y-6">
                {/* 3D Headpieces */}
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.headpieces.title')}</span>
                  {(t('germanier.credits.headpieces.names', { returnObjects: true }) as any[]).map((item: any) => (
                    <a key={item.name} href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal text-accent hover:opacity-80 transition-opacity block mt-1">{item.name}</a>
                  ))}
                </div>
                {/* Shoes */}
                {(t('germanier.credits.team.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Shoes').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{item.label}</span>
                    <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  </div>
                ))}
                {/* Casting */}
                {(t('germanier.credits.team.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Casting').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">Casting Director</span>
                    <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  </div>
                ))}
                {/* Music */}
                {(t('germanier.credits.team.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Music').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{item.label}</span>
                    <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  </div>
                ))}
                {/* Production */}
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.production.title')}</span>
                  {(t('germanier.credits.production.names', { returnObjects: true }) as any[]).map((item: any) => (
                    <a key={item.name} href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  ))}
                </div>
                {/* Models */}
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.models.title')}</span>
                  <p className="leading-relaxed flex flex-wrap gap-x-1.5 gap-y-0.5 text-base opacity-80 mt-1">
                    {(t('germanier.credits.models.list', { returnObjects: true }) as any[]).map((model: any, index: number, arr: any[]) => (
                      <span key={model.name}>
                        <a href={model.link} className="hover:text-accent transition-colors">{model.name}</a>
                        {index < arr.length - 1 && ","}
                      </span>
                    ))}
                  </p>
                </div>
                {/* Press */}
                {(t('germanier.credits.team.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Press').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{item.label}</span>
                    <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  </div>
                ))}
                {/* Photo */}
                {(t('germanier.credits.team.items', { returnObjects: true }) as any[]).filter((item: any) => item.label === 'Photos').map((item: any) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs uppercase opacity-50 tracking-wide">Photo</span>
                    <a href={item.link} target="_blank" rel="noreferrer" className="font-display text-base font-normal hover:text-accent transition-colors block mt-1">{item.name}</a>
                  </div>
                ))}
              </div>

              {/* COLUMN 3: Special Thanks */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.thanks.title')}</span>
                  <p className="leading-relaxed flex flex-wrap gap-x-1.5 gap-y-0.5 text-base opacity-80 mt-1">
                    {(t('germanier.credits.thanks.list', { returnObjects: true }) as any[]).map((item: any, index: number, arr: any[]) => (
                      <span key={item.name}>
                        <a href={item.link} className="hover:text-accent transition-colors">{item.name}</a>
                        {index < arr.length - 1 && ","}
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-xs uppercase opacity-50 tracking-wide">{t('germanier.credits.dedicated.label')}</span>
                  <p className="leading-relaxed flex flex-wrap gap-x-1.5 gap-y-0.5 text-base opacity-80 mt-1">
                    {(t('germanier.credits.dedicated.list', { returnObjects: true }) as any[]).map((item: any, index: number, arr: any[]) => (
                      <span key={item.name}>
                        <a href={item.link} className="hover:text-accent transition-colors">{item.name}</a>
                        {index < arr.length - 1 && ","}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SlidePanelManager />
    </>
  );
};
