
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

async function loadPolyfills() {
  // @ts-expect-error: PLATFORM is injected via HTML for platform detection
  const platform = window.PLATFORM;
  if (platform === 'tizen') {
    await import('./polyfills/tizen.js');
  } else if (platform === 'webos') {
    await import('./polyfills/webos.js');
  } else if (platform === 'vidaa') {
    await import('./polyfills/vidaa.js');
  }
}

loadPolyfills().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
