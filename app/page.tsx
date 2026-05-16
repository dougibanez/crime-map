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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden z-10">
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
        <Legend />
        <SourcesFooter />
      </main>
    </div>
  );
}
