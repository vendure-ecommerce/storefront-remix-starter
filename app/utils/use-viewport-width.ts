import { useState, useEffect } from "react";

export function useViewportWidth(): number {
  const [width, setWidth] = useState<number>(1024); // Initialize with 0 or any default value

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth); // Set initial width
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return width;
};
