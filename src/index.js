import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { ContextProvider } from './Context';
import { ContextProviderSaved } from './context/saved';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ContextProvider>
          <ContextProviderSaved>
            <App />
          </ContextProviderSaved>
        </ContextProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
