import React from 'react';
import ReactDOM from 'react-dom/client';
import './SCSS/style.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
);