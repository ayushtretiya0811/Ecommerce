import React, { useEffect, useRef, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContex";
import gsap from "gsap";
import { FiPlus } from "react-icons/fi";
function Nav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { authenticate, logout } = useAuth();
  const navLinksRef = useRef(null);
  const navbarRef = useRef(null);
  const toggleRef = useRef(null);
  const linkRefs = useRef([]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);
  useEffect(() => {
    const navLinks = navLinksRef.current;
    const toggle = toggleRef.current;
    const links = linkRefs.current;

    // gsap.set(navLinks, { x: '100%', opacity: 0 });
    gsap.set(toggle, { rotation: 0 });
    gsap.set(links, { width: 0, opacity: 0, display: "none" });

    const tl = gsap.timeline({ paused: true });

    tl.to(navLinks, { x: "0%", opacity: 1, duration: 0.2, ease: "power2.out" })
      .to(toggle, { rotation: 45, duration: 0.3 }, 0)
      .to(
        links,
        {
          width: "auto",
          opacity: 1,
          duration: 0.3,
          stagger: -0.1,
          display: "inline",
        },
        0.2
      );

    const toggleNav = () => {
      tl.reversed() ? tl.play() : tl.reverse();
    };

    toggle.addEventListener("click", toggleNav);

    return () => {
      toggle.removeEventListener("click", toggleNav);
    };
  }, []);
  useEffect(() => {
    const navbar = navbarRef.current;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      if (isScrollingDown) {
        gsap.to(navbar, { yPercent: -100, duration: 0.8, ease: "power2.out" });
      } else {
        gsap.to(navbar, { yPercent: 0, duration: 0.8, ease: "power2.out" });
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  const setActive = () => {
    setIsExpanded(!isExpanded);
  };
  const userLinks = [
    { path: "/", name: "Home" },
    { path: "/cart", name: "cart" },
    { path: "/allproducts", name: "Products" },
    { path: "/", name: "Contact" },
  ];
  return (
    <>
      {/*     
      <header className=" sticky bottom-0  ">
        <nav className="flex  sm:gap-5  justify-between p-5">
          <div className="flex nav-img text-center gap-2 items-center">
            <HiBars3
              color="white"
              className={`'sm:hidden block !text-black  HiBars3 ${
                isExpanded ? "hidden" : ""
              } '`}
              size={33}
              onClick={setActive}
            />
            <h4 className=" nav-logo text-3xl text-black to-red-700 ">ECOM</h4>
          </div>
          <div
            className={`nav-item  itm    sm:flex items-center   ${
              isExpanded ? "active item-center block" : ""
            }   `}
          >
            <TfiClose
              color="white"
              size={35}
              className={` x-icon  ${isExpanded ? "block" : "hidden"}`}
              onClick={setActive}
            />
            <ul className="flex   sm:gap-6  ">
              {userLinks.map((link, index) => (
                <li key={index} className="nav-link ">
                  <Link className="nav-link" to={link.path}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-auth flex mx-1 items-center">
            <ul className="flex justify-between items-center gap-5 sm:gap-6 ">
              <>
                {
                    authenticate ? (
                      <Link to="/login">
                        <button className="  text-xs    sm:py-3 px-4" onClick={() => logout()}>Logout</button>
                      </Link>
                    ) : (
                        <>
<Link to="/register">
                  <button
                    className="px-3 py-3   text-xs  hover:text-black  sm:py-3 sm:px-4
                        "
                  >
                    Register
                  </button>
                </Link>
                <Link to="">
                  <button className="  text-xs    sm:py-3 px-4" >Login</button>
                </Link>
                        </>
                   
                    )

  
                }
                
              </>

             
            </ul>
          </div>
        </nav>
      </header> */}
      <div
        ref={navbarRef}
        className="navbar fixed z-50 top-0 w-full flex justify-between p-5 bg-white-900  backdrop-blur-sm bg-opacity-30"
      >
        <div className="logo">
          <h1 className="text-3xl text-black font-bold">E Comm</h1>
        </div>
        <div className="nav flex justify-center gap-5 items-center mx-8">
          <div className="nav-links" ref={navLinksRef}>
            <>
              {authenticate ? (
                <Link
                  to="/login"
                  onClick={() => logout()}
                  className="mx-8 text-2xl text-black"
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <button
                      className="px-3 py-3   text-xs  hover:text-black  sm:py-3 sm:px-4
                        "
                    >
                      Register
                    </button>
                  </Link>
                  <Link to="" className="mx-8 text-2xl text-black">
                    Login
                  </Link>
                </>
              )}
            </>
            <Link
            to="/"
              className="mx-8 text-2xl text-black"
              ref={(el) => (linkRefs.current[0] = el)}
            >
              Home
            </Link>
            <Link
            to="/allproducts"
              className="mx-8 text-black text-2xl"
              ref={(el) => (linkRefs.current[1] = el)}
            >
              Shop
            </Link>
            <Link
            to={"/cart"}
              className="mx-8 text-black text-2xl"
              ref={(el) => (linkRefs.current[2] = el)}
            >
              Cart
            </Link>
            <Link
              className="mx-8 text-black text-2xl"
              ref={(el) => (linkRefs.current[3] = el)}
            >
              Contact
            </Link>
          </div>
          <div className="nav-toggle" ref={toggleRef}>
            <FiPlus size={50} color="black" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
