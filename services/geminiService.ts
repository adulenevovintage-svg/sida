
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Basic text content generation for cultural descriptions
export const generateCultureContent = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a high-energy, hyped-up paragraph about ${topic} in the Sidama region of Ethiopia. Focus on the sensory details, the energy, and why it's incredible. Keep it punchy.`,
    config: {
      temperature: 0.9,
    }
  });
  return response.text;
};

// Image generation using the flash image model
export const generateCultureImage = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `A vibrant, high-energy, high-definition artistic photo of ${prompt} in Sidama, Ethiopia. Hyper-realistic, cinematic lighting, 8k resolution, energetic atmosphere.` }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Fixed missing generateCultureVideo export for Veo models and followed video generation guidelines
export const generateCultureVideo = async (prompt: string, setStatus: (status: string) => void) => {
  // Create a new instance right before making an API call to ensure it always uses the most up-to-date API key from the dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  setStatus('Connecting to the Pulse...');
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    setStatus('The energy is building...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("The vision couldn't be captured.");
  }

  // Guidelines: Must append an API key when fetching from the download link.
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!response.ok) {
    throw new Error("Could not download the motion.");
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
