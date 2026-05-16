'use client';

export default function Legend() {
  const gradient = [
    { color: '#2563eb', label: 'Muy bajo' },
    { color: '#16a34a', label: 'Bajo' },
    { color: '#eab308', label: 'Medio' },
    { color: '#f97316', label: 'Alto' },
    { color: '#dc2626', label: 'Muy alto' },
  ];

  return (
    <div className="absolute bottom-8 right-14 z-[1000] bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl px-3 py-2.5 shadow-xl">
      <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wide">Nivel de riesgo</p>
      <div className="flex items-center gap-1.5">
        {gradient.map(({ color, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 rounded-md" style={{ background: color, opacity: 0.85 }} />
            <span className="text-xs text-gray-500" style={{ fontSize: '9px' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
