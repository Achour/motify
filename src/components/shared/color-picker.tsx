import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-muted-foreground w-16 shrink-0">{label}</span>}
      <Popover>
        <PopoverTrigger
          className="h-8 w-8 rounded-md border border-border shadow-sm cursor-pointer shrink-0"
          style={{ backgroundColor: value }}
        />
        <PopoverContent className="w-auto p-3" align="start">
          <div className="flex flex-col gap-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-32 h-32 cursor-pointer border-0 p-0 bg-transparent"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
              }}
              className="w-32 text-xs font-mono bg-muted px-2 py-1 rounded border border-border"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
