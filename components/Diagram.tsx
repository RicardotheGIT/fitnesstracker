'use client';

import { useState, useEffect } from 'react';
import StickFigure from './StickFigure';
import { POSES } from '@/lib/data';

export default function Diagram({ poseKey, color, playing }: { poseKey: string; color: string; playing: boolean }) {
  const [frame, setFrame] = useState(0);
  const poses = POSES[poseKey] ?? POSES.squatPress;

  useEffect(() => {
    if (!playing) { setFrame(0); return; }
    const iv = setInterval(() => setFrame((f) => (f + 1) % poses.length), 600);
    return () => clearInterval(iv);
  }, [playing, poses.length]);

  return (
    <svg viewBox="0 0 100 90" width="90" height="80" style={{ overflow: 'visible' }}>
      <StickFigure pose={poses[frame]} color={color} />
    </svg>
  );
}
