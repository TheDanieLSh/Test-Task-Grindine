import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SearchOptions from './components/SearchOptions';
import Flights from './components/Flights';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/reduxStateStore';
import { fetchFlights } from './redux/fetchDataReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchFlights())
  // }, [dispatch])

  return (
    <div>
      <SearchOptions />
      <Flights sorting='' filters='' priceFrom='' priceTo='' companies='' />
    </div>
  )
}

reportWebVitals();