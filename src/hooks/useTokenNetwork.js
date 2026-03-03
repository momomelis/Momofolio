import { useState } from 'react'
import { RELATIONSHIPS } from '../constants/relationships'

function buildConnections(tokens) {
  const result = []
  for (let i = 0; i < tokens.length; i++) {
    for (let j = i + 1; j < tokens.length; j++) {
      const a = tokens[i]
      const b = tokens[j]
      const rel = RELATIONSHIPS[`${a.id}-${b.id}`] || RELATIONSHIPS[`${b.id}-${a.id}`]
      if (rel) {
        result.push({
          from: a, to: b,
          type: rel.type, strength: rel.strength, description: rel.desc,
          x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        })
      }
    }
  }
  return result
}

function animateConnections(connections, setAnimatedConnections) {
  let delay = 0
  connections.forEach((conn, index) => {
    setTimeout(() => {
      setAnimatedConnections(prev => [...prev, { ...conn, progress: 0, id: index }])

      const startTime = Date.now()
      const duration = 400
      const tick = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1)
        setAnimatedConnections(prev =>
          prev.map(c => c.id === index ? { ...c, progress } : c)
        )
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    delay += 150
  })
  return delay
}

async function fetchAnalysis(placedTokens, connections) {
  const tokenNames = placedTokens.map(t => t.name).join(', ')
  const connectionDetails = connections
    .map(c => `${c.from.name} ↔ ${c.to.name}: ${c.description} (${c.type})`)
    .join('\n')

  const prompt = `Analyze this Jupiter Lending Protocol token network configuration:
<network_details>
Tokens placed: ${tokenNames}
Number of tokens: ${placedTokens.length}
Active connections: ${connections.length}

Connection details:
${connectionDetails}
</network_details>

Based on these specific tokens and their relationships in the Jupiter ecosystem, explain:
1. What this configuration reveals about the lending/liquidity strategy
2. Key risk factors or opportunities in these relationships
3. How capital flows through these connections

Focus on collateral efficiency (95% LTV), liquidity depth, LST derivative relationships, and smart contract dependencies.

Return JSON only:
{ "title": "Network Configuration Name", "analysis": "2-3 sentence analysis paragraph" }`

  const response = await window.claude.complete(prompt)
  return JSON.parse(response)
}

export function useTokenNetwork() {
  const [placedTokens, setPlacedTokens] = useState([])
  const [selectedToken, setSelectedToken] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState({ title: '', description: '' })
  const [animatedConnections, setAnimatedConnections] = useState([])

  function placeToken(token, x, y) {
    setPlacedTokens(prev => [...prev, { ...token, x, y, placedId: Date.now() }])
    setSelectedToken(null)
  }

  async function revealNetwork() {
    if (placedTokens.length < 2) {
      alert('Place at least 2 tokens to see their relationships!')
      return
    }

    setIsAnalyzing(true)
    setAnimatedConnections([])

    const connections = buildConnections(placedTokens)
    const animDelay = animateConnections(connections, setAnimatedConnections)

    setTimeout(async () => {
      try {
        const result = await fetchAnalysis(placedTokens, connections)
        setAnalysis({ title: result.title, description: result.analysis })
      } catch {
        setAnalysis({
          title: 'Token Network Configuration',
          description: `This configuration connects ${placedTokens.length} tokens through ${connections.length} lending and liquidity relationships in the Jupiter ecosystem.`,
        })
      }
      setIsAnalyzing(false)
    }, animDelay + 400)
  }

  function reset() {
    setPlacedTokens([])
    setAnimatedConnections([])
    setAnalysis({ title: '', description: '' })
    setSelectedToken(null)
  }

  return {
    placedTokens,
    selectedToken,
    setSelectedToken,
    isAnalyzing,
    analysis,
    animatedConnections,
    placeToken,
    revealNetwork,
    reset,
  }
}
