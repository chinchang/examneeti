import { useEffect, useRef, useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  const [isMobile] = useState(() => {
    console.log("init", typeof window);
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    console.log(2000);
    return true;
  });

  useEffect(() => {
    function onClick(e) {
      if (navRef.current && navRef.current.contains(e.target)) {
        return;
      }
      setIsOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <nav className="flex items-center" data-open={isOpen} ref={navRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="text-3xl lg:hidden">
        🍔
      </button>

      <div
        className={`p-10 flex flex-col gap-10 bg-white border-l-2 fixed right-0 top-0 bottom-0 z-10 lg:static lg:flex-row lg:bg-transparent lg:border-0 transition-transform`}
        style={{
          transform: isMobile && !isOpen ? "translateX(100%)" : "translate(0%)",
        }}
      >
        <a href="#schedule" className="link">
          Class Schedule
        </a>
        <a href="/subscribe" className="link">
          Subscribe
        </a>
        <a href="/about" className="link">
          About Us
        </a>
      </div>
    </nav>
  );
};

export default Nav;
