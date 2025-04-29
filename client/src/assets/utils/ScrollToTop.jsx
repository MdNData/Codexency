import React, {
  useLayoutEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";

const ScrollContext = createContext({
  scrollToTop: () => {},
});

export function ScrollProvider({ children }) {
  const { pathname } = useLocation();

  const scrollToTop = useCallback((options = { behavior: "smooth" }) => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, ...options });
    }
  }, []);

  useLayoutEffect(() => {
    scrollToTop({ behavior: "auto" });
  }, [pathname, scrollToTop]);

  return (
    <ScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollToTop() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error(
      "useScrollToTop deve essere usato all'interno di ScrollProvider"
    );
  }
  return context.scrollToTop;
}
