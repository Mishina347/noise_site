export interface NoiseEngine {
  play(): void;
  stop(): void;
  setVolume(value: number): void;
  isPlaying(): boolean;
}
