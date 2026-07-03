import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Map } from 'mapbox-gl';
import { MapContextType, MarkerData, PolygonData, Vertex } from '@/types';

export const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [map, setMap] = useState<Map | null>(null);
  
  const [markers, setMarkers] = useState<MarkerData[]>(() => {
    try {
      const stored = localStorage.getItem('mapapp_markers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [polygon, setPolygon] = useState<PolygonData | null>(() => {
    try {
      const stored = localStorage.getItem('mapapp_polygon');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  
  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState<[number, number]>([77.5946, 12.9716]); // Lng, Lat for Bengaluru
  const [loading, setLoading] = useState(true);
  const [temporaryVertices, setTemporaryVertices] = useState<Vertex[]>([]);

  useEffect(() => {
    localStorage.setItem('mapapp_markers', JSON.stringify(markers));
  }, [markers]);

  useEffect(() => {
    if (polygon) {
      localStorage.setItem('mapapp_polygon', JSON.stringify(polygon));
    } else {
      localStorage.removeItem('mapapp_polygon');
    }
  }, [polygon]);

  const contextValue = React.useMemo(() => ({
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
    temporaryVertices,
    setTemporaryVertices
  }), [map, markers, polygon, drawingMode, selectedMarker, zoom, center, loading, temporaryVertices]);

  return (
    <MapContext.Provider value={contextValue}>
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
