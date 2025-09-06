'use client';

import { useState, useRef } from 'react';
import { Map, Marker } from 'mapkit-react';
import { photoLocations, PhotoLocation } from '@/data/photoLocations';
import { FaTimes } from 'react-icons/fa';
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
  const [mapCenter, setMapCenter] = useState({
    centerLatitude: 40.7829,
    centerLongitude: -74.0059,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  const mapRef = useRef<any>(null);

  const handleMarkerClick = (location: PhotoLocation) => {
    console.log('Zooming to location:', location.name);
    
    // First zoom into the location
    const newRegion = {
      centerLatitude: location.latitude,
      centerLongitude: location.longitude,
      latitudeDelta: 0.005, // Even more zoomed in
      longitudeDelta: 0.005,
    };
    
    console.log('Setting new region:', newRegion);
    setMapCenter(newRegion);
    
    // Try using the MapKit JS API directly to animate to the location
    if (mapRef.current) {
      try {
        console.log('Map reference available:', mapRef.current);
        
        // Check if mapkit global is available
        if (typeof mapkit !== 'undefined') {
          const coordinate = new mapkit.Coordinate(location.latitude, location.longitude);
          const span = new mapkit.CoordinateSpan(0.005, 0.005);
          const region = new mapkit.CoordinateRegion(coordinate, span);
          
          console.log('Animating to region with MapKit API');
          mapRef.current.setRegionAnimated(region, true);
        } else {
          console.log('MapKit global not available, using fallback');
          // Try alternative approach with the map reference
          if (mapRef.current.setRegionAnimated) {
            mapRef.current.setRegionAnimated({
              centerLatitude: location.latitude,
              centerLongitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }, true);
            console.log('Used fallback animation method');
          }
        }
      } catch (e) {
        console.log('MapKit API animation failed:', e);
        // Fallback to just opening the modal immediately
        setTimeout(() => {
          setSelectedLocation(location);
          setIsModalOpen(true);
        }, 100);
        return;
      }
    }
    
    // Then show the modal after a brief delay to let the zoom animation happen
    setTimeout(() => {
      setSelectedLocation(location);
      setIsModalOpen(true);
    }, 1000); // Slightly longer delay
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
    
    // Optional: Zoom back out when closing modal
    setTimeout(() => {
      setMapCenter({
        centerLatitude: 40.7829,
        centerLongitude: -74.0059,
        latitudeDelta: 50,
        longitudeDelta: 50,
      });
    }, 300);
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div className={`relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
          isModalOpen ? 'lg:w-1/2' : 'w-full'
        }`}>
        <Map
          ref={mapRef}
          token={MAPKIT_JS_TOKEN}
          initialRegion={{
            centerLatitude: 40.7829,
            centerLongitude: -74.0059,
            latitudeDelta: 50,
            longitudeDelta: 50,
          }}
          onMapReady={(map) => {
            mapRef.current = map;
            console.log('Map ready:', map);
            
            // Add event listeners for marker clicks using MapKit JS directly
            map.addEventListener('select', (event) => {
              console.log('Map select event:', event);
              if (event.target && event.target.coordinate) {
                const clickedCoord = event.target.coordinate;
                console.log('Clicked coordinate:', clickedCoord);
                
                // Find the location that matches this coordinate
                const matchedLocation = photoLocations.find(location => 
                  Math.abs(location.latitude - clickedCoord.latitude) < 0.001 &&
                  Math.abs(location.longitude - clickedCoord.longitude) < 0.001
                );
                
                if (matchedLocation) {
                  console.log('Found matching location:', matchedLocation.name);
                  handleMarkerClick(matchedLocation);
                }
              }
            });
          }}
          className="w-full h-full"
        >
          {photoLocations.map((location) => (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
              onSelect={() => {
                console.log('Marker onSelect fired!');
                handleMarkerClick(location);
              }}
              onClick={() => {
                console.log('Marker onClick fired!');
                handleMarkerClick(location);
              }}
              color="red"
              size="small"
              glyphColor="transparent"
            />
          ))}
        </Map>

        </div>

        {/* Photo Panel - Now part of the natural flow */}
        {isModalOpen && selectedLocation && (
          <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 transition-all duration-500">
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-claude-text"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              {/* Photo Display */}
              <div className="flex-1 relative bg-gray-50 rounded-xl overflow-hidden">
                <div className="relative h-full flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                  <img
                    src={selectedLocation.photos[0].src}
                    alt={selectedLocation.photos[0].alt}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="16" fill="%236b7280">Photo not available</text></svg>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}