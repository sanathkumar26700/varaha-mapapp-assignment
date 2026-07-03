import React from 'react';
import { useMarkers } from '@/hooks/useMarkers';
import PolygonControls from './PolygonControls';
import ExportControls from './ExportControls';
import MarkerList from './MarkerList';

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, setIsOpen }) => {
  const { markers, clearMarkers } = useMarkers();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && setIsOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-40 transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:relative z-50 md:z-20
        bottom-0 md:bottom-auto left-0 md:left-auto
        w-full md:w-80 
        h-[65vh] md:h-full 
        bg-white 
        border-t md:border-t-0 md:border-r border-gray-200 
        shadow-[0_-10px_25px_rgba(0,0,0,0.15)] md:shadow-lg 
        flex flex-col 
        transition-transform duration-300 ease-in-out rounded-t-3xl md:rounded-none
        ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
      `}>
        {/* Mobile drag handle / header */}
        <div className="md:hidden flex items-center justify-center pt-4 pb-2 cursor-pointer w-full" onClick={() => setIsOpen?.(false)}>
          <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="hidden md:block p-5 border-b border-gray-200 bg-gray-50/50">
          <h1 className="text-xl font-black text-gray-900 tracking-tight">MapApp</h1>
          <p className="text-sm text-gray-500 mt-1">Interactive Workspace</p>
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

        {/* Export Section */}
        <ExportControls />
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
