
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
      {/* Cinematic Ken Burns Background */}
      <div className="absolute inset-0 z-0 animate-ken-burns">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=2000" 
          alt="Sidama Vibrant Forest" 
          className="w-full h-full object-cover opacity-60 brightness-75 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
      </div>
      
      {/* Content Wrapper */}
      <div className="relative z-10 text-center px-6 max-w-5xl pt-24">
        <div className="overflow-hidden mb-6">
          <h2 className="text-base md:text-xl font-bold tracking-[0.5em] uppercase text-green-400 font-syne reveal-text" style={{ animationDelay: '0.4s' }}>
            The South is Calling
          </h2>
        </div>
        
        <div className="overflow-hidden">
          <h1 className="text-7xl md:text-[8vw] lg:text-9xl font-black font-syne mb-8 leading-[0.9] tracking-tighter italic reveal-text" style={{ animationDelay: '0.8s' }}>
            SIDAMA <br/>
            <span className="gradient-text animate-vibrate inline-block">ENERGY</span>
          </h1>
        </div>
        
        <div className="overflow-hidden">
          <p className="text-lg md:text-2xl font-light text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed reveal-text" style={{ animationDelay: '1.2s' }}>
            Unlocking the <span className="text-red-500 font-bold">VIBRATION</span> of Ethiopia's most dynamic culture through Spirit.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center reveal-text" style={{ animationDelay: '1.6s' }}>
          <button 
            onClick={scrollToContent}
            className="group relative bg-red-600 text-white font-black py-5 px-12 rounded-full transition-all overflow-hidden shadow-2xl shadow-red-900/40 active:scale-95 animate-button-press"
          >
            <span className="relative z-10 tracking-[0.2em] text-sm uppercase">Enter the Pulse</span>
            <div className="absolute inset-0 bg-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
          
          <div className="flex items-center gap-4 text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <span className="w-8 h-[1px] bg-zinc-800"></span>
            Scroll to Explore
            <span className="w-8 h-[1px] bg-zinc-800"></span>
          </div>
        </div>
      </div>
      
      {/* Decorative pulse rings */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full border border-red-500/10 pulse-ring"></div>
      <div className="absolute top-[-5%] right-[-5%] w-[30vw] h-[30vw] rounded-full border border-green-500/10 pulse-ring" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default Hero;
