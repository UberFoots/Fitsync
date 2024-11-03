import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { NutritionalProvider } from './components/dashboard/NutritionalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NutritionalProvider>
        <App />
      </NutritionalProvider>
    </BrowserRouter>
  </React.StrictMode>,
);