import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCreative } from 'swiper/modules';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Swiper CSS (Required for core mechanics)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';

gsap.registerPlugin(ScrollTrigger);

const reviewsData = [
  {
    id: 1,
    name: 'Eleanor Vance',
    treatment: 'Signature Facial & Hot Stone',
    review: 'An absolute sanctuary. The moment you step through the doors, time simply stops. The botanical facial completely transformed my skin, and the attention to detail is unmatched in the city.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Camille Dubois',
    treatment: 'Bridal Radiance Package',
    review: 'Sophia and her team made my wedding morning pure magic. They do not just style your hair and makeup; they curate an aura of calm and confidence. Worth every single penny.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Juliette Binoche',
    treatment: 'Aromatherapy Massage',
    review: 'I have visited luxury spas from Paris to Tokyo, and the acoustic design and massage choreography here rival the best in the world. A truly transcendent escape from urban life.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Olivia Sterling',
    treatment: 'Keratin Hair Spa',
    review: 'My hair was damaged from years of coloring, but Elena’s molecular repair treatment brought it back to life in a single session. The mirror-like shine is unbelievable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Mia Kensington',
    treatment: 'Holistic Wellness Retreat',
    review: 'More than just a spa appointment. It is a full sensory reset. The organic oils, the heated beds, the ambient lighting—they have perfected the architecture of relaxation.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop'
  }
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  
  // Custom Navigation Refs for Swiper
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text & Header Reveal
      gsap.from(".review-reveal", {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Slider Container Entrance
      gsap.fromTo(sliderRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="reviews" 
      ref={sectionRef} 
      className="relative w-full bg-luxury-white py-24 md:py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-luxury-blush/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-luxury-nude/10 blur-[100px] pointer-events-none" />

      {/* Massive decorative Quote Icon in background */}
      <div className="absolute left-10 top-20 md:left-20 lg:left-32 opacity-[0.03] text-[#111] pointer-events-none">
        <Quote size={400} strokeWidth={0.5} />
      </div>

      <div className="mx-auto max-w-[90rem] pl-6 sm:pl-12 lg:pl-16 pr-0 flex flex-col lg:flex-row lg:items-center relative z-10 gap-12 lg:gap-8">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: HEADER & CUSTOM NAVIGATION                        */}
        {/* ============================================================ */}
        <div ref={headerRef} className="w-full lg:w-1/3 flex flex-col pr-6 lg:pr-12">
          <div className="review-reveal flex items-center gap-4 mb-6">
            <span className="h-[1px] w-10 bg-luxury-rosegold"></span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-luxury-rosegold font-medium">
              <Sparkles size={14} />
              Client Stories
            </span>
          </div>
          
          <h2 className="review-reveal text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111] leading-tight mb-8">
            Words of <br />
            <span className="italic font-light text-black/50">Radiance.</span>
          </h2>

          <p className="review-reveal text-sm font-light text-black/60 leading-relaxed mb-12 max-w-md">
            Do not just take our word for it. Discover how our curated treatments and uncompromising luxury have transformed the wellness routines of our most discerning guests.
          </p>

          {/* Custom Desktop Navigation (Hidden on Mobile) */}
          <div className="review-reveal hidden md:flex items-center gap-4">
            <button 
              ref={prevRef}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-transparent transition-all hover:border-[#111] hover:bg-[#111] hover:text-white"
            >
              <ChevronLeft size={20} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              ref={nextRef}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-transparent transition-all hover:border-[#111] hover:bg-[#111] hover:text-white"
            >
              <ChevronRight size={20} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: SWIPER.JS CAROUSEL                               */}
        {/* ============================================================ */}
        <div ref={sliderRef} className="w-full lg:w-2/3 relative h-full">
          {/* Fading gradient on the right edge to signify more scrolling content */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-luxury-white to-transparent z-20 pointer-events-none hidden lg:block" />

          <Swiper
            modules={[Navigation, Autoplay, EffectCreative]}
            spaceBetween={24}
            slidesPerView={1.1} // Shows a peek of the next slide on mobile
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 2.2, // Desktop shows 2 full cards and a peek of the 3rd
                spaceBetween: 40,
              },
            }}
            className="!pl-0 !pb-12 lg:!pb-0" // Add bottom padding on mobile for shadow clearance
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-black/5 bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-1 text-luxury-rosegold">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <Quote size={24} className="text-luxury-nude/40 transition-colors duration-500 group-hover:text-luxury-rosegold" strokeWidth={1} />
                  </div>

                  {/* Middle: Review Text */}
                  <p className="text-lg md:text-xl font-serif text-[#111] leading-relaxed mb-10 flex-grow">
                    "{review.review}"
                  </p>

                  {/* Bottom: Client Profile */}
                  <div className="flex items-center gap-4 border-t border-black/5 pt-6">
                    <div className="h-12 w-12 overflow-hidden rounded-full border border-luxury-rosegold/20">
                      <img 
                        src={review.image} 
                        alt={review.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#111]">{review.name}</h4>
                      <p className="text-xs uppercase tracking-widest text-black/40 mt-1">
                        {review.treatment}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}