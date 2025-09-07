import { google } from 'googleapis';

// Google Drive API configuration
const GOOGLE_DRIVE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

if (!GOOGLE_DRIVE_API_KEY) {
  console.warn('NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY not found');
}

if (!FOLDER_ID) {
  console.warn('NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID not found');
}

// Initialize Google Drive API
const drive = google.drive({
  version: 'v3',
  auth: GOOGLE_DRIVE_API_KEY,
});

export interface GoogleDrivePhoto {
  id: string;
  name: string;
  webContentLink: string;
  webViewLink: string;
  thumbnailLink: string;
  mimeType: string;
  size: string;
  createdTime: string;
  modifiedTime: string;
}

/**
 * Get all photos from a specific Google Drive folder
 */
export async function getPhotosFromDrive(folderId?: string): Promise<GoogleDrivePhoto[]> {
  try {
    const targetFolderId = folderId || FOLDER_ID;
    
    if (!targetFolderId) {
      throw new Error('No folder ID provided');
    }

    const response = await drive.files.list({
      q: `'${targetFolderId}' in parents and (mimeType contains 'image/')`,
      fields: 'files(id,name,webContentLink,webViewLink,thumbnailLink,mimeType,size,createdTime,modifiedTime)',
      orderBy: 'createdTime desc',
    });

    const files = response.data.files || [];
    
    return files.map(file => ({
      id: file.id!,
      name: file.name!,
      webContentLink: file.webContentLink!,
      webViewLink: file.webViewLink!,
      thumbnailLink: file.thumbnailLink!,
      mimeType: file.mimeType!,
      size: file.size!,
      createdTime: file.createdTime!,
      modifiedTime: file.modifiedTime!,
    }));
  } catch (error) {
    console.error('Error fetching photos from Google Drive:', error);
    return [];
  }
}

/**
 * Get direct image URL from Google Drive file ID
 * Format: https://drive.google.com/uc?id=FILE_ID
 */
export function getDirectImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?id=${fileId}`;
}

/**
 * Get thumbnail URL from Google Drive file ID
 * Format: https://drive.google.com/thumbnail?id=FILE_ID&sz=w400-h300
 */
export function getThumbnailUrl(fileId: string, size = 'w400-h300'): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
}

/**
 * Convert Google Drive photo to our Photo interface
 */
export function convertDrivePhotoToPhoto(drivePhoto: GoogleDrivePhoto, alt: string, title?: string, description?: string) {
  return {
    id: drivePhoto.id,
    src: getDirectImageUrl(drivePhoto.id),
    alt,
    title: title || drivePhoto.name,
    description,
    dateTaken: drivePhoto.createdTime,
    thumbnail: getThumbnailUrl(drivePhoto.id),
    originalName: drivePhoto.name,
    size: drivePhoto.size,
    mimeType: drivePhoto.mimeType,
  };
}