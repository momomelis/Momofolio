import { useRef } from 'react'
import { useTokenNetwork } from '../hooks/useTokenNetwork'
import TokenPalette from './TokenPalette'
import PlacedToken from './PlacedToken'
import ConnectionCanvas from './ConnectionCanvas'
import AnalysisPanel from './AnalysisPanel'

export default function JupiterLendingViz() {
  const canvasRef = useRef(null)
  const {
    placedTokens, selectedToken, setSelectedToken,
    isAnalyzing, analysis, animatedConnections,
    placeToken, revealNetwork, reset,
  } = useTokenNetwork()

  function handleCanvasClick(e) {
    if (!selectedToken || isAnalyzing) return
    const rect = canvasRef.current.getBoundingClientRect()
    placeToken(selectedToken, e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(147,51,234,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(147,51,234,0.3) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onClick={handleCanvasClick}
      >
        <ConnectionCanvas connections={animatedConnections} />
        {placedTokens.map(token => (
          <PlacedToken key={token.placedId} token={token} />
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6 right-6 pointer-events-none">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Jupiter Lending Protocol Network</h1>
            <p className="text-purple-300 text-sm">Visualize token relationships and lending mechanics</p>
          </div>
          <div className="flex gap-3 pointer-events-auto">
            <button
              onClick={revealNetwork}
              disabled={isAnalyzing || placedTokens.length < 2}
              className={`bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg
                ${isAnalyzing || placedTokens.length < 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500'}`}
            >
              {isAnalyzing ? 'Analyzing…' : 'Reveal Network'}
            </button>
            <button
              onClick={reset}
              className="bg-slate-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-600 transition-all duration-200 shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <TokenPalette selectedToken={selectedToken} onSelect={setSelectedToken} />

      {analysis.title && (
        <AnalysisPanel
          title={analysis.title}
          description={analysis.description}
          tokenCount={placedTokens.length}
          connectionCount={animatedConnections.length}
        />
      )}

      {/* Instructions */}
      {!analysis.title && (
        <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none">
          {selectedToken ? (
            <p className="text-purple-300 text-sm">
              Click anywhere to place <span className="font-bold text-white">{selectedToken.name}</span>
            </p>
          ) : placedTokens.length === 0 ? (
            <p className="text-purple-300 text-sm">
              Select a token from the palette, then click on the canvas to place it
            </p>
          ) : null}
        </div>
      )}
    </div>
  )
}
