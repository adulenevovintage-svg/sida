import React from 'react';

const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('history');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Ken Burns Background - Vibrant Jungle/Forest */}
      <div className="absolute inset-0 z-0 animate-ken-burns">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" 
          alt="Sidama Vibrant Forest" 
          className="w-full h-full object-cover opacity-60 brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-7xl">
        <div className="overflow-hidden mb-4">
          <h2 className="text-xl md:text-3xl font-bold tracking-[0.6em] uppercase text-green-400 font-syne reveal-text" style={{ animationDelay: '0.2s' }}>
            The South is Calling
          </h2>
        </div>
        
        <div className="overflow-hidden">
          <h1 className="text-[12vw] md:text-[10vw] font-black font-syne mb-6 leading-[0.85] tracking-tighter italic reveal-text" style={{ animationDelay: '0.4s' }}>
            SIDAMA <br/>
            <span className="gradient-text animate-vibrate inline-block">ENERGY</span>
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <p className="text-lg md:text-3xl font-light text-zinc-300 mb-12 max-w-3xl mx-auto leading-tight reveal-text" style={{ animationDelay: '0.6s' }}>
            Unlocking the <span className="text-red-500 font-bold">VIBRATION</span> of Ethiopia's most dynamic culture through Spirit.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center reveal-text" style={{ animationDelay: '0.9s' }}>
          <button 
            onClick={scrollToContent}
            className="group relative bg-red-600 text-white font-black py-5 px-12 rounded-full transition-all overflow-hidden shadow-2xl shadow-red-900/40 animate-soft-pulse active:scale-95"
          >
            <span className="relative z-10 tracking-widest text-lg">ENTER THE PULSE</span>
            <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
          
          <div className="flex items-center gap-4 text-zinc-500 font-bold uppercase tracking-widest text-sm opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="w-12 h-[2px] bg-zinc-800"></span>
            SCROLL TO EXPLORE
            <span className="w-12 h-[2px] bg-zinc-800"></span>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse rings with staggered delays */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full border border-red-500/10 pulse-ring"></div>
      <div className="absolute top-[-5%] right-[-5%] w-[30vw] h-[30vw] rounded-full border border-green-500/10 pulse-ring" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-[20%] right-[10%] w-[10vw] h-[10vw] rounded-full border border-yellow-500/5 pulse-ring" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default Hero;