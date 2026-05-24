import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Plus } from 'lucide-react'; // Removed the missing brand icons

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// CUSTOM INLINE BRAND ICONS (Matches Lucide Aesthetic)
// ============================================================
const InstagramIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// ============================================================
// TEAM DATA
// ============================================================
const teamData = [
  {
    id: '01',
    name: 'Sophia Laurent',
    role: 'Creative Director & Master Stylist',
    bio: 'With over 15 years in high-fashion editorial styling, Sophia brings runway-level artistry to every client’s unique aesthetic.',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2960&auto=format&fit=crop',
    socials: [
      { name: 'Instagram', icon: <InstagramIcon size={14} />, href: '#' },
      { name: 'Twitter', icon: <TwitterIcon size={14} />, href: '#' },
    ]
  },
  {
    id: '02',
    name: 'Isabella Cruz',
    role: 'Lead Aesthetician',
    bio: 'Isabella specializes in holistic skincare and botanical treatments, ensuring your skin achieves its most natural, radiant glow.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop',
    socials: [
      { name: 'Instagram', icon: <InstagramIcon size={14} />, href: '#' },
      { name: 'Linkedin', icon: <LinkedinIcon size={14} />, href: '#' },
    ]
  },
  {
    id: '03',
    name: 'Julian Hayes',
    role: 'Wellness & Massage Therapist',
    bio: 'Julian blends deep tissue techniques with ancient Eastern pressure therapies to melt away tension and restore bodily harmony.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2787&auto=format&fit=crop',
    socials: [
      { name: 'Instagram', icon: <InstagramIcon size={14} />, href: '#' },
    ]
  },
  {
    id: '04',
    name: 'Elena Rostova',
    role: 'Senior Colorist & Hair Spa',
    bio: 'A master of dimensional color and molecular hair repair, Elena creates vibrant, healthy hair that perfectly frames your features.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
    socials: [
      { name: 'Instagram', icon: <InstagramIcon size={14} />, href: '#' },
      { name: 'Twitter', icon: <TwitterIcon size={14} />, href: '#' },
      { name: 'Linkedin', icon: <LinkedinIcon size={14} />, href: '#' },
    ]
  }
];

export default function Team() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.from(".team-header-item", {
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

      // 2. Card Stagger Reveal
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
              start: "top 85%", 
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="team" 
      ref={sectionRef} 
      className="relative w-full bg-luxury-ivory py-24 md:py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-luxury-nude/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[90rem] px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* ============================================================ */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================ */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="team-header-item flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-luxury-rosegold"></span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-luxury-rosegold font-medium">
              <Sparkles size={14} />
              The Artisans
            </span>
            <span className="h-[1px] w-12 bg-luxury-rosegold"></span>
          </div>
          
          <h2 className="team-header-item text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111] leading-tight mb-8">
            Meet the masters <br />
            <span className="italic font-light text-black/60">behind the aesthetic.</span>
          </h2>

          <p className="team-header-item max-w-xl text-sm font-light text-black/50 leading-relaxed">
            Our team is a curated collective of industry-leading stylists, therapists, and aestheticians dedicated to elevating your natural beauty and providing an unparalleled wellness experience.
          </p>
        </div>

        {/* ============================================================ */}
        {/* EDITORIAL GRID LAYOUT                                          */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamData.map((member, index) => {
            // Asymmetrical staggered layout for Desktop and Tablet
            const isEven = index % 2 !== 0;
            const desktopStagger = isEven ? "lg:mt-16 lg:-mb-16" : "";
            const tabletStagger = index === 1 || index === 3 ? "md:mt-12 md:-mb-12" : "";

            return (
              <div 
                key={member.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`group relative flex flex-col w-full h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-2xl cursor-pointer ${desktopStagger} ${tabletStagger}`}
              >
                {/* 1. Portrait Image */}
                <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 filter saturate-[0.8] group-hover:saturate-100"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                </div>

                {/* 2. Base Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 group-hover:from-black/90 group-hover:via-black/40" />

                {/* 3. Top Number Badge */}
                <div className="absolute top-6 left-6 z-20 overflow-hidden">
                  <span className="block text-sm font-light italic text-luxury-white/70 transform transition-transform duration-500 group-hover:-translate-y-full">
                    {member.id}
                  </span>
                  <span className="absolute top-0 left-0 block text-sm font-light italic text-luxury-rosegold transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    {member.id}
                  </span>
                </div>

                {/* 4. Bottom Content Info */}
                <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-8 flex flex-col justify-end transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:translate-y-[4.5rem] lg:group-hover:translate-y-0">
                  
                  {/* Name and Plus Icon */}
                  <div className="flex items-end justify-between border-b border-white/20 pb-4 mb-4 transition-colors duration-500 group-hover:border-luxury-rosegold/50">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-xs uppercase tracking-widest text-luxury-rosegold">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-transform duration-500 group-hover:rotate-135 group-hover:bg-white group-hover:text-black">
                      <Plus size={16} />
                    </div>
                  </div>

                  {/* Hidden Details (Reveals on Hover Desktop / Always visible Mobile) */}
                  <div className="lg:opacity-0 lg:transition-opacity lg:duration-700 lg:delay-100 lg:group-hover:opacity-100">
                    <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    
                    {/* Social Links with Staggered Delays */}
                    <div className="flex items-center gap-3">
                      {member.socials.map((social, i) => (
                        <a 
                          key={social.name}
                          href={social.href}
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-luxury-rosegold hover:border-luxury-rosegold transition-all duration-300 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100`}
                          style={{ transitionDelay: `${(i + 1) * 75}ms` }}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Inner Premium Border */}
                <div className="absolute inset-0 z-30 rounded-2xl border border-white/10 pointer-events-none transition-colors duration-500 group-hover:border-white/30" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}