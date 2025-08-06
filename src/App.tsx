import React from 'react'
import { NoiseProvider, useNoiseContext } from './interface/context/NoiseContext'
import { NoiseBackground } from './interface/components/NoiseBackground'
import { NoiseController } from './interface/components/NoiseController'
import { useNoise } from './interface/hooks/useNoise'

function App() {
	return (
		<NoiseProvider>
			<AppContent />
		</NoiseProvider>
	)
}

function AppContent() {
	const noise = useNoise()
	return (
		<>
			<NoiseBackground active={noise.isPlaying} />
			<NoiseController {...noise} />
		</>
	)
}

export default App
