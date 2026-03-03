export default function AnalysisPanel({ title, description, tokenCount, connectionCount }) {
  const density = tokenCount > 1
    ? Math.round((connectionCount / (tokenCount * (tokenCount - 1) / 2)) * 100)
    : 0

  return (
    <div className="absolute bottom-6 left-6 right-6">
      <div className="bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-md rounded-lg p-6 shadow-2xl border border-purple-500/30">
        <h2 className="text-2xl font-bold text-purple-200 mb-3">{title}</h2>
        <p className="text-purple-100 leading-relaxed">{description}</p>

        <div className="mt-4 pt-4 border-t border-purple-500/30 flex gap-6">
          <Stat label="Tokens" value={tokenCount} />
          <Stat label="Connections" value={connectionCount} />
          <Stat label="Network Density" value={`${density}%`} />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-purple-300 text-xs">{label}</div>
      <div className="text-white text-xl font-bold">{value}</div>
    </div>
  )
}
