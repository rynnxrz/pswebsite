import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useCallback } from 'react';
import { ArrowRight, ExternalLink, Clock } from 'lucide-react';
import { germanierMediaCoverage, lastUpdated, MediaCoverage } from '../data/germanierMediaCoverage';
import ShimmerButton from '@/components/ui/ShimmerButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SplitText from '@/components/reactbits/SplitText';
import { useTranslation } from 'react-i18next';
import { SlidePanelProvider, SlidePanelManager, useSlidePanels } from '@/components/common/SlidePanel';

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

  const handleFollowClick = useCallback(() => {
    trackClick('instagram_follow_click', {
      source: 'germanier_show_page',
      button_location: 'sticky_cta'
    });
  }, []);

  const { scrollY } = useScroll();
  // Animate in when scrolling past ~300px (adjust based on hero height)
  const titleOpacity = useTransform(scrollY, [300, 450], [0, 1]);
  const titleY = useTransform(scrollY, [300, 450], [20, 0]);
  const titleWidth = useTransform(scrollY, [300, 450], [0, 'auto']); // Animate width to avoid layout jump


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
    "location": {
      "@type": "Place",
      "name": "Paris, France",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }
    },
    "performer": {
      "@type": "Person",
      "name": "Kevin Germanier"
    },
    "contributor": {
      "@type": "Organization",
      "name": "Ivy J Studio",
      "url": "https://www.instagram.com/ivyjstudio",
      "sameAs": [
        "https://www.instagram.com/ivyjstudio"
      ],
      "description": "Designed and crafted the headpieces for the opening set featuring Lisa Rinna."
    },
    "description": "The Kevin Germanier Spring 2026 Couture show in Paris, featuring exclusive headpieces designed and crafted by Ivy J Studio for the opening set with Lisa Rinna."
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
          marginRight: totalOffset > 0 ? `${totalOffset}px` : undefined,
          width: totalOffset > 0 ? `calc(100% - ${totalOffset}px)` : undefined
        }}
      >
        <Helmet>
          <title>Kevin Germanier Paris Show 2026 | Ivy J Studio Collaboration</title>
          <meta name="description" content="Discover the collaboration between Kevin Germanier and Ivy J Studio for the Spring 2026 Couture show in Paris. Featuring the iconic opening headpiece worn by Lisa Rinna." />
          <meta name="keywords" content="Kevin Germanier, Ivy J Studio, Paris Fashion Week 2026, Couture, Lisa Rinna, Headpiece Design" />
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>

        <header className="h-[60vh] flex items-center justify-center text-center p-8 bg-[radial-gradient(circle_at_center,rgba(var(--accent),0.05)_0%,transparent_70%)] relative">
          <div className="max-w-4xl z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-sm tracking-[0.2em] uppercase mb-6 opacity-60"
            >
              PARIS HAUTE COUTURE WEEK 2026
            </motion.div>
            <div className="font-display text-[clamp(1.75rem,5vw,4rem)] font-light leading-[0.9] tracking-[-0.04em] flex flex-col items-center gap-[0.1em] uppercase mb-4">
              <SplitText text="Kevin Germanier" className="block" delay={0.1} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="text-accent font-serif italic text-[0.4em] font-light opacity-80 my-2 inline-block"
              >
                ×
              </motion.span>
              <SplitText text="Ivy J Studio" className="block" delay={0.2} />
            </div>
          </div>
        </header>



        <section className="px-8 pb-32 bg-transparent relative">
          <div className="max-w-[1400px] mx-auto mb-12 flex items-center justify-between border-b border-border/40 pb-4 sticky top-0 z-[60] bg-background/80 backdrop-blur-md pt-4 overflow-hidden">
            <div className="flex items-center gap-4 min-w-0">
              <motion.div
                style={{ opacity: titleOpacity, y: titleY, width: titleWidth }}
                className="flex flex-col min-w-0 overflow-hidden"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 whitespace-nowrap">Paris Haute Couture Week 2026</span>
                <span className="font-display text-lg leading-none whitespace-nowrap">Kevin Germanier × Ivy J Studio</span>
              </motion.div>

              <motion.div
                style={{ opacity: titleOpacity }}
                className="h-8 w-px bg-border/40 shrink-0"
              />

              <h2 className="font-display text-2xl uppercase tracking-widest opacity-80 shrink-0">Media Coverage</h2>
            </div>

            <div className="flex items-center gap-4">
              <ShimmerButton
                href="https://www.instagram.com/ivyjstudio"
                onClick={handleFollowClick}
                variant="instagram"
                size="sm"
                className="pointer-events-auto shadow-none bg-background/50 hover:bg-background/80 border-border/40"
              >
                <img
                  src="/assets/ivyj-logo.jpg"
                  alt=""
                  className="ivyj-logo w-4 h-4 rounded-full"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Follow</span>
              </ShimmerButton>

              <div className="flex items-center gap-2 text-xs font-mono opacity-50 uppercase tracking-wider border-l border-border/40 pl-4">
                <Clock size={12} />
                <span className="hidden sm:inline">Last Updated: {formattedDate}</span>
                <span className="sm:hidden">{new Date(lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-[1400px] mx-auto space-y-8">
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
                        <ExternalLink size={16} className="opacity-30 transition-opacity duration-300 group-hover:opacity-100" />
                      </CardHeader>
                      <CardContent className="p-0 flex flex-col flex-grow relative">
                        <CardTitle className="font-display text-2xl md:text-[1.75rem] leading-[1.2] mb-4 font-normal">
                          {article.headline}
                        </CardTitle>

                        {article.quote && (
                          <blockquote className="font-display text-2xl leading-[1.3] mb-12 pl-0 border-l-0 text-foreground block flex-grow">
                            <span className="block font-serif text-5xl leading-none text-accent opacity-30 mb-2">“</span>
                            {article.quote}
                            {article.quoteAuthor && (
                              <cite className="block not-italic text-sm opacity-60 mt-3 font-sans">— {article.quoteAuthor}</cite>
                            )}
                          </blockquote>
                        )}

                        {!article.quote && article.excerpt && (
                          <CardDescription className="text-base leading-relaxed opacity-60 mb-12 flex-grow">
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

        <section className="px-8 pb-32 max-w-[1400px] mx-auto">
          <div className="border-t border-border/40 pt-24">
            <h3 className="font-display text-sm tracking-[0.2em] uppercase opacity-50 mb-16 text-center">{t('germanier.credits.title')}</h3>

            {/* Kevin's Official Order - 3 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-start">

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
