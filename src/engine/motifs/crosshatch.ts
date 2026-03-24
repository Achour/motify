import type { MotifGenerator } from "../types"
import { withOpacity } from "../utils"

export const crosshatch: MotifGenerator = (motif) => {
  const color = withOpacity(motif.color, motif.opacity)
  const size = motif.scale + motif.spacing
  const w = motif.strokeWeight
  const angle = motif.angle

  const line1 = `repeating-linear-gradient(${angle + 45}deg, transparent 0px, transparent ${size / 2 - w}px, ${color} ${size / 2 - w}px, ${color} ${size / 2}px, transparent ${size / 2}px, transparent ${size}px)`
  const line2 = `repeating-linear-gradient(${angle - 45}deg, transparent 0px, transparent ${size / 2 - w}px, ${color} ${size / 2 - w}px, ${color} ${size / 2}px, transparent ${size / 2}px, transparent ${size}px)`

  return {
    backgroundImage: `${line1}, ${line2}`,
    backgroundSize: `${size}px ${size}px`,
  }
}
