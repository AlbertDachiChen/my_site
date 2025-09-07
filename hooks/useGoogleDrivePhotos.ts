import { useState, useEffect } from 'react';
import { getPhotosFromDrive, convertDrivePhotoToPhoto, type GoogleDrivePhoto } from '@/lib/googleDrive';
import { type Photo } from '@/data/photoLocations';

interface UseGoogleDrivePhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch photos from Google Drive
 */
export function useGoogleDrivePhotos(folderId?: string): UseGoogleDrivePhotosResult {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const drivePhotos = await getPhotosFromDrive(folderId);
      
      const convertedPhotos = drivePhotos.map((drivePhoto, index) => 
        convertDrivePhotoToPhoto(
          drivePhoto,
          `Photo ${index + 1}`, // Default alt text
          drivePhoto.name,
          `Photo taken from Google Drive: ${drivePhoto.name}`
        )
      );
      
      setPhotos(convertedPhotos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load photos');
      console.error('Error loading Google Drive photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [folderId]);

  return {
    photos,
    loading,
    error,
    refetch: fetchPhotos,
  };
}

/**
 * Hook to fetch photos for specific location folder mapping
 */
export function useLocationPhotos(locationToDriveMap: Record<string, string>) {
  const [locationPhotos, setLocationPhotos] = useState<Record<string, Photo[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllLocationPhotos = async () => {
      try {
        setLoading(true);
        setError(null);

        const results: Record<string, Photo[]> = {};

        for (const [locationId, folderId] of Object.entries(locationToDriveMap)) {
          try {
            const drivePhotos = await getPhotosFromDrive(folderId);
            results[locationId] = drivePhotos.map((drivePhoto, index) =>
              convertDrivePhotoToPhoto(
                drivePhoto,
                `${locationId} photo ${index + 1}`,
                drivePhoto.name,
                `Photo from ${locationId}: ${drivePhoto.name}`
              )
            );
          } catch (err) {
            console.error(`Error loading photos for location ${locationId}:`, err);
            results[locationId] = [];
          }
        }

        setLocationPhotos(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load location photos');
        console.error('Error loading location photos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(locationToDriveMap).length > 0) {
      fetchAllLocationPhotos();
    }
  }, [locationToDriveMap]);

  return {
    locationPhotos,
    loading,
    error,
  };
}