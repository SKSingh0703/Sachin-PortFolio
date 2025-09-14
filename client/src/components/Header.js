import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ToggleTheme } from '../redux/rootSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.root);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const handleThemeToggle = () => {
    dispatch(ToggleTheme());
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when screen size changes to mobile or larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // sm breakpoint (640px)
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={mobileMenuRef}>
      <div className={`navbar bg-primary dark:bg-primary-light shadow-lg border-b border-tertiary/20 dark:border-tertiary-light/20 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-tertiary dark:text-tertiary-light text-2xl font-bold tracking-wide">
            Portfolio
          </div>
          
          {/* Desktop Navigation - Show on mobile and larger */}
          <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="nav-link text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-colors duration-200 text-sm md:text-base"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="nav-link text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-colors duration-200 text-sm md:text-base"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-colors duration-200 text-sm md:text-base"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-colors duration-200 text-sm md:text-base"
            >
              Contact
            </button>
            <button
              onClick={handleThemeToggle}
              className="text-tertiary dark:text-tertiary-light text-xl p-2 hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 rounded-lg transition-colors duration-200"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <i className="ri-sun-line"></i>
              ) : (
                <i className="ri-moon-line"></i>
              )}
            </button>
            <button
              onClick={() => navigate(`/admin-login`)}
              className="bg-tertiary dark:bg-tertiary-light text-primary dark:text-primary-light px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-tertiary-light dark:hover:bg-tertiary hover:text-white dark:hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg text-sm md:text-base"
            >
              Login
            </button>
          </nav>

          {/* Mobile Menu Button - Show only on very small screens */}
          <div className="hidden max-sm:flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className="text-tertiary dark:text-tertiary-light text-xl p-2 hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 rounded-lg transition-colors duration-200"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <i className="ri-sun-line"></i>
              ) : (
                <i className="ri-moon-line"></i>
              )}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-tertiary dark:text-tertiary-light text-2xl p-2 hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <i className="ri-close-line"></i>
              ) : (
                <i className="ri-menu-line"></i>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Show only on very small screens */}
        {isMobileMenuOpen && (
          <div className="max-sm:block hidden mobile-menu bg-primary dark:bg-primary-light border-t border-tertiary/20 dark:border-tertiary-light/20 shadow-lg animate-in slide-in-from-top-2 duration-300">
            <div className="px-6 py-4 space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 hover:scale-105 transform"
              >
                <i className="ri-home-line mr-3"></i>
                Home
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 hover:scale-105 transform"
              >
                <i className="ri-folder-line mr-3"></i>
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 hover:scale-105 transform"
              >
                <i className="ri-information-line mr-3"></i>
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-tertiary dark:text-tertiary-light hover:text-white dark:hover:text-gray-800 font-medium transition-all duration-200 py-3 px-4 rounded-lg hover:bg-tertiary/10 dark:hover:bg-tertiary-light/10 hover:scale-105 transform"
              >
                <i className="ri-contacts-line mr-3"></i>
                Contact
              </button>
              <div className="pt-4 border-t border-tertiary/20 dark:border-tertiary-light/20">
                <button
                  onClick={() => navigate(`/admin-login`)}
                  className="w-full bg-tertiary dark:bg-tertiary-light text-primary dark:text-primary-light px-6 py-3 rounded-lg font-semibold hover:bg-tertiary-light dark:hover:bg-tertiary hover:text-white dark:hover:text-white transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <i className="ri-login-box-line mr-2"></i>
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
