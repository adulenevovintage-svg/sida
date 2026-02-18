
import React, { useState } from 'react';
import { generateCultureVideo } from '../services/geminiService';

const VideoGenerator: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  const checkAndOpenKey = async () => {
    // Guidelines: Check for selected API key and open dialog if not present
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
    // Guidelines: Assume success and proceed to the app immediately after triggering openSelectKey
    setHasApiKey(true);
    handleGenerate();
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setVideoUrl(null);
    try {
      const url = await generateCultureVideo("Sidama traditional Hoollo dance with vibrant red and green clothing", setStatus);
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      // Guidelines: If the request fails with this message, reset key selection state and prompt re-selection
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
    <div className="bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 mt-20">
      <div className="grid md:grid-row-2 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-extrabold font-syne mb-6">
            GENERATE THE <span className="text-red-500">MOTION</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Experience the dynamic movement of Sidama through AI. 
            We use Veo to bring traditional dances and celebrations to life.
          </p>
          {!hasApiKey ? (
            <div className="space-y-4">
              <p className="text-sm text-zinc-500 italic">
                * Video generation requires a paid API key from a billing-enabled project. 
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-blue-400 underline ml-1">Billing Docs</a>
              </p>
              <button 
                onClick={checkAndOpenKey}
                className="bg-white text-black font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-transform hover:scale-105"
              >
                <i className="fas fa-key"></i> SELECT KEY & GENERATE
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-transform hover:scale-105"
            >
              <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
              {isGenerating ? 'SYNTHESIZING RHYTHM...' : 'REGENERATE MOTION'}
            </button>
          )}
        </div>

        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              autoPlay 
              loop 
              muted 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg font-syne text-zinc-300 animate-pulse">{status}</p>
                </div>
              ) : (
                <div className="opacity-30">
                  <i className="fas fa-film text-6xl mb-4"></i>
                  <p className="text-zinc-500">Click generate to see the magic</p>
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
