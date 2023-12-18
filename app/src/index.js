import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SearchOptions from './components/SearchOptions';
import Flights from './components/Flights';
import { Provider } from 'react-redux';
import { store } from './redux/reduxStateStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

function App() {
  return (
    <div className='container'>
      <SearchOptions />
      <Flights />
    </div>
  )
}

reportWebVitals();