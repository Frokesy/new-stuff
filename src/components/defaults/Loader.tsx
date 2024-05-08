import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const Loader = () => {
  const loaderChildRef = useRef(null);
  useEffect(() => {
    const loaderAnimation = gsap.timeline({
      repeat: -1,
      defaults: { duration: 0.5 },
      yoyo: true,
      ease: "easeIn",
    });
    loaderAnimation.fromTo(
      ".child",
      { opacity: "0.9" },
      { opacity: "0.4", stagger: 0.25 }
    );
  }, []);
  return (
    <div className="flex space-x-2" ref={loaderChildRef}>
      <div className="child bg-grey-300 p-1.5 rounded-full bg-[#fff]"></div>
      <div className="child bg-grey-300 p-1.5 rounded-full bg-[#fff]"></div>
      <div className="child bg-grey-300 p-1.5 rounded-full bg-[#fff]"></div>
    </div>
  );
};

export default Loader;
