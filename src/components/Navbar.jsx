import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Our Team', href: '#team' },
  { name: 'Reviews', href: '#reviews' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Handle Scroll to change Navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Initial Reveal Animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/70 backdrop-blur-xl shadow-sm py-4 border-b border-white/20'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12 lg:px-16">
          
          {/* ============================================================ */}
          {/* DESKTOP LAYOUT (> 1024px) - Split Navigation                   */}
          {/* ============================================================ */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* Left Links */}
            <nav className="flex flex-1 items-center gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-luxury-rosegold ${
                    isScrolled ? 'text-[#333]' : 'text-luxury-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Center Logo */}
            <div className="flex flex-1 justify-center">
              <a href="#" className={`text-3xl font-serif tracking-widest transition-colors duration-300 ${
                  isScrolled ? 'text-[#111]' : 'text-luxury-white'
                }`}>
                AURA<span className="text-luxury-blush">.</span>
              </a>
            </div>

            {/* Right Links & CTA */}
            <div className="flex flex-1 items-center justify-end gap-8">
              {navLinks.slice(3, 5).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-luxury-rosegold ${
                    isScrolled ? 'text-[#333]' : 'text-luxury-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button className="group relative overflow-hidden rounded-full bg-[#111] px-6 py-2.5 text-[10px] font-medium uppercase tracking-widest text-luxury-white transition-all hover:bg-luxury-rosegold">
                Book Now
              </button>
            </div>
          </div>


          {/* ============================================================ */}
          {/* TABLET LAYOUT (768px - 1024px)                                 */}
          {/* ============================================================ */}
          <div className="hidden md:flex lg:hidden w-full items-center justify-between">
            {/* Logo */}
            <a href="#" className={`text-2xl font-serif tracking-widest transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-[#111]' : 'text-luxury-white'
              }`}>
              AURA<span className="text-luxury-blush">.</span>
            </a>
            
            <div className="flex items-center gap-6">
              <button className={`group relative overflow-hidden rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
                 isScrolled || isMobileMenuOpen 
                 ? 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white' 
                 : 'border-white text-white hover:bg-white hover:text-[#111]'
              }`}>
                Book
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors ${
                  isScrolled || isMobileMenuOpen ? 'text-[#111]' : 'text-luxury-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>
          </div>


          {/* ============================================================ */}
          {/* MOBILE LAYOUT (< 768px)                                        */}
          {/* ============================================================ */}
          <div className="flex md:hidden w-full items-center justify-between">
            {/* Logo */}
            <a href="#" className={`text-2xl font-serif tracking-widest transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-[#111]' : 'text-luxury-white'
              }`}>
              AURA<span className="text-luxury-blush">.</span>
            </a>
            
            {/* Hamburger Only */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 transition-colors ${
                isScrolled || isMobileMenuOpen ? 'text-[#111]' : 'text-luxury-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* FULL SCREEN MOBILE/TABLET MENU OVERLAY (Framer Motion)         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Cinematic ease
            className="fixed inset-0 z-40 flex h-screen w-full flex-col justify-center bg-luxury-ivory px-6 md:px-12 pt-24 pb-12"
          >
            {/* Top Decoration */}
            <div className="absolute top-32 left-6 md:left-12 opacity-50">
              <Sparkles size={24} className="text-luxury-rosegold" />
            </div>

            <nav className="flex flex-col gap-6 md:gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center text-4xl md:text-6xl font-serif font-light text-[#111] transition-colors hover:text-luxury-rosegold"
                  >
                    <span className="mr-4 text-sm font-sans tracking-widest text-black/30">
                      0{i + 1}
                    </span>
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Menu Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-auto flex flex-col md:flex-row items-start md:items-center justify-between border-t border-black/10 pt-8 gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/50">Contact Us</span>
                <a href="mailto:hello@auraspa.com" className="text-sm font-medium text-[#111] hover:text-luxury-rosegold transition-colors">hello@auraspa.com</a>
                <p className="text-sm font-medium text-[#111]">+1 (555) 123-4567</p>
              </div>

              <button className="flex items-center gap-3 rounded-full bg-[#111] px-8 py-4 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-luxury-rosegold w-full md:w-auto justify-center">
                Book Appointment
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}