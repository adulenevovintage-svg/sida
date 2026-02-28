
import React, { useState, useRef } from 'react';

interface LiveGuideProps {
  onMomentCaptured: (moment: { type: 'video' | 'image'; url: string; timestamp: number }) => void;
}

const LiveGuide: React.FC<LiveGuideProps> = ({ onMomentCaptured }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Standby');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      setStatus('Accessing Lens...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: true 
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        onMomentCaptured({
          type: 'video',
          url: url,
          timestamp: Date.now()
        });
        
        // Cleanup stream
        streamRef.current?.getTracks().forEach(track => track.stop());
        setStatus('Pulse Saved!');
        setTimeout(() => setStatus('Standby'), 2000);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatus('CAPTURING VIBE...');
    } catch (err) {
      console.error("Camera access denied or error:", err);
      setStatus('Access Denied');
      setTimeout(() => setStatus('Standby'), 3000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-red-600 to-green-600 rounded-full blur opacity-25 ${isRecording ? 'animate-pulse opacity-75' : 'group-hover:opacity-50'}`}></div>
        
        <div className="relative bg-zinc-950 rounded-full pl-6 pr-2 py-2 flex items-center gap-4 border border-white/10 shadow-2xl">
          <div className="flex flex-col min-w-[100px]">
            <span className={`text-[9px] font-black tracking-[0.2em] uppercase transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
              {status}
            </span>
            <span className="text-xs font-syne font-black uppercase tracking-tighter">Capture Moment</span>
          </div>

          {isRecording ? (
            <button 
              onClick={stopRecording}
              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-lg shadow-red-900/40"
              title="Stop Capturing"
            >
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </button>
          ) : (
            <button 
              onClick={startRecording}
              className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-lg shadow-green-900/40 group-hover:bg-green-500"
              title="Start Capturing"
            >
              <i className="fas fa-camera text-white text-lg"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveGuide;
