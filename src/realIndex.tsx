import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

import "antd/dist/antd.css"

const container = document.getElementById("appRoot");
const root = createRoot(container!);

root.render(
  <StrictMode>
      <App />
  </StrictMode>,
);
