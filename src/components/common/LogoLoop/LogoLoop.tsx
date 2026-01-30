import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

const toCssLength = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement>[], dependencies: any[]) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [callback, elements, ...dependencies]);
};

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  href?: string;
  title?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, index: number) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  hoverSpeed = 0,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className = '',
  style
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [isHovering, setIsHovering] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  
  const isVertical = direction === 'up' || direction === 'down';
  const isReverse = direction === 'right' || direction === 'down';

  // Smooth speed transition
  useEffect(() => {
    let rafId: number;
    const targetSpeed = isHovering ? hoverSpeed : speed;
    
    const updateSpeed = () => {
      const diff = targetSpeed - currentSpeed;
      if (Math.abs(diff) < 0.1) {
        setCurrentSpeed(targetSpeed);
      } else {
        setCurrentSpeed(prev => prev + diff * ANIMATION_CONFIG.SMOOTH_TAU);
        rafId = requestAnimationFrame(updateSpeed);
      }
    };
    
    rafId = requestAnimationFrame(updateSpeed);
    return () => cancelAnimationFrame(rafId);
  }, [isHovering, hoverSpeed, speed, currentSpeed]);

  // Calculate needed copies
  const calculateCopies = useCallback(() => {
    if (!containerRef.current || !innerRef.current) return;
    
    const containerSize = isVertical 
      ? containerRef.current.clientHeight 
      : containerRef.current.clientWidth;
    const contentSize = isVertical 
      ? innerRef.current.scrollHeight / copies 
      : innerRef.current.scrollWidth / copies;

    if (contentSize === 0) return;

    const needed = Math.ceil(containerSize / contentSize) + ANIMATION_CONFIG.COPY_HEADROOM;
    setCopies(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
  }, [isVertical, copies]);

  useResizeObserver(calculateCopies, [containerRef, innerRef], [logos]);

  const logoItems = useMemo(() => {
    const items = logos.map((logo, index) => (
      <div 
        key={index} 
        className={`logo-item ${scaleOnHover ? 'scale-on-hover' : ''}`}
        style={{ 
          height: toCssLength(logoHeight),
          marginRight: isVertical ? 0 : toCssLength(gap),
          marginBottom: isVertical ? toCssLength(gap) : 0
        }}
      >
        {renderItem ? renderItem(logo, index) : (
          logo.href ? (
            <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.title || logo.alt}>
              {logo.node || <img src={logo.src} alt={logo.alt} style={{ height: '100%', width: 'auto' }} />}
            </a>
          ) : (
            logo.node || <img src={logo.src} alt={logo.alt} style={{ height: '100%', width: 'auto' }} />
          )
        )}
      </div>
    ));
    return Array(copies).fill(items).flat();
  }, [logos, copies, logoHeight, gap, isVertical, scaleOnHover, renderItem]);

  const animationStyle = useMemo(() => ({
    '--speed': `${Math.abs(currentSpeed)}px`,
    '--direction': isReverse ? 'reverse' : 'normal',
    '--play-state': currentSpeed === 0 ? 'paused' : 'running'
  } as React.CSSProperties), [currentSpeed, isReverse]);

  return (
    <div 
      ref={containerRef}
      className={`logo-loop-container ${className}`}
      style={{ 
        width: toCssLength(width),
        height: isVertical ? '100%' : toCssLength(logoHeight * 2), // Ensure enough height
        ...style 
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="region"
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div 
            className={`fade-overlay fade-start ${isVertical ? 'vertical' : 'horizontal'}`} 
            style={{ background: `linear-gradient(${isVertical ? 'to bottom' : 'to right'}, ${fadeOutColor || 'var(--background)'}, transparent)` }}
          />
          <div 
            className={`fade-overlay fade-end ${isVertical ? 'vertical' : 'horizontal'}`}
            style={{ background: `linear-gradient(${isVertical ? 'to top' : 'to left'}, ${fadeOutColor || 'var(--background)'}, transparent)` }}
          />
        </>
      )}
      
      <div 
        ref={innerRef}
        className={`logo-track ${isVertical ? 'vertical' : 'horizontal'}`}
        style={animationStyle}
      >
        {logoItems}
      </div>
    </div>
  );
});

export default LogoLoop;
