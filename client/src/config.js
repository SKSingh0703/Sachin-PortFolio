const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/api/portfolio' // or whatever your local backend URL is
  : 'https://sachin-portfolio-backend.onrender.com/api/portfolio';

export default API_URL;

