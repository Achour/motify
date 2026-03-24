import type { PresetConfig } from "#/engine/types"
import { ScrollArea } from "#/components/ui/scroll-area"
import { Separator } from "#/components/ui/separator"
import { PresetSwitcher } from "./preset-switcher"
import { LayerControls } from "./layer-controls"
import { CodeExporter } from "./code-exporter"

interface ControlPanelProps {
  config: PresetConfig
  onChange: (config: PresetConfig) => void
  onPresetChange: (presetId: string) => void
}

export function ControlPanel({ config, onChange, onPresetChange }: ControlPanelProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preset</h3>
          <PresetSwitcher value={config.id} onChange={onPresetChange} />
        </section>

        <Separator />

        <LayerControls config={config} onChange={onChange} />

        <Separator />

        <section className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Export</h3>
          <CodeExporter config={config} />
        </section>
      </div>
    </ScrollArea>
  )
}
