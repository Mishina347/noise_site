import React from 'react'

type Props = {
	isPlaying: boolean
	toggle: () => void
	volume: number
	setVolume: (v: number) => void
}

export const NoiseController: React.FC<Props> = ({ isPlaying, toggle, volume, setVolume }) => {
	return (
		<div style={{ padding: '2rem', textAlign: 'center' }}>
			<h1 id="noise-title" style={{ color: 'white' }}>
				make noise
			</h1>
			<button
				aria-label={isPlaying ? 'Pause noise' : 'Play noise'}
				aria-pressed={isPlaying}
				style={{
					cursor: 'pointer',
					border: 'none',
					boxShadow: '9px 9px 18px #F5D1BDFF, -9px -9px 18px #F9CEC4FF',
					backgroundColor: '#FFFFFF',
					width: '80px',
					height: '80px',
					padding: 0,
					borderRadius: '50%',
					textAlign: 'center',
					fontWeight: 'bold',
				}}
				onClick={toggle}
			>
				{isPlaying ? 'pause' : 'play'}
			</button>
			<div style={{ marginTop: '2rem' }}>
				<div style={{ margin: 'auto', maxWidth: '200px' }}>
					<label style={{ color: 'white' }} htmlFor="volume" id="volume-label">
						Volume:{' '}
						<p aria-live="polite" style={{ fontSize: '1.7rem', color: 'white', margin: '1rem' }}>
							{Math.round(volume * 100)}
						</p>
					</label>
				</div>
				<input
					style={{
						marginTop: '1rem',
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
					onChange={e => setVolume(parseFloat(e.target.value))}
					aria-labelledby="volume-label"
					aria-valuemin={0}
					aria-valuemax={1}
					aria-valuenow={parseFloat(volume.toFixed(2))}
					aria-valuetext={`${Math.round(volume * 100)} percent`}
					role="slider"
				/>
			</div>
		</div>
	)
}
