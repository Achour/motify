import type { PresetConfig, MotifType, BaseLayer, MotifLayer, ModifierLayer } from "#/engine/types"
import { Slider } from "#/components/ui/slider"
import { Label } from "#/components/ui/label"
import { Separator } from "#/components/ui/separator"
import { Switch } from "#/components/ui/switch"
import { ColorPicker } from "#/components/shared/color-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select"

interface LayerControlsProps {
  config: PresetConfig
  onChange: (config: PresetConfig) => void
}

function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs font-mono text-muted-foreground">{value}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(val) => {
          const v = Array.isArray(val) ? val[0] : val
          onChange(v ?? value)
        }}
      />
    </div>
  )
}

export function LayerControls({ config, onChange }: LayerControlsProps) {
  const updateBase = (updates: Partial<BaseLayer>) => {
    onChange({ ...config, base: { ...config.base, ...updates } })
  }

  const updateMotif = (updates: Partial<MotifLayer>) => {
    onChange({ ...config, motif: { ...config.motif, ...updates } })
  }

  const updateModifier = (index: number, updates: Partial<ModifierLayer>) => {
    const modifiers = config.modifiers.map((m, i) =>
      i === index ? { ...m, ...updates } : m
    )
    onChange({ ...config, modifiers })
  }

  return (
    <div className="space-y-6">
      {/* Base Layer */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Base Layer</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Type</Label>
            <Select
              value={config.base.type}
              onValueChange={(v) => {
                const type = v as BaseLayer["type"]
                const colors = type === "solid"
                  ? [config.base.colors[0] ?? "#000000"]
                  : config.base.colors.length < 2
                    ? [...config.base.colors, "#333333"]
                    : config.base.colors
                updateBase({ type, colors })
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="linear-gradient">Linear Gradient</SelectItem>
                <SelectItem value="radial-gradient">Radial Gradient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {config.base.colors.map((color, i) => (
              <ColorPicker
                key={i}
                value={color}
                label={config.base.colors.length > 1 ? `Color ${i + 1}` : "Color"}
                onChange={(c) => {
                  const colors = [...config.base.colors]
                  colors[i] = c
                  updateBase({ colors })
                }}
              />
            ))}
          </div>

          {config.base.type !== "solid" && (
            <SliderControl
              label="Angle"
              value={config.base.angle}
              min={0}
              max={360}
              step={1}
              onChange={(angle) => updateBase({ angle })}
            />
          )}
        </div>
      </section>

      <Separator />

      {/* Motif Layer */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Motif Layer</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Pattern</Label>
            <Select
              value={config.motif.type}
              onValueChange={(v) => updateMotif({ type: v as MotifType })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="dots">Dots</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
                <SelectItem value="zigzag">Zigzag</SelectItem>
                <SelectItem value="crosshatch">Crosshatch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ColorPicker
            value={config.motif.color}
            label="Color"
            onChange={(color) => updateMotif({ color })}
          />

          <SliderControl label="Scale" value={config.motif.scale} min={8} max={200} step={1} onChange={(scale) => updateMotif({ scale })} />
          <SliderControl label="Spacing" value={config.motif.spacing} min={0} max={100} step={1} onChange={(spacing) => updateMotif({ spacing })} />
          <SliderControl label="Weight" value={config.motif.strokeWeight} min={0.5} max={10} step={0.5} onChange={(strokeWeight) => updateMotif({ strokeWeight })} />
          <SliderControl label="Angle" value={config.motif.angle} min={0} max={360} step={1} onChange={(angle) => updateMotif({ angle })} />
          <SliderControl label="Opacity" value={Math.round(config.motif.opacity * 100)} min={0} max={100} step={1} onChange={(v) => updateMotif({ opacity: v / 100 })} />
        </div>
      </section>

      <Separator />

      {/* Modifiers */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Modifiers</h3>
        <div className="space-y-4">
          {config.modifiers.map((mod, i) => (
            <div key={mod.type} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs capitalize">{mod.type}</Label>
                <Switch
                  checked={mod.enabled}
                  onCheckedChange={(enabled) => updateModifier(i, { enabled })}
                />
              </div>
              {mod.enabled && (
                <SliderControl
                  label="Intensity"
                  value={Math.round(mod.intensity * 100)}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(v) => updateModifier(i, { intensity: v / 100 })}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
