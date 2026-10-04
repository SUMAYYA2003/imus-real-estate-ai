'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CinematicIntroProps, PlaybackStatus } from '@/types/intro';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  videoSrc = '/video/imus-intro.mp4',
  onComplete,
}) => {
  const [status, setStatus] = useState<PlaybackStatus>('loading');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const triggerComplete = useCallback(() => {
    setStatus('fading');
    setTimeout(() => {
      onComplete();
    }, 900);
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      onComplete();
      setStatus('bypassed');
      return;
    }

    const safetyTimer = setTimeout(() => {
      if (status === 'loading') {
        triggerComplete();
      }
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, [triggerComplete, onComplete, status]);

  if (status === 'bypassed') {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07060A] transition-opacity duration-900 ease-out ${
        status === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        className="w-full h-full object-cover"
        onCanPlay={() => setStatus('playing')}
        onEnded={triggerComplete}
        onError={triggerComplete}
      />

      <button
        onClick={triggerComplete}
        className="absolute bottom-8 right-8 px-4 py-2 text-xs font-medium tracking-wider uppercase text-purple-200/70 hover:text-white bg-black/50 hover:bg-black/80 border border-purple-500/30 hover:border-purple-400 rounded-full backdrop-blur-md transition-all cursor-pointer z-10"
      >
        Skip Intro
      </button>
    </div>
  );
};
