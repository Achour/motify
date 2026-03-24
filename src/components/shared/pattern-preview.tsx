import { useMemo } from "react"
import type { PresetConfig } from "#/engine/types"
import { generateCSS } from "#/engine/css-generator"
import { cn } from "#/lib/utils"

interface PatternPreviewProps {
  config: PresetConfig
  className?: string
}

export function PatternPreview({ config, className }: PatternPreviewProps) {
  const css = useMemo(() => generateCSS(config), [config])

  return (
    <div
      className={cn("w-full h-full transition-all duration-200", className)}
      style={{
        backgroundColor: css.backgroundColor,
        backgroundImage: css.backgroundImage,
        backgroundSize: css.backgroundSize,
      }}
    />
  )
}
