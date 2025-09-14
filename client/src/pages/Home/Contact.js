import React, { useState, useEffect } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from "react-redux";

// Lazy Lottie component for Contact
const LazyLottie = ({ src, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      // Load the dotlottie-player script if not already loaded
      if (!window.customElements.get('dotlottie-player')) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
      } else {
        setIsLoaded(true);
      }
    }
  }, [isInView, src]);

  return (
    <div ref={ref} className="h-[400px] w-full">
      {isInView && isLoaded ? (
        <dotlottie-player 
          src={src} 
          background="transparent" 
          speed="1" 
          autoplay
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500">Loading animation...</div>
        </div>
      )}
    </div>
  );
};
function Contact() {
  
  const {portfolioData, theme } = useSelector(state => state.root);
  const {contact = {}} = portfolioData || {};
                                 
    return (
        <div id="contact">
            <SectionTitle title="Say Hello " />
            <div className='flex items-center justify-between sm:flex-col gap-8'>
                <div className='flex flex-col gap-6 max-w-md'>
                    <div className='bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-gray-700 shadow-xl'>
                        <h3 className='text-xl font-semibold text-gray-800 dark:text-white mb-4'>Get In Touch</h3>
                        
                        {/* Essential Contact Info Only */}
                        <div className='space-y-3'>
                            {contact.name && (
                                <div className='flex items-center gap-3'>
                                    <i className='ri-user-line text-tertiary dark:text-tertiary-light text-lg'></i>
                                    <span className='text-gray-700 dark:text-gray-300'>{contact.name}</span>
                                </div>
                            )}
                            
                            {contact.email && (
                                <div className='flex items-center gap-3'>
                                    <i className='ri-mail-line text-tertiary dark:text-tertiary-light text-lg'></i>
                                    <a 
                                        href={`mailto:${contact.email}`}
                                        className='text-tertiary dark:text-tertiary-light hover:text-tertiary-light dark:hover:text-tertiary transition-colors duration-200'
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                            )}
                            
                            {contact.phone && (
                                <div className='flex items-center gap-3'>
                                    <i className='ri-phone-line text-tertiary dark:text-tertiary-light text-lg'></i>
                                    <a 
                                        href={`tel:${contact.phone}`}
                                        className='text-tertiary dark:text-tertiary-light hover:text-tertiary-light dark:hover:text-tertiary transition-colors duration-200'
                                    >
                                        {contact.phone}
                                    </a>
                                </div>
                            )}
                            
                            {contact.address && (
                                <div className='flex items-center gap-3'>
                                    <i className='ri-map-pin-line text-tertiary dark:text-tertiary-light text-lg'></i>
                                    <span className='text-gray-700 dark:text-gray-300'>{contact.address}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className='mt-6 pt-4 border-t border-emerald-200 dark:border-gray-600'>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Feel free to reach out for any opportunities or just to say hello!
                            </p>
                        </div>
                    </div>
                </div>
                <LazyLottie src="https://lottie.host/17e76870-dff0-4fbb-a0b3-ceb7c634473a/C1xRhbtG0t.json" />
            </div>
        </div>
    )
}

export default Contact