import React from 'react';
import { usePolygon } from '@/hooks/usePolygon';

const PolygonControls: React.FC = () => {
  const { 
    polygon, 
    drawingMode, 
    temporaryVertices, 
    startDrawing, 
    finishDrawing, 
    clearPolygon 
  } = usePolygon();

  return (
    <section className="mt-6 border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
          Polygon Zone
        </h2>
        {polygon && (
          <button 
            onClick={clearPolygon}
            className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
          >
            Clear Zone
          </button>
        )}
      </div>

      {!drawingMode && !polygon && (
        <button 
          onClick={startDrawing}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Draw Polygon</span>
        </button>
      )}

      {drawingMode && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm text-emerald-800 font-medium mb-3">
            Click on the map to add vertices.
          </p>
          <div className="flex items-center justify-between mb-4 text-xs">
            <span className="text-emerald-600 font-semibold">Vertices: {temporaryVertices.length}</span>
            <span className="text-emerald-500">{temporaryVertices.length < 3 ? `(Need ${3 - temporaryVertices.length} more)` : '(Ready)'}</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={clearPolygon}
              className="flex-1 bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 font-medium py-1.5 px-3 rounded-lg shadow-sm transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={finishDrawing}
              disabled={temporaryVertices.length < 3}
              className={`flex-1 font-medium py-1.5 px-3 rounded-lg shadow-sm transition-colors text-sm
                ${temporaryVertices.length >= 3 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-emerald-200 text-emerald-50 cursor-not-allowed'}`}
            >
              Finish
            </button>
          </div>
        </div>
      )}

      {polygon && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 p-3 flex justify-between items-center">
            <span className="font-semibold text-gray-700 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-emerald-500"><path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"/></svg>
              Zone Metrics
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
              {polygon.vertices.length} Vertices
            </span>
          </div>
          <div className="p-3 grid grid-cols-2 gap-3">
            <div>
              <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Area</span>
              <span className="text-sm font-mono text-gray-800">
                {(polygon.area / 1000000).toFixed(2)} <span className="text-xs text-gray-500">km²</span>
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Perimeter</span>
              <span className="text-sm font-mono text-gray-800">
                {polygon.perimeter.toFixed(2)} <span className="text-xs text-gray-500">km</span>
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1">Centroid (Lng, Lat)</span>
              <span className="text-xs font-mono text-gray-600 bg-gray-50 p-1.5 rounded block border border-gray-100">
                {polygon.centroid[0].toFixed(4)}, {polygon.centroid[1].toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PolygonControls;
