import React from 'react';
import { useNoise } from '../hooks/useNoise';

export const NoiseController: React.FC = () => {
  const { isPlaying, toggle, volume, setVolume } = useNoise();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🌫️ noise</h1>
      <button 
        style={{
          
          cursor: 'pointer',
          border:"none",
          width:"80px",
          height:"80px",
          padding:0,
          borderRadius:"50%",
          textAlign:'center',
        }}
        onClick={toggle} 
        >
        {isPlaying ? 'pause' : 'play'}
      </button>
      <div style={{ marginTop: '2rem' }}>
        <label htmlFor="volume">Volume: </label>
        <input
          style={{
            width: '200px',
            accentColor: '#888', 
            cursor: 'pointer',
          }}
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
