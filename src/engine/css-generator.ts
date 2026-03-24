import type { GeneratedCSS, PresetConfig } from "./types"
import { motifRegistry } from "./motifs"

function generateBaseLayer(base: PresetConfig["base"]): string {
  if (base.type === "solid") {
    return base.colors[0] ?? "#000000"
  }
  if (base.type === "linear-gradient") {
    return `linear-gradient(${base.angle}deg, ${base.colors.join(", ")})`
  }
  // radial-gradient
  return `radial-gradient(circle, ${base.colors.join(", ")})`
}

function generateModifiers(modifiers: PresetConfig["modifiers"]): string[] {
  const images: string[] = []

  for (const mod of modifiers) {
    if (!mod.enabled) continue

    if (mod.type === "vignette") {
      images.push(
        `radial-gradient(ellipse at center, transparent ${Math.round((1 - mod.intensity) * 60)}%, rgba(0,0,0,${mod.intensity * 0.7}) 100%)`
      )
    }

    if (mod.type === "fade") {
      images.push(
        `linear-gradient(180deg, transparent 0%, rgba(0,0,0,${mod.intensity * 0.5}) 100%)`
      )
    }
  }

  return images
}

export function generateCSS(config: PresetConfig): GeneratedCSS {
  const generator = motifRegistry[config.motif.type]
  const motifResult = generator(config.motif)

  const baseValue = generateBaseLayer(config.base)
  const modifierImages = generateModifiers(config.modifiers)

  // Stack: modifiers on top, then motif, then base
  const allImages = [
    ...modifierImages,
    motifResult.backgroundImage,
  ]

  // Base layer: if gradient, add to image stack; if solid, use backgroundColor
  const isBaseGradient = config.base.type !== "solid"
  if (isBaseGradient) {
    allImages.push(baseValue)
  }

  const backgroundImage = allImages.join(", ")
  const backgroundColor = config.base.type === "solid" ? baseValue : config.base.colors[0] ?? "#000000"

  // Count how many background-image layers the motif produces
  const motifLayerCount = countTopLevelCommas(motifResult.backgroundImage) + 1
  const motifSizes = Array(motifLayerCount).fill(motifResult.backgroundSize).join(", ")

  // Background sizes: 100% for modifiers, motif size repeated for each motif layer, 100% for base gradient
  const sizes = [
    ...modifierImages.map(() => "100% 100%"),
    motifSizes,
  ]
  if (isBaseGradient) {
    sizes.push("100% 100%")
  }

  return {
    backgroundImage,
    backgroundSize: sizes.join(", "),
    backgroundColor,
  }
}

/** Generate a clean CSS string for the code exporter */
export function generateCSSString(config: PresetConfig): string {
  const css = generateCSS(config)
  const lines = [
    `background-color: ${css.backgroundColor};`,
    `background-image: ${formatMultilineValue(css.backgroundImage)};`,
    `background-size: ${css.backgroundSize};`,
  ]
  return lines.join("\n")
}

function countTopLevelCommas(value: string): number {
  let depth = 0
  let count = 0
  for (const char of value) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) count++
  }
  return count
}

function formatMultilineValue(value: string): string {
  // Split on top-level commas (not inside parentheses)
  const parts: string[] = []
  let depth = 0
  let current = ""
  for (const char of value) {
    if (char === "(") depth++
    if (char === ")") depth--
    if (char === "," && depth === 0) {
      parts.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  if (current.trim()) parts.push(current.trim())

  if (parts.length <= 1) return value
  return "\n  " + parts.join(",\n  ")
}
