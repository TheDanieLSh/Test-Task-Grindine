import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SearchOptions from './components/SearchOptions';
import Flights from './components/Flights';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='container'>
    <SearchOptions />
    <Flights />
  </div>
);

reportWebVitals();