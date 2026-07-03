import { useCallback } from 'react';
import * as turf from '@turf/turf';
import { useMapContext } from '@/context/MapContext';
import { PolygonData } from '@/types';

export function usePolygon() {
  const { 
    polygon, setPolygon, 
    drawingMode, setDrawingMode,
    temporaryVertices, setTemporaryVertices,
    map 
  } = useMapContext();

  const startDrawing = useCallback(() => {
    setDrawingMode(true);
    setPolygon(null);
    setTemporaryVertices([]);
  }, [setDrawingMode, setPolygon, setTemporaryVertices]);

  const addVertex = useCallback((lngLat: { lng: number; lat: number }) => {
    setTemporaryVertices(prev => [...prev, { lng: lngLat.lng, lat: lngLat.lat }]);
  }, [setTemporaryVertices]);

  const finishDrawing = useCallback(() => {
    if (temporaryVertices.length < 3) return;

    const coordinates = [...temporaryVertices, temporaryVertices[0]].map(v => [v.lng, v.lat]);
    const geojson = turf.polygon([coordinates]);

    const area = turf.area(geojson);
    const perimeter = turf.length(geojson, { units: 'kilometers' });
    const centroidCoords = turf.centroid(geojson).geometry.coordinates as [number, number];
    const boundingBox = turf.bbox(geojson);

    const newPolygon: PolygonData = {
      vertices: temporaryVertices,
      area,
      perimeter,
      centroid: centroidCoords,
      boundingBox
    };

    setPolygon(newPolygon);
    setDrawingMode(false);
    setTemporaryVertices([]);

    if (map) {
      map.fitBounds(
        [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]],
        { padding: 60 }
      );
    }
  }, [temporaryVertices, setPolygon, setDrawingMode, setTemporaryVertices, map]);

  const clearPolygon = useCallback(() => {
    setPolygon(null);
    setTemporaryVertices([]);
    setDrawingMode(false);
  }, [setPolygon, setTemporaryVertices, setDrawingMode]);

  return { 
    polygon, 
    drawingMode, 
    temporaryVertices, 
    startDrawing, 
    addVertex, 
    finishDrawing, 
    clearPolygon 
  };
}
