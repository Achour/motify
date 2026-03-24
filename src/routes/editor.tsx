import { useState, useCallback } from "react"
import { createFileRoute } from "@tanstack/react-router"
import type { PresetConfig } from "#/engine/types"
import { getPresetById, defaultPreset } from "#/engine/presets"
import { PreviewPanel } from "#/components/editor/preview-panel"
import { ControlPanel } from "#/components/editor/control-panel"

type EditorSearch = { preset?: string }

export const Route = createFileRoute("/editor")({
  validateSearch: (search: Record<string, unknown>): EditorSearch => ({
    preset: typeof search.preset === "string" ? search.preset : undefined,
  }),
  head: () => ({
    meta: [
      { title: 'Editor — Motify' },
      {
        name: 'description',
        content:
          'Create and customize CSS background patterns in real time. Adjust colors, opacity, spacing, and more, then export as CSS or Tailwind code.',
      },
    ],
  }),
  component: EditorPage,
})

function EditorPage() {
  const { preset: presetId } = Route.useSearch()

  const [config, setConfig] = useState<PresetConfig>(() => {
    if (presetId) {
      const found = getPresetById(presetId)
      if (found) return structuredClone(found)
    }
    return structuredClone(defaultPreset)
  })

  const handlePresetChange = useCallback((id: string) => {
    const found = getPresetById(id)
    if (found) setConfig(structuredClone(found))
  }, [])

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row">
      {/* Preview */}
      <div className="flex-1 min-h-[40vh] md:min-h-0 p-3">
        <PreviewPanel config={config} />
      </div>

      {/* Controls */}
      <div className="w-full md:w-[380px] lg:w-[420px] border-t md:border-t-0 md:border-l border-border/40 bg-card/50">
        <ControlPanel
          config={config}
          onChange={setConfig}
          onPresetChange={handlePresetChange}
        />
      </div>
    </div>
  )
}
