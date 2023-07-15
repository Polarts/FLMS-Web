import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import "rc-dock/dist/rc-dock.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import "the-new-css-reset/css/reset.css";
import App from './App';
import FilePickerProvider from './data/context/FilePickerContext';
import LayoutProvider from './data/context/LayoutContext';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FilePickerProvider>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </FilePickerProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
