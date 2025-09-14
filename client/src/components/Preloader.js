import React, { useEffect } from 'react';

const Preloader = () => {
  useEffect(() => {
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
    fontPreload.as = 'style';
    document.head.appendChild(fontPreload);

    // Preload critical images
    const imagePreload = document.createElement('link');
    imagePreload.rel = 'preload';
    imagePreload.href = 'https://lottie.host/17e76870-dff0-4fbb-a0b3-ceb7c634473a/C1xRhbtG0t.json';
    imagePreload.as = 'fetch';
    imagePreload.crossOrigin = 'anonymous';
    document.head.appendChild(imagePreload);

    // Preload dotlottie player script
    const scriptPreload = document.createElement('link');
    scriptPreload.rel = 'preload';
    scriptPreload.href = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
    scriptPreload.as = 'script';
    document.head.appendChild(scriptPreload);

    // DNS prefetch for external domains
    const dnsPrefetch = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://unpkg.com',
      'https://lottie.host'
    ];

    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      // Remove preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.href.includes('fonts.googleapis.com') || 
            link.href.includes('lottie.host') || 
            link.href.includes('unpkg.com')) {
          link.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default Preloader;
