'use client';

// Versión embebida en el sidebar (sin posicionamiento absoluto)
export default function Legend() {
  const gradient = [
    { color: '#2563eb', label: 'Muy bajo' },
    { color: '#16a34a', label: 'Bajo' },
    { color: '#eab308', label: 'Medio' },
    { color: '#f97316', label: 'Alto' },
    { color: '#dc2626', label: 'Muy alto' },
  ];

  return (
    <div className="px-3 py-2.5 border-t border-gray-800">
      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Nivel de riesgo</p>
      <div className="flex items-center gap-1.5">
        {gradient.map(({ color, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full h-4 rounded-md" style={{ background: color, opacity: 0.85 }} />
            <span className="text-gray-500 text-center leading-tight" style={{ fontSize: '9px' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
