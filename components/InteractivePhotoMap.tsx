'use client';

import { useState } from 'react';
import { Map, Marker } from 'mapkit-react';
import { photoLocations, PhotoLocation } from '@/data/photoLocations';
import PhotoModal from './PhotoModal';

// You'll need to replace this with your actual MapKit JS token
// Get it from: https://maps.developer.apple.com/token-maker
const MAPKIT_JS_TOKEN = process.env.NEXT_PUBLIC_MAPKIT_JS_TOKEN || 'YOUR_MAPKIT_JS_TOKEN_HERE';

interface InteractivePhotoMapProps {
  className?: string;
}

export default function InteractivePhotoMap({ className }: InteractivePhotoMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<PhotoLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (location: PhotoLocation) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  // If no token is provided, show setup instructions
  if (!MAPKIT_JS_TOKEN || MAPKIT_JS_TOKEN === 'YOUR_MAPKIT_JS_TOKEN_HERE') {
    return (
      <div className={`bg-claude-beige rounded-2xl p-8 text-center ${className}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-2xl font-semibold text-claude-text mb-4">
            Interactive Photo Map Setup Required
          </h3>
          <p className="text-claude-text-light mb-6">
            To enable the interactive map feature, you'll need to set up Apple MapKit JS:
          </p>
          <div className="text-left bg-white rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">Setup Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Visit <a href="https://developer.apple.com" className="text-claude-orange hover:underline" target="_blank" rel="noopener noreferrer">Apple Developer</a></li>
              <li>Create a Maps Identifier and private key</li>
              <li>Generate a JWT token at <a href="https://maps.developer.apple.com/token-maker" className="text-claude-orange hover:underline" target="_blank" rel="noopener noreferrer">Token Maker</a></li>
              <li>Add token to your environment variables as <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_MAPKIT_JS_TOKEN</code></li>
            </ol>
          </div>
          <p className="text-sm text-claude-text-light">
            Once configured, you'll see an interactive Apple Maps with red markers for each photo location.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Map Container */}
      <div className={`relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
        isModalOpen ? 'lg:w-1/2' : 'w-full'
      }`}>
        <Map
          token={MAPKIT_JS_TOKEN}
          initialRegion={{
            centerLatitude: 40.7829, // Centered roughly on New York (adjust as needed)
            centerLongitude: -74.0059,
            latitudeDelta: 50, // Zoom level to show multiple countries
            longitudeDelta: 50,
          }}
          className="w-full h-full"
        >
          {photoLocations.map((location) => (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
              onSelect={() => handleMarkerClick(location)}
              onClick={() => handleMarkerClick(location)}
              color="red"
              glyphText={location.photos.length.toString()}
              title={location.name}
              subtitle={`${location.photos.length} photo${location.photos.length !== 1 ? 's' : ''}`}
            />
          ))}
        </Map>

      </div>


      {/* Photo Modal */}
      <PhotoModal
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}