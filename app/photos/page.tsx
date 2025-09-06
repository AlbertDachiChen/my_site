import Navigation from '@/components/Navigation'
import InteractivePhotoMap from '@/components/InteractivePhotoMap'

export default function Photos() {
  return (
    <main className="min-h-screen bg-claude-cream">
      <Navigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-claude-text mb-6">
              Photos
            </h1>
            <p className="text-xl text-claude-text-light max-w-3xl mx-auto">
              Explore my photography through an interactive map. Click on the red markers 
              to view photos from different locations around the world.
            </p>
          </div>

          <InteractivePhotoMap />
        </div>
      </div>
    </main>
  )
}