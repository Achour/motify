import type { MotifGenerator, MotifType } from "../types"
import { grid } from "./grid"
import { dots } from "./dots"
import { waves } from "./waves"
import { zigzag } from "./zigzag"
import { crosshatch } from "./crosshatch"

export const motifRegistry: Record<MotifType, MotifGenerator> = {
  grid,
  dots,
  waves,
  zigzag,
  crosshatch,
}
