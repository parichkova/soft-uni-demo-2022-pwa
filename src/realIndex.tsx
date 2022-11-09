import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import "antd/dist/antd.css";

const mount = (element: Element) => {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

if (process.env.NODE_ENV === 'development') {
  const rootElement = document.getElementById('addProductAppRoot');

  if (rootElement) {
    mount(rootElement)
  }
}

export { mount };
