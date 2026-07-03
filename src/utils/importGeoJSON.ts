import { MarkerData, PolygonData, Vertex } from '@/types';
import * as turf from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';

export const importGeoJSON = (
  file: File,
  onSuccess: (markers: MarkerData[], polygon: PolygonData | null) => void,
  onError: (error: string) => void
) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const result = e.target?.result as string;
      const data = JSON.parse(result);

      if (data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
        throw new Error('Invalid GeoJSON: Must be a FeatureCollection');
      }

      const newMarkers: MarkerData[] = [];
      let newPolygon: PolygonData | null = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.features.forEach((feature: any) => {
        if (!feature.geometry || !feature.geometry.type) return;

        if (feature.geometry.type === 'Point') {
          const [lng, lat] = feature.geometry.coordinates;
          newMarkers.push({
            id: feature.properties?.id || uuidv4(),
            latitude: lat,
            longitude: lng,
            createdAt: feature.properties?.createdAt || new Date().toISOString()
          });
        }

        if (feature.geometry.type === 'Polygon' && !newPolygon) {
          const coordinates = feature.geometry.coordinates[0];
          // GeoJSON polygons repeat the first vertex at the end. Remove it for our internal state.
          const vertices: Vertex[] = coordinates.slice(0, -1).map((coord: number[]) => ({
            lng: coord[0],
            lat: coord[1]
          }));

          const geojsonPoly = turf.polygon([coordinates]);
          const area = feature.properties?.area || turf.area(geojsonPoly);
          const perimeter = feature.properties?.perimeter || turf.length(geojsonPoly, { units: 'kilometers' });
          const centroid = feature.properties?.centroid || (turf.centroid(geojsonPoly).geometry.coordinates as [number, number]);
          const boundingBox = feature.properties?.boundingBox || turf.bbox(geojsonPoly);

          newPolygon = {
            vertices,
            area,
            perimeter,
            centroid,
            boundingBox
          };
        }
      });

      onSuccess(newMarkers, newPolygon);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to parse GeoJSON file');
    }
  };

  reader.onerror = () => {
    onError('Failed to read file');
  };

  reader.readAsText(file);
};
