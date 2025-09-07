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
  onPhotoViewModeChange?: (isPhotoMode: boolean) => void;
}

export default function InteractivePhotoMap({ className, onPhotoViewModeChange }: InteractivePhotoMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<PhotoLocation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [sortedPhotos, setSortedPhotos] = useState<Array<{photo: any, location: PhotoLocation}>>([]);
  const [mapCenter, setMapCenter] = useState({
    centerLatitude: 40.7829,
    centerLongitude: -74.0059,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });
  const mapRef = useRef<any>(null);
  const photoScrollRef = useRef<HTMLDivElement>(null);

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Function to get all photos sorted by distance from clicked location
  const getAllPhotosSortedByDistance = (clickedLocation: PhotoLocation) => {
    const allPhotosWithLocation: Array<{photo: any, location: PhotoLocation}> = [];
    
    photoLocations.forEach(location => {
      location.photos.forEach(photo => {
        allPhotosWithLocation.push({ photo, location });
      });
    });

    // Sort by distance from clicked location
    return allPhotosWithLocation.sort((a, b) => {
      const distanceA = calculateDistance(
        clickedLocation.latitude, clickedLocation.longitude,
        a.location.latitude, a.location.longitude
      );
      const distanceB = calculateDistance(
        clickedLocation.latitude, clickedLocation.longitude,
        b.location.latitude, b.location.longitude
      );
      return distanceA - distanceB;
    });
  };

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
        if (typeof window !== 'undefined' && typeof window.mapkit !== 'undefined') {
          const { mapkit } = window;
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
      // Get all photos sorted by distance from clicked location
      const sorted = getAllPhotosSortedByDistance(location);
      setSortedPhotos(sorted);
      setCurrentPhotoIndex(0);
      setIsModalOpen(true);
      // Notify parent component to hide navigation
      onPhotoViewModeChange?.(true);
    }, 1000); // Slightly longer delay
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
    // Notify parent component to show navigation again
    onPhotoViewModeChange?.(false);
    
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
      {isModalOpen ? (
        /* Photo Viewing Mode - Map in top-left, photos take main space */
        <div className="relative min-h-screen bg-black">
          {/* Small Map in Top Left - Fixed position, hidden on mobile */}
          <div className="fixed top-4 left-4 w-80 h-64 rounded-2xl overflow-hidden shadow-lg z-50 transition-all duration-700 ease-out hidden lg:block">
            <Map
              ref={mapRef}
              token={MAPKIT_JS_TOKEN}
              initialRegion={mapCenter}
              onLoad={() => {
                console.log('Map loaded:', mapRef.current);
                
                // Add event listeners for marker clicks using MapKit JS directly  
                if (mapRef.current) {
                  mapRef.current.addEventListener('select', (event: any) => {
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
                }
              }}
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
                  color={
                    // Highlight the marker for the current photo being viewed
                    sortedPhotos.length > 0 && sortedPhotos[currentPhotoIndex]?.location.id === location.id 
                      ? "orange" 
                      : selectedLocation?.id === location.id 
                      ? "orange" 
                      : "red"
                  }
                  glyphColor="transparent"
                />
              ))}
            </Map>
          </div>

          {/* Close Button */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={handleCloseModal}
              className="p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-colors text-claude-text"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Photo Viewing Area */}
          <div 
            ref={photoScrollRef}
            className="w-full h-screen overflow-y-auto"
            style={{ scrollBehavior: 'smooth' }}
            onWheel={(e) => {
              console.log('🎡 WHEEL EVENT DETECTED!', e.deltaY);
            }}
            onScroll={(e) => {
              console.log('🔥 SCROLL EVENT DETECTED!'); // Simple test to see if scroll works at all
              
              // Handle scroll to update current photo and map marker
              const scrollContainer = e.currentTarget;
              const scrollTop = scrollContainer.scrollTop;
              const containerHeight = scrollContainer.clientHeight;
              const scrollHeight = scrollContainer.scrollHeight;
              
              console.log('Scroll event:', {
                scrollTop,
                containerHeight,
                scrollHeight,
                totalPhotos: sortedPhotos.length,
                currentIndex: currentPhotoIndex
              });
              
              if (sortedPhotos.length > 0) {
                // Calculate which photo is currently in view
                const newIndex = Math.round(scrollTop / containerHeight);
                const clampedIndex = Math.max(0, Math.min(newIndex, sortedPhotos.length - 1));
                
                console.log('Calculated new index:', newIndex, 'clamped:', clampedIndex);
                
                if (clampedIndex !== currentPhotoIndex) {
                  console.log('Index changed from', currentPhotoIndex, 'to', clampedIndex);
                  setCurrentPhotoIndex(clampedIndex);
                  
                  // Update map center to current photo's location
                  const currentPhotoLocation = sortedPhotos[clampedIndex]?.location;
                  if (currentPhotoLocation) {
                    console.log('Updating map to location:', currentPhotoLocation.name, currentPhotoLocation.latitude, currentPhotoLocation.longitude);
                    
                    // Update state for React component
                    setMapCenter({
                      centerLatitude: currentPhotoLocation.latitude,
                      centerLongitude: currentPhotoLocation.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    });
                    
                    // Also try to update the map directly via MapKit JS API
                    if (mapRef.current && typeof window !== 'undefined' && typeof window.mapkit !== 'undefined') {
                      const { mapkit } = window;
                      try {
                        const coordinate = new mapkit.Coordinate(currentPhotoLocation.latitude, currentPhotoLocation.longitude);
                        const span = new mapkit.CoordinateSpan(0.005, 0.005);
                        const region = new mapkit.CoordinateRegion(coordinate, span);
                        console.log('🗺️ Directly updating map via MapKit API');
                        mapRef.current.setRegionAnimated(region, true);
                      } catch (e) {
                        console.log('MapKit API update failed:', e);
                      }
                    }
                  }
                }
              }
            }}
          >
            {sortedPhotos.map((item, index) => (
              <div key={item.photo.id} className="h-screen flex items-center justify-center p-8">
                <div className="max-w-4xl w-full h-full flex items-center justify-center">
                  <img
                    src={item.photo.src}
                    alt={item.photo.alt}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="16" fill="%236b7280">Photo not available</text></svg>';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Default Mode - Full Map */
        <div className="w-full">
          {/* Map Container */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500">
        <Map
          ref={mapRef}
          token={MAPKIT_JS_TOKEN}
          initialRegion={mapCenter}
          onLoad={() => {
            console.log('Map loaded:', mapRef.current);
            
            // Add event listeners for marker clicks using MapKit JS directly
            if (mapRef.current) {
              mapRef.current.addEventListener('select', (event: any) => {
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
            }
          }}
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
              color="red"
              glyphColor="transparent"
            />
          ))}
        </Map>
          </div>
        </div>
      )}

    </div>
  );
}