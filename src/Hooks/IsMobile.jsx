import { useState, useEffect } from "react";

const IsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod|windows phone/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  return isMobile;
};

export default IsMobile;
