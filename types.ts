
export interface CulturalFact {
  title: string;
  description: string;
  category: 'History' | 'Food' | 'Dance' | 'Festival';
  icon: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export enum AppSection {
  Home = 'home',
  Gallery = 'gallery',
  Experience = 'experience',
  Live = 'live'
}
