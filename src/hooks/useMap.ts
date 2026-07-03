import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapContext } from '@/context/MapContext';

// Access token configuration
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

export function useMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setMap } = useMapContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error] = useState<string | null>(
    !MAPBOX_TOKEN ? 'Unable to load Map. Please verify Mapbox token.' : null
  );

  useEffect(() => {
    if (!containerRef.current || error) return;

    const mapInstance = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.5946, 12.9716], // Lng, Lat for Bengaluru
      zoom: 12,
      dragRotate: false,
      pitchWithRotate: false,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    mapInstance.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true
    }), 'top-right');
    mapInstance.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

    mapInstance.on('load', () => {
      setIsLoaded(true);
      setMap(mapInstance);
      // Let it resize properly
      mapInstance.resize();
    });

    return () => {
      mapInstance.remove();
      setMap(null);
    };
  }, [setMap, error]);

  return { containerRef, isLoaded, error };
}
