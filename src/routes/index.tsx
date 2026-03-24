import { createFileRoute, Link } from '@tanstack/react-router'
import { PresetGrid } from '#/components/gallery/preset-grid'
import { Sparkles } from 'lucide-react'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/')({ component: GalleryPage })

function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-4">
          <Sparkles className="h-3 w-3" />
          Background Pattern Generator
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Design beautiful backgrounds
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Pick a preset, tweak it live, and export clean CSS or Tailwind code. Your visual mixing board for background patterns.
        </p>
        <Button variant="secondary" size="lg" render={<Link to="/editor" className="no-underline" />}>
          Open Sandbox
        </Button>
      </section>

      <section>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Presets</h2>
        <PresetGrid />
      </section>
    </div>
  )
}
