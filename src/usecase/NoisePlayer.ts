import { NoiseEngine } from '../domain/noise'

export class NoisePlayer {
	constructor(private engine: NoiseEngine) {}

	toggle(): void {
		this.engine.isPlaying() ? this.engine.stop() : this.engine.play()
	}

	setVolume(value: number): void {
		this.engine.setVolume(value)
	}

	isPlaying(): boolean {
		return this.engine.isPlaying()
	}
}
