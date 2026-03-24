import type { PresetConfig } from "./types"
import { generateCSS } from "./css-generator"

/** Generate a Tailwind-compatible inline style object string */
export function generateTailwindString(config: PresetConfig): string {
  const css = generateCSS(config)

  // For complex multi-layer backgrounds, Tailwind arbitrary values get unwieldy.
  // Output a clean style object that users can paste into their JSX.
  const lines = [
    `<div style={{`,
    `  backgroundColor: "${css.backgroundColor}",`,
    `  backgroundImage: \`${css.backgroundImage}\`,`,
    `  backgroundSize: "${css.backgroundSize}",`,
    `}} />`,
  ]

  return lines.join("\n")
}
