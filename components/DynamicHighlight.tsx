
import React, { useState, useEffect } from 'react';
import { generateCultureImage } from '../services/geminiService';

interface DynamicHighlightProps {
  prompt: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: 'red' | 'green';
  className?: string;
}

const DynamicHighlight: React.FC<DynamicHighlightProps> = ({ 
  prompt, 
  title, 
  subtitle, 
  description, 
  accentColor,
  className = "" 
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await generateCultureImage(prompt);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to generate highlight image:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    fetchImage();
  }, [prompt]);

  return (
    <div className={`group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 aspect-[4/5] md:aspect-auto md:h-[700px] ${className}`}>
      {isGenerating ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-900">
          <div className={`w-12 h-12 border-4 ${accentColor === 'red' ? 'border-red-600' : 'border-green-600'} border-t-transparent rounded-full animate-spin`}></div>
          <p className="text-[10px] font-black tracking-widest uppercase opacity-40">Capturing Vision...</p>
        </div>
      ) : imageUrl ? (
        <>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 brightness-75 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-12 left-12 right-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className={`h-[2px] w-12 ${accentColor === 'red' ? 'bg-red-600' : 'bg-green-600'}`}></span>
              <span className={`text-xs font-black uppercase tracking-[0.3em] ${accentColor === 'red' ? 'text-red-500' : 'text-green-500'}`}>{subtitle}</span>
            </div>
            <h3 className="text-4xl font-syne font-black mb-4 uppercase leading-none tracking-tight">{title}</h3>
            <p className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 font-light leading-relaxed">
              {description}
            </p>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          <p className="text-zinc-500">Energy too intense to display.</p>
        </div>
      )}
    </div>
  );
};

export default DynamicHighlight;
