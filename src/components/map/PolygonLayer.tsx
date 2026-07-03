import React, { useEffect } from 'react';
import type { MapMouseEvent, GeoJSONSource } from 'mapbox-gl';
import { useMapContext } from '@/context/MapContext';
import { usePolygon } from '@/hooks/usePolygon';

const PolygonLayer: React.FC = () => {
  const { map } = useMapContext();
  const { drawingMode, temporaryVertices, polygon, addVertex } = usePolygon();

  // Click listener for adding vertices
  useEffect(() => {
    if (!map) return;
    
    const handleMapClick = (e: MapMouseEvent) => {
      if (drawingMode) {
        addVertex(e.lngLat);
      }
    };

    map.on('click', handleMapClick);
    return () => { map.off('click', handleMapClick); };
  }, [map, drawingMode, addVertex]);

  // Render Temporary Line and Vertices
  useEffect(() => {
    if (!map) return;

    const sourceId = 'temp-polygon-source';
    const lineLayerId = 'temp-polygon-line';
    const pointLayerId = 'temp-polygon-points';

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      
      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#10b981',
          'line-width': 2,
          'line-dasharray': [2, 2]
        }
      });

      map.addLayer({
        id: pointLayerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': 5,
          'circle-color': '#10b981',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });
    }

    const geojson = {
      type: 'FeatureCollection',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      features: [] as any[]
    };

    if (drawingMode && temporaryVertices.length > 0) {
      // Add points
      geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'MultiPoint',
          coordinates: temporaryVertices.map(v => [v.lng, v.lat])
        }
      });

      // Add line connecting points
      if (temporaryVertices.length > 1) {
        geojson.features.push({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: temporaryVertices.map(v => [v.lng, v.lat])
          }
        });
      }
    }

    const source = map.getSource(sourceId) as GeoJSONSource;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (source) source.setData(geojson as any);

  }, [map, drawingMode, temporaryVertices]);

  // Render Finished Polygon
  useEffect(() => {
    if (!map) return;

    const sourceId = 'finished-polygon-source';
    const fillLayerId = 'finished-polygon-fill';
    const outlineLayerId = 'finished-polygon-outline';

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      
      map.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': '#10b981',
          'fill-opacity': 0.3,
          'fill-outline-color': '#047857'
        }
      });

      map.addLayer({
        id: outlineLayerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#047857',
          'line-width': 3
        }
      });
    }

    const geojson = {
      type: 'FeatureCollection',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      features: [] as any[]
    };

    if (polygon) {
      const coords = [...polygon.vertices, polygon.vertices[0]].map(v => [v.lng, v.lat]);
      geojson.features.push({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coords]
        }
      });
    }

    const source = map.getSource(sourceId) as GeoJSONSource;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (source) source.setData(geojson as any);

  }, [map, polygon]);

  return null;
};

export default PolygonLayer;
