'use client';

import { communeStats, rmStats } from '@/lib/crimeData';

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function CrimeBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: pct > 70 ? '#dc2626' : pct > 40 ? '#f97316' : pct > 20 ? '#eab308' : '#16a34a',
        }}
      />
    </div>
  );
}

export default function CommunePanel({ selectedId, onSelect }: Props) {
  const selected = communeStats.find(c => c.id === selectedId);
  const maxPortonazos = Math.max(...communeStats.map(c => c.portonazos2024));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-800">
        <h1 className="text-base font-bold text-white tracking-tight">Mapa de Calor</h1>
        <p className="text-xs text-gray-400 mt-0.5">Portonazos &amp; Encerronas · Región Metropolitana</p>
      </div>

      {/* Commune list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
        {communeStats
          .slice()
          .sort((a, b) => b.crimeIndex - a.crimeIndex)
          .map(c => (
            <button
              key={c.id}
              onClick={() => onSelect(selectedId === c.id ? null : c.id)}
              className={`w-full text-left rounded-lg px-3 py-2.5 transition-all duration-150 border ${
                selectedId === c.id
                  ? 'bg-gray-700/80 border-gray-500'
                  : 'bg-gray-800/60 border-gray-800 hover:bg-gray-700/50 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: c.color }}
                  />
                  <span className="text-sm font-semibold text-gray-100">{c.name}</span>
                </div>
                <span
                  className={`text-xs font-bold flex items-center gap-0.5 ${
                    c.trend === 'sube' ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {c.trend === 'sube' ? '↑' : '↓'} {Math.abs(c.trendPct)}%
                </span>
              </div>
              <CrimeBar value={c.portonazos2024} max={maxPortonazos} />
              <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                <span>{c.portonazos2024} portonazos 2024</span>
                <span className={c.trend === 'sube' ? 'text-red-400' : 'text-green-400'}>
                  {c.portonazos2025} en 2025
                </span>
              </div>
            </button>
          ))}
      </div>

      {/* Selected commune detail */}
      {selected && (
        <div className="border-t border-gray-800 px-3 py-3 space-y-3 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">{selected.name}</span>
            <button onClick={() => onSelect(null)} className="text-gray-500 hover:text-gray-300 text-xs">
              ✕ cerrar
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <Stat label="Portonazos 2024" value={selected.portonazos2024} color="text-orange-400" />
            <Stat label="Portonazos 2025" value={selected.portonazos2025} color={selected.trend === 'sube' ? 'text-red-400' : 'text-green-400'} />
            <Stat label="Encerronas 2024" value={selected.encerronas2024} color="text-yellow-400" />
          </div>

          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5">Zonas de riesgo</p>
            <ul className="space-y-1">
              {selected.hotspots.map((h, i) => (
                <li key={i} className="text-xs text-gray-300 flex gap-1.5">
                  <span className="text-red-500 mt-0.5">●</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Contexto</p>
            <p className="text-xs text-gray-400 leading-relaxed">{selected.notes}</p>
          </div>
        </div>
      )}

      {/* RM Stats footer */}
      {!selected && (
        <div className="border-t border-gray-800 px-3 py-3">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">RM · Datos PDI 2024</p>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Horario pico</span>
              <span className="text-gray-200">{rmStats.peakHours}</span>
            </div>
            <div className="flex justify-between">
              <span>Días más frecuentes</span>
              <span className="text-gray-200">{rmStats.peakDays}</span>
            </div>
            <div className="flex justify-between">
              <span>Edad imputados</span>
              <span className="text-gray-200">{rmStats.perpetratorAge}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-gray-900/60 rounded-lg p-2 text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 leading-tight mt-0.5">{label}</div>
    </div>
  );
}
