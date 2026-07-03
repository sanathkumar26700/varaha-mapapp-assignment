import type { Map } from 'mapbox-gl';

export interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface Vertex {
  lat: number;
  lng: number;
}

export interface PolygonData {
  vertices: Vertex[];
  area: number;
  perimeter: number;
  centroid: [number, number];
  boundingBox: number[];
}

export interface MapState {
  markers: MarkerData[];
  polygon: PolygonData | null;
  center: [number, number];
  zoom: number;
}

export interface MapContextType {
  map: Map | null;
  setMap: (map: Map | null) => void;
  markers: MarkerData[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
  polygon: PolygonData | null;
  setPolygon: React.Dispatch<React.SetStateAction<PolygonData | null>>;
  drawingMode: boolean;
  setDrawingMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMarker: MarkerData | null;
  setSelectedMarker: React.Dispatch<React.SetStateAction<MarkerData | null>>;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  center: [number, number];
  setCenter: React.Dispatch<React.SetStateAction<[number, number]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
