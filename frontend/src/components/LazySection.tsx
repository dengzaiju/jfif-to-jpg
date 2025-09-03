import React, { useState, useEffect, useRef } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
  placeholder?: React.ReactNode;
}

export const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  threshold = 0.1, 
  className = '',
  placeholder = null 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, isLoaded]);

  if (!isVisible) {
    return (
      <div ref={ref} className={className}>
        {placeholder || (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-100 rounded"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}; 