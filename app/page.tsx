'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import CommunePanel from '@/components/CommunePanel';
import FilterBar from '@/components/FilterBar';
import SourcesFooter from '@/components/SourcesFooter';
import { type CrimeType, type TimeFilter } from '@/lib/crimeData';

const CrimeHeatMap = dynamic(() => import('@/components/CrimeHeatMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [crimeType, setCrimeType] = useState<CrimeType>('todos');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('todos');
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950">

      {/* Mapa full screen */}
      <CrimeHeatMap
        crimeType={crimeType}
        timeFilter={timeFilter}
        selectedCommune={selectedCommune}
        onSelectCommune={setSelectedCommune}
      />

      {/* Filtros */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ zIndex: 400 }}>
        <FilterBar
          crimeType={crimeType}
          timeFilter={timeFilter}
          onCrimeType={setCrimeType}
          onTimeFilter={setTimeFilter}
        />
      </div>

      {/* Botón hamburger — solo visible cuando sidebar está CERRADO */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{ zIndex: 1000 }}
          className="absolute top-4 left-4 bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-gray-300 hover:text-white hover:border-gray-400 transition-all shadow-xl"
          aria-label="Mostrar resumen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Backdrop mobile */}
      {sidebarOpen && (
        <div
          className="absolute inset-0 bg-black/50 md:hidden"
          style={{ zIndex: 800 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — la X queda dentro del panel */}
      <aside
        style={{
          zIndex: 900,
          width: 280,
          top: 0,
          left: 0,
          bottom: 0,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms ease-in-out',
        }}
        className="absolute bg-gray-900 border-r border-gray-700 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* El onClose pasa el botón X al header del panel */}
        <CommunePanel
          selectedId={selectedCommune}
          onSelect={setSelectedCommune}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Fuentes */}
      <SourcesFooter />
    </div>
  );
}
