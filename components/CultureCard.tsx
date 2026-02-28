
import React, { useState, useEffect } from 'react';
import { generateCultureContent } from '../services/geminiService';

interface CultureCardProps {
  title: string;
  topic: string;
  icon: string;
  imageUrl: string;
  color: string;
}

const CultureCard: React.FC<CultureCardProps> = ({ title, topic, icon, imageUrl, color }) => {
  const [content, setContent] = useState<string>('Loading the pulse...');
  const [isLoading, setIsLoading] = useState(true);

  const borderColors: Record<string, string> = {
    red: 'hover:border-red-500/50',
    green: 'hover:border-green-500/50',
    yellow: 'hover:border-yellow-500/50',
  };

  const iconBgColors: Record<string, string> = {
    red: 'bg-red-500 shadow-red-500/30',
    green: 'bg-green-500 shadow-green-500/30',
    yellow: 'bg-yellow-500 shadow-yellow-500/30',
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const text = await generateCultureContent(topic);
        setContent(text || 'The energy is too high to describe!');
      } catch (e) {
        setContent('Experience the vibration of Sidama firsthand.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [topic]);

  return (
    <div className={`group relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-white/5 ${borderColors[color] || 'hover:border-white/20'} transition-all duration-500 shadow-xl`}>
      <div className="h-60 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700 z-10"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-base ${iconBgColors[color]} shadow-lg z-20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
          <i className={`fas ${icon} text-white`}></i>
        </div>
      </div>
      
      <div className="p-8 relative z-20">
        <h3 className="text-2xl font-bold font-syne mb-4 group-hover:text-white transition-colors duration-300 tracking-tight">
          {title}
        </h3>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-3 bg-zinc-800 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-zinc-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-3 bg-zinc-800 rounded w-4/6 animate-pulse"></div>
          </div>
        ) : (
          <p className="text-zinc-400 leading-relaxed font-light text-sm transition-colors duration-300 group-hover:text-zinc-300">
            {content}
          </p>
        )}
      </div>
      
      {/* Animated accent line */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${color === 'yellow' ? 'yellow-500' : color + '-500'} transition-all duration-700 group-hover:w-full opacity-60`}></div>
    </div>
  );
};

export default CultureCard;
