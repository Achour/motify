import { Link } from "@tanstack/react-router"
import type { PresetConfig } from "#/engine/types"
import { PatternPreview } from "#/components/shared/pattern-preview"
import { Badge } from "#/components/ui/badge"

interface PresetCardProps {
  preset: PresetConfig
}

export function PresetCard({ preset }: PresetCardProps) {
  return (
    <Link
      to="/editor"
      search={{ preset: preset.id }}
      className="group block rounded-xl border border-border/50 bg-card overflow-hidden no-underline transition-all hover:border-border hover:shadow-lg hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative">
        <PatternPreview config={preset} className="rounded-none" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-card-foreground">{preset.name}</h3>
          <Badge variant="secondary" className="text-[10px] capitalize">
            {preset.motif.type}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{preset.description}</p>
      </div>
    </Link>
  )
}
