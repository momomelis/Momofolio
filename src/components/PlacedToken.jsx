export default function PlacedToken({ token }) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: token.x, top: token.y }}
    >
      <div className="relative group">
        <div
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold border-2"
          style={{ backgroundColor: token.color, borderColor: 'rgba(255,255,255,0.3)' }}
        >
          {token.name}
        </div>
        {/* Glow effect */}
        <div
          className="absolute inset-0 w-16 h-16 rounded-full blur-md opacity-50 -z-10"
          style={{ backgroundColor: token.color }}
        />
        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/90 text-white text-xs px-3 py-2 rounded whitespace-nowrap">
            {token.description}
          </div>
        </div>
      </div>
    </div>
  )
}
