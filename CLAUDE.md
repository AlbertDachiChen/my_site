# Albert Chen's Personal Website

Personal website deployed at **albertchen.fyi**

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Claude-inspired theme
- **UI**: React 19, react-icons
- **Maps**: mapkit-react (Apple MapKit)
- **Photos**: Google Drive API integration
- **Deployment**: Vercel

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page (Navigation + Hero)
├── globals.css         # Global styles
├── photos/             # Photo gallery with interactive map
├── projects/           # Projects showcase
├── reads/              # Reading list/blog
└── technicals/         # Technical writings

components/
├── Navigation.tsx      # Site navigation (desktop + mobile)
├── Hero.tsx            # Home page hero section
├── InteractivePhotoMap.tsx  # MapKit photo map component
├── PhotoModal.tsx      # Photo lightbox modal
├── About.tsx           # About section
├── Contact.tsx         # Contact section
└── Work.tsx            # Work/experience section

data/
└── photoLocations.ts   # Photo location coordinates

lib/
└── googleDrive.ts      # Google Drive API utilities

hooks/
└── useGoogleDrivePhotos.ts  # Hook for fetching photos from Google Drive

types/
└── mapkit.d.ts         # TypeScript definitions for MapKit
```

## Custom Theme Colors

Defined in `tailwind.config.js`:
- `claude-orange`: #CC785C
- `claude-brown`: #A16B3A
- `claude-cream`: #F5F4F0 (background)
- `claude-beige`: #F7F5F3
- `claude-text`: #2D2D2D
- `claude-text-light`: #666666

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Required in `.env.local`:
- Google Drive API credentials (see GOOGLE_DRIVE_SETUP.md)

## Notes

- Photos page is hidden from mobile navigation
- Site design inspired by Claude.ai aesthetic
- Uses emoji favicon (👨🏻‍💻)
