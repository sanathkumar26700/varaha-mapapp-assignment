import React from 'react';
import { MarkerData } from '@/types';
import { useMarkers } from '@/hooks/useMarkers';
import { useMapContext } from '@/context/MapContext';

interface MarkerListItemProps {
  marker: MarkerData;
}

const MarkerListItem: React.FC<MarkerListItemProps> = ({ marker }) => {
  const { removeMarker, flyToMarker } = useMarkers();
  const { selectedMarker } = useMapContext();
  
  const isSelected = selectedMarker?.id === marker.id;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeMarker(marker.id);
  };

  const handleFlyTo = () => {
    flyToMarker(marker);
  };

  return (
    <li 
      onClick={handleFlyTo}
      className={`
        group relative rounded-xl p-3 cursor-pointer transition-all duration-200 border
        ${isSelected 
          ? 'bg-emerald-50 border-emerald-200 shadow-sm ring-1 ring-emerald-500' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-blue-500 group-hover:bg-blue-400'}`} />
          <span className={`text-xs font-bold ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
            Marker
          </span>
        </div>
        
        <button 
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Remove marker"
          aria-label="Remove marker"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div className="bg-gray-50/50 p-1.5 rounded border border-gray-100">
          <span className="text-gray-400 block mb-0.5 text-[10px] uppercase">Lat</span>
          <span className="font-mono text-gray-700">{marker.latitude.toFixed(4)}</span>
        </div>
        <div className="bg-gray-50/50 p-1.5 rounded border border-gray-100">
          <span className="text-gray-400 block mb-0.5 text-[10px] uppercase">Lng</span>
          <span className="font-mono text-gray-700">{marker.longitude.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="text-[10px] text-gray-400 flex items-center mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        {new Date(marker.createdAt).toLocaleTimeString()}
      </div>
    </li>
  );
};

export default MarkerListItem;
