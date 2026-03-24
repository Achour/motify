import type { MotifGenerator } from "../types"
import { withOpacity } from "../utils"

export const waves: MotifGenerator = (motif) => {
  const color = withOpacity(motif.color, motif.opacity)
  const size = motif.scale
  const w = motif.strokeWeight
  const angle = motif.angle

  // Create wave-like effect using multiple offset gradients
  const wave1 = `repeating-linear-gradient(${angle}deg, transparent 0px, transparent ${size / 2 - w}px, ${color} ${size / 2 - w}px, ${color} ${size / 2}px, transparent ${size / 2}px, transparent ${size}px)`
  const wave2 = `repeating-linear-gradient(${angle + 60}deg, transparent 0px, transparent ${size / 2 - w}px, ${color} ${size / 2 - w}px, ${color} ${size / 2}px, transparent ${size / 2}px, transparent ${size}px)`

  return {
    backgroundImage: `${wave1}, ${wave2}`,
    backgroundSize: `${size}px ${size}px`,
  }
}
