import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-claude-cream/95 backdrop-blur-sm z-50 border-b border-claude-brown/10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-claude-text hover:text-claude-orange transition-colors">
            Albert Chen
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/projects" className="text-claude-text-light hover:text-claude-text transition-colors">
              Projects
            </Link>
            <Link href="/reads" className="text-claude-text-light hover:text-claude-text transition-colors">
              Books
            </Link>
            <Link href="/technicals" className="text-claude-text-light hover:text-claude-text transition-colors">
              Technicals
            </Link>
            <Link href="/photos" className="text-claude-text-light hover:text-claude-text transition-colors">
              Photos
            </Link>
          </div>

          <button className="md:hidden flex flex-col space-y-1 p-2">
            <div className="w-6 h-0.5 bg-claude-text"></div>
            <div className="w-6 h-0.5 bg-claude-text"></div>
            <div className="w-6 h-0.5 bg-claude-text"></div>
          </button>
        </div>
      </div>
    </nav>
  )
}