// src/components/BottomNav.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase } from 'lucide-react';
import { generateDisplacementMap } from '../utils/displacementUtils';
import './BottomNav.css';

// --- Change 1: Update "Profile" to "About" ---
const navItems = [
  { id: 'home', icon: Home, to: '/', tooltip: 'Home' },
  { id: 'about', icon: User, to: '/about', tooltip: 'About' },
  { id: 'portfolio', icon: Briefcase, to: '/portfolio', tooltip: 'Portfolio' },
];

const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const handleMouseDown = () => setTooltipVisible(false);
  const handleMouseLeave = () => setTooltipVisible(true);

  return (
    <div className="nav-tooltip-wrapper tooltip-container" onMouseLeave={handleMouseLeave}>
      <Link to={item.to} className="nav-item-link">
        <button className={`nav-item ${isActive ? 'active' : ''}`} onMouseDown={handleMouseDown}>
          <item.icon size={24} fill="currentColor" />
        </button>
      </Link>
      {tooltipVisible && <span className="tooltip-text">{item.tooltip}</span>}
    </div>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  // Adjust path mapping for the new "about" route
  const currentPath = location.pathname === '/profile' ? '/about' : location.pathname;
  const activeIndex = navItems.findIndex(item => item.to === currentPath);

  // --- Change 2: Correct the navigation bar width to fit 3 items ---
  const navWidth = 240; // 3 items * 80px width each
  const navHeight = 64;
  const navBorderRadius = 24; // Use a squircle-style radius

  const [displacementMap, setDisplacementMap] = useState('');
  useEffect(() => {
    generateDisplacementMap(navWidth, navHeight, navBorderRadius, 16).then(setDisplacementMap);
  }, [navWidth, navHeight, navBorderRadius]);

  return (
    <>
      <svg width="0" height="0">
        <filter id="liquid-glass-filter">
          <feImage href={displacementMap} x="0" y="0" width={navWidth} height={navHeight} result="displacement_map"/>
          <feDisplacementMap in="SourceGraphic" in2="displacement_map" scale="15" xChannelSelector="R" yChannelSelector="G"/>
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
            <NavItem key={item.id} item={item} isActive={activeIndex === index} />
          ))}
        </div>
      </nav>
    </>
  );
};