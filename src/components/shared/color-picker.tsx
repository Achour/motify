import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"
import { TAILWIND_COLORS, TAILWIND_SHADES, SPECIAL_COLORS } from "#/lib/tailwind-colors"
import { cn } from "#/lib/utils"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

function ColorSwatch({
  hex,
  name,
  isSelected,
  onClick,
}: {
  hex: string
  name: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={`${name} (${hex})`}
      className={cn(
        "size-4 rounded-sm cursor-pointer border border-white/10 transition-transform hover:scale-125 hover:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background scale-110 z-10"
      )}
      style={{ backgroundColor: hex }}
      onClick={onClick}
    />
  )
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value)

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setHexInput(v)
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      onChange(v.toLowerCase())
    }
  }

  const handleColorSelect = (hex: string) => {
    onChange(hex)
    setHexInput(hex)
  }

  // Sync hex input when value changes from outside
  const displayHex = value !== hexInput && /^#[0-9a-fA-F]{6}$/.test(value) ? value : hexInput

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-muted-foreground w-16 shrink-0">{label}</span>}
      <Popover>
        <PopoverTrigger
          className="h-8 w-8 rounded-md border border-border shadow-sm cursor-pointer shrink-0"
          style={{ backgroundColor: value }}
        />
        <PopoverContent className="w-auto p-3" align="start" sideOffset={8}>
          {/* Current color + hex input */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="h-8 w-8 rounded-md border border-border shrink-0"
              style={{ backgroundColor: value }}
            />
            <input
              type="text"
              value={displayHex}
              onChange={handleHexChange}
              onBlur={() => setHexInput(value)}
              placeholder="#000000"
              className="flex-1 text-xs font-mono bg-muted px-2 py-1.5 rounded-md border border-border w-24"
            />
          </div>

          {/* Special colors: black + white */}
          <div className="flex gap-1 mb-2">
            {SPECIAL_COLORS.map((c) => (
              <ColorSwatch
                key={c.name}
                hex={c.hex}
                name={c.name}
                isSelected={value.toLowerCase() === c.hex}
                onClick={() => handleColorSelect(c.hex)}
              />
            ))}
          </div>

          {/* Palette grid: rows = shades, columns = color families */}
          <div
            className="grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${TAILWIND_COLORS.length}, 1fr)` }}
          >
            {TAILWIND_SHADES.map((shade) =>
              TAILWIND_COLORS.map((family) => (
                <ColorSwatch
                  key={`${family.name}-${shade}`}
                  hex={family.shades[shade]}
                  name={`${family.name}-${shade}`}
                  isSelected={value.toLowerCase() === family.shades[shade]}
                  onClick={() => handleColorSelect(family.shades[shade])}
                />
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
