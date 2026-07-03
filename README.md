# Interactive Map Application

A ReactJS application built with Mapbox GL JS that enables users to interact with a map through marker placement, polygon drawing, and geospatial analysis. The application persists map state using local storage and provides a responsive experience across desktop and mobile devices.

## Features

- 🗺️ Interactive Mapbox GL JS map
- 📍 Add markers by clicking anywhere on the map
- 📋 View marker coordinates in a sidebar
- 🔍 Click markers to view their coordinates
- 🔷 Draw polygons by placing vertices
- 📐 Calculate polygon area in square meters using Turf.js
- 💾 Automatically save markers and polygons to local storage
- 🔄 Restore the previous map state on page reload
- 🧹 Clear all markers and polygons with a single click
- 📱 Responsive UI for desktop and mobile
- ⭐ Bonus: Import and export map data as GeoJSON

## Tech Stack

- ReactJS
- Mapbox GL JS
- Turf.js
- TypeScript
- Vite

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
