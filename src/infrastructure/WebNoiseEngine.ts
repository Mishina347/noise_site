// src/infrastructure/WebNoiseEngine.ts
import { NoiseEngine } from '../domain/noise'

export class WebNoiseEngine implements NoiseEngine {
	private ctx: AudioContext | null = null
	private source: AudioBufferSourceNode | null = null
	private gain: GainNode | null = null
	private filter: BiquadFilterNode | null = null
	private playing = false

	private createBrownNoiseBuffer(ctx: AudioContext): AudioBuffer {
		const bufferSize = 2 * ctx.sampleRate
		const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
		const data = buffer.getChannelData(0)
		let lastOut = 0.0

		for (let i = 0; i < bufferSize; i++) {
			const white = Math.random() * 2 - 1
			data[i] = (lastOut + 0.02 * white) / 1.02
			lastOut = data[i]
			data[i] *= 3.5
		}

		return buffer
	}

	play(): void {
		if (this.playing) return
		if (!this.ctx) this.ctx = new AudioContext()
		this.playing = true
		const buffer = this.createBrownNoiseBuffer(this.ctx)
		const source = this.ctx.createBufferSource()

		source.buffer = buffer
		source.loop = true

		const gain = this.ctx.createGain()
		gain.gain.value = 0.5

		const filter = this.ctx.createBiquadFilter()
		filter.type = 'lowpass'
		filter.frequency.value = 100 // lower frequency for muffled sound
		filter.Q.value = 0.8

		source.connect(filter).connect(gain).connect(this.ctx.destination)
		source.start()

		this.source = source
		this.gain = gain
		this.filter = filter
		this.playing = true
	}

	stop(): void {
		if (!this.playing) return
		this.source?.stop()
		this.source?.disconnect()
		this.source = null
		this.playing = false
	}

	setVolume(value: number): void {
		if (this.gain) {
			this.gain.gain.value = value
		}
	}

	isPlaying(): boolean {
		return this.playing
	}
}

let instance: WebNoiseEngine | null = null

export const getWebNoiseEngine = (): WebNoiseEngine => {
	if (!instance) {
		instance = new WebNoiseEngine()
	}
	return instance
}
