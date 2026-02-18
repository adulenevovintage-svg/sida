
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
  const [content, setContent] = useState<string>('Loading the hype...');
  const [isLoading, setIsLoading] = useState(true);

  // Map color names to Tailwind color classes to ensure JIT picks them up correctly
  const borderColors: Record<string, string> = {
    red: 'hover:border-red-500',
    green: 'hover:border-green-500',
    yellow: 'hover:border-yellow-500',
  };

  const iconBgColors: Record<string, string> = {
    red: 'bg-red-500 shadow-red-500/50',
    green: 'bg-green-500 shadow-green-500/50',
    yellow: 'bg-yellow-500 shadow-yellow-500/50',
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
    <div className={`group relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 ${borderColors[color] || 'hover:border-white/20'} transition-all duration-500`}>
      <div className="h-64 overflow-hidden relative">
        {/* Subtle Darkening Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
        
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-xl ${iconBgColors[color]} shadow-lg z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
          <i className={`fas ${icon} text-white`}></i>
        </div>
      </div>
      
      <div className="p-8 relative z-20">
        <h3 className="text-3xl font-bold font-syne mb-4 group-hover:text-green-400 transition-colors duration-300">
          {title}
        </h3>
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-zinc-800 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-zinc-800 rounded w-4/6 animate-pulse"></div>
          </div>
        ) : (
          <p className="text-zinc-400 leading-relaxed font-light transition-colors duration-300 group-hover:text-zinc-300">
            {content}
          </p>
        )}
      </div>
      
      {/* Animated accent line at the bottom */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-${color === 'yellow' ? 'yellow-500' : color + '-500'} to-transparent transition-all duration-700 group-hover:w-full opacity-50`}></div>
    </div>
  );
};

export default CultureCard;
