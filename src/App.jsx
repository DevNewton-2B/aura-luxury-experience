import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Reviews from './components/Reviews';
import Footer from './components/Footer'; // <-- 1. Import Footer

function App() {
  // Initialize Global Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="w-full min-h-screen bg-luxury-beige text-[#333] relative">
      <Navbar />

      <main>
        {/* ========================================= */}
        {/* PRODUCTION COMPONENTS                       */}
        {/* ========================================= */}
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Team />
        <Reviews />
      </main>

      {/* ========================================= */}
      {/* FOOTER SECTION                              */}
      {/* ========================================= */}
      <Footer /> {/* <-- 2. Render Footer outside of main to strictly define page boundary */}
    </div>
  );
}

export default App;