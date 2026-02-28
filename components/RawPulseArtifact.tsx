
import React, { useState, useEffect } from 'react';
import { generateCultureImage } from '../services/geminiService';

interface RawPulseArtifactProps {
  rawData: string;
  title: string;
  subtitle: string;
  description: string;
}

const RawPulseArtifact: React.FC<RawPulseArtifactProps> = ({ rawData, title, subtitle, description }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(true);

  useEffect(() => {
    const fetchVision = async () => {
      try {
        // We use the prompt to interpret the "soul" of the data provided
        const url = await generateCultureImage("A futuristic, neon-infused cinematic portrait of a Sidama elder with glowing traditional patterns, representing digital ancestry, 8k, hyper-detailed");
        setImageUrl(url);
      } catch (e) {
        console.error("Vision synthesis failed", e);
      } finally {
        // Keep the "decoding" vibe for a bit
        setTimeout(() => setIsVisualizing(false), 2000);
      }
    };
    fetchVision();
  }, []);

  return (
    <div className="group relative overflow-hidden rounded-[3rem] bg-zinc-950 aspect-square md:aspect-auto md:h-[700px] border border-red-500/20 shadow-2xl">
      {/* The Raw Data Layer - Scrolling background effect */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity overflow-hidden font-mono text-[6px] leading-none break-all p-4 select-none pointer-events-none text-red-500 whitespace-pre-wrap">
        {rawData.substring(0, 5000)}
      </div>

      {/* Loading/Decoding State */}
      {isVisualizing ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="w-24 h-[2px] bg-red-600 animate-pulse mb-4"></div>
          <p className="text-[10px] font-black tracking-[0.5em] uppercase text-red-500 animate-vibrate">Decoding Sacred Data...</p>
        </div>
      ) : imageUrl && (
        <div className="absolute inset-0 z-10 animate-reveal">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-12 left-12 right-12 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-12 bg-green-500"></span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-green-500">{subtitle}</span>
        </div>
        <h3 className="text-5xl font-syne font-black mb-4 uppercase leading-none tracking-tighter">
          {title}
        </h3>
        <p className="text-zinc-400 font-light text-sm max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700">
          {description}
        </p>
      </div>
      
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
    </div>
  );
};

export default RawPulseArtifact;
