import React, { useRef } from 'react';
import { useMapContext } from '@/context/MapContext';
import { exportToGeoJSON } from '@/utils/export';
import { importGeoJSON } from '@/utils/importGeoJSON';
import { toast } from 'sonner';

const ExportControls: React.FC = () => {
  const { markers, polygon, setMarkers, setPolygon, map } = useMapContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const hasData = markers.length > 0 || polygon !== null;

  const handleExport = () => {
    exportToGeoJSON(markers, polygon);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importGeoJSON(
      file,
      (importedMarkers, importedPolygon) => {
        setMarkers(importedMarkers);
        setPolygon(importedPolygon);
        toast.success(`Successfully imported ${importedMarkers.length} markers and ${importedPolygon ? '1 polygon' : '0 polygons'}`);
        
        // Fit bounds if polygon exists
        if (importedPolygon && map) {
          const { boundingBox } = importedPolygon;
          map.fitBounds(
            [[boundingBox[0], boundingBox[1]], [boundingBox[2], boundingBox[3]]],
            { padding: 60 }
          );
        } else if (importedMarkers.length > 0 && map) {
          // Fly to first marker if no polygon
          map.flyTo({ center: [importedMarkers[0].longitude, importedMarkers[0].latitude], zoom: 14 });
        }
        
        // Reset input so the same file can be loaded again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      (errorMsg) => {
        toast.error(errorMsg);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    );
  };

  return (
    <section className="mt-auto border-t border-gray-200 pt-6">
      <div className="flex space-x-2">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 font-bold py-2.5 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.98]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span className="text-sm">Import</span>
        </button>

        <button 
          onClick={handleExport}
          disabled={!hasData}
          className={`flex-1 font-bold py-2.5 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2
            ${hasData 
              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span className="text-sm">Export</span>
        </button>
      </div>
      
      <input 
        type="file" 
        accept=".geojson,application/geo+json" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <p className="text-center text-[10px] text-gray-400 mt-3">
        Current Map Data: {markers.length} marker{markers.length !== 1 && 's'}{polygon ? ' and 1 polygon' : ''}
      </p>
    </section>
  );
};

export default ExportControls;
