import type { PresetConfig } from "#/engine/types"
import { PatternPreview } from "#/components/shared/pattern-preview"

interface PreviewPanelProps {
  config: PresetConfig
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden border border-border/50">
      <PatternPreview config={config} />
      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/70 font-mono">
        Live Preview
      </div>
    </div>
  )
}
