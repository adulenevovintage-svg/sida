
import React, { useState } from 'react';
import { generateCultureVideo } from '../services/geminiService';

const VideoGenerator: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  const checkAndOpenKey = async () => {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
    setHasApiKey(true);
    handleGenerate();
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setVideoUrl(null);
    try {
      const url = await generateCultureVideo("Sidama traditional Hoollo dance with vibrant red and green clothing, authentic motion", setStatus);
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        setStatus("API session expired. Please re-select your key.");
      } else {
        setStatus("The energy is intense! Try again in a moment.");
      }
    } finally {
      setIsGenerating(false);
      setStatus('');
    }
  };

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/5 mt-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-black font-syne mb-6 leading-tight tracking-tight uppercase">
            GENERATE THE <br/><span className="text-red-500">MOTION</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 mb-10 leading-relaxed font-light">
            Experience the dynamic movement of Sidama through high-fidelity AI generation. 
            We utilize the Veo engine to bring traditional dances and sacred celebrations to life.
          </p>
          {!hasApiKey ? (
            <div className="space-y-6">
              <p className="text-[10px] text-zinc-500 italic tracking-wider leading-relaxed">
                * Video generation requires a paid API key. 
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-red-500/80 hover:text-red-500 underline ml-1">Billing Docs</a>
              </p>
              <button 
                onClick={checkAndOpenKey}
                className="bg-white text-black font-black py-4 px-10 rounded-full flex items-center gap-3 transition-all hover:scale-105 active:scale-95 uppercase text-[11px] tracking-widest"
              >
                <i className="fas fa-key"></i> Select Key & Generate
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-black py-4 px-10 rounded-full flex items-center gap-3 transition-all hover:scale-105 active:scale-95 uppercase text-[11px] tracking-widest"
            >
              <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
              {isGenerating ? 'Synthesizing Rhythm...' : 'Regenerate Motion'}
            </button>
          )}
        </div>

        <div className="relative aspect-video bg-black rounded-[1.5rem] overflow-hidden shadow-3xl border border-white/5 flex items-center justify-center group">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-8">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-syne font-black text-zinc-300 tracking-[0.2em] uppercase animate-pulse">{status}</p>
                </div>
              ) : (
                <div className="opacity-20 group-hover:opacity-40 transition-opacity">
                  <i className="fas fa-film text-5xl mb-6"></i>
                  <p className="text-xs font-bold uppercase tracking-widest">Awaiting Visualization</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
