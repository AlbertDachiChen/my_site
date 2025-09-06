import Navigation from '@/components/Navigation'

export default function Photos() {
  return (
    <main className="min-h-screen bg-claude-cream">
      <Navigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-claude-text mb-6">
              Photos
            </h1>
            <p className="text-xl text-claude-text-light max-w-3xl mx-auto">
              Coming soon! I'll be sharing my photography here.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-claude-text-light">Photo gallery coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}