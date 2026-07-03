import React from 'react';
import { MapProvider } from '@/context/MapContext';
import MapView from '@/components/map/MapView';
import 'mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {
  return (
    <MapProvider>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <main className="flex flex-1 overflow-hidden">
          <section className="flex-1 relative">
            <MapView />
          </section>
        </main>
      </div>
    </MapProvider>
  );
};

export default App;
