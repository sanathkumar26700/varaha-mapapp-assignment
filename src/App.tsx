import React from 'react';
import { MapProvider } from '@/context/MapContext';
import MapView from '@/components/map/MapView';
import Sidebar from '@/components/sidebar/Sidebar';
import 'mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {
  return (
    <MapProvider>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-50">
        <main className="flex flex-1 overflow-hidden w-full">
          <Sidebar />
          <section className="flex-1 relative">
            <MapView />
          </section>
        </main>
      </div>
    </MapProvider>
  );
};

export default App;
