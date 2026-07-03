import React from 'react';
import { useMarkers } from '@/hooks/useMarkers';
import MarkerListItem from './MarkerListItem';

const MarkerList: React.FC = () => {
  const { markers } = useMarkers();

  if (markers.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <p className="text-gray-500 text-sm">No markers placed yet.</p>
        <p className="text-gray-400 text-xs mt-1">Click anywhere on the map to add one.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {markers.map((marker) => (
        <MarkerListItem key={marker.id} marker={marker} />
      ))}
    </ul>
  );
};

export default MarkerList;
