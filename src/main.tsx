import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "antd/dist/reset.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-tabs/style/react-tabs.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
