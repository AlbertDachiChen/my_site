export interface PhotoLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  photos: Photo[];
  description?: string;
  visitDate?: string;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  dateTaken?: string;
  thumbnail?: string;
  originalName?: string;
  size?: string;
  mimeType?: string;
  driveFileId?: string; // Google Drive file ID for dynamic loading
}

// Your photo locations - add your actual travel photos here
export const photoLocations: PhotoLocation[] = [
  {
    id: "nyc-soho-greene-st",
    name: "SoHo, New York",
    latitude: 40.7238,
    longitude: -74.0027,
    visitDate: "2024-01-01", // Update with actual visit date
    description: "Historic cobblestone streets and cast-iron architecture in SoHo",
    photos: [
      {
        id: "soho-street-1",
        src: "/images/nyc-soho/greene-street.jpg",
        alt: "Cobblestone street with historic architecture in SoHo",
        title: "Greene Street SoHo",
        description: "Classic cast-iron buildings and cobblestone streets in New York's SoHo district",
        dateTaken: "2024-01-01" // Update with actual date taken
      }
    ]
  },
  {
    id: "nyc-west-houston-st",
    name: "West Houston Street, NYC",
    latitude: 40.7278,
    longitude: -74.0026,
    visitDate: "2024-01-01", // Update with actual visit date
    description: "Historic buildings and street views in lower Manhattan",
    photos: [
      {
        id: "w-houston-1",
        src: "/images/nyc-soho/w-houston.jpg",
        alt: "Street view of 88 W Houston Street in NYC",
        title: "West Houston Street",
        description: "Historic architecture along West Houston Street in New York City",
        dateTaken: "2024-01-01" // Update with actual date taken
      }
    ]
  }
];

// Helper function to get all photos from all locations
export const getAllPhotos = (): Photo[] => {
  return photoLocations.flatMap(location => location.photos);
};

// Helper function to get location by ID
export const getLocationById = (id: string): PhotoLocation | undefined => {
  return photoLocations.find(location => location.id === id);
};