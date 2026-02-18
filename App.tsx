
import React from 'react';
import Hero from './components/Hero';
import CultureCard from './components/CultureCard';
import LiveGuide from './components/LiveGuide';
import DynamicHighlight from './components/DynamicHighlight';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      {/* Dynamic Nav */}
      <nav className="fixed top-0 w-full z-[100] px-8 py-8 flex justify-between items-center transition-all duration-500 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="text-4xl font-syne font-black tracking-tighter group cursor-pointer">
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
                <span className="text-zinc-800 italic group-hover:text-zinc-600 transition-colors">WISDOM.</span><br/>
                MODERN <span className="gradient-text">PULSE.</span>
              </h2>
              <p className="text-xl md:text-3xl text-zinc-400 font-light leading-snug">
                The Sidama region isn't just a place—it's a vibrant living organism fueled by community, coffee, and dance.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600 rounded-[3rem] rotate-6 scale-90 group-hover:rotate-0 transition-all duration-700 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&q=80&w=1000" 
                className="relative z-10 rounded-[3rem] w-full h-[600px] object-cover -rotate-2 group-hover:rotate-0 transition-transform duration-700 shadow-2xl" 
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <CultureCard 
                title="Hoollo Ritual"
                topic="High intensity traditional dance and rhythmic celebration in Sidama"
                icon="fa-bolt-lightning"
                imageUrl="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800"
                color="red"
              />
              <CultureCard 
                title="Luwa Honor"
                topic="The bravery and age-grade social system of Sidama warriors"
                icon="fa-shield"
                imageUrl="https://images.unsplash.com/photo-1523805081446-e6545e24acc4?auto=format&fit=crop&q=80&w=800"
                color="green"
              />
              <CultureCard 
                title="Buna Spirit"
                topic="The world's finest organic coffee ceremony and social pulse of Sidama"
                icon="fa-leaf"
                imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
                color="yellow"
              />
            </div>
          </div>
        </section>

        {/* Visual Highlights Section - Using Dynamic AI Generation for Specificity */}
        <section id="highlights" className="py-32 bg-black overflow-hidden border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-6xl md:text-[8vw] font-black font-syne tracking-tighter leading-none mb-4 uppercase">
                  VISUAL <br/><span className="gradient-text">HIGHLIGHTS</span>
                </h2>
                <p className="text-xl text-zinc-500 max-w-xl italic">Dynamic captures of the Sidama warrior spirit.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black tracking-[0.5em] text-red-600 uppercase">Guardian Vision</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {/* Highlight 1: The Assembly - Matching User Photo 1 */}
              <DynamicHighlight 
                prompt="Men of Sidama tribe in Ethiopia holding traditional black shields and spears, standing under a large acacia tree in a forest, vibrant natural lighting, hyper-realistic, high contrast."
                subtitle="The Assembly"
                title="FOREST GUARDIANS"
                description="Elders and youth standing under the sacred canopy with Gaachana (Shields) and Woraana (Spears)—representing the protective spirit of the highland forests."
                accentColor="red"
              />

              {/* Highlight 2: The March - Matching User Photo 2 */}
              <DynamicHighlight 
                prompt="A long line of Sidama warriors with traditional black shields and spears marching on a paved road with green mountains in the background, traditional striped clothing, high energy, wide angle."
                subtitle="The March"
                title="RHYTHM OF BATTLE"
                description="A powerful procession displaying the uniformity of the Luwa system. Every spear held high is a testament to the resilient and rhythmic Sidama history."
                accentColor="green"
                className="md:mt-32"
              />
            </div>
            
            <div className="mt-40 border-t border-white/10 pt-16 text-center">
              <p className="text-zinc-600 font-syne font-bold uppercase tracking-[0.2em] mb-8 italic text-sm">Experience the raw energy of Sidama through these timeless forms.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['#GAACHANA', '#WORAANA', '#HONOR', '#SIDAMA'].map(tag => (
                  <span key={tag} className="px-6 py-2 border border-zinc-800 rounded-full text-[10px] font-black text-zinc-500 hover:border-red-500 hover:text-red-500 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Tour Interactive Hub */}
        <section id="tour" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden py-32">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-20 scale-110 blur-sm" alt="Sidama Soul" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
          </div>
          
          <div className="relative z-10 space-y-16 max-w-5xl">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Tour Guide is Live</span>
            </div>

            <h2 className="text-7xl md:text-[10vw] font-black font-syne tracking-tighter leading-none">
              TAKE THE <br/>
              <span className="gradient-text italic animate-vibrate inline-block">VISION</span> TOUR
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                  Start the guide in the nav bar, then <span className="text-white font-bold">upload any photo</span> to get a live energetic narration of how it connects to the Sidama pulse.
                </p>
              </div>

              <div className="bg-zinc-900/50 p-12 rounded-[3rem] border border-white/5 backdrop-blur-2xl">
                <i className="fas fa-camera-retro text-5xl mb-8 text-green-500"></i>
                <h4 className="text-2xl font-black font-syne mb-4 uppercase">Interact with Vision</h4>
                <p className="text-zinc-500 text-sm mb-8">Upload landscapes, artifacts, or traditional dress to see through the Pulse's eyes.</p>
                <button 
                  onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  className="bg-white text-black font-black py-4 px-10 rounded-full hover:bg-red-500 hover:text-white transition-all"
                >
                  ACTIVATE VISION
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-white/5 text-center bg-zinc-950">
        <div className="text-4xl font-syne font-black mb-12">SID<span className="text-red-600">AMA</span>.PULSE</div>
        <div className="flex justify-center gap-16 mb-20 text-[10px] font-black tracking-[0.4em] uppercase text-zinc-600">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Culture.Gov</a>
          <a href="#" className="hover:text-white transition-colors">TikTok</a>
        </div>
        <p className="text-zinc-800 text-[10px] font-bold">&copy; {new Date().getFullYear()} Sidama Energy Project. Authentic. Unfiltered. Hyped.</p>
      </footer>
    </div>
  );
};

export default App;
