'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import InteractivePhotoMap from '@/components/InteractivePhotoMap'

export default function Photos() {
  const [isPhotoViewMode, setIsPhotoViewMode] = useState(false)

  return (
    <main className="min-h-screen bg-claude-cream">
      {/* Navigation - Hidden during photo viewing */}
      {!isPhotoViewMode && <Navigation />}
      
      <div className={isPhotoViewMode ? "p-0" : "pt-24 pb-16 px-6"}>
        <div className={isPhotoViewMode ? "w-full" : "max-w-6xl mx-auto"}>
          <InteractivePhotoMap 
            onPhotoViewModeChange={setIsPhotoViewMode}
          />
        </div>
      </div>
    </main>
  )
}