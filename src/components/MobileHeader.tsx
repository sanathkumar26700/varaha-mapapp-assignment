import React from 'react';
import { useMapContext } from '@/context/MapContext';

interface MobileHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { markers, polygon } = useMapContext();
  const dataCount = markers.length + (polygon ? 1 : 0);

  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-30 shadow-sm relative">
      <h1 className="text-lg font-black text-gray-900 tracking-tight">MapApp</h1>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors flex items-center space-x-2"
      >
        {isSidebarOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        )}
        <span className="text-sm font-semibold">{isSidebarOpen ? 'Close' : 'Menu'}</span>
        
        {!isSidebarOpen && dataCount > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs font-semibold">
            {dataCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default MobileHeader;
