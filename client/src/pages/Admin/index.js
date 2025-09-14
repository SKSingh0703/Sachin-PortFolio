import React,{useEffect} from 'react'
import { Tabs } from 'antd';
import Adminintro from './Adminintro';
import AdminAbout from './AdminAbout';

import { useSelector } from 'react-redux'
import Experiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminContact from './AdminContact';

import Header2 from '../../components/Header2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetTheme, ToggleTheme } from '../../redux/rootSlice';

const { TabPane } = Tabs;
function Admin() {
    const {portfolioData, theme } = useSelector(state => state.root);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() =>{
        if (!localStorage.getItem("token")) {
            navigate(`/admin-login`);
        }
    },[]);

    useEffect(() => {
        // Initialize theme from localStorage or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        dispatch(SetTheme(savedTheme));
    }, [dispatch]);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
        <Header2 />
        
        {/* Clean navigation bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              {/* Left side - empty for now */}
              <div></div>

              {/* Right side - Theme toggle and Logout */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <button 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  onClick={() => {
                    dispatch(ToggleTheme());
                  }}
                >
                  {theme === 'dark' ? (
                    <>
                      <i className="ri-sun-line"></i>
                      <span className="hidden sm:inline">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-moon-line"></i>
                      <span className="hidden sm:inline">Dark Mode</span>
                    </>
                  )}
                </button>
                
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                
                {/* Logout to Home */}
                <button 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <i className="ri-home-line"></i>
                  <span className="hidden sm:inline">View Portfolio</span>
                </button>
                
                <button 
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  onClick={()=>{
                    localStorage.removeItem("token");
                    navigate(`/admin-login`);
                  }}
                >
                  <i className="ri-logout-box-line"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {portfolioData && 
        <div className='bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300'>
            <div className='max-w-7xl mx-auto px-6 py-8'>
                <Tabs 
                    defaultActiveKey='1'
                    className="admin-tabs-modern"
                    items={[
                        {
                            key: '1',
                            label: (
                              <span className="flex items-center space-x-2">
                                <i className="ri-user-line"></i>
                                <span>Intro</span>
                              </span>
                            ),
                            children: <Adminintro />
                        },
                        {
                            key: '2',
                            label: (
                              <span className="flex items-center space-x-2">
                                <i className="ri-information-line"></i>
                                <span>About</span>
                              </span>
                            ),
                            children: <AdminAbout />
                        },
                        {
                            key: '3',
                            label: (
                              <span className="flex items-center space-x-2">
                                <i className="ri-briefcase-line"></i>
                                <span>Experiences</span>
                              </span>
                            ),
                            children: <Experiences />
                        },
                        {
                            key: '4',
                            label: (
                              <span className="flex items-center space-x-2">
                                <i className="ri-folder-line"></i>
                                <span>Projects</span>
                              </span>
                            ),
                            children: <AdminProjects />
                        },
                        {
                            key: '5',
                            label: (
                              <span className="flex items-center space-x-2">
                                <i className="ri-contacts-line"></i>
                                <span>Contact</span>
                              </span>
                            ),
                            children: <AdminContact />
                        }
                    ]}
                />
            </div>
        </div>
        }
    </div>
  )
}

export default Admin
