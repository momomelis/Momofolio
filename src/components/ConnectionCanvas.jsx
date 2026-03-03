import { CONNECTION_COLORS } from '../constants/relationships'

function connectionColor(type) {
  return CONNECTION_COLORS[type] ?? 'rgba(255,255,255,0.5)'
}

function connectionWidth(strength) {
  return 1 + strength * 2.5
}

export default function ConnectionCanvas({ connections }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn, i) => (
        <g key={i}>
          <line
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x1 + (conn.x2 - conn.x1) * conn.progress}
            y2={conn.y1 + (conn.y2 - conn.y1) * conn.progress}
            stroke={connectionColor(conn.type)}
            strokeWidth={connectionWidth(conn.strength)}
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {conn.progress === 1 && (
            <text
              x={(conn.x1 + conn.x2) / 2}
              y={(conn.y1 + conn.y2) / 2 - 8}
              fill="white"
              fontSize="11"
              fontFamily="monospace"
              textAnchor="middle"
              opacity="0.7"
            >
              {conn.type}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
