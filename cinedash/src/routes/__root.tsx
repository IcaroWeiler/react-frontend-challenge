import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router'

import appCss from '#/app/theme/styles/styles.css?url'
import { ThemeProvider } from '#/app/theme/providers/theme'
import { ANTI_FLICKER_THEME_SCRIPT } from '#/app/theme/helpers/themeHelper'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'CineDash',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: ANTI_FLICKER_THEME_SCRIPT,
          }}
        />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
