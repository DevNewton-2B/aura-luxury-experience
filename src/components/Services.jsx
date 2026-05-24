import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Droplets, Flower2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'Signature Facial',
    description: 'A bespoke botanical treatment tailored to your skin’s unique biome. Includes deep cleansing, extraction, and a custom algae mask.',
    category: 'Skin Care',
    price: 'From $150',
    duration: '60 Min',
    image: 'https://images.unsplash.com/photo-1731514771613-991a02407132?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2Fsb29uJTIwZmFjaWFsfGVufDB8fDB8fHww',
    icon: <Sparkles size={16} />,
  },
  {
    id: '02',
    title: 'Aromatherapy Massage',
    description: 'Melt away tension with rhythmic massage techniques and a personalized blend of warm, organic essential oils.',
    category: 'Therapy',
    price: 'From $180',
    duration: '90 Min',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop',
    icon: <Flower2 size={16} />,
  },
  {
    id: '03',
    title: 'Keratin Hair Spa',
    description: 'Restore deep moisture and mirror-like shine to your hair with our advanced molecular repair treatment and scalp massage.',
    category: 'Hair Care',
    price: 'From $120',
    duration: '45 Min',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2939&auto=format&fit=crop',
    icon: <Droplets size={16} />,
  },
  {
    id: '04',
    title: 'Bridal Radiance',
    description: 'Comprehensive hair and makeup styling for your special day, focusing on enhancing your natural, luminous beauty.',
    category: 'Makeup',
    price: 'From $350',
    duration: '180 Min',
    image: 'https://plus.unsplash.com/premium_photo-1724762178439-1f93ad3f3cb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJpZGFsJTIwbWFrZXVwfGVufDB8fDB8fHww',
    icon: <Sparkles size={16} />,
  },
  {
    id: '05',
    title: 'Hot Stone Ritual',
    description: 'Smooth, heated basalt stones are placed on key energy points to deeply warm and relax muscles, improving circulation.',
    category: 'Therapy',
    price: 'From $200',
    duration: '90 Min',
    image: 'https://images.unsplash.com/photo-1696841212541-449ca29397cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8SG90JTIwU3RvbmUlMjBNYXNzYWdlfGVufDB8fDB8fHww',
    icon: <Flower2 size={16} />,
  },
  {
    id: '06',
    title: 'Gel & Art Manicure',
    description: 'High-end nail shaping, cuticle care, and long-lasting non-toxic gel application with intricate, minimalist nail art.',
    category: 'Nail Care',
    price: 'From $85',
    duration: '60 Min',
    image: 'https://plus.unsplash.com/premium_photo-1677434622171-d16ca1e6f6c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2VsJTIwYXJ0JTIwYW5kJTIwbWFuaWN1cmV8ZW58MHx8MHx8fDA%3D',
    icon: <Droplets size={16} />,
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.from(".service-header-item", {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Cascading Card Stagger
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers individually as each card enters the viewport
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative w-full bg-luxury-ivory py-24 md:py-32 lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================ */}
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="service-header-item flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-luxury-rosegold"></span>
              <span className="text-xs uppercase tracking-[0.3em] text-luxury-rosegold font-medium">
                Curated Wellness
              </span>
            </div>
            <h2 className="service-header-item text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111] leading-tight mb-6">
              Elevate your rituals <br className="hidden md:block" />
              <span className="italic font-light text-black/60">with our signature services.</span>
            </h2>
          </div>
          <div className="service-header-item pb-2">
            <button className="group flex items-center gap-2 border-b border-[#111] pb-1 text-sm font-medium uppercase tracking-widest text-[#111] transition-all hover:text-luxury-rosegold hover:border-luxury-rosegold">
              View Full Menu
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SERVICES GRID                                                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-0">
          {servicesData.map((service, index) => {
            
            // For desktop, push the middle column down by 4rem (16 in tailwind) for an editorial staggered look
            const isMiddleColumn = index % 3 === 1;
            const staggeredClass = isMiddleColumn ? "lg:mt-24" : "lg:mb-24";

            return (
              <div 
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group relative flex flex-col w-full h-[500px] sm:h-[550px] lg:h-[600px] overflow-hidden rounded-3xl ${staggeredClass} cursor-pointer shadow-lg shadow-black/5`}
              >
                {/* 1. Background Image with Slow Cinematic Scale on Hover */}
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                </div>

                {/* 2. Gradient Overlay (Darkens on hover for better text readability) */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black/90 group-hover:via-black/40" />

                {/* 3. Top Badges */}
                <div className="relative z-20 flex w-full justify-between p-6 md:p-8">
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md border border-white/20">
                    <span className="text-luxury-white">{service.icon}</span>
                    <span className="text-xs font-medium tracking-wider text-luxury-white">{service.category}</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-luxury-white opacity-0 transition-all duration-500 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* 4. Bottom Content Area */}
                <div className="relative z-20 mt-auto flex flex-col p-6 md:p-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:translate-y-16 lg:group-hover:translate-y-0">
                  
                  {/* Title & Number */}
                  <div className="flex items-end justify-between gap-4 mb-2">
                    <h3 className="text-2xl md:text-3xl font-serif text-luxury-white leading-tight">
                      {service.title}
                    </h3>
                    <span className="text-lg font-light italic text-luxury-rosegold">
                      {service.id}
                    </span>
                  </div>

                  {/* Price & Duration (Always visible) */}
                  <div className="flex items-center gap-4 mb-4 text-xs tracking-widest uppercase text-luxury-white/70">
                    <span>{service.duration}</span>
                    <span className="h-1 w-1 rounded-full bg-luxury-rosegold"></span>
                    <span>{service.price}</span>
                  </div>

                  {/* Description (Reveals on Desktop Hover, Always visible on Mobile/Tablet) */}
                  <p className="text-sm font-light text-luxury-white/80 leading-relaxed mb-6 lg:opacity-0 lg:transition-opacity lg:duration-700 lg:delay-100 lg:group-hover:opacity-100">
                    {service.description}
                  </p>

                  {/* Hidden Mobile/Tablet Action Button (Simulates the hover click) */}
                  <button className="lg:hidden w-full rounded-full bg-white/10 border border-white/20 backdrop-blur-md py-3 text-xs uppercase tracking-widest text-white mt-auto active:bg-white/30 transition-colors">
                    Explore Treatment
                  </button>
                </div>

                {/* Subtle inner border for premium glass feel */}
                <div className="absolute inset-0 z-30 rounded-3xl border border-white/10 pointer-events-none transition-colors duration-500 group-hover:border-white/30" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}