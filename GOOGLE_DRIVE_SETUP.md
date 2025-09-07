# Google Drive Photo Hosting Setup

This guide explains how to set up Google Drive API for photo hosting in your personal website.

## Prerequisites

1. Google account with Google Drive
2. Photos uploaded to a Google Drive folder
3. Google Cloud Console access

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Note your project ID

## Step 2: Enable Google Drive API

1. In Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click "Enable"

## Step 3: Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API key"
3. Copy the API key
4. **Important**: Restrict the API key:
   - Click "Restrict key"
   - Under "API restrictions", select "Google Drive API"
   - Under "Website restrictions", add your domain(s)

## Step 4: Set Up Google Drive Folder

1. Create a folder in Google Drive for your photos
2. Upload your photos to this folder
3. **Important**: Make folder publicly accessible:
   - Right-click folder > "Share"
   - Change to "Anyone with the link can view"
   - Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

## Step 5: Update Environment Variables

Update your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=your_actual_folder_id_here
```

## Step 6: Test the Integration

Run your development server and check if photos load:

```bash
npm run dev
```

## Folder Structure Example

```
Google Drive
└── Travel Photos (FOLDER_ID_HERE)
    ├── NYC-SoHo/
    │   ├── greene-street.jpg
    │   └── w-houston.jpg
    └── Other Locations/
        └── ...
```

## Usage in Code

### Option 1: Load All Photos from One Folder
```typescript
import { useGoogleDrivePhotos } from '@/hooks/useGoogleDrivePhotos';

function PhotoGallery() {
  const { photos, loading, error } = useGoogleDrivePhotos();
  
  if (loading) return <div>Loading photos...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {photos.map(photo => (
        <img key={photo.id} src={photo.src} alt={photo.alt} />
      ))}
    </div>
  );
}
```

### Option 2: Load Photos by Location Folders
```typescript
import { useLocationPhotos } from '@/hooks/useGoogleDrivePhotos';

const locationFolders = {
  'nyc-soho': 'FOLDER_ID_FOR_SOHO_PHOTOS',
  'paris-louvre': 'FOLDER_ID_FOR_LOUVRE_PHOTOS',
};

function LocationPhotos() {
  const { locationPhotos, loading } = useLocationPhotos(locationFolders);
  
  return (
    <div>
      {Object.entries(locationPhotos).map(([location, photos]) => (
        <div key={location}>
          <h3>{location}</h3>
          {photos.map(photo => (
            <img key={photo.id} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Security Notes

- API key is exposed to client-side (necessary for this approach)
- Restrict API key to specific domains in production
- Consider rate limiting if expecting high traffic
- Photos must be publicly accessible via Google Drive sharing

## Cost Benefits

- Google Drive: 15GB free, then $1.99/month for 100GB
- Reduced hosting bandwidth costs
- Leverages Google's global CDN
- Easy photo management through Google Drive interface

## Migration from Local Photos

1. Upload existing photos from `public/images/` to Google Drive
2. Update `photoLocations.ts` with Google Drive file IDs
3. Remove local photos from `public/images/` directory
4. Test deployment with new Google Drive sources