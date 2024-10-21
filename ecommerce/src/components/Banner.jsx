import React, { useEffect, useRef } from 'react'
import video from '../assets/hero.mp4'
import { gsap } from 'gsap';
import Layout from '../layout/Layout';
function Banner() {
    
  const yellowScreenRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(videoRef.current, { opacity: 0});
    gsap.set('.final-yellow-screen', { y: '100%' });
    gsap.set(textRef.current, { color: "black" });
    // Animation sequence
    tl.to(yellowScreenRef.current, { yPercent: -100, duration: 1,  ease: "power2.inOut" })
      .to(videoRef.current, { opacity: 1, duration: 1.8,ease: "power4.out",  }, "-=0.5")
      .to(textRef.current, { color: "white", duration: 0.4  , ease: "power2.inOut"}, "<")
      // .to(videoRef.current, { yPercent: -100, duration: 0.5  , ease: "power2.inOut" }, "+=1")
      .to(videoRef.current, { opacity: 0, duration: 0.5,  ease: "power2.inOut"  }, )
      .to('.final-yellow-screen', { yPercent: -100, duration: 0.6 , ease: "power2.inOut"}, "-=0.5")
      .to(textRef.current, { color: "black", duration: 0.5  , ease: "power2.inOut"}, "<")
      // .set(".final-yellow-screen", { zIndex: 0 }); 
  }, []);
  return (
<>


<div  data-scroll data-scroll-speed="-0.8" data-scroll-section className="relative h-screen overflow-hidden">
      <div ref={yellowScreenRef} className="absolute inset-0 banner  z-10"></div>
      
      <div ref={videoRef} className="absolute inset-0 z-20">
        <video src={video} autoPlay loop muted className="w-full h-full object-cover"></video>
      </div>
      
      <div className="final-yellow-screen banner absolute inset-0  z-30"></div>
      
      <div className="absolute inset-0 flex items-center justify-center z-40">
        <h1 ref={textRef} className="text-3xl main-text text-center capitalize   md:w-[70%]">
          Welcome to our Ecommerce website with incredible items for your shopping
        </h1>
      </div>
    </div>

</>
  )
}

export default Banner