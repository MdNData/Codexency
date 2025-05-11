import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useDetectUrl = () => {
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location]);

  return currentUrl;
};

export default useDetectUrl;
