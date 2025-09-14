import API_URL from './config';
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from './components/Loader';
import Preloader from './components/Preloader';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, SetPortfolioData, ShowLoading, ReloadData, SetTheme} from './redux/rootSlice';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Admin/Login'));

function App() {
  const { loading, portfolioData, reloadData, theme } = useSelector(state => state.root);
  const dispatch = useDispatch();
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      
      // Check if we have cached data and it's not too old (5 minutes)
      const cachedData = localStorage.getItem('portfolioData');
      const cacheTime = localStorage.getItem('portfolioDataTime');
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      if (cachedData && cacheTime && (now - parseInt(cacheTime)) < fiveMinutes) {
        dispatch(SetPortfolioData(JSON.parse(cachedData)));
        dispatch(ReloadData(false));
        dispatch(HideLoading());
        return;
      }
      
      const response = await axios.get(`${API_URL}/get-portfolio-data`, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.data) {
        dispatch(SetPortfolioData(response.data));
        // Cache the data
        localStorage.setItem('portfolioData', JSON.stringify(response.data));
        localStorage.setItem('portfolioDataTime', now.toString());
        dispatch(ReloadData(false));
      }
      
      dispatch(HideLoading());
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      
      // Try to use cached data as fallback
      const cachedData = localStorage.getItem('portfolioData');
      if (cachedData) {
        console.log('Using cached data as fallback');
        dispatch(SetPortfolioData(JSON.parse(cachedData)));
        dispatch(ReloadData(false));
      }
      
      dispatch(HideLoading());
    } 
  }
  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData])

  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    dispatch(SetTheme(savedTheme));
    // Apply dark class immediately on load
    document.documentElement.classList.add('dark');
  }, [dispatch]);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
useEffect(()=>{
  if (reloadData) {
    // Clear cache when reloading
    localStorage.removeItem('portfolioData');
    localStorage.removeItem('portfolioDataTime');
    getPortfolioData();
  }
},[reloadData]);


  return (
    <BrowserRouter>
      <Preloader />
      {loading ? <Loader /> : null}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
