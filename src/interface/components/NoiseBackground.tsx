import React, { useEffect, useRef } from 'react'

type Props = {
	active: boolean
}

export const NoiseBackground: React.FC<Props> = ({ active }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current

		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return

		let animationFrameId: number

		const draw = () => {
			const imageData = ctx.createImageData(canvas.width, canvas.height)
			const data = imageData.data
			for (let i = 0; i < data.length; i += 4) {
				const shade = Math.random() * 255
				data[i] = data[i + 1] = data[i + 2] = shade
				data[i + 3] = 30
			}
			ctx.putImageData(imageData, 0, 0)
			animationFrameId = requestAnimationFrame(draw)
		}

		if (active) {
			draw()
		}

		return () => cancelAnimationFrame(animationFrameId)
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
				background: '#F0F0F0',
			}}
			width={window.innerWidth}
			height={window.innerHeight}
		/>
	)
}
