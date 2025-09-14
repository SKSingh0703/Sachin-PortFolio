import React, { Suspense, lazy } from 'react'
import Header from "../../components/Header";
import { useSelector } from 'react-redux';
import { SectionSkeleton } from '../../components/Loader';

// Lazy load sections for better performance
const Intro = lazy(() => import("./intro"));
const About = lazy(() => import("./About"));
const Experience = lazy(() => import("./Experiences"));
const Projects = lazy(() => import("./Projects"));
const Footer = lazy(() => import('./Footer'));
const Education = lazy(() => import("./Education"));
const LeftSider = lazy(() => import('./LeftSider'));
const Contact = lazy(() => import('./Contact'));
function Home() {
  const {portfolioData, theme } = useSelector(state => state.root);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
        <Header />
        {portfolioData && (
          <div className='bg-primary dark:bg-primary-light px-40 sm:px-5 transition-colors duration-300 min-h-screen'>
          <Suspense fallback={<SectionSkeleton height="h-screen" />}>
            <Intro />
          </Suspense>
          <div className="py-16">
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <About />
            </Suspense>
          </div>
          <div className="py-16">
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Experience />
            </Suspense>
          </div>
          <div className="py-16">
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Projects />
            </Suspense>
          </div>
          <div className="py-16">
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Education />
            </Suspense>
          </div>
          <div className="py-16">
            <Suspense fallback={<SectionSkeleton height="h-96" />}>
              <Contact />
            </Suspense>
          </div>
          <Suspense fallback={<SectionSkeleton height="h-32" />}>
            <Footer />
          </Suspense>
          <Suspense fallback={null}>
            <LeftSider />
          </Suspense>
          </div>
        )}
    </div>
  );
}

export default Home
