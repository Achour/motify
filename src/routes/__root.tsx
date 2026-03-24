import { HeadContent, Outlet, Scripts, createRootRoute, Link } from '@tanstack/react-router'
import { Sparkles, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'

import appCss from '../styles.css?url'

const siteUrl = 'https://motify.vercel.app'
const siteTitle = 'Motify - Background Pattern Generator'
const siteDescription =
  'Design beautiful CSS background patterns with Motify. Pick a preset, tweak it live, and export clean CSS or Tailwind code.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteTitle },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#0a0a0b' },
      { name: 'robots', content: 'index, follow' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: siteUrl },
      { property: 'og:title', content: siteTitle },
      { property: 'og:description', content: siteDescription },
      { property: 'og:site_name', content: 'Motify' },
      { property: 'og:image', content: `${siteUrl}/og-image.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: siteTitle },
      { name: 'twitter:description', content: siteDescription },
      { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: siteUrl },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
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
        <Analytics />
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
          <nav aria-label="Main navigation" className="flex items-center gap-6">
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
