import type { PresetConfig } from "./types"

export const presets: PresetConfig[] = [
  {
    id: "neon-grid",
    name: "Neon Grid",
    description: "Cyberpunk-inspired neon grid on dark background",
    base: { type: "solid", colors: ["#0a0a0a"], angle: 180 },
    motif: { type: "grid", color: "#ff00ff", scale: 40, spacing: 0, strokeWeight: 1, angle: 0, opacity: 0.6 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "dot-matrix",
    name: "Dot Matrix",
    description: "Retro terminal-style green dots",
    base: { type: "solid", colors: ["#0d1117"], angle: 180 },
    motif: { type: "dots", color: "#00ff41", scale: 20, spacing: 4, strokeWeight: 2, angle: 0, opacity: 0.5 },
    modifiers: [
      { enabled: true, type: "vignette", intensity: 0.4 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    description: "Calming blue gradient with white wave lines",
    base: { type: "linear-gradient", colors: ["#0c4a6e", "#075985", "#0369a1"], angle: 180 },
    motif: { type: "waves", color: "#ffffff", scale: 60, spacing: 10, strokeWeight: 2, angle: 0, opacity: 0.15 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: true, type: "fade", intensity: 0.2 },
    ],
  },
  {
    id: "zigzag-sunset",
    name: "Zigzag Sunset",
    description: "Warm sunset gradient with dark zigzag pattern",
    base: { type: "linear-gradient", colors: ["#f97316", "#ef4444", "#dc2626"], angle: 135 },
    motif: { type: "zigzag", color: "#1c1917", scale: 30, spacing: 0, strokeWeight: 3, angle: 0, opacity: 0.2 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Technical blueprint with white crosshatch lines",
    base: { type: "solid", colors: ["#1e3a5f"], angle: 180 },
    motif: { type: "crosshatch", color: "#ffffff", scale: 30, spacing: 10, strokeWeight: 1, angle: 0, opacity: 0.2 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "minimal-dots",
    name: "Minimal Dots",
    description: "Clean and subtle light dot pattern",
    base: { type: "solid", colors: ["#fafafa"], angle: 180 },
    motif: { type: "dots", color: "#d4d4d4", scale: 24, spacing: 8, strokeWeight: 3, angle: 0, opacity: 0.8 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "retro-lines",
    name: "Retro Lines",
    description: "Warm cream background with brown grid lines",
    base: { type: "solid", colors: ["#fef3c7"], angle: 180 },
    motif: { type: "grid", color: "#92400e", scale: 32, spacing: 0, strokeWeight: 1, angle: 0, opacity: 0.25 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    description: "Deep purple gradient with ethereal wave overlay",
    base: { type: "linear-gradient", colors: ["#581c87", "#7e22ce", "#a855f7"], angle: 160 },
    motif: { type: "waves", color: "#ffffff", scale: 50, spacing: 5, strokeWeight: 1, angle: 15, opacity: 0.12 },
    modifiers: [
      { enabled: true, type: "vignette", intensity: 0.3 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    description: "Dark industrial crosshatch texture",
    base: { type: "solid", colors: ["#171717"], angle: 180 },
    motif: { type: "crosshatch", color: "#404040", scale: 16, spacing: 4, strokeWeight: 1, angle: 0, opacity: 0.6 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
  {
    id: "candy-zigzag",
    name: "Candy Zigzag",
    description: "Playful pink zigzag on light background",
    base: { type: "linear-gradient", colors: ["#fdf2f8", "#fce7f3"], angle: 180 },
    motif: { type: "zigzag", color: "#ec4899", scale: 24, spacing: 0, strokeWeight: 2, angle: 0, opacity: 0.3 },
    modifiers: [
      { enabled: false, type: "vignette", intensity: 0.5 },
      { enabled: false, type: "fade", intensity: 0.3 },
    ],
  },
]

export function getPresetById(id: string): PresetConfig | undefined {
  return presets.find((p) => p.id === id)
}

export const defaultPreset: PresetConfig = presets[0]!
