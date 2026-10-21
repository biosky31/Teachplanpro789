import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker for offline capability & mobile installation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('PWA Service Worker active with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('PWA Service Worker registration notice:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
