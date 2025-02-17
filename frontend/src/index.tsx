import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BackgroundProvider } from './contexts/BackgroundContext';
import { ModalProvider } from './contexts/ModalContext';

import { store } from './app/store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <BackgroundProvider>
          <App />

          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            toastStyle={{
              backgroundColor: "rgba(255, 255, 200, 0.15)",
              color: "white",
              backdropFilter: "blur(20px)",
              whiteSpace: "pre-wrap"
            }}
          />
        </BackgroundProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
