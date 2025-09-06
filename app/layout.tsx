import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your Name - Personal Website',
  description: 'Personal website inspired by Claude.ai design',
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