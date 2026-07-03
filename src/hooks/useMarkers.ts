import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMapContext } from '@/context/MapContext';
import { MarkerData } from '@/types';

export function useMarkers() {
  const { map, markers, setMarkers, selectedMarker, setSelectedMarker } = useMapContext();

  const addMarker = useCallback((lngLat: { lng: number; lat: number }) => {
    const newMarker: MarkerData = {
      id: uuidv4(),
      latitude: lngLat.lat,
      longitude: lngLat.lng,
      createdAt: new Date().toISOString(),
    };
    setMarkers((prev) => [...prev, newMarker]);
  }, [setMarkers]);

  const removeMarker = useCallback((id: string) => {
    setMarkers((prev) => prev.filter(m => m.id !== id));
    if (selectedMarker?.id === id) {
      setSelectedMarker(null);
    }
  }, [setMarkers, selectedMarker, setSelectedMarker]);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
    setSelectedMarker(null);
  }, [setMarkers, setSelectedMarker]);

  const selectMarker = useCallback((marker: MarkerData | null) => {
    setSelectedMarker(marker);
  }, [setSelectedMarker]);

  const flyToMarker = useCallback((marker: MarkerData) => {
    if (map) {
      map.flyTo({ center: [marker.longitude, marker.latitude], zoom: 14 });
      setSelectedMarker(marker);
    }
  }, [map, setSelectedMarker]);

  return { markers, addMarker, removeMarker, clearMarkers, selectMarker, flyToMarker, selectedMarker };
}
