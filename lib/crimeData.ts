// Fuentes:
// - Fiscalía Nacional: Informe Robo Violento Vehículos 2020-2025 (27/02/2026)
// - Fiscalía Metropolitana Oriente: balance portonazos 2025 (24/02/2026)
// - PDI: Informe Encerronas RM 2024-2025 (marzo 2026)
// - Subsecretaría Prevención del Delito: Q1 2026 (14/05/2026)
// - Emol, La Tercera, BioBio Chile, Cooperativa, T13, Publimetro (2025-2026)

export type CrimeType = 'portonazo' | 'encerrona' | 'todos';
export type TimeFilter = 'mañana' | 'tarde' | 'noche' | 'todos';

export interface CommuneStats {
  id: string;
  name: string;
  center: [number, number];
  crimeIndex: number;       // 0-100 compuesto basado en datos 2025
  portonazos2024: number;
  portonazos2025: number;
  encerronas2024: number;
  trend: 'baja' | 'sube' | 'estable';
  trendPct: number;         // % cambio 2024→2025
  trend2026: 'baja' | 'sube' | 'estable'; // tendencia Q1 2026
  hotspots: string[];
  notes: string;
  color: string;
}

export interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number;
  type: 'portonazo' | 'encerrona';
  timeOfDay: 'mañana' | 'tarde' | 'noche';
}

// Polígonos comunales aproximados (simplificados)
export const communePolygons: Record<string, [number, number][]> = {
  nunoa: [
    [-33.4390, -70.6430],
    [-33.4390, -70.5620],
    [-33.5030, -70.5620],
    [-33.5030, -70.6430],
    [-33.4390, -70.6430],
  ],
  providencia: [
    [-33.4180, -70.6420],
    [-33.4180, -70.5900],
    [-33.4620, -70.5900],
    [-33.4620, -70.6420],
    [-33.4180, -70.6420],
  ],
  lasCondes: [
    [-33.3700, -70.5920],
    [-33.3500, -70.4900],
    [-33.4100, -70.4700],
    [-33.4680, -70.5000],
    [-33.4680, -70.5920],
    [-33.3700, -70.5920],
  ],
  laReina: [
    [-33.4180, -70.5920],
    [-33.4180, -70.5250],
    [-33.4780, -70.5250],
    [-33.4780, -70.5920],
    [-33.4180, -70.5920],
  ],
  sanJoaquin: [
    [-33.4760, -70.6590],
    [-33.4760, -70.6160],
    [-33.5150, -70.6160],
    [-33.5150, -70.6590],
    [-33.4760, -70.6590],
  ],
};

export const communeStats: CommuneStats[] = [
  {
    id: 'providencia',
    name: 'Providencia',
    center: [-33.4380, -70.6160],
    crimeIndex: 72,
    portonazos2024: 96,
    portonazos2025: 107,
    encerronas2024: 4,
    trend: 'sube',
    trendPct: +12,
    trend2026: 'sube',
    hotspots: [
      'Accesos Américo Vespucio',
      'Eje Vicuña Mackenna (límite Macul)',
      'Av. Providencia (corredor comercial)',
      'Sector Baquedano',
    ],
    notes: '⚠️ 2026: En mayo 2026 se registró un portonazo con subfusil UZI en que el autor, vinculado al Tren de Aragua (célula "Los Mapaches"), fue detenido. Tenía orden de expulsión vigente desde 2025. Providencia es una de las dos únicas comunas del oriente que aumentó sus portonazos tanto en 2025 (+12%) como en 2026.',
    color: '#dc2626',
  },
  {
    id: 'nunoa',
    name: 'Ñuñoa',
    center: [-33.4680, -70.5980],
    crimeIndex: 65,
    portonazos2024: 243,
    portonazos2025: 130,
    encerronas2024: 12,
    trend: 'baja',
    trendPct: -47,
    trend2026: 'baja',
    hotspots: [
      'Coventry c/ San Juan de Luz',
      'Luis Beltrán c/ Rengo',
      'Vicuña Mackenna / Américo Vespucio',
      'Rotonda Rodrigo de Araya',
      'Av. Irarrázaval (corredor)',
    ],
    notes: 'Mayor baja en zona oriente: -46,5% (243→130). Municipio implementó Fuerza Especial de Intervención (FEI) con analítica de datos. Premio AMUCH Seguridad 2025. Q1 2026 mantiene tendencia descendente a nivel nacional (-18,3%).',
    color: '#f97316',
  },
  {
    id: 'lasCondes',
    name: 'Las Condes',
    center: [-33.4120, -70.5400],
    crimeIndex: 62,
    portonazos2024: 68,
    portonazos2025: 88,
    encerronas2024: 2,
    trend: 'sube',
    trendPct: +29,
    trend2026: 'sube',
    hotspots: [
      'Av. Apoquindo (sector Escuela Militar)',
      'Av. Presidente Kennedy',
      'Av. Padre Hurtado',
      'Costanera Norte (accesos)',
      'Av. Vitacura (corredor)',
    ],
    notes: 'Única comuna oriente que sostuvo alza en 2025 (+29,4%, 68→88). Efecto globo: los pórticos lectores de patentes redujeron robos en tránsito pero desplazaron portonazos al interior. Q1 2026 mantiene tendencia al alza.',
    color: '#f97316',
  },
  {
    id: 'laReina',
    name: 'La Reina',
    center: [-33.4490, -70.5570],
    crimeIndex: 25,
    portonazos2024: 63,
    portonazos2025: 26,
    encerronas2024: 3,
    trend: 'baja',
    trendPct: -59,
    trend2026: 'baja',
    hotspots: [
      'Calle Bramante',
      'Calle Julia Bernstein (sector Bachelet)',
      'Av. Larraín (corredor)',
      'Sector alto residencial',
    ],
    notes: 'Mayor baja porcentual de la zona oriente: -59,4% (63→26). En oct 2024 se desarticuló una banda que operaba en Ñuñoa y La Reina (3 detenidos). La tendencia descendente se consolida en 2026.',
    color: '#16a34a',
  },
  {
    id: 'sanJoaquin',
    name: 'San Joaquín',
    center: [-33.4960, -70.6380],
    crimeIndex: 55,
    portonazos2024: 18,
    portonazos2025: 14,
    encerronas2024: 0,
    trend: 'baja',
    trendPct: -22,
    trend2026: 'baja',
    hotspots: [
      'Población La Legua (zona crimen organizado)',
      'Av. Las Industrias',
      'Sector La Castrina (+57% robos vehículos 2024)',
      'Av. San Francisco',
    ],
    notes: 'No está bajo jurisdicción de la Fiscalía Oriente. Perfil distinto: pocos portonazos clásicos pero robo general de vehículos subió +57% en La Castrina (77→121 casos 2023-2024). La Legua identificada por Carabineros como zona de crimen organizado. Q1 2026 muestra tendencia descendente a nivel RM (-18,3%).',
    color: '#eab308',
  },
];

// Estadísticas RM
export const rmStats = {
  // Nacional (Fiscalía Nacional, 27/02/2026)
  robosViolentos2025: 11043,
  robosViolentos2024: 15313,
  bajaNacional2025: -28,
  // Q1 2026 (Subsecretaría Prevención del Delito, 14/05/2026)
  tendenciaQ1_2026: -18.3,
  // PDI Encerronas
  encerronasRM2024: 493,
  encerronasRM2025: 359,
  bajaEncerronas: -27,
  // Patrones operativos
  peakHours: '20:00 – 00:00',
  peakDays: 'Viernes, Lunes, Miércoles',
  perpetratorAge: '46% entre 15-18 años; 54% menores de 22',
  perpetratorGender: '94% masculino',
  weaponUse: '92% usa armas de fuego',
  targetedVehicles: 'SUV y Station Wagon (BMW, Peugeot, Mazda)',
  topCommuneEncerronas: 'Macul (34), La Florida (30), Peñalolén (16)',
  efecto2026: 'Sector norponiente en alza: Quilicura, Conchalí, Renca',
};

// Puntos de calor por hotspot y tipo
function scatter(
  lat: number,
  lng: number,
  intensity: number,
  radius: number,
  count: number,
  type: 'portonazo' | 'encerrona',
  timeOfDay: 'mañana' | 'tarde' | 'noche'
): HeatPoint[] {
  const points: HeatPoint[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI + Math.random() * 0.5;
    const r = (Math.random() * 0.7 + 0.3) * radius;
    points.push({
      lat: lat + Math.cos(angle) * r,
      lng: lng + Math.sin(angle) * r * 1.3,
      intensity: intensity * (0.7 + Math.random() * 0.3),
      type,
      timeOfDay,
    });
  }
  return points;
}

export const allHeatPoints: HeatPoint[] = [
  // ═══════════════════════════════════════
  // PROVIDENCIA — crimeIndex 72 (máximo del grupo en 2026)
  // Portonazos 2024: 96 → 2025: 107 (+12%). Caso UZI/Tren de Aragua may 2026
  // ═══════════════════════════════════════
  ...scatter(-33.4390, -70.6360, 0.88, 0.003, 8, 'portonazo', 'noche'),   // Baquedano
  ...scatter(-33.4390, -70.6360, 0.72, 0.003, 5, 'encerrona', 'tarde'),
  ...scatter(-33.4600, -70.6190, 0.82, 0.003, 7, 'encerrona', 'noche'),   // Vicuña Mackenna
  ...scatter(-33.4320, -70.6170, 0.75, 0.004, 9, 'portonazo', 'tarde'),   // Av. Providencia
  ...scatter(-33.4320, -70.6170, 0.68, 0.003, 6, 'portonazo', 'noche'),
  ...scatter(-33.4280, -70.6060, 0.65, 0.003, 6, 'portonazo', 'tarde'),   // Pedro de Valdivia
  ...scatter(-33.4340, -70.5960, 0.70, 0.003, 6, 'portonazo', 'noche'),   // Tobalaba
  ...scatter(-33.4250, -70.6230, 0.62, 0.003, 6, 'portonazo', 'tarde'),   // Salvador
  ...scatter(-33.4580, -70.6080, 0.75, 0.003, 6, 'encerrona', 'noche'),   // Accesos Vespucio
  // Hotspot 2026: caso UZI / Tren de Aragua (may 2026)
  ...scatter(-33.4350, -70.6200, 0.92, 0.002, 5, 'portonazo', 'noche'),

  // ═══════════════════════════════════════
  // ÑUÑOA — crimeIndex 65 (en baja sostenida)
  // Portonazos 2024: 243 → 2025: 130 (-47%). Tendencia baja en 2026
  // ═══════════════════════════════════════
  ...scatter(-33.4580, -70.6080, 0.85, 0.003, 8, 'portonazo', 'noche'),   // Coventry/San Juan de Luz
  ...scatter(-33.4580, -70.6080, 0.68, 0.003, 4, 'portonazo', 'tarde'),
  ...scatter(-33.4720, -70.5950, 0.80, 0.003, 7, 'portonazo', 'noche'),   // Luis Beltrán/Rengo
  ...scatter(-33.4560, -70.6100, 0.75, 0.004, 8, 'portonazo', 'tarde'),   // Irarrázaval
  ...scatter(-33.4560, -70.6100, 0.65, 0.003, 5, 'encerrona', 'noche'),
  ...scatter(-33.4900, -70.6200, 0.92, 0.004, 9, 'encerrona', 'noche'),   // Vicuña Mackenna/Vespucio
  ...scatter(-33.4900, -70.6200, 0.80, 0.003, 6, 'portonazo', 'noche'),
  ...scatter(-33.4850, -70.6050, 0.88, 0.003, 8, 'encerrona', 'noche'),   // Rotonda Rodrigo de Araya
  ...scatter(-33.4660, -70.6070, 0.65, 0.004, 7, 'portonazo', 'tarde'),   // Estadio Nacional
  ...scatter(-33.4620, -70.5980, 0.68, 0.005, 9, 'portonazo', 'noche'),   // Centro Ñuñoa
  ...scatter(-33.4490, -70.6050, 0.60, 0.003, 5, 'portonazo', 'tarde'),   // Marchant Pereira
  ...scatter(-33.4750, -70.5820, 0.58, 0.004, 6, 'portonazo', 'noche'),
  ...scatter(-33.4970, -70.5950, 0.70, 0.004, 7, 'portonazo', 'noche'),   // Límite Macul

  // ═══════════════════════════════════════
  // LAS CONDES — crimeIndex 62 (en alza sostenida +29%)
  // Portonazos 2024: 68 → 2025: 88 (+29%). Q1 2026 sigue subiendo
  // ═══════════════════════════════════════
  ...scatter(-33.4160, -70.5680, 0.82, 0.004, 9, 'portonazo', 'noche'),   // Apoquindo/Escuela Militar
  ...scatter(-33.4160, -70.5680, 0.68, 0.003, 5, 'portonazo', 'tarde'),
  ...scatter(-33.3950, -70.5420, 0.75, 0.004, 8, 'portonazo', 'noche'),   // Av. Kennedy
  ...scatter(-33.3950, -70.5420, 0.62, 0.003, 5, 'encerrona', 'tarde'),
  ...scatter(-33.3820, -70.5310, 0.68, 0.004, 6, 'portonazo', 'noche'),   // Av. Padre Hurtado
  ...scatter(-33.3990, -70.5540, 0.72, 0.003, 7, 'encerrona', 'noche'),   // Costanera Norte
  ...scatter(-33.3900, -70.5600, 0.65, 0.004, 7, 'portonazo', 'tarde'),   // Av. Vitacura
  ...scatter(-33.4010, -70.5470, 0.62, 0.003, 6, 'portonazo', 'noche'),   // Manquehue
  ...scatter(-33.4200, -70.5440, 0.70, 0.005, 9, 'portonazo', 'noche'),   // Av. Las Condes
  ...scatter(-33.4100, -70.5700, 0.75, 0.003, 7, 'portonazo', 'noche'),   // El Golf
  ...scatter(-33.4600, -70.5560, 0.55, 0.003, 5, 'portonazo', 'noche'),

  // ═══════════════════════════════════════
  // SAN JOAQUÍN — crimeIndex 55
  // Sin datos Fiscalía Oriente; robo vehículos general +57% en La Castrina 2024
  // ═══════════════════════════════════════
  ...scatter(-33.4960, -70.6450, 0.82, 0.004, 8, 'portonazo', 'noche'),   // La Legua
  ...scatter(-33.4960, -70.6450, 0.65, 0.003, 5, 'portonazo', 'tarde'),
  ...scatter(-33.4880, -70.6380, 0.75, 0.004, 7, 'portonazo', 'tarde'),   // Av. Las Industrias
  ...scatter(-33.4880, -70.6380, 0.70, 0.003, 5, 'portonazo', 'noche'),
  ...scatter(-33.5050, -70.6340, 0.80, 0.004, 8, 'portonazo', 'noche'),   // La Castrina
  ...scatter(-33.5010, -70.6430, 0.72, 0.004, 6, 'portonazo', 'noche'),   // Av. San Francisco
  ...scatter(-33.4800, -70.6500, 0.65, 0.003, 5, 'portonazo', 'noche'),
  ...scatter(-33.4950, -70.6260, 0.60, 0.004, 6, 'portonazo', 'tarde'),

  // ═══════════════════════════════════════
  // LA REINA — crimeIndex 25 (baja sostenida, mejor de la zona)
  // Portonazos 2024: 63 → 2025: 26 (-59%). Tendencia baja en 2026
  // ═══════════════════════════════════════
  ...scatter(-33.4420, -70.5720, 0.45, 0.003, 5, 'portonazo', 'noche'),   // Calle Bramante
  ...scatter(-33.4480, -70.5650, 0.42, 0.003, 4, 'portonazo', 'noche'),   // Julia Bernstein
  ...scatter(-33.4480, -70.5650, 0.35, 0.002, 3, 'portonazo', 'tarde'),
  ...scatter(-33.4550, -70.5590, 0.40, 0.004, 6, 'portonazo', 'tarde'),   // Av. Larraín
  ...scatter(-33.4550, -70.5590, 0.35, 0.003, 4, 'portonazo', 'noche'),
  ...scatter(-33.4310, -70.5540, 0.32, 0.004, 5, 'portonazo', 'noche'),   // Sector alto
  ...scatter(-33.4440, -70.5500, 0.30, 0.003, 4, 'portonazo', 'tarde'),   // Av. Ossa
  ...scatter(-33.4700, -70.5580, 0.28, 0.004, 4, 'portonazo', 'noche'),
  ...scatter(-33.4350, -70.5780, 0.35, 0.003, 4, 'portonazo', 'tarde'),
];
