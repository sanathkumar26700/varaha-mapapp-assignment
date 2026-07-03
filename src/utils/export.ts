import { saveAs } from 'file-saver';
import { MarkerData, PolygonData } from '@/types';

export const exportToGeoJSON = (markers: MarkerData[], polygon: PolygonData | null) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features: any[] = [];

  // Add markers as Point features
  markers.forEach(m => {
    features.push({
      type: 'Feature',
      properties: {
        id: m.id,
        createdAt: m.createdAt,
        type: 'marker'
      },
      geometry: {
        type: 'Point',
        coordinates: [m.longitude, m.latitude]
      }
    });
  });

  // Add polygon as Polygon feature
  if (polygon) {
    const coords = [...polygon.vertices, polygon.vertices[0]].map(v => [v.lng, v.lat]);
    features.push({
      type: 'Feature',
      properties: {
        area: polygon.area,
        perimeter: polygon.perimeter,
        type: 'polygon'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      }
    });
  }

  const featureCollection = {
    type: 'FeatureCollection',
    features
  };

  const blob = new Blob([JSON.stringify(featureCollection, null, 2)], { type: 'application/geo+json;charset=utf-8' });
  saveAs(blob, 'map-data.geojson');
};
