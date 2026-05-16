'use client';

import { communeStats, rmStats } from '@/lib/crimeData';
import Legend from '@/components/Legend';

interface Props {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onClose: () => void;
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

export default function CommunePanel({ selectedId, onSelect, onClose }: Props) {
  const selected = communeStats.find(c => c.id === selectedId);
  const maxPortonazos = Math.max(...communeStats.map(c => c.portonazos2024));

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Header — X queda aquí, sin solaparse con el título */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-800 flex items-start justify-between gap-2">
        <div>
          <h1 className="text-base font-bold text-white tracking-tight">Mapa de Calor</h1>
          <p className="text-xs text-gray-400 mt-0.5">Portonazos &amp; Encerronas · RM</p>
          <div className="mt-2 flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/50 rounded-md px-2 py-1">
            <span className="text-blue-400 text-xs">●</span>
            <span className="text-xs text-blue-300">Datos 2024 – 2026</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700 transition-all"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Lista comunas */}
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
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-sm font-semibold text-gray-100">{c.name}</span>
                </div>
                <span className={`text-xs font-bold ${c.trend === 'sube' ? 'text-red-400' : 'text-green-400'}`}>
                  {c.trend === 'sube' ? '↑' : '↓'}{Math.abs(c.trendPct)}% 24→25
                </span>
              </div>
              <CrimeBar value={c.portonazos2025} max={maxPortonazos} />
              <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                <span>{c.portonazos2024} en 2024</span>
                <span className={c.trend === 'sube' ? 'text-red-400' : 'text-green-400'}>
                  {c.portonazos2025} en 2025
                </span>
              </div>
            </button>
          ))}
      </div>

      {/* Detalle de comuna seleccionada */}
      {selected && (
        <div className="border-t border-gray-800 px-3 py-3 space-y-3 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">{selected.name}</span>
            <button onClick={() => onSelect(null)} className="text-gray-500 hover:text-gray-300 text-xs">✕ cerrar</button>
          </div>

          {/* Grid portonazos 2024 / 2025 / 2026 est. */}
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1.5">Portonazos por año</p>
            <div className="grid grid-cols-4 gap-1">
              <Stat label="2024" value={selected.portonazos2024} color="text-gray-300" />
              <Stat
                label="2025"
                value={selected.portonazos2025}
                color={selected.trend === 'sube' ? 'text-red-400' : 'text-green-400'}
              />
              <Stat
                label="2026 est."
                value={selected.portonazos2026est}
                color={selected.trend2026 === 'sube' ? 'text-red-300' : 'text-green-300'}
                footnote="*"
              />
              <Stat label="Encerronas" value={selected.encerronas2024} color="text-yellow-400" />
            </div>
            <p className="text-xs text-gray-600 mt-1">* Proyección basada en tendencia Q1 2026 (–18% nacional / +tendencia local)</p>
          </div>

          {/* Tendencia 2026 */}
          <div className={`rounded-lg px-3 py-2 text-xs border ${
            selected.trend2026 === 'sube'
              ? 'bg-red-950/40 border-red-800/50 text-red-300'
              : 'bg-green-950/40 border-green-800/50 text-green-300'
          }`}>
            <span className="font-semibold">2026: </span>
            {selected.trend2026 === 'sube'
              ? 'En alza · Q1 2026 sigue aumentando'
              : 'A la baja · Q1 2026 continúa descendiendo'}
          </div>

          {/* Hotspots */}
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

          {/* Contexto */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Contexto</p>
            <p className="text-xs text-gray-400 leading-relaxed">{selected.notes}</p>
          </div>
        </div>
      )}

      {/* Stats RM (cuando no hay comuna seleccionada) */}
      {!selected && (
        <div className="border-t border-gray-800 px-3 py-3 space-y-2">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">RM · 2025-2026</p>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Robos vehículos 2025</span>
              <span className="text-green-400">↓ 28% vs 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Q1 2026 (nacional)</span>
              <span className="text-green-400">↓ 18,3% vs Q1 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Encerronas RM 2025</span>
              <span className="text-green-400">359 (↓27%)</span>
            </div>
            <div className="flex justify-between">
              <span>Horario pico</span>
              <span className="text-gray-200">{rmStats.peakHours}</span>
            </div>
            <div className="flex justify-between">
              <span>Uso armas de fuego</span>
              <span className="text-orange-400">{rmStats.weaponUse}</span>
            </div>
          </div>
          <div className="bg-amber-950/40 border border-amber-800/40 rounded-md px-2 py-1.5 text-xs text-amber-300">
            ⚠️ Efecto globo: delitos se desplazan a Quilicura, Conchalí y Renca
          </div>
        </div>
      )}

      {/* Leyenda al fondo del panel */}
      <Legend />
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  footnote,
}: {
  label: string;
  value: number;
  color: string;
  footnote?: string;
}) {
  return (
    <div className="bg-gray-900/60 rounded-lg p-1.5 text-center">
      <div className={`text-base font-bold ${color}`}>
        {value}{footnote && <span className="text-xs">{footnote}</span>}
      </div>
      <div className="text-gray-500 leading-tight mt-0.5" style={{ fontSize: '9px' }}>{label}</div>
    </div>
  );
}
