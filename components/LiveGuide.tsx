
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

const LiveGuide: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Standby');
  const [transcript, setTranscript] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const sessionRef = useRef<any>(null);
  // Ref for the session promise to avoid race conditions during data streaming
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  // nextStartTime tracks the exact end time of the previous audio chunk for gapless playback
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  // Manual audio decoding for raw PCM streams as required by Live API rules
  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const createBlob = (data: Float32Array) => {
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
    return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
  };

  const startSession = async () => {
    setStatus('Activating the Pulse...');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputAudioContext = new AudioContext({ sampleRate: 16000 });
    const outputAudioContext = new AudioContext({ sampleRate: 24000 });
    audioContextRef.current = outputAudioContext;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          setStatus('PULSE ACTIVE');
          setIsActive(true);
          const source = inputAudioContext.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            // CRITICAL: Always use sessionPromise to send data to prevent race conditions and handle stale closures
            sessionPromise.then(s => s.sendRealtimeInput({ media: createBlob(inputData) }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContext.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio) {
            const buffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
            const source = outputAudioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(outputAudioContext.destination);
            
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
            });

            // Gapless playback logic: schedule next chunk at the exact end of previous chunk
            const now = outputAudioContext.currentTime;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }

          // Handle interruptions to stop current playback immediately
          const interrupted = message.serverContent?.interrupted;
          if (interrupted) {
            for (const source of sourcesRef.current.values()) {
              source.stop();
              sourcesRef.current.delete(source);
            }
            nextStartTimeRef.current = 0;
          }

          if (message.serverContent?.outputTranscription) setTranscript(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
        },
        onclose: () => { setIsActive(false); setStatus('Standby'); },
        onerror: (e) => console.error(e)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        outputAudioTranscription: {},
        systemInstruction: "You are 'The Pulse', a high-energy Sidama Guide. You speak with intense rhythm and pride. If the user uploads a photo, react to it instantly with hyped cultural context! Greet the user like they just walked into the middle of Fichee-Chambalaalla festival!"
      }
    });
    sessionPromiseRef.current = sessionPromise;
    sessionRef.current = await sessionPromise;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && sessionPromiseRef.current) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setPreviewImage(event.target?.result as string);
        // Ensure data is sent after connection resolves to avoid race conditions
        sessionPromiseRef.current?.then((session) => {
          session.sendRealtimeInput({
            media: { data: base64, mimeType: 'image/jpeg' }
          });
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {previewImage && (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-red-500 animate-pulse">
          <img src={previewImage} className="w-full h-full object-cover" />
          <button onClick={() => setPreviewImage(null)} className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center text-[8px]">CLEAR</button>
        </div>
      )}
      
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-red-600 to-green-600 rounded-full blur opacity-25 ${isActive ? 'animate-pulse opacity-75' : ''}`}></div>
        <div className="relative bg-zinc-950 rounded-full px-6 py-3 flex items-center gap-4 border border-white/10">
          <div className="flex flex-col min-w-[80px]">
            <span className="text-[10px] font-black text-red-500 tracking-[0.2em]">{status}</span>
            <span className="text-xs font-syne font-black">GUIDE</span>
          </div>
          
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:text-green-500 transition-colors"
            title="Upload cultural discovery"
          >
            <i className="fas fa-camera"></i>
          </button>

          {isActive ? (
            <button onClick={() => sessionRef.current?.close()} className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"><i className="fas fa-stop text-sm"></i></button>
          ) : (
            <button onClick={startSession} className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"><i className="fas fa-microphone text-sm"></i></button>
          )}
        </div>
        
        {transcript && isActive && (
          <div className="absolute top-full mt-4 right-0 w-64 bg-black/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 text-[10px] text-zinc-400 font-medium leading-relaxed shadow-2xl">
            {transcript.split(' ').slice(-20).join(' ')}...
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveGuide;
