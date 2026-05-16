'use client';

import { useState } from 'react';

const sources = [
  { name: 'Fiscalía Nacional – Informe Robo Violento Vehículos 2020-2025', date: '27/02/2026', outlet: 'Fiscalía de Chile / Pauta / La Tercera' },
  { name: 'Fiscalía Metropolitana Oriente – Portonazos 2025 por comuna', date: '24/02/2026', outlet: 'Emol / Cooperativa' },
  { name: 'PDI – Informe Encerronas RM 2024-2025 (493→359 casos, -27%)', date: 'Mar 2026', outlet: 'T13 / La Tercera' },
  { name: 'Subsecretaría Prevención del Delito – Robos violentos Q1 2026 (-18,3%)', date: '14/05/2026', outlet: 'Publimetro / Subsecretaría' },
  { name: 'Portonazo UZI Providencia – Tren de Aragua, célula "Los Mapaches"', date: '06/05/2026', outlet: 'Emol / T13' },
  { name: 'Banda "La Familia Asaltante" desarticulada (12 detenidos, menor de 15 años líder)', date: '12/05/2026', outlet: 'BioBio Chile' },
  { name: 'Reducción Ñuñoa (-46,5%) – Premio AMUCH Seguridad 2025', date: 'Nov 2025', outlet: 'BioBio Chile / Municipio Ñuñoa' },
  { name: 'Efecto globo – desplazamiento a sector norponiente (Quilicura, Conchalí, Renca)', date: 'Sep 2025', outlet: 'Emol' },
  { name: 'Pórticos lectores patentes Las Condes – reducción robos en tránsito', date: 'May 2024', outlet: 'El Dínamo' },
  { name: 'Banda portonazos Ñuñoa-La Reina (3 detenidos)', date: 'Oct 2024', outlet: 'Meganoticias' },
  { name: 'Robo vehículos +57% La Castrina, San Joaquín (2023-2024)', date: '2024', outlet: 'Clickhouse.cl' },
];

export default function SourcesFooter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-2 left-4 right-4 z-[400] flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        {open ? (
          <div className="bg-gray-900/97 backdrop-blur-sm border border-gray-700 rounded-xl p-3 shadow-xl w-[340px] max-w-full">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-300">Fuentes · 2024-2026</p>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-300 text-xs">✕</button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {sources.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-gray-600 mt-0.5 flex-shrink-0">·</span>
                  <span className="text-gray-400">
                    <span className="text-gray-200">{s.name}</span>
                    <span className="text-gray-600"> — {s.outlet}, {s.date}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-800">
              Datos 2024-2026. Polígonos comunales aproximados. Calor basado en patrones de hotspots reportados.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full px-3 py-1 text-xs text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-all"
          >
            Fuentes · PDI · Fiscalía · 2024-2026
          </button>
        )}
      </div>
    </div>
  );
}
