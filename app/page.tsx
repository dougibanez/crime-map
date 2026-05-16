'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Abre por defecto en desktop
  useEffect(() => {
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);

  return (
    // El mapa siempre ocupa toda la pantalla
    <div className="fixed inset-0 bg-gray-950">

      {/* Mapa: full screen siempre */}
      <CrimeHeatMap
        crimeType={crimeType}
        timeFilter={timeFilter}
        selectedCommune={selectedCommune}
        onSelectCommune={setSelectedCommune}
      />

      {/* Filtros centrados arriba */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ zIndex: 400 }}>
        <FilterBar
          crimeType={crimeType}
          timeFilter={timeFilter}
          onCrimeType={setCrimeType}
          onTimeFilter={setTimeFilter}
        />
      </div>

      {/* Botón toggle — siempre visible, esquina superior izquierda */}
      <button
        onClick={() => setSidebarOpen(o => !o)}
        style={{ zIndex: 1000 }}
        className="absolute top-4 left-4 bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-gray-300 hover:text-white hover:border-gray-400 transition-all shadow-xl"
        aria-label={sidebarOpen ? 'Ocultar resumen' : 'Mostrar resumen'}
      >
        {sidebarOpen ? (
          // X para cerrar
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger para abrir
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop: aparece detrás del sidebar al abrirse */}
      {sidebarOpen && (
        <div
          className="absolute inset-0 bg-black/50 md:hidden"
          style={{ zIndex: 800 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: overlay fijo desde la izquierda */}
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
        <CommunePanel selectedId={selectedCommune} onSelect={setSelectedCommune} />
      </aside>

      {/* Leyenda y fuentes */}
      <div style={{ zIndex: 400 }}>
        <Legend />
        <SourcesFooter />
      </div>
    </div>
  );
}
