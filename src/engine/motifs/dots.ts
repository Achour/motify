import type { MotifGenerator } from "../types"
import { withOpacity } from "../utils"

export const dots: MotifGenerator = (motif) => {
  const color = withOpacity(motif.color, motif.opacity)
  const size = motif.scale + motif.spacing
  const radius = motif.strokeWeight
  const half = size / 2

  // Two offset radial gradients for a staggered dot pattern
  const dot1 = `radial-gradient(circle ${radius}px at ${radius}px ${radius}px, ${color} 100%, transparent 100%)`
  const dot2 = `radial-gradient(circle ${radius}px at ${half + radius}px ${half + radius}px, ${color} 100%, transparent 100%)`

  return {
    backgroundImage: `${dot1}, ${dot2}`,
    backgroundSize: `${size}px ${size}px`,
  }
}
