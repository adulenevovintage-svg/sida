
import React, { useState } from 'react';
import Hero from './components/Hero';
import CultureCard from './components/CultureCard';
import LiveGuide from './components/LiveGuide';

interface CapturedMoment {
  type: 'video' | 'image';
  url: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moments, setMoments] = useState<CapturedMoment[]>([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { name: 'Origins', href: 'history' },
    { name: 'Rituals', href: 'festivals' },
    { name: 'Highlights', href: 'highlights' },
    { name: 'Moments', href: 'moments-gallery' },
    { name: 'Tour', href: 'tour' }
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const addMoment = (moment: CapturedMoment) => {
    setMoments(prev => [moment, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/40 to-transparent backdrop-blur-[2px]">
        <div 
          className="text-2xl md:text-3xl font-syne font-black tracking-tighter group cursor-pointer z-[110]" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          SID<span className="text-red-600 group-hover:text-green-500 transition-colors">AMA</span>
        </div>
        
        <div className="hidden lg:flex gap-12 items-center">
          <div className="flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase opacity-60">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className="hover:text-red-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-zinc-800"></div>
          <LiveGuide onMomentCaptured={addMoment} />
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden text-xl w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 z-[110] transition-transform active:scale-90"
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[105] bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-[-10%]'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-12">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-4xl md:text-6xl font-syne font-black uppercase tracking-tighter hover:text-red-500 transition-colors"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="mt-8 scale-125">
             <LiveGuide onMomentCaptured={addMoment} />
          </div>
        </div>
      </div>

      <Hero />

      <main className="relative z-10">
        
        {/* Hyped Intro */}
        <section id="history" className="relative py-32 lg:py-48 overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="inline-block px-4 py-2 border border-green-500/30 rounded-full text-[9px] font-black tracking-[0.4em] text-green-500 uppercase">
                Highland Excellence
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne leading-[1] tracking-tight">
                ANCIENT <br/>
                <span className="text-zinc-600 italic">WISDOM.</span><br/>
                MODERN <span className="gradient-text">PULSE.</span>
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl">
                The Sidama region isn't just a place—it's a vibrant living organism fueled by community, coffee, and dance.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600 rounded-[2.5rem] rotate-2 scale-95 group-hover:rotate-0 transition-all duration-700 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1000" 
                className="relative z-10 rounded-[2.5rem] w-full aspect-[4/5] md:aspect-auto md:h-[600px] object-cover transition-transform duration-700 shadow-2xl" 
                alt="Sidama Spirit"
              />
            </div>
          </div>
        </section>

        {/* Culture Pulse Grid */}
        <section id="festivals" className="bg-zinc-950 py-32 border-y border-white/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20 text-left lg:text-center">
              <h2 className="text-5xl md:text-7xl font-black font-syne mb-6 tracking-tight">CORE <span className="text-red-600">ENERGIES.</span></h2>
              <p className="text-xl md:text-2xl text-zinc-500 font-light italic max-w-2xl lg:mx-auto">The three pillars of Sidama vibration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <CultureCard 
                title="Hoollo Ritual"
                topic="High intensity traditional dance of Sidama"
                icon="fa-bolt-lightning"
                imageUrl="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800"
                color="red"
              />
              <CultureCard 
                title="Luwa Honor"
                topic="Bravery and age-grade social system of Sidama"
                icon="fa-shield"
                imageUrl="https://images.unsplash.com/photo-1523805081446-e6545e24acc4?auto=format&fit=crop&q=80&w=800"
                color="green"
              />
              <CultureCard 
                title="Buna Spirit"
                topic="Organic coffee ceremony of Sidama"
                icon="fa-leaf"
                imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                color="yellow"
              />
            </div>
          </div>
        </section>

        {/* VISUAL HIGHLIGHTS */}
        <section id="highlights" className="py-32 bg-black overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
              <div className="text-left">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne tracking-tighter leading-[1] mb-6 uppercase">
                  VISUAL <br/><span className="gradient-text">HIGHLIGHTS</span>
                </h2>
                <p className="text-lg text-zinc-500 max-w-xl italic leading-relaxed">Authentic glimpses into the high-energy soul of the Sidama people.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-red-500/10 h-[500px] md:h-[700px] transition-all duration-500 shadow-2xl">
                <img 
                  src="https://live.staticflickr.com/65535/50682226233_136151f8a7_b.jpg" 
                  alt="Sidama Cultural Expression" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-95"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="h-[1px] w-10 bg-red-600"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">The Core Pulse</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-syne font-black mb-4 uppercase leading-none tracking-tight">SACRED <br/>HERITAGE</h3>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-green-500/10 flex-1 transition-all duration-500 min-h-[300px]">
                  <img src="https://pbs.twimg.com/media/Ef9X6WvXgAAdR8p.jpg:large" alt="Sidama" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute bottom-8 left-8"><h4 className="text-2xl font-syne font-bold uppercase">Ancient Assembly</h4></div>
                </div>
                <div className="group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-yellow-500/10 flex-1 transition-all duration-500 min-h-[300px]">
                  <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1000" alt="Sidama" className="w-full h-full object-cover" />
                  <div className="absolute bottom-8 left-8"><h4 className="text-2xl font-syne font-bold uppercase">Ritual March</h4></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SHARE YOUR MOMENTS SECTION */}
        <section id="moments-gallery" className="py-32 bg-zinc-950 border-y border-white/5 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-20">
              <div className="inline-block px-4 py-2 border border-red-500/30 rounded-full text-[9px] font-black tracking-[0.4em] text-red-500 uppercase mb-6">
                Community Pulse
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne tracking-tighter leading-[1] mb-6 uppercase">
                SHARE YOUR <br/><span className="gradient-text italic">MOMENTS</span>
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl italic leading-relaxed">
                Your captured snippets of Sidama spirit. Use the camera above to add your own rhythm to the gallery.
              </p>
            </div>

            {moments.length === 0 ? (
              <div className="aspect-[16/6] bg-black/50 border border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center justify-center text-zinc-600">
                <i className="fas fa-camera text-4xl mb-4 opacity-20"></i>
                <p className="font-syne font-black uppercase tracking-widest text-xs opacity-40">Gallery is currently empty. Capture the first moment!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {moments.map((moment) => (
                  <div key={moment.timestamp} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 aspect-square shadow-2xl">
                    {moment.type === 'video' ? (
                      <video src={moment.url} autoPlay loop muted className="w-full h-full object-cover" />
                    ) : (
                      <img src={moment.url} alt="Captured moment" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2 block">Captured Energy</span>
                        <span className="text-xs font-mono opacity-50">{new Date(moment.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tour Section */}
        <section id="tour" className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden py-32 bg-black scroll-mt-20">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-10 scale-110" alt="Sidama Soul" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
          </div>
          
          <div className="relative z-10 space-y-12 max-w-4xl">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black font-syne tracking-tighter leading-[0.9]">
              TAKE THE <br/>
              <span className="gradient-text italic animate-vibrate inline-block">VISION</span> TOUR
            </h2>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="bg-white text-black font-black py-5 px-14 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs"
            >
              Back to the Top
            </button>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-white/5 text-center bg-black">
        <div className="text-2xl font-syne font-black mb-8 tracking-tighter">SID<span className="text-red-600">AMA</span>.PULSE</div>
        <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.4em]">&copy; {new Date().getFullYear()} Sidama Energy Project. Authentic. Unfiltered. Hyped.</p>
      </footer>
    </div>
  );
};

export default App;
