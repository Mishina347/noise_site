import { useMemo, useState } from 'react';
import { NoisePlayer } from '../../usecase/NoisePlayer';
import { WebNoiseEngine } from '../../infrastructure/WebNoiseEngine';

export const useNoise = () => {
  const player = useMemo(() => new NoisePlayer(new WebNoiseEngine()), []);
  const [isPlaying, setIsPlaying] = useState(player.isPlaying());
  const [volume, setVolume] = useState(0.5);

  const toggle = () => {
    player.toggle();
    setIsPlaying(player.isPlaying());
  };

  const setVol = (v: number) => {
    setVolume(v);
    player.setVolume(v);
  };

  return {
    isPlaying,
    volume,
    toggle,
    setVolume: setVol,
  };
};
