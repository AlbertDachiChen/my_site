import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Albert Chen',
  description: 'Personal website inspired by Claude.ai design',
  icons: [
    {
      url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨🏻‍💻</text></svg>',
      type: 'image/svg+xml',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-claude-cream antialiased">
        {children}
      </body>
    </html>
  )
}