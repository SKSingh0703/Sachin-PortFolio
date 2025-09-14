import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = '/placeholder-image.png',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, inView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (inView && src) {
      const img = new Image();
      img.onload = () => setImageSrc(src);
      img.onerror = () => setImageSrc(fallback);
      img.src = src;
    }
  }, [inView, src, fallback]);

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default LazyImage;
