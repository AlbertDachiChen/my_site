'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'

// Dynamically import InteractivePhotoMap to avoid SSR issues
const InteractivePhotoMap = dynamic(() => import('@/components/InteractivePhotoMap'), { ssr: false })

export default function Photos() {
  const [isPhotoViewMode, setIsPhotoViewMode] = useState(false)

  return (
    <main className="min-h-screen bg-claude-cream">
      {/* Navigation - Hidden during photo viewing */}
      {!isPhotoViewMode && <Navigation />}
      
      <div className={isPhotoViewMode ? "p-0" : "pt-24 pb-16 px-6"}>
        <div className={isPhotoViewMode ? "w-full" : "max-w-6xl mx-auto"}>
          {/* Mobile Notice */}
          <div className="md:hidden mb-6 p-4 bg-claude-beige border border-claude-brown/20 rounded-lg">
            <h3 className="text-claude-text font-semibold mb-2">📱 Mobile Notice</h3>
            <p className="text-claude-text-light text-sm">
              For the best photo viewing experience, please visit this page on a desktop or tablet device. 
              The interactive map features work better on larger screens.
            </p>
          </div>
          
          <InteractivePhotoMap 
            onPhotoViewModeChange={setIsPhotoViewMode}
          />
        </div>
      </div>
    </main>
  )
}