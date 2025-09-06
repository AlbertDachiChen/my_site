import Navigation from '@/components/Navigation'
import InteractivePhotoMap from '@/components/InteractivePhotoMap'

export default function Photos() {
  return (
    <main className="min-h-screen bg-claude-cream">
      <Navigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <InteractivePhotoMap />
        </div>
      </div>
    </main>
  )
}