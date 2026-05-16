'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import CommunePanel from '@/components/CommunePanel';
import FilterBar from '@/components/FilterBar';
import Legend from '@/components/Legend';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden z-10 transition-all duration-300 ${
          sidebarOpen ? 'w-[280px]' : 'w-0 border-r-0'
        }`}
      >
        <CommunePanel selectedId={selectedCommune} onSelect={setSelectedCommune} />
      </aside>

      {/* Map area */}
      <main className="relative flex-1 overflow-hidden">
        <CrimeHeatMap
          crimeType={crimeType}
          timeFilter={timeFilter}
          selectedCommune={selectedCommune}
          onSelectCommune={setSelectedCommune}
        />
        <FilterBar
          crimeType={crimeType}
          timeFilter={timeFilter}
          onCrimeType={setCrimeType}
          onTimeFilter={setTimeFilter}
        />

        {/* Toggle sidebar button */}
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="absolute top-4 left-4 z-[1000] bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-2 text-gray-400 hover:text-white hover:border-gray-500 transition-all shadow-lg"
          title={sidebarOpen ? 'Ocultar resumen' : 'Mostrar resumen'}
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M6 5l7 7-7 7" />
            </svg>
          )}
        </button>

        <Legend />
        <SourcesFooter />
      </main>
    </div>
  );
}
