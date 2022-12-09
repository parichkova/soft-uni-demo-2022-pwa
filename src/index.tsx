import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import * as serviceWorkerRegistration from './service-worker-registration';

import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.registerServiceWorker();
