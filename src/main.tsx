import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress AppSignal and other external service errors in console
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filter out AppSignal and other known external service errors
  const message = args.join(' ');
  if (
    message.includes('appsignal-endpoint.net') ||
    message.includes('CORS policy') ||
    message.includes('Failed to fetch') ||
    message.includes('429 (Too Many Requests)')
  ) {
    return; // Suppress these specific errors
  }
  originalConsoleError.apply(console, args);
};

// Also suppress network errors in the global error handler
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason?.message || '';
  if (
    message.includes('appsignal-endpoint.net') ||
    message.includes('Failed to fetch') ||
    message.includes('CORS')
  ) {
    event.preventDefault(); // Prevent the error from being logged
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
