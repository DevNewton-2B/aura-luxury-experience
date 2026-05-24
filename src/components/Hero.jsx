import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

export default function Hero() {
  const comp = useRef(null);
  const bgRef = useRef(null);
  const textWrapperRef = useRef(null);
  const floatingBadgeRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Cinematic Background Zoom Reveal
      tl.fromTo(bgRef.current, 
        { scale: 1.15, filter: "brightness(0.4)" },
        { scale: 1, filter: "brightness(0.7)", duration: 2, ease: "power3.out" }
      );

      // 2. Staggered Text Reveal (Lines masked by overflow-hidden)
      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      }, "-=1.2");

      // 3. Fade in buttons and glassmorphism elements
      tl.from(".fade-up-element", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.8");

      // 4. Continuous Floating Animation for Badges (Desktop/Tablet)
      gsap.to(floatingBadgeRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 5. Scroll Indicator Pulse
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, comp);

    return () => ctx.revert(); // Cleanup for React 18 Strict Mode
  }, []);

  return (
    <section ref={comp} className="relative h-screen w-full overflow-hidden bg-luxury-beige">
      {/* BACKGROUND ASSET */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat origin-center"
        style={{
          backgroundImage: "url('https://images.jdmagicbox.com/v2/comp/hardoi/k2/9999p5852.5852.190330075839.i1k2/catalogue/golden-door-spa-and-saloon-hardoi-ho-hardoi-body-massage-centres-ekb3i74u2e.jpg')",
        }}
      />
      
      {/* DARK GRADIENT OVERLAY FOR TEXT READABILITY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end pb-24 md:justify-center md:pb-0 px-6 sm:px-12 lg:px-16">
        
        {/* RESPONSIVE GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full pt-32">
          
          {/* TEXT CONTENT (Spans full on mobile, 8 cols tablet, 7 cols desktop) */}
          <div ref={textWrapperRef} className="col-span-1 md:col-span-8 lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left text-luxury-white">
            
            {/* Subheading */}
            <div className="overflow-hidden mb-4">
              <div className="reveal-text flex items-center gap-2 text-sm md:text-base font-light tracking-[0.3em] uppercase text-luxury-ivory">
                <Sparkles size={16} className="text-luxury-blush" />
                Premium Wellness Studio
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="flex flex-col text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-serif font-medium tracking-tight mb-6">
              <span className="overflow-hidden pb-2">
                <span className="reveal-text block">Elevate Your</span>
              </span>
              <span className="overflow-hidden pb-2">
                <span className="reveal-text block italic text-luxury-blush font-light">Natural Beauty.</span>
              </span>
            </h1>

            {/* Paragraph */}
            <p className="fade-up-element max-w-[90%] md:max-w-md lg:max-w-lg text-sm md:text-base font-light text-luxury-ivory/80 leading-relaxed mb-10">
              Immerse yourself in a sanctuary of luxury. We blend cinematic aesthetics with world-class treatments to rejuvenate your body, mind, and spirit.
            </p>

            {/* Call To Actions */}
            <div className="fade-up-element flex flex-col sm:flex-row w-full sm:w-auto gap-4 md:gap-6">
              <button className="group relative overflow-hidden rounded-full bg-luxury-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-[#333] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                <span>Book Appointment</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="group flex items-center justify-center gap-4 rounded-full border border-luxury-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-medium uppercase tracking-widest text-luxury-white transition-all hover:bg-white/10 active:scale-95">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-luxury-white/20">
                  <Play size={12} className="ml-0.5" fill="currentColor" />
                </span>
                <span>Experience Aura</span>
              </button>
            </div>
          </div>

          {/* FLOATING GLASSMORPHISM CARD (Hidden on Mobile, Visible on Tablet & Desktop) */}
          <div className="hidden md:flex col-span-4 lg:col-span-5 h-full items-center justify-end relative">
            <div 
              ref={floatingBadgeRef}
              className="fade-up-element absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-64 lg:w-72"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-luxury-blush/50">
                  <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=150" alt="Lead Stylist" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-luxury-white">Sophia Laurent</p>
                  <p className="text-xs font-light text-luxury-ivory/70">Master Aesthetician</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-luxury-ivory/80 leading-relaxed italic">
                  "Artistry meets advanced skincare in our signature treatments."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-luxury-white/60">
        <span className="text-[10px] font-light uppercase tracking-[0.2em]">Scroll to explore</span>
        <div className="flex h-12 w-[1px] bg-luxury-white/20 overflow-hidden relative">
          <div ref={scrollIndicatorRef} className="absolute top-0 left-0 h-1/2 w-full bg-luxury-white/80" />
        </div>
      </div>
    </section>
  );
}