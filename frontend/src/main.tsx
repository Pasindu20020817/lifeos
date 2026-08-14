// React StrictMode helps detect potential problems
// during development.
import { StrictMode } from "react";

// ReactDOM renders React into the browser DOM.
import { createRoot } from "react-dom/client";

// BrowserRouter enables frontend URL routing.
import { BrowserRouter } from "react-router-dom";

// Main LifeOS application component.
import App from "./App";

// Global CSS styles.
import "./index.css";

/**
 * Find the HTML element with id="root"
 * and render our React application inside it.
 */
createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>

    {/*
      BrowserRouter allows URLs such as:
      /login
      /register
      /dashboard
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </StrictMode>
);