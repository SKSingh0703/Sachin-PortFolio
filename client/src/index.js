// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import store from './redux/store';
// import { Provider } from 'react-redux';
// import { createRoot } from 'react-dom';
// import { DatePicker } from 'antd';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store} >
//     <App />
//   </Provider>
// );

// reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom'; // Correct import for ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import { DatePicker } from 'antd';

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App wrapped in the Provider for Redux store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Call reportWebVitals function
reportWebVitals();

