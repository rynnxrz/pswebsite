import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import LogoLoop from '../components/common/LogoLoop/LogoLoop';
import styles from './GermanierShow.module.css';
import { ArrowRight, Instagram, ExternalLink } from 'lucide-react';

export const GermanierShow = () => {
  const mediaLinks = [
    { src: '/assets/images/media/wwd.png', alt: 'WWD', href: 'https://wwd.com/runway/spring-couture-2026/paris/germanier/review/', title: 'WWD Review' },
    { src: '/assets/images/media/vogue.png', alt: 'Vogue', href: 'https://www.vogue.com/fashion-shows/spring-2026-couture/germanier', title: 'Vogue Runway' },
    { src: '/assets/images/media/reuters.png', alt: 'Reuters', href: 'https://www.reuters.com/pictures/style-celebrities-haute-couture-week-paris-2026-01-27/', title: 'Reuters' },
    { src: '/assets/images/media/wwd.png', alt: 'WWD', href: 'https://wwd.com/runway/spring-couture-2026/paris/germanier/review/', title: 'WWD Review' },
    { src: '/assets/images/media/vogue.png', alt: 'Vogue', href: 'https://www.vogue.com/fashion-shows/spring-2026-couture/germanier', title: 'Vogue Runway' },
    { src: '/assets/images/media/reuters.png', alt: 'Reuters', href: 'https://www.reuters.com/pictures/style-celebrities-haute-couture-week-paris-2026-01-27/', title: 'Reuters' },
  ];

  const pressArticles = [
    {
      source: 'WWD',
      logo: '/assets/images/media/wwd.png',
      title: '"A crown of black hawthorns..."',
      excerpt: 'The opening look featured a stunning headpiece that set the tone for the entire collection.',
      link: 'https://wwd.com/runway/spring-couture-2026/paris/germanier/review/',
      image: null // Placeholder for article image if available
    },
    {
      source: 'Vogue',
      logo: '/assets/images/media/vogue.png',
      title: 'Germanier Spring 2026 Couture',
      excerpt: 'Kevin Germanier continues to push the boundaries of sustainable couture with his latest collection in Paris.',
      link: 'https://www.vogue.com/fashion-shows/spring-2026-couture/germanier',
      image: null
    },
    {
      source: 'Reuters',
      logo: '/assets/images/media/reuters.png',
      title: 'Paris Haute Couture Week Highlights',
      excerpt: 'Celebrities and style icons gathered for the Germanier show, marking a high point of the week.',
      link: 'https://www.reuters.com/pictures/style-celebrities-haute-couture-week-paris-2026-01-27/',
      image: null
    },
    // Add more placeholder articles to simulate a masonry grid
    {
      source: 'Fashion Network',
      logo: null, // Text fallback
      title: 'The Opening Statement',
      excerpt: 'Lisa Rinna opened the show wearing a custom headpiece designed by Ivy J Studio.',
      link: '#',
      image: null
    },
    {
      source: 'Elle',
      logo: null,
      title: 'Couture Details',
      excerpt: 'A closer look at the intricate accessories that defined the runway.',
      link: '#',
      image: null
    }
  ];

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

  return (
    <div className={styles.pageContainer}>
      <Helmet>
        <title>Kevin Germanier Paris Show 2026 | Ivy J Studio Collaboration</title>
        <meta name="description" content="Discover the collaboration between Kevin Germanier and Ivy J Studio for the Spring 2026 Couture show in Paris. Featuring the iconic opening headpiece worn by Lisa Rinna." />
        <meta name="keywords" content="Kevin Germanier, Ivy J Studio, Paris Fashion Week 2026, Couture, Lisa Rinna, Headpiece Design" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.eyebrow}
          >
            PARIS HAUTE COUTURE WEEK 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.title}
          >
            Kevin Germanier <span className={styles.x}>×</span> Ivy J Studio
          </motion.h1>

        </div>
      </header>

      <section className={styles.mediaSection}>
        <div className={styles.logoLoopWrapper}>
          <LogoLoop 
            logos={mediaLinks}
            speed={40}
            logoHeight={40}
            gap={80}
            fadeOut={true}
            fadeOutColor="var(--bg-system)"
            scaleOnHover={true}
          />
        </div>
        
        <div className={styles.masonryGrid}>
          {pressArticles.map((article, index) => (
            <motion.a 
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                {article.logo ? (
                  <img src={article.logo} alt={article.source} className={styles.cardLogo} />
                ) : (
                  <span className={styles.sourceText}>{article.source}</span>
                )}
                <ExternalLink size={16} className={styles.externalIcon} />
              </div>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardExcerpt}>{article.excerpt}</p>
              <div className={styles.readMore}>Read Review <ArrowRight size={14} /></div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Follow the Journey</h2>
          <a href="https://www.instagram.com/ivyjstudio" target="_blank" rel="noopener noreferrer" className={styles.igButton}>
            <Instagram size={20} />
            <span>Follow @ivyjstudio</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
};
