import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react'; // Ensure Lenis context is accessible for the back-to-top feature

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// CUSTOM INLINE BRAND ICONS
// ============================================================
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const PinterestIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="12" x2="12" y2="22"></line>
    <path d="M12 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
    <path d="M12 22s-2.5-4-5-8"></path>
  </svg>
);

export default function Footer() {
  const footerRef = useRef(null);
  
  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered reveal for all footer elements
      gsap.from(".footer-element", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Triggers when the top of the footer is 85% down the viewport
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Giant Watermark Parallax Effect
      gsap.fromTo(".footer-watermark", 
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 0.05, // Stays extremely faint
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1, // Ties the reveal directly to scroll wheel
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Back to top function using Lenis
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Lenis automatically intercepts this for smooth physics
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[#0a0a0a] text-white overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-6 lg:pb-8"
    >
      {/* Subtle Glow Overlays */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-rosegold/5 blur-[150px] pointer-events-none" />
      
      <div className="mx-auto max-w-[90rem] px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* ============================================================ */}
        {/* TOP ROW: NEWSLETTER & BRAND INTRO                              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24 border-b border-white/10 pb-20">
          
          {/* Brand Intro (Left on Desktop, spans 5 cols) */}
          <div className="footer-element col-span-1 lg:col-span-5 flex flex-col pr-0 lg:pr-12">
            <a href="#" className="text-4xl font-serif tracking-widest text-white mb-6 inline-block">
              AURA<span className="text-luxury-blush">.</span>
            </a>
            <p className="text-sm font-light text-white/50 leading-relaxed max-w-sm mb-10">
              A sanctuary designed for the modern soul. Experience the pinnacle of holistic wellness and aesthetic artistry in an environment of uncompromising luxury.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-luxury-rosegold hover:border-luxury-rosegold hover:text-white">
                <InstagramIcon />
              </a>
              <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-luxury-rosegold hover:border-luxury-rosegold hover:text-white">
                <FacebookIcon />
              </a>
              <a href="#" className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-luxury-rosegold hover:border-luxury-rosegold hover:text-white">
                <PinterestIcon />
              </a>
            </div>
          </div>

          {/* Spacer for Desktop Layout */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Newsletter (Right on Desktop, spans 6 cols) */}
          <div className="footer-element col-span-1 lg:col-span-6 flex flex-col justify-center">
            <h4 className="text-sm uppercase tracking-[0.3em] text-luxury-rosegold mb-4 font-medium">
              Join the Inner Circle
            </h4>
            <p className="text-2xl md:text-3xl font-serif text-white mb-8 leading-snug max-w-lg">
              Subscribe to receive exclusive invitations and wellness insights.
            </p>

            <form className="relative w-full max-w-md group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                className="w-full bg-transparent border-b border-white/30 py-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-luxury-rosegold transition-colors peer"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/50 transition-colors hover:text-luxury-rosegold peer-focus:text-luxury-rosegold"
              >
                <ArrowRight size={20} strokeWidth={1.5} />
              </button>
              {/* Focus Line Animation */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-luxury-rosegold transition-all duration-500 ease-out peer-focus:w-full" />
            </form>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE ROW: EDITORIAL LINKS GRID                               */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Contact Details */}
          <div className="footer-element col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 flex flex-col">
            <h5 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-8">Contact Us</h5>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4 text-sm font-light text-white/70">
                <MapPin size={18} className="text-luxury-rosegold shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  124 Luxury Avenue,<br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-4 text-sm font-light text-white/70 hover:text-luxury-rosegold transition-colors cursor-pointer">
                <Phone size={18} className="text-luxury-rosegold shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 text-sm font-light text-white/70 hover:text-luxury-rosegold transition-colors cursor-pointer">
                <Mail size={18} className="text-luxury-rosegold shrink-0" />
                <span>concierge@auraspa.com</span>
              </li>
            </ul>
          </div>

          {/* Links Column 1 */}
          <div className="footer-element col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-3 lg:col-start-6 flex flex-col">
            <h5 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-8">Explore</h5>
            <ul className="flex flex-col gap-4">
              {['Home', 'Our Story', 'The Team', 'Gallery', 'Testimonials'].map((link) => (
                <li key={link}>
                  <a href="#" className="group relative inline-block text-sm font-light text-white/70 transition-colors hover:text-white">
                    <span className="relative z-10">{link}</span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-luxury-rosegold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="footer-element col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-4 flex flex-col">
            <h5 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-8">Services</h5>
            <ul className="flex flex-col gap-4">
              {['Signature Facials', 'Massage Therapy', 'Hair Styling & Spa', 'Nail Artistry', 'Bridal Packages'].map((link) => (
                <li key={link}>
                  <a href="#" className="group relative inline-block text-sm font-light text-white/70 transition-colors hover:text-white">
                    <span className="relative z-10">{link}</span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-luxury-rosegold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* ============================================================ */}
        {/* BOTTOM ROW: COPYRIGHT & BACK TO TOP                            */}
        {/* ============================================================ */}
        <div className="footer-element flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 pb-12 z-20 relative">
          <p className="text-[10px] sm:text-xs tracking-widest uppercase text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Aura Luxury Spa. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] sm:text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] sm:text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-transparent transition-all hover:border-luxury-rosegold hover:bg-luxury-rosegold"
          >
            <ArrowUp size={16} className="text-white transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

      </div>

      {/* ============================================================ */}
      {/* GIANT CINEMATIC WATERMARK LOGO                                 */}
      {/* ============================================================ */}
      <div className="footer-watermark absolute bottom-[-4vw] left-0 w-full flex justify-center overflow-hidden pointer-events-none select-none z-0">
        <h1 className="text-[15vw] leading-none font-serif font-bold text-white whitespace-nowrap opacity-[0.03]">
          A U R A
        </h1>
      </div>
    </footer>
  );
}