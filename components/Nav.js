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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-3xl lg:hidden opacity-50 hover:opacity-100"
      >
        <svg style={{ width: "2.5rem", height: "2.5rem" }} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22 13C22 14.11 21.11 15 20 15H4C2.9 15 2 14.11 2 13S2.9 11 4 11H13L15.5 13L18 11H20C21.11 11 22 11.9 22 13M12 3C3 3 3 9 3 9H21C21 9 21 3 12 3M3 18C3 19.66 4.34 21 6 21H18C19.66 21 21 19.66 21 18V17H3V18Z"
          />
        </svg>
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
