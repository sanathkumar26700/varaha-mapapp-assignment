import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapContext } from '@/context/MapContext';
import { useMarkers } from '@/hooks/useMarkers';

const MarkerLayer: React.FC = () => {
  const { map, drawingMode, selectedMarker } = useMapContext();
  const { markers, addMarker, selectMarker } = useMarkers();
  const markerInstances = useRef<Map<string, mapboxgl.Marker>>(new Map());

  // Handle map clicks to add markers
  useEffect(() => {
    if (!map) return;
    
    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      if (drawingMode) return;
      addMarker(e.lngLat);
    };

    map.on('click', handleMapClick);
    
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, drawingMode, addMarker]);

  // Sync markers
  useEffect(() => {
    if (!map) return;

    // Add new markers
    markers.forEach(m => {
      if (!markerInstances.current.has(m.id)) {
        const el = document.createElement('div');
        const isSelected = selectedMarker?.id === m.id;
        
        const baseColor = isSelected ? 'bg-emerald-500' : 'bg-blue-500';
        el.className = `mapboxgl-marker absolute w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer transition-colors ${baseColor} hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-blue-300`;
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `Marker at latitude ${m.latitude.toFixed(4)} and longitude ${m.longitude.toFixed(4)}`);
        
        const popupHTML = `
          <div class="p-1 min-w-[140px] text-gray-800">
            <h3 class="font-bold text-sm border-b pb-1 mb-1">Marker</h3>
            <div class="text-xs space-y-1">
              <p><span class="font-semibold">Lat:</span> ${m.latitude.toFixed(4)}</p>
              <p><span class="font-semibold">Lng:</span> ${m.longitude.toFixed(4)}</p>
              <p class="text-gray-500 italic mt-1">${new Date(m.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 15, closeButton: false }).setHTML(popupHTML);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([m.longitude, m.latitude])
          .setPopup(popup)
          .addTo(map);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          selectMarker(m);
        });

        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectMarker(m);
          }
        });

        popup.on('close', () => {
          // If we close the popup and it was selected, clear selection
          // setTimeout prevents React warnings about updating state during render of other components
          setTimeout(() => {
            selectMarker(null);
          }, 0);
        });

        markerInstances.current.set(m.id, marker);
      }
    });

    // Update existing markers (styling and popups)
    for (const [id, marker] of markerInstances.current.entries()) {
      const m = markers.find(mark => mark.id === id);
      if (!m) {
        marker.remove();
        markerInstances.current.delete(id);
      } else {
        const el = marker.getElement();
        const isSelected = selectedMarker?.id === m.id;
        const baseColor = isSelected ? 'bg-emerald-500' : 'bg-blue-500';
        el.className = `mapboxgl-marker absolute w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer transition-colors ${baseColor} hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-blue-300`;
        
        if (isSelected && !marker.getPopup()?.isOpen()) {
          marker.togglePopup();
        }
      }
    }
  }, [markers, map, selectedMarker, selectMarker]);

  return null;
};

export default MarkerLayer;
