import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />
      <Hero />
      <div className="fixed bottom-4 right-4 z-10">
        <p className="text-claude-text-light text-sm">
          Built with{' '}
          <a 
            href="https://www.anthropic.com/claude-code" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-claude-orange hover:text-claude-brown transition-colors"
          >
            Claude Code
          </a>
        </p>
      </div>
    </main>
  )
}