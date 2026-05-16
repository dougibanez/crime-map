'use client';

import { useState } from 'react';

const sources = [
  { name: 'PDI – Informe Encerronas RM', date: 'Feb 2025', outlet: 'Emol / BioBio Chile' },
  { name: 'Fiscalía Metropolitana Oriente – Portonazos sector oriente', date: 'Nov 2025 / Feb 2026', outlet: 'Emol / Cooperativa' },
  { name: 'Reducción Ñuñoa (-42%) – Premio AMUCH Seguridad', date: 'Nov 2025', outlet: 'BioBio Chile / Municipio Ñuñoa' },
  { name: 'Pórticos lectores Las Condes – Reducción delitos vehiculares', date: 'May 2024', outlet: 'El Dínamo' },
  { name: 'Banda portonazos Ñuñoa-La Reina (3 detenidos)', date: 'Oct 2024', outlet: 'Meganoticias' },
  { name: 'Portonazo frustrado calle Julia Bernstein (La Reina)', date: 'Oct 2024', outlet: 'La Tercera' },
  { name: 'Sectores mayor robo vehículos RM 2024 (+57% La Castrina)', date: '2024', outlet: 'Clickhouse.cl' },
  { name: 'Encerronas alza RM – efecto globo', date: 'Sep 2025', outlet: 'Emol' },
];

export default function SourcesFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-2 left-[300px] right-0 z-[1000] flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        {open ? (
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-xl max-w-2xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-300">Fuentes y referencias</p>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300 text-xs">✕</button>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {sources.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-gray-600 mt-0.5">·</span>
                  <span className="text-gray-400">
                    <span className="text-gray-200">{s.name}</span>{' '}
                    <span className="text-gray-600">— {s.outlet}, {s.date}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-800">
              Datos 2024-2025. Polígonos comunales aproximados. Mapa de calor basado en patrones de hotspots reportados.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-3 py-1 text-xs text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-all"
          >
            Fuentes · PDI · Fiscalía Oriente · 2024-2025
          </button>
        )}
      </div>
    </div>
  );
}
