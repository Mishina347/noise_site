import React, { useEffect, useRef } from 'react'

type Props = {
	active: boolean
}

export const NoiseBackground: React.FC<Props> = ({ active }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const animationRef = useRef<number | null>(null)
	const lastDrawTime = useRef(0)
	const FPS = 20 // 描画間引き：1秒間に20回

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		let mounted = true

		const draw = (timestamp: number) => {
			if (!mounted || !active) return

			// FPS制限（requestAnimationFrameは60FPS → 間引く）
			if (timestamp - lastDrawTime.current < 1000 / FPS) {
				animationRef.current = requestAnimationFrame(draw)
				return
			}
			lastDrawTime.current = timestamp

			const width = canvas.width
			const height = canvas.height
			const imageData = ctx.createImageData(width, height)
			const data = imageData.data

			for (let i = 0; i < data.length; i += 4) {
				const shade = Math.random() * 255
				data[i] = data[i + 1] = data[i + 2] = shade
				data[i + 3] = 30
			}

			ctx.putImageData(imageData, 0, 0)
			animationRef.current = requestAnimationFrame(draw)
		}

		if (active) {
			animationRef.current = requestAnimationFrame(draw)
		}

		return () => {
			mounted = false
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [active])

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: -1,
				width: '100vw',
				height: '100vh',
				background: '#000',
			}}
			width={window.innerWidth}
			height={window.innerHeight}
		/>
	)
}
