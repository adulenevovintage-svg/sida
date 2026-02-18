
import React from 'react';
import Hero from './components/Hero';
import CultureCard from './components/CultureCard';
import LiveGuide from './components/LiveGuide';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      {/* Refined Navigation - Reduced py and adjusted gradient depth */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/40 to-transparent backdrop-blur-[2px]">
        <div className="text-3xl md:text-4xl font-syne font-black tracking-tighter group cursor-pointer">
          SID<span className="text-red-600 group-hover:text-green-500 transition-colors">AMA</span>
        </div>
        
        <div className="hidden lg:flex gap-12 items-center">
          <div className="flex gap-8 text-[11px] font-black tracking-[0.3em] uppercase opacity-70">
            <a href="#history" className="hover:text-red-500 transition-colors">Origins</a>
            <a href="#festivals" className="hover:text-yellow-500 transition-colors">Rituals</a>
            <a href="#highlights" className="hover:text-red-500 transition-colors">Highlights</a>
            <a href="#tour" className="hover:text-green-500 transition-colors">Tour</a>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800"></div>
          <LiveGuide />
        </div>

        <button className="lg:hidden text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
          <i className="fas fa-bars"></i>
        </button>
      </nav>

      <Hero />

      <main className="relative z-10">
        
        {/* Hyped Intro */}
        <section id="history" className="relative py-40 overflow-hidden">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="inline-block px-4 py-2 border border-green-500/30 rounded-full text-[10px] font-black tracking-[0.4em] text-green-500 uppercase">
                Highland Excellence
              </div>
              <h2 className="text-6xl md:text-8xl font-black font-syne leading-[0.9]">
                ANCIENT <br/>
                <span className="text-zinc-800 italic">WISDOM.</span><br/>
                MODERN <span className="gradient-text">PULSE.</span>
              </h2>
              <p className="text-xl md:text-3xl text-zinc-400 font-light leading-snug">
                The Sidama region isn't just a place—it's a vibrant living organism fueled by community, coffee, and dance.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600 rounded-[3rem] rotate-3 scale-95 group-hover:rotate-0 transition-all duration-700 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1000" 
                className="relative z-10 rounded-[3rem] w-full h-[600px] object-cover group-hover:rotate-0 transition-transform duration-700 shadow-2xl" 
                alt="Sidama Spirit"
              />
            </div>
          </div>
        </section>

        {/* Culture Pulse Grid */}
        <section id="festivals" className="bg-zinc-950 py-32 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="mb-20">
              <h2 className="text-5xl md:text-8xl font-black font-syne mb-6">CORE <span className="text-red-600">ENERGIES.</span></h2>
              <p className="text-2xl text-zinc-500 font-light italic">The three pillars of Sidama vibration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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

        {/* VISUAL HIGHLIGHTS - USING YOUR PROVIDED PHOTOS */}
        <section id="highlights" className="py-32 bg-black overflow-hidden border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-6xl md:text-[10vw] font-black font-syne tracking-tighter leading-none mb-4 uppercase">
                  VISUAL <br/><span className="gradient-text">HIGHLIGHTS</span>
                </h2>
                <p className="text-xl text-zinc-500 max-w-xl italic">The rhythmic power of the Sidama shield and spear.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black tracking-[0.5em] text-red-600 uppercase">Guardian Spirit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              
              {/* PHOTO 1: ASSEMBLY UNDER TREE */}
              <div className="group relative overflow-hidden rounded-[3rem] bg-zinc-900 sidama-border-glow h-[500px] md:h-[700px] border border-white/10 transition-all duration-500">
                <img 
                  src="https://live.staticflickr.com/65535/50682226233_136151f8a7_b.jpg" 
                  alt="Sidama Warriors Gathering Under Acacia" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="h-[2px] w-12 bg-red-600"></span>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-red-500">The Assembly</span>
                  </div>
                  <h3 className="text-5xl font-syne font-black mb-4 uppercase leading-none tracking-tight">FOREST <br/>GUARDIANS</h3>
                  <p className="text-zinc-400 font-light text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    Behold the Gadaa system in motion—men standing tall with traditional black shields and spears under the sacred acacia canopy.
                  </p>
                </div>
              </div>

              {/* PHOTO 2: MARCH ON THE ROAD */}
              <div className="group relative overflow-hidden rounded-[3rem] bg-zinc-900 sidama-border-glow h-[500px] md:h-[700px] md:mt-32 border border-white/10 transition-all duration-500">
                <img 
                  src="https://pbs.twimg.com/media/Ef9X6WvXgAAdR8p.jpg:large" 
                  alt="Sidama Procession on Road" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="h-[2px] w-12 bg-green-600"></span>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-green-500">The March</span>
                  </div>
                  <h3 className="text-5xl font-syne font-black mb-4 uppercase leading-none tracking-tight">RHYTHM OF <br/>BATTLE</h3>
                  <p className="text-zinc-400 font-light text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    A powerful procession displaying the uniformity of the Sidama spirit. Every spear held high is a testament to the resilient highland history.
                  </p>
                </div>
              </div>

            </div>
            
            <div className="mt-40 border-t border-white/10 pt-16 text-center">
              <p className="text-zinc-600 font-syne font-bold uppercase tracking-[0.2em] mb-8 italic text-sm">Experience the raw energy of Sidama through these timeless forms.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['#GAACHANA', '#WORAANA', '#HONOR', '#SIDAMA'].map(tag => (
                  <span key={tag} className="px-6 py-2 border border-zinc-800 rounded-full text-[10px] font-black text-zinc-500 hover:border-red-500 hover:text-red-500 transition-all cursor-default uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tour Section */}
        <section id="tour" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden py-32 bg-zinc-950">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-10 scale-110" alt="Sidama Soul" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
          </div>
          
          <div className="relative z-10 space-y-16 max-w-5xl">
            <h2 className="text-7xl md:text-[12vw] font-black font-syne tracking-tighter leading-none">
              TAKE THE <br/>
              <span className="gradient-text italic animate-vibrate inline-block">VISION</span> TOUR
            </h2>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto">
              Activate the AI Guide above to explore the Sidama pulse with real-time cultural narration.
            </p>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="bg-white text-black font-black py-6 px-16 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              BACK TO THE TOP
            </button>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-white/5 text-center bg-black">
        <div className="text-4xl font-syne font-black mb-12">SID<span className="text-red-600">AMA</span>.PULSE</div>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Sidama Energy Project. Authentic. Unfiltered. Hyped.</p>
      </footer>
    </div>
  );
};

export default App;
