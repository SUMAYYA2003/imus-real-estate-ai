export interface CinematicIntroProps {
  videoSrc?: string;
  onComplete: () => void;
  storageKey?: string;
}

export type PlaybackStatus = 'loading' | 'playing' | 'fading' | 'bypassed';