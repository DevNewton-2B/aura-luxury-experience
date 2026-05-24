import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ZoomIn, X, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// GALLERY DATA & CATEGORIES
// ============================================================
const categories = ['All', 'Interior', 'Treatments', 'Aesthetics', 'Products'];

const galleryData = [
  { id: 1, src: 'https://cdn11.bigcommerce.com/s-7holj19jgh/images/stencil/800x500/uploaded_images/blog_thumbnail/01-2025-design-trends-banner.jpg', category: 'Interior', title: 'The Grand Foyer', aspectClass: 'aspect-[4/5]' },
  { id: 2, src: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Qm90YW5pY2FsJTIwRXh0cmFjdHN8ZW58MHx8MHx8fDA%3D', category: 'Products', title: 'Botanical Extracts', aspectClass: 'aspect-[3/2]' },
  { id: 3, src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJvbWF0aGVyYXB5fGVufDB8fDB8fHww', category: 'Treatments', title: 'Aromatherapy', aspectClass: 'aspect-square' },
  { id: 4, src: 'https://plus.unsplash.com/premium_photo-1661306458301-79601a9d2696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwc3RvbmUlMjB0aGVyYXB5fGVufDB8fDB8fHww', category: 'Treatments', title: 'Hot Stone Therapy', aspectClass: 'aspect-[4/5]' },
  { id: 5, src: 'https://images.unsplash.com/photo-1713824096348-c1956e6da321?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2lnbmF0dXJlJTIwRmFjaWFsfGVufDB8fDB8fHww', category: 'Aesthetics', title: 'Signature Facial', aspectClass: 'aspect-[3/4]' },
  { id: 6, src: 'https://images.unsplash.com/photo-1730367019960-9906d9cbbf05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmVsYXhhdGlvbiUyMExvdW5nZXxlbnwwfHwwfHx8MA%3D%3D', category: 'Interior', title: 'Relaxation Lounge', aspectClass: 'aspect-[16/9]' },
  { id: 7, src: 'https://plus.unsplash.com/premium_photo-1675018082227-b9daac6483dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8T3JnYW5pYyUyME9pbHN8ZW58MHx8MHx8fDA%3D', category: 'Products', title: 'Organic Oils', aspectClass: 'aspect-square' },
  { id: 8, src: 'https://images.unsplash.com/photo-1582576192532-06353147fcbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QnJpZGFsJTIwUHJlcGFyYXRpb258ZW58MHx8MHx8fDA%3D', category: 'Aesthetics', title: 'Bridal Preparation', aspectClass: 'aspect-[4/5]' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

  // Custom Cursor Physics (Framer Motion)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 40); // Offset by half the width of the cursor (80px / 2)
      cursorY.set(e.clientY - 40);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Filter Data Logic
  const filteredData = galleryData.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  // GSAP Initial Reveal
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".gallery-header-element", {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedImage]);

  return (
    <section 
      id="gallery" 
      ref={sectionRef} 
      className="relative w-full bg-luxury-white py-24 md:py-32 lg:py-48 overflow-hidden cursor-default"
    >
      {/* ============================================================ */}
      {/* MAGNETIC CUSTOM CURSOR (Hidden on mobile/tablet)               */}
      {/* ============================================================ */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-20 w-20 items-center justify-center rounded-full bg-[#111]/90 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md lg:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isHoveringGrid ? 1 : 0,
          scale: isHoveringGrid ? 1 : 0.2,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.3 } }}
      >
        View
      </motion.div>

      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        
        {/* ============================================================ */}
        {/* HEADER & FILTERS                                               */}
        {/* ============================================================ */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="gallery-header-element flex items-center gap-4 mb-6">
            <span className="h-[1px] w-10 bg-luxury-rosegold"></span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-luxury-rosegold font-medium">
              <Sparkles size={14} />
              The Lookbook
            </span>
            <span className="h-[1px] w-10 bg-luxury-rosegold"></span>
          </div>
          
          <h2 className="gallery-header-element text-4xl sm:text-5xl lg:text-7xl font-serif text-[#111] leading-tight mb-12 tracking-tight">
            A Glimpse into <br />
            <span className="italic font-light text-black/40">Tranquility.</span>
          </h2>

          <div className="gallery-header-element w-full max-w-3xl overflow-x-auto no-scrollbar pb-4">
            <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-4 md:gap-8 px-4 md:px-0 min-w-max md:min-w-0 mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${
                    activeFilter === category 
                      ? 'text-[#111] font-medium' 
                      : 'text-black/30 hover:text-black/60'
                  }`}
                >
                  {category}
                  {activeFilter === category && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute bottom-0 left-1/2 h-[1px] w-1/2 -translate-x-1/2 bg-[#111]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MASONRY GRID                                                   */}
        {/* ============================================================ */}
        <div 
          ref={galleryRef} 
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          onMouseEnter={() => setIsHoveringGrid(true)}
          onMouseLeave={() => setIsHoveringGrid(false)}
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className={`break-inside-avoid relative group overflow-hidden rounded-2xl bg-luxury-beige ${item.aspectClass} cursor-none lg:cursor-none`}
                onClick={() => {
                  setSelectedImage(item);
                  setIsHoveringGrid(false); // Hide custom cursor when lightbox opens
                }}
              >
                {/* Image with extreme cinematic slow zoom */}
                <div 
                  className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[3s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.src})` }}
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                
                {/* Meta Data Reveal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 translate-y-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-luxury-rosegold mb-2">
                    {item.category}
                  </p>
                  <p className="text-2xl md:text-3xl font-serif text-white">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================ */}
      {/* GOD-LEVEL LIGHTBOX                                             */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
          >
            <button 
              onClick={() => {
                setSelectedImage(null);
                setIsHoveringGrid(true); // Restore custom cursor
              }}
              className="absolute top-6 right-6 md:top-10 md:right-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-black hover:rotate-90 z-[110]"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center">
              <motion.img
                key={selectedImage.id}
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -50 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8 flex flex-col items-center text-center"
              >
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/50 mb-3">
                  <span className="h-[1px] w-6 bg-white/20"></span>
                  {selectedImage.category}
                  <span className="h-[1px] w-6 bg-white/20"></span>
                </p>
                <p className="text-4xl md:text-5xl font-serif text-white tracking-wide">
                  {selectedImage.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}