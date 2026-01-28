// src/pages/WorkWithMe.tsx

import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import { useTranslation } from 'react-i18next';

import Dither from '../components/interactive/Dither';
import './Portfolio.css';

interface ServiceItem {
  title: string;
  description: string;
}

export const Portfolio = () => {
  const { t } = useTranslation();

  const servicesData = t('workwithme.services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <div className="workwithme-shell">
      <div className="workwithme-background" aria-hidden="true">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <motion.div {...pageTransition} className="workwithme-wrapper">
        <div className="workwithme-page-container">
          <div className="workwithme-content-backdrop">
            {/* Hero Section */}
            <section className="workwithme-hero" aria-label={t('workwithme.hero.title')}>
              <div className="workwithme-grid-col-left">
                <h1 className="workwithme-name">{t('workwithme.hero.title')}</h1>
                <a href="https://www.linkedin.com/in/rongze-xu-493688233/" target="_blank" rel="noopener noreferrer" className="workwithme-link">
                  <span>{t('workwithme.hero.button')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
              </div>
              <div className="workwithme-grid-col-right">
                <p className="workwithme-tagline">{t('workwithme.hero.tagline')}</p>
              </div>
            </section>

            {/* Services Section */}
            <section className="workwithme-section" aria-labelledby="services-heading">
              <div className="workwithme-grid-col-left">
                <div className="workwithme-section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <h2 id="services-heading">{t('workwithme.services.title')}</h2>
                </div>
              </div>
              <div className="workwithme-grid-col-right">
                <div className="workwithme-services-list">
                  {servicesData.map((service, index) => (
                    <div className="workwithme-service-item" key={index}>
                      <h3 className="workwithme-service-title">{service.title}</h3>
                      <p className="workwithme-service-desc">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="workwithme-section" aria-labelledby="process-heading">
              <div className="workwithme-grid-col-left">
                <div className="workwithme-section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                  </svg>
                  <h2 id="process-heading">{t('workwithme.process.title')}</h2>
                </div>
              </div>
              <div className="workwithme-grid-col-right">
                <p className="workwithme-process-desc">{t('workwithme.process.description')}</p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="workwithme-cta-section" aria-labelledby="cta-heading">
              <div className="workwithme-grid-col-left">
                <div className="workwithme-section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  </svg>
                  <h2 id="cta-heading">{t('workwithme.cta.title')}</h2>
                </div>
              </div>
              <div className="workwithme-grid-col-right">
                <p className="workwithme-cta-desc">
                  {t('workwithme.cta.description')}{' '}
                  <a
                    href="https://www.linkedin.com/in/rongze-xu-493688233/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="workwithme-link"
                  >
                    <span>{t('workwithme.cta.button')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Floating CTA Button - bottom right */}

      </motion.div>
    </div>
  );
};
