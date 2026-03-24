import { useState, useMemo } from "react"
import type { PresetConfig } from "#/engine/types"
import { generateCSSString } from "#/engine/css-generator"
import { generateTailwindString } from "#/engine/tailwind-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs"
import { Button } from "#/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeExporterProps {
  config: PresetConfig
}

export function CodeExporter({ config }: CodeExporterProps) {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState("css")

  const cssCode = useMemo(() => generateCSSString(config), [config])
  const tailwindCode = useMemo(() => generateTailwindString(config), [config])

  const currentCode = tab === "css" ? cssCode : tailwindCode

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between">
          <TabsList className="h-8">
            <TabsTrigger value="css" className="text-xs px-3 h-6">CSS</TabsTrigger>
            <TabsTrigger value="tailwind" className="text-xs px-3 h-6">JSX</TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleCopy}
          >
            {copied ? (
              <><Check className="h-3 w-3 mr-1" /> Copied</>
            ) : (
              <><Copy className="h-3 w-3 mr-1" /> Copy</>
            )}
          </Button>
        </div>
        <TabsContent value="css" className="mt-2">
          <pre className="bg-muted/50 rounded-lg p-3 text-[11px] font-mono leading-relaxed overflow-x-auto border border-border/50 text-foreground">
            {cssCode}
          </pre>
        </TabsContent>
        <TabsContent value="tailwind" className="mt-2">
          <pre className="bg-muted/50 rounded-lg p-3 text-[11px] font-mono leading-relaxed overflow-x-auto border border-border/50 text-foreground">
            {tailwindCode}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}
