

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui-custom/MyButton";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
  };

  return (
    <Button
      className={`fixed bottom-[6rem] right-4 rounded-full p-2 outline-none transition hover:scale-95 lg:bottom-4 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
      variant={"default"}
    >
      <ChevronUp />
    </Button>
  );
};

export default ScrollToTopButton;
