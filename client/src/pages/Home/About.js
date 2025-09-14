import React, { Suspense, lazy, useState, useEffect } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

// Lazy Lottie component
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
    <div ref={ref} className="h-[70vh] w-full">
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
function About() {
    const { portfolioData, theme } = useSelector(state => state.root);
  const {about} = portfolioData || {};
  const {skills = [], lottieURL, description1, description2} = about || {};
  return (
    <div id="about">
        <SectionTitle title="About" />
        <div className='flex w-full items-center sm:flex-col'>
            <div className='w-1/2 sm:w-full'>
            <LazyLottie src={lottieURL} />
            </div>
            <div className='flex flex-col gap-5 w-1/2 sm:w-full'>
                <p className='text-white dark:text-gray-700'>
                    {description1 || ""}
                </p>
                <p className='text-white dark:text-gray-700'>
                    {description2 || ""}
                </p>
            </div>
            </div>
            <div className='py-5'>
                <h1 className='text-tertiary dark:text-tertiary-light text-xl'>
                    Here are some technology I am familiar with:
                </h1>
                <div className='flex flex-wrap gap-10 mt-5'>
                    {skills.map((skill,index) =>(
                        <div key={index} className='border border-tertiary dark:border-tertiary-light py-3 px-10 hover:bg-tertiary dark:hover:bg-tertiary-light hover:text-white dark:hover:text-white transition-colors duration-200'>
                            <h1 className='text-tertiary dark:text-tertiary-light'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>

        
    </div>

  )
}
  
export default About