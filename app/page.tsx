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
    // dvh = dynamic viewport height, handles mobile browser chrome correctly
    <div className="flex w-screen overflow-hidden bg-gray-950" style={{ height: '100dvh' }}>

      {/* Sidebar — fixed panel on desktop, overlay on mobile */}
      <>
        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-30 md:z-10
            w-[280px] flex-shrink-0
            bg-gray-900 border-r border-gray-800
            flex flex-col overflow-hidden
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-full'}
            md:transition-all md:duration-300
            ${sidebarOpen ? 'md:w-[280px]' : 'md:w-0 md:border-r-0'}
          `}
          style={{ height: '100dvh' }}
        >
          <CommunePanel selectedId={selectedCommune} onSelect={setSelectedCommune} />
        </aside>
      </>

      {/* Map area — always full remaining width */}
      <main className="relative flex-1 overflow-hidden min-w-0">
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
