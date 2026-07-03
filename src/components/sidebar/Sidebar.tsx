import React from 'react';
import { useMarkers } from '@/hooks/useMarkers';
import MarkerList from './MarkerList';
import PolygonControls from './PolygonControls';

const Sidebar: React.FC = () => {
  const { markers, clearMarkers } = useMarkers();

  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 shadow-lg flex flex-col z-20 transition-all duration-300">
      <div className="p-5 border-b border-gray-200 bg-gray-50/50">
        <h1 className="text-xl font-black text-gray-900 tracking-tight">MapApp</h1>
        <p className="text-sm text-gray-500 mt-1">Interactive GIS Workspace</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Markers Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
              Markers
              <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs font-semibold">
                {markers.length}
              </span>
            </h2>
            
            {markers.length > 0 && (
              <button 
                onClick={clearMarkers}
                className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <MarkerList />
        </section>

        {/* Polygon Section */}
        <PolygonControls />
      </div>
    </aside>
  );
};

export default Sidebar;
