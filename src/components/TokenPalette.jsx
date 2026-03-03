import { TOKENS } from '../constants/tokens'

export default function TokenPalette({ selectedToken, onSelect }) {
  return (
    <div className="absolute left-6 top-32 bg-black/40 backdrop-blur-md rounded-lg p-4 border border-purple-500/30">
      <h3 className="text-white text-sm font-semibold mb-3">Available Tokens</h3>
      <div className="space-y-2">
        {TOKENS.map(token => (
          <button
            key={token.id}
            onClick={() => onSelect(token)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${selectedToken?.id === token.id
                ? 'bg-purple-600 ring-2 ring-purple-400'
                : 'bg-slate-800/50 hover:bg-slate-700/50'}`}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: token.color }}
            >
              {token.name}
            </div>
            <div className="flex-1 text-left">
              <div className="text-white text-sm font-medium">{token.name}</div>
              <div className="text-purple-300 text-xs">{token.type}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
