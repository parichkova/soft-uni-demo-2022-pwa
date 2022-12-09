import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import * as serviceWorkerRegistration from './service-worker-registration';

import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={location.protocol.includes('https') ? '/soft-uni-demo-2022-pwa' :'/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.registerServiceWorker();
