import React from 'react';
import { useMap } from '@/hooks/useMap';
import MarkerLayer from '@/components/map/MarkerLayer';
import PolygonLayer from '@/components/map/PolygonLayer';

const MapView: React.FC = () => {
  const { containerRef, isLoaded, error } = useMap();

  return (
    <div className="relative h-full w-full">
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-100/90 text-red-600">
          <p className="text-xl font-bold whitespace-pre-wrap text-center">{error}</p>
        </div>
      )}
      
      {!isLoaded && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-100/90">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading Map...</p>
        </div>
      )}
      
      <div ref={containerRef} className="h-full w-full" />
      {isLoaded && (
        <>
          <MarkerLayer />
          <PolygonLayer />
        </>
      )}
    </div>
  );
};

export default MapView;
