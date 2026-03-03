// Lending and liquidity relationships between Jupiter ecosystem tokens.
// Keys are "TokenA-TokenB"; lookup checks both directions.
export const RELATIONSHIPS = {
  'JLP-USDC':      { type: 'primary-liquidity',    strength: 1.00, desc: 'Primary liquidity pair' },
  'JLP-SOL':       { type: 'collateral',            strength: 0.90, desc: 'Collateral backing' },
  'SOL-USDC':      { type: 'lending-pair',          strength: 0.95, desc: 'Core lending market' },
  'SOL-mSOL':      { type: 'derivative',            strength: 0.85, desc: 'Liquid staking derivative' },
  'SOL-jitoSOL':   { type: 'derivative',            strength: 0.85, desc: 'Liquid staking derivative' },
  'SOL-bonkSOL':   { type: 'derivative',            strength: 0.80, desc: 'Liquid staking derivative' },
  'mSOL-USDC':     { type: 'lending-pair',          strength: 0.75, desc: 'LST lending market' },
  'jitoSOL-USDC':  { type: 'lending-pair',          strength: 0.75, desc: 'LST lending market' },
  'bonkSOL-USDC':  { type: 'lending-pair',          strength: 0.70, desc: 'LST lending market' },
  'JTO-JLP':       { type: 'governance',            strength: 0.60, desc: 'Governance relationship' },
  'USDC-USDT':     { type: 'stable-pair',           strength: 0.95, desc: 'Stablecoin liquidity' },
  'USDT-SOL':      { type: 'lending-pair',          strength: 0.85, desc: 'Alternative stable lending' },
  'JTO-USDC':      { type: 'governance-liquidity',  strength: 0.65, desc: 'DAO treasury pair' },
}

export const CONNECTION_COLORS = {
  'primary-liquidity':   'rgba(0, 212, 170, 0.8)',
  'collateral':          'rgba(153, 69, 255, 0.7)',
  'lending-pair':        'rgba(39, 117, 202, 0.7)',
  'derivative':          'rgba(124, 101, 193, 0.6)',
  'governance':          'rgba(255, 184, 0, 0.6)',
  'stable-pair':         'rgba(38, 161, 123, 0.7)',
  'governance-liquidity':'rgba(255, 184, 0, 0.5)',
}
