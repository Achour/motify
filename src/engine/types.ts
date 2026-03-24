export type MotifType = "grid" | "dots" | "waves" | "zigzag" | "crosshatch"

export interface BaseLayer {
  type: "solid" | "linear-gradient" | "radial-gradient"
  colors: string[]
  angle: number
}

export interface MotifLayer {
  type: MotifType
  color: string
  scale: number
  spacing: number
  strokeWeight: number
  angle: number
  opacity: number
}

export interface ModifierLayer {
  enabled: boolean
  type: "vignette" | "fade"
  intensity: number
}

export interface PresetConfig {
  id: string
  name: string
  description: string
  base: BaseLayer
  motif: MotifLayer
  modifiers: ModifierLayer[]
}

export interface GeneratedCSS {
  backgroundImage: string
  backgroundSize: string
  backgroundColor: string
}

export interface MotifResult {
  backgroundImage: string
  backgroundSize: string
}

export type MotifGenerator = (motif: MotifLayer) => MotifResult
