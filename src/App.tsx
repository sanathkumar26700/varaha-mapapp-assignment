import React, { useState } from 'react';
import { MapProvider } from '@/context/MapContext';
import MapView from '@/components/map/MapView';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import { Toaster } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MapProvider>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-50">
        
        <MobileHeader 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />

        <main className="flex flex-1 overflow-hidden w-full relative">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <section className="flex-1 relative z-10">
            <MapView />
          </section>
        </main>
      </div>
      <Toaster position="bottom-right" richColors />
    </MapProvider>
  );
};

export default App;
