import { useEffect, useState, useCallback } from "react";

const DEBOUNCE_DELAY = 100;

const getWindowDimensions = () => {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const useDetectScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getWindowDimensions);

  const handleResize = useCallback(() => {
    setScreenSize(getWindowDimensions());
  }, []);

  useEffect(() => {
    const debouncedHandler = debounce(handleResize, DEBOUNCE_DELAY);

    window.addEventListener("resize", debouncedHandler);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", debouncedHandler);
      debouncedHandler.cancel();
    };
  }, [handleResize]);

  return screenSize;
};

const debounce = (func, delay) => {
  let timeoutId;
  const debounced = (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
};

export default useDetectScreenSize;
