import React from 'react';
import { useNoise } from '../hooks/useNoise';

export const NoiseController: React.FC = () => {
  const { isPlaying, toggle, volume, setVolume } = useNoise();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🌫️ noise</h1>
      <button onClick={toggle}>
        {isPlaying ? 'pause' : 'play'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="volume">Volume: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};
