import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { ScreenSizeProvider } from "./context.jsx";

function LoadingManager() {
  useEffect(() => {
    const loader = document.getElementById("first-loading-container");

    const handleTransitionEnd = () => {
      loader?.remove();
    };

    if (loader) {
      loader.style.opacity = "0";

      void loader.offsetWidth;

      loader.addEventListener("transitionend", handleTransitionEnd);
      const timeout = setTimeout(handleTransitionEnd, 1200);

      return () => {
        loader.removeEventListener("transitionend", handleTransitionEnd);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <React.Fragment>
      <ScreenSizeProvider>
        <App />
      </ScreenSizeProvider>
    </React.Fragment>
  );
}

createRoot(document.getElementById("root")).render(<LoadingManager />);
