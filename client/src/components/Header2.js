import React from 'react';
import { useSelector } from 'react-redux';

function Header2() {
  const { theme } = useSelector(state => state.root);
  
  return (
    <div className="relative">
      {/* Modern gradient background */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-primary dark:from-primary-light dark:via-primary dark:to-primary-light transition-all duration-300">
        <div className="absolute inset-0 bg-black/10 dark:bg-white/5"></div>
        
        {/* Main header content */}
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Logo section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-secondary dark:bg-secondary-light rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white dark:text-gray-800 text-2xl font-bold">S</span>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-primary dark:text-primary-light text-2xl font-bold">K</span>
                </div>
                <div className="w-12 h-12 bg-tertiary dark:bg-tertiary-light rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white dark:text-gray-800 text-2xl font-bold">S</span>
                </div>
              </div>
              
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-white dark:text-gray-800">Portfolio Admin</h1>
                <p className="text-white/80 dark:text-gray-600 text-sm">Manage your portfolio content</p>
              </div>
            </div>

            {/* User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 text-white/90 dark:text-gray-700">
                <div className="w-8 h-8 bg-white/20 dark:bg-gray-600/30 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-sm"></i>
                </div>
                <span className="text-sm font-medium">Admin</span>
              </div>
              
              <div className="w-px h-8 bg-white/20 dark:bg-gray-600/30"></div>
              
              <button className="flex items-center space-x-2 text-white/90 dark:text-gray-700 hover:text-white dark:hover:text-gray-800 transition-colors duration-200 group">
                <i className="ri-settings-3-line text-lg group-hover:rotate-90 transition-transform duration-200"></i>
                <span className="hidden sm:block text-sm font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header2