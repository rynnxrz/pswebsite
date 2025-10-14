// src/components/BottomNav.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. 引入 Link 和 useLocation
import { motion } from 'framer-motion';
import { Home, User, Settings } from 'lucide-react';
import { generateDisplacementMap } from '../utils/displacementUtils';
import './BottomNav.css';

// 2. 为每个导航项添加 `to` 属性，用于定义跳转路径
const navItems = [
  { id: 'home', icon: Home, to: '/' },
  { id: 'profile', icon: User, to: '/profile' },
  { id: 'settings', icon: Settings, to: '/settings' },
];

const useDisplacementMap = (width: number, height: number, borderRadius: number) => {
  const [map, setMap] = useState('');
  useEffect(() => {
    generateDisplacementMap(width, height, borderRadius, 16).then(setMap);
  }, [width, height, borderRadius]);
  return map;
};

export const BottomNav = () => {
  // 3. 使用 useLocation 获取当前路径
  const location = useLocation();
  const currentPath = location.pathname;

  // 4. 根据当前路径动态计算出 activeIndex，不再需要 useState 和 onClick
  const activeIndex = navItems.findIndex(item => item.to === currentPath);

  const navWidth = 280;
  const navHeight = 64;
  const navBorderRadius = 32;

  const displacementMap = useDisplacementMap(navWidth, navHeight, navBorderRadius);

  return (
    <>
      <svg width="0" height="0">
        <filter id="liquid-glass-filter">
          <feImage
            href={displacementMap}
            x="0"
            y="0"
            width={navWidth}
            height={navHeight}
            result="displacement_map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacement_map"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      
      <nav className="bottom-nav-container">
        <div className="bottom-nav">
          {/* 如果有匹配的路径，才显示高亮指示器 */}
          {activeIndex !== -1 && (
            <motion.div
              className="active-indicator"
              // 5. 动画现在也由 activeIndex 驱动
              animate={{ x: `${activeIndex * 80 + 16}px` }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
          
          {navItems.map((item, index) => (
            // 6. 用 Link 组件包裹按钮来实现导航
            <Link to={item.to} key={item.id} className="nav-item-link">
              <button
                className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              >
                <item.icon size={24} />
              </button>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};