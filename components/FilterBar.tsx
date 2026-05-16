'use client';

import { type CrimeType, type TimeFilter } from '@/lib/crimeData';

interface Props {
  crimeType: CrimeType;
  timeFilter: TimeFilter;
  onCrimeType: (t: CrimeType) => void;
  onTimeFilter: (t: TimeFilter) => void;
}

const crimeTypes: { value: CrimeType; label: string; emoji: string }[] = [
  { value: 'todos', label: 'Todos', emoji: '🗺' },
  { value: 'portonazo', label: 'Portonazos', emoji: '🏠' },
  { value: 'encerrona', label: 'Encerronas', emoji: '🚗' },
];

const timeFilters: { value: TimeFilter; label: string; emoji: string }[] = [
  { value: 'todos', label: 'Todo el día', emoji: '⏱' },
  { value: 'mañana', label: 'Mañana 6–12', emoji: '🌅' },
  { value: 'tarde', label: 'Tarde 12–20', emoji: '☀️' },
  { value: 'noche', label: 'Noche 20–00', emoji: '🌙' },
];

function Chip({
  active,
  onClick,
  emoji,
  label,
}: {
  active: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
        active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
          : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-gray-700'
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

export default function FilterBar({ crimeType, timeFilter, onCrimeType, onTimeFilter }: Props) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-2 items-center pointer-events-none">
      {/* Crime type row */}
      <div className="flex gap-2 pointer-events-auto">
        {crimeTypes.map(t => (
          <Chip
            key={t.value}
            active={crimeType === t.value}
            onClick={() => onCrimeType(t.value)}
            emoji={t.emoji}
            label={t.label}
          />
        ))}
      </div>
      {/* Time filter row */}
      <div className="flex gap-2 pointer-events-auto">
        {timeFilters.map(t => (
          <Chip
            key={t.value}
            active={timeFilter === t.value}
            onClick={() => onTimeFilter(t.value)}
            emoji={t.emoji}
            label={t.label}
          />
        ))}
      </div>
    </div>
  );
}
