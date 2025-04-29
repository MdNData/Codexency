import { createContext, useContext } from "react";
import useDetectScreenSize from "./assets/hooks/useDetectScreenSize";

export const ScreenSizeContext = createContext(null);

export const ScreenSizeProvider = ({ children }) => {
  const screenSize = useDetectScreenSize();

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
