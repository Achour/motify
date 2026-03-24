import type { MotifGenerator } from "../types"
import { withOpacity } from "../utils"

export const grid: MotifGenerator = (motif) => {
  const color = withOpacity(motif.color, motif.opacity)
  const size = motif.scale + motif.spacing
  const w = motif.strokeWeight
  const angle = motif.angle

  const horizontal = `repeating-linear-gradient(${angle}deg, ${color} 0px, ${color} ${w}px, transparent ${w}px, transparent ${size}px)`
  const vertical = `repeating-linear-gradient(${angle + 90}deg, ${color} 0px, ${color} ${w}px, transparent ${w}px, transparent ${size}px)`

  return {
    backgroundImage: `${horizontal}, ${vertical}`,
    backgroundSize: `${size}px ${size}px`,
  }
}
