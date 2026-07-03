# Interactive GIS Map Application

A production-ready React application built with Mapbox GL JS and Turf.js. It enables users to interact with a high-performance map, place geographical markers, draw complex polygons, instantly compute geospatial metrics (area, perimeter, bounding box, centroid), and export data cleanly as GeoJSON.

## 🚀 Live Features

- **Interactive Mapbox GL JS map** with precise bounding box calculations and smooth `flyTo` transitions.
- **Marker Management**: Add precise markers with a click. Selecting a marker highlights it in emerald green, auto-opens its popup, and flies to its coordinates.
- **Polygon Drawing**: Toggle drawing mode to dynamically build a geometric polygon. A real-time dashed line traces your cursor, and upon completion, Turf.js calculates exact GIS metrics.
- **Geospatial Analytics**: Instantly compute Area (km²), Perimeter (km), Centroid (Lng, Lat), and Bounding Boxes using `@turf/turf`.
- **GeoJSON Import/Export**: One-click download of all placed markers and drawn polygons into a standardized GeoJSON `FeatureCollection`, and restore them anytime by uploading the file back.
- **Data Persistence**: Survive accidental browser refreshes with seamless `localStorage` caching of your map state.
- **UI/UX**: Built with Tailwind CSS featuring a dynamic responsive sidebar (desktop) that turns into a slick Bottom Drawer (mobile), intuitive empty states, modern hover/group transitions, toaster notifications, and fully keyboard-accessible markers.

---

## 🛠️ Tech Stack & Architecture

### Core Technologies
- **React 19** + **Vite** (Rapid development and HMR)
- **TypeScript** (Strict static typing across the entire context flow)
- **Mapbox GL JS** (High performance WebGL mapping)
- **Turf.js** (Advanced geospatial mathematics)
- **Tailwind CSS** (Utility-first styling with custom UI components)

---

## 💻 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Environment Setup
Create a `.env` file in the root of the project (alongside `package.json`).
You will need a free Mapbox Access Token.

```env
VITE_MAPBOX_ACCESS_TOKEN=pk....
```

### 3. Installation
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will launch typically at `http://localhost:5173/`.

### 4. Production Build & Deployment
```bash
# Typecheck and build optimized assets
npm run build

# Preview the production bundle locally
npm run preview
```
This project is configured out-of-the-box for Netlify deployment via the included `netlify.toml` file, which handles Single Page Application (SPA) routing redirects automatically.

---

## 🧠 Design Philosophy

This project prioritizes **separation of concerns** and **performance**. By keeping the heavy Mapbox GL initialization inside `useMap.ts` and pushing business logic into specialized hooks (`useMarkers`, `usePolygon`), the React components remain remarkably clean. 

Furthermore, we opted to use Tailwind's `absolute` positioning alongside Mapbox's internal DOM classes to prevent performance-killing layout thrashing when dropping dozens of markers into the map canvas.
