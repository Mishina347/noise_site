import React, { createContext, useContext, useMemo, useState } from 'react'
import { NoisePlayer } from '../../usecase/NoisePlayer'
import { getWebNoiseEngine } from '../../infrastructure/WebNoiseEngine'

type NoiseContextType = {
	isPlaying: boolean
	volume: number
	toggle: () => void
	setVolume: (v: number) => void
}

const NoiseContext = createContext<NoiseContextType | undefined>(undefined)

export const NoiseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const player = useMemo(() => new NoisePlayer(getWebNoiseEngine()), [])
	const [isPlaying, setIsPlaying] = useState(player.isPlaying())
	const [volume, setVolume] = useState(0.5)

	const toggle = () => {
		player.toggle()
		setIsPlaying(player.isPlaying())
	}

	const handleSetVolume = (v: number) => {
		setVolume(v)
		player.setVolume(v)
	}

	return (
		<NoiseContext.Provider
			value={{
				isPlaying,
				volume,
				toggle,
				setVolume: handleSetVolume,
			}}
		>
			{children}
		</NoiseContext.Provider>
	)
}

export const useNoiseContext = () => {
	const context = useContext(NoiseContext)
	if (!context) {
		throw new Error('useNoiseContext must be used within a NoiseProvider')
	}
	return context
}
