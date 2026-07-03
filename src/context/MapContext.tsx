import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Map } from 'mapbox-gl';
import { MapContextType, MarkerData, PolygonData } from '@/types';

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [map, setMap] = useState<Map | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [polygon, setPolygon] = useState<PolygonData | null>(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState<[number, number]>([77.5946, 12.9716]); // Lng, Lat for Bengaluru
  const [loading, setLoading] = useState(true);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        markers,
        setMarkers,
        polygon,
        setPolygon,
        drawingMode,
        setDrawingMode,
        selectedMarker,
        setSelectedMarker,
        zoom,
        setZoom,
        center,
        setCenter,
        loading,
        setLoading,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
