'use client';

import { useState } from 'react';
import { PhotoLocation, Photo } from '@/data/photoLocations';
import { FaTimes, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';

interface PhotoModalProps {
  location: PhotoLocation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoModal({ location, isOpen, onClose }: PhotoModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!isOpen || !location) return null;

  const currentPhoto = location.photos[currentPhotoIndex];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === location.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? location.photos.length - 1 : prev - 1
    );
  };

  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <div className="fixed right-0 top-0 h-full w-full lg:w-1/2 bg-white z-40 shadow-xl">
      <div className="h-full flex flex-col p-6">
        <div className="max-w-full w-full max-h-full flex flex-col h-full">
        {/* Header - Just close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-claude-text"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Main Photo Display */}
        <div className="flex-1 relative bg-black rounded-lg overflow-hidden">
          <div className="relative h-full flex items-center justify-center">
            {/* Photo */}
            <div className="relative max-w-full max-h-full">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  // Fallback for missing images
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="16" fill="%236b7280">Photo not available</text></svg>';
                }}
              />
            </div>

            {/* Navigation Arrows */}
            {location.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 p-3 bg-white bg-opacity-80 hover:bg-opacity-100 text-claude-text rounded-full transition-colors shadow-lg"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 p-3 bg-white bg-opacity-80 hover:bg-opacity-100 text-claude-text rounded-full transition-colors shadow-lg"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {/* Photo Counter */}
            {location.photos.length > 1 && (
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-claude-text px-3 py-1 rounded-full text-sm shadow-lg">
                {currentPhotoIndex + 1} / {location.photos.length}
              </div>
            )}
          </div>
        </div>


        {/* Thumbnail Navigation */}
        {location.photos.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {location.photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => goToPhoto(index)}
                className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                  index === currentPhotoIndex
                    ? 'border-claude-orange'
                    : 'border-transparent hover:border-white'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="8" fill="%236b7280">📸</text></svg>';
                  }}
                />
              </button>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}