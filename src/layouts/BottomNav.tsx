// src/components/BottomNav.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { generateDisplacementMap } from '../utils/displacementUtils';
import { LanguageTransitionOverlay } from '../components/common/LanguageTransitionOverlay';
import './BottomNav.css';
// import './Tooltip.css'; // No longer needed for BottomNav due to custom styles

const LanguageSwitchIcon = ({ lang }: { lang: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="central"
      fill="currentColor"
      fontSize={lang === 'en' ? '15' : '13'}
      fontWeight="600"
      dy="1"
    >
      {lang === 'en' ? '中' : 'EN'}
    </text>
  </svg>
);

const navItems = [
  { id: 'home', icon: Home, to: '/', tooltip: 'menu.home' },
  { id: 'about', icon: User, to: '/about', tooltip: 'menu.about' },
  { id: 'portfolio', icon: Briefcase, to: '/portfolio', tooltip: 'menu.portfolio' },
  { id: 'language', icon: Globe, to: null, tooltip: 'menu.language' }, // Special item
];

const NavItem = ({ item, isActive, onClick, currentLang }: { item: any; isActive: boolean, onClick?: (e: React.MouseEvent) => void, currentLang?: string }) => {
  // Pure CSS tooltip handling now, so state is removed
  const { t } = useTranslation();

  // Translate tooltip functionality
  const tooltipText = item.id === 'language' ? t('nav.language') : t(`nav.${item.id}`);

  const handleClick = (e: React.MouseEvent) => {
    // Only prevent default for custom actions (like Language toggle).
    // For router Links, we must allow the event to propagate.
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
  };

  const content = (
    <button type="button" className={`nav-item ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {item.id === 'language' && currentLang ? (
        <LanguageSwitchIcon lang={currentLang} />
      ) : (
        <item.icon size={24} fill="currentColor" stroke="currentColor" strokeWidth={0} />
      )}
    </button>
  );

  return (
    <div className="nav-tooltip-wrapper">
      {item.to ? (
        <Link to={item.to} className="nav-item-link">
          {content}
        </Link>
      ) : (
        content
      )}
      {/* Tooltip always rendered, visibility controlled by CSS opacity */}
      <span className="nav-tooltip-text">{tooltipText}</span>
    </div>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Adjust path mapping for the new "about" route
  const currentPath = location.pathname === '/profile' ? '/about' : location.pathname;
  // Calculate active index only for route items
  const activeIndex = navItems.findIndex(item => item.to === currentPath);

  // --- Change 2: Correct the navigation bar width to fit 4 items ---
  const navWidth = 320; // 4 items * 80px width each
  const navHeight = 64;
  const navBorderRadius = 24; // Use a squircle-style radius

  const [displacementMap, setDisplacementMap] = useState('');
  useEffect(() => {
    generateDisplacementMap(navWidth, navHeight, navBorderRadius, 16).then(setDisplacementMap);
  }, [navWidth, navHeight, navBorderRadius]);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLang, setTargetLang] = useState('');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';

    // Always trigger the transition overlay for language switching
    setTargetLang(newLang);
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    i18n.changeLanguage(targetLang).then(() => {
      // Force a page reload to ensure all external resources (like iframe) update correctly
      window.location.reload();
    });
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <LanguageTransitionOverlay
            fromLang={i18n.language}
            toLang={targetLang}
            onComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>
      {/* SVG Filters for Liquid Effect */}
      <svg width="0" height="0">
        <filter id="liquid-glass-filter">
          <feImage href={displacementMap} x="0" y="0" width={navWidth} height={navHeight} result="displacement_map" />
          <feDisplacementMap in="SourceGraphic" in2="displacement_map" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <nav className="bottom-nav-container">
        <div className="bottom-nav">
          {activeIndex !== -1 && (
            <motion.div
              className="active-indicator"
              animate={{ x: `${activeIndex * 80 + 16}px` }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
          {navItems.map((item, index) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeIndex === index}
              onClick={item.id === 'language' ? toggleLanguage : undefined}
              currentLang={item.id === 'language' ? i18n.language : undefined}
            />
          ))}
        </div>
      </nav>
    </>
  );
};