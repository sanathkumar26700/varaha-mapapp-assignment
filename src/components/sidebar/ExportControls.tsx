import React from 'react';
import { useMapContext } from '@/context/MapContext';
import { exportToGeoJSON } from '@/utils/export';

const ExportControls: React.FC = () => {
  const { markers, polygon } = useMapContext();
  const hasData = markers.length > 0 || polygon !== null;

  const handleExport = () => {
    exportToGeoJSON(markers, polygon);
  };

  return (
    <section className="mt-auto border-t border-gray-200 pt-6">
      <button 
        onClick={handleExport}
        disabled={!hasData}
        className={`w-full font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2
          ${hasData 
            ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>Download GeoJSON</span>
      </button>
      <p className="text-center text-[10px] text-gray-400 mt-2">
        Exports {markers.length} marker{markers.length !== 1 && 's'}{polygon ? ' and 1 polygon' : ''}
      </p>
    </section>
  );
};

export default ExportControls;
