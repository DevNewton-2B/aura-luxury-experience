import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Flower2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageOneRef = useRef(null);
  const imageTwoRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
        y: 70,
        opacity: 0,
        duration: 1.3,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.fromTo(
        imageOneRef.current,
        {
          y: -40,
          scale: 1.08,
        },
        {
          y: 60,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        imageTwoRef.current,
        {
          y: 60,
        },
        {
          y: -90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        }
      );

      gsap.to(".floating-card", {
        y: -14,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      const section = sectionRef.current;

      const moveGlow = (e) => {
        const rect = section.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(glowRef.current, {
          x,
          y,
          duration: 1,
          ease: "power3.out",
        });
      };

      if (window.innerWidth > 768) {
        section.addEventListener("mousemove", moveGlow);
      }

      return () => {
        section.removeEventListener("mousemove", moveGlow);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#fdfaf7] py-24 sm:py-28 md:py-32 lg:py-40"
    >
      {/* ===================================================== */}
      {/* MOUSE GLOW */}
      {/* ===================================================== */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5d8df]/30 blur-[120px] md:block"
      />

      {/* BACKGROUND BLURS */}
      <div className="absolute left-[-150px] top-[-150px] h-[300px] w-[300px] rounded-full bg-[#f5d8df]/30 blur-[100px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />

      <div className="absolute bottom-[-180px] right-[-120px] h-[350px] w-[350px] rounded-full bg-[#ecd9c9]/20 blur-[120px] sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]" />

      {/* NOISE */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-12 md:gap-10 lg:gap-20">
          {/* ===================================================== */}
          {/* IMAGE SECTION */}
          {/* ===================================================== */}
          <div className="relative order-1 col-span-1 h-[480px] sm:h-[580px] md:col-span-6 md:h-[650px] lg:h-[760px]">
            {/* VERTICAL TEXT */}
            <div className="absolute right-[-32px] top-20 z-30 hidden rotate-90 origin-top-right lg:block">
              <p className="text-[10px] uppercase tracking-[0.7em] text-black/20">
                Crafted With Emotion • Since 2026
              </p>
            </div>

            {/* MAIN IMAGE */}
            <div className="absolute left-0 top-0 h-[82%] w-[88%] overflow-hidden rounded-[2.2rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] sm:rounded-[2.8rem] md:w-[82%] lg:rounded-[3rem]">
              <div
                ref={imageOneRef}
                className="h-[120%] w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop')",
                }}
              />
            </div>

            {/* SECONDARY IMAGE */}
            <div
              ref={imageTwoRef}
              className="absolute bottom-0 right-0 z-20 hidden h-[38%] w-[58%] overflow-hidden rounded-[1.8rem] border-[5px] border-white shadow-[0_25px_50px_rgba(0,0,0,0.16)] sm:block md:h-[36%] lg:h-[40%]"
            >
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-[1800ms] hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2000&auto=format&fit=crop')",
                }}
              />
            </div>

            {/* FLOATING CARD 1 */}
            <div className="floating-card absolute bottom-20 left-0 z-30 rounded-2xl border border-white/50 bg-white/70 p-4 backdrop-blur-xl shadow-2xl sm:left-[-10px] sm:p-5 lg:left-[-20px]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3d4da]/40 text-[#b76e79] sm:h-14 sm:w-14">
                  <Sparkles size={18} className="sm:h-5 sm:w-5" />
                </div>

                <div>
                  <p className="font-serif text-lg text-[#111] sm:text-2xl">
                    Timeless
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-black/40 sm:text-[10px]">
                    Luxury Experience
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2 */}
            <div className="floating-card absolute right-2 top-6 z-30 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 backdrop-blur-xl shadow-xl sm:right-6 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Heart
                  size={16}
                  className="fill-[#d89aa6] text-[#d89aa6]"
                />

                <p className="text-[9px] uppercase tracking-[0.28em] text-black/60 sm:text-[10px]">
                  Made With Love
                </p>
              </div>
            </div>

            {/* FLOATING CARD 3 */}
            <div className="floating-card absolute bottom-6 right-8 z-30 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 backdrop-blur-xl shadow-xl sm:right-16 sm:px-5 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Flower2 size={16} className="text-[#b76e79]" />

                <p className="text-[9px] uppercase tracking-[0.28em] text-black/60 sm:text-[10px]">
                  Soft & Eternal
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================== */}
          {/* TEXT CONTENT */}
          {/* ===================================================== */}
          <div
            ref={textRef}
            className="order-2 col-span-1 flex flex-col justify-center md:col-span-6"
          >
            {/* TOP LABEL */}
            <div className="about-reveal mb-6 flex items-center gap-4 sm:mb-8 sm:gap-5">
              <span className="h-[1px] w-10 bg-[#b76e79] sm:w-16" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#b76e79] sm:text-[10px] sm:tracking-[0.45em]">
                Beyond Ordinary
              </span>
            </div>

            {/* HEADING */}
            <h2 className="about-reveal mb-8 text-[2.8rem] font-serif leading-[0.95] text-[#111] sm:text-6xl md:text-[4rem] lg:mb-10 lg:text-7xl">
              Crafted for
              <br />

              <span className="font-light italic text-black/45">
                moments that
                <br />
                feel eternal.
              </span>
            </h2>

            {/* DESCRIPTION BLOCKS */}
            <div className="mb-12 flex flex-col gap-8 sm:gap-10 lg:mb-14">
              <div className="about-reveal">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-black/30 sm:mb-3 sm:text-[11px] sm:tracking-[0.4em]">
                  Atmosphere
                </p>

                <p className="max-w-xl text-[15px] font-light leading-relaxed text-black/65 sm:text-base md:text-lg">
                  Soft light spills gently across the room.
                  Delicate fragrances linger in the air.
                  Every detail is intentionally crafted to slow
                  the world down around you.
                </p>
              </div>

              <div className="about-reveal">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-black/30 sm:mb-3 sm:text-[11px] sm:tracking-[0.4em]">
                  Experience
                </p>

                <p className="max-w-xl text-[15px] font-light leading-relaxed text-black/65 sm:text-base md:text-lg">
                  More than beauty, this is emotion translated
                  into space. A quiet escape where elegance,
                  intimacy, and serenity blend into one immersive
                  experience.
                </p>
              </div>

              <div className="about-reveal">
                <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-black/30 sm:mb-3 sm:text-[11px] sm:tracking-[0.4em]">
                  Philosophy
                </p>

                <p className="max-w-xl text-[15px] font-light leading-relaxed text-black/65 sm:text-base md:text-lg">
                  True luxury is never loud.
                  It exists in softness,
                  silence,
                  and the feeling that time itself has paused
                  for just a moment.
                </p>
              </div>
            </div>

            {/* QUOTE */}
            <div className="about-reveal relative mb-12 border-l border-[#e7c5cb] pl-5 sm:pl-8 lg:mb-16">
              <div className="absolute -left-3 -top-6 text-6xl font-serif text-[#f3d4da]/60 sm:-left-5 sm:-top-8 sm:text-8xl">
                ”
              </div>

              <p className="max-w-xl text-xl font-serif italic leading-relaxed text-[#111] sm:text-2xl lg:text-3xl">
                Beauty begins the moment
                you finally feel at peace.
              </p>

              <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-black/40 sm:mt-5 sm:text-[11px] sm:tracking-[0.35em]">
                — Aura Philosophy
              </p>
            </div>

            {/* CTA */}
            <div className="about-reveal">
              <button className="group relative overflow-hidden rounded-full border border-[#111] px-7 py-4 sm:px-10 sm:py-5">
                <span className="relative z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#111] transition-colors duration-500 group-hover:text-white sm:gap-4 sm:text-[11px] sm:tracking-[0.4em]">
                  Enter The Experience

                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#111] text-white transition-all duration-500 group-hover:bg-white group-hover:text-[#111] sm:h-7 sm:w-7">
                    <ArrowRight size={12} />
                  </span>
                </span>

                <div className="absolute inset-0 z-10 translate-y-full rounded-full bg-[#111] transition-transform duration-500 group-hover:translate-y-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}