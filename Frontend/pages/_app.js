import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker.register('/service-worker.js').catch(() => {});
      };
      if (document.readyState === 'complete') register();
      else window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
