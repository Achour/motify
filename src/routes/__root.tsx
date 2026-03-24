import { HeadContent, Outlet, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { Sparkles, LayoutGrid, SlidersHorizontal } from 'lucide-react'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Motify — Background Pattern Generator' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 text-foreground no-underline hover:opacity-80 transition-opacity">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="font-bold text-lg tracking-tight">Motify</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline [&.active]:text-foreground"
            >
              <LayoutGrid className="h-4 w-4" />
              Gallery
            </Link>
            <Link
              to="/editor"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline [&.active]:text-foreground"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Editor
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
