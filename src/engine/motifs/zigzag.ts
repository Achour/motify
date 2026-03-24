import type { MotifGenerator } from "../types"
import { withOpacity } from "../utils"

export const zigzag: MotifGenerator = (motif) => {
  const color = withOpacity(motif.color, motif.opacity)
  const size = motif.scale
  const w = motif.strokeWeight
  const baseAngle = motif.angle

  const zig = `linear-gradient(${baseAngle + 135}deg, ${color} ${w}px, transparent ${w}px)`
  const zag = `linear-gradient(${baseAngle + 225}deg, ${color} ${w}px, transparent ${w}px)`

  return {
    backgroundImage: `${zig}, ${zag}`,
    backgroundSize: `${size}px ${size}px`,
  }
}
