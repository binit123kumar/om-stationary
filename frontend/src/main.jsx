import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './account-pages.css';
import './responsive.css';

createRoot(document.getElementById('root')).render(<App/>);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.error('OM Stationary offline support could not be enabled.', error);
    });
  });
}
