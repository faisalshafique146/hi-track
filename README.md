# Hi Track

Hi Track is a polished Next.js app for tracking the International Space Station in real time. It combines a live ISS map, upcoming pass predictions for your location, and a current astronauts-in-space view into one space-focused dashboard.

## Features

- Live ISS map with real-time orbital tracking
- ISS pass predictions based on your current geolocation
- Current astronauts in space, grouped by spacecraft
- Responsive UI with animated page transitions and glassmorphism styling
- SEO metadata, Open Graph tags, robots, and sitemap support
- Server-side data fetching with cached external requests

## Routes

- `/` - landing page with overview stats and navigation
- `/map` - live ISS map
- `/passes` - upcoming ISS pass predictions for your location
- `/astronauts` - current astronauts in space
- `/api/iss-position` - server route that returns the current ISS position

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Leaflet and React Leaflet
- satellite.js for ISS orbit calculations
- framer-motion for motion and transitions
- SWR for client data patterns

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root and set the values your deployment needs:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ASTROS_API_URL=https://example.com/astronauts
CELESTRAK_TLE_URL=https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE
```

Notes:

- `NEXT_PUBLIC_SITE_URL` is used for canonical URLs and metadata.
- `ASTROS_API_URL` or `NEXT_PUBLIC_ASTROS_API_URL` is required for the astronauts page.
- `CELESTRAK_TLE_URL` or `NEXT_PUBLIC_CELESTRAK_TLE_URL` is used for ISS orbit and pass calculations.
- If `CELESTRAK_TLE_URL` is not set, the `/api/iss-position` route falls back to the public CelesTrak ISS TLE endpoint.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - build the app for production
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Project Structure

```text
src/
  app/              App Router pages, metadata, API routes, robots, sitemap
  components/       Shared UI, layout, dashboard, map, and page components
  hooks/            Client hooks
  lib/              Types, utilities, and SEO helpers
  public/           Static assets and site icons
```

## Data Sources

Hi Track combines live and calculated space data from external sources:

- CelesTrak TLE data for ISS orbit calculations
- A configurable astronauts API for current crew data
- Nominatim reverse geocoding for turning coordinates into location names

## Deployment

The app is ready to deploy on Vercel or any platform that supports Next.js. Set the same environment variables in production, then build and start the app normally.

```bash
npm run build
npm run start
```

## License

No license is currently specified in this repository.
