// Data sources:
// - PDI Informe Feb 2025 (encerronas Jan-Sep 2024, 391 cases RM)
// - Fiscalía Metropolitana Oriente (portonazos 2024-2025)
// - Emol, La Tercera, BioBio Chile, Cooperativa (Nov 2025 - Feb 2026 reports)
// - Municipalidades & Carabineros sector reports

export type CrimeType = 'portonazo' | 'encerrona' | 'todos';
export type TimeFilter = 'mañana' | 'tarde' | 'noche' | 'todos';

export interface CommuneStats {
  id: string;
  name: string;
  center: [number, number];
  crimeIndex: number; // 0-100 composite
  portonazos2024: number;
  portonazos2025: number;
  encerronas2024: number;
  trend: 'baja' | 'sube' | 'estable';
  trendPct: number; // % change 2024->2025
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

// Approximate commune boundaries (GeoJSON polygons, simplified)
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
    id: 'nunoa',
    name: 'Ñuñoa',
    center: [-33.4680, -70.5980],
    crimeIndex: 72,
    portonazos2024: 243,
    portonazos2025: 130,
    encerronas2024: 12,
    trend: 'baja',
    trendPct: -46,
    hotspots: [
      'Coventry c/ San Juan de Luz',
      'Luis Beltrán c/ Rengo',
      'Vicuña Mackenna / Américo Vespucio',
      'Rotonda Rodrigo de Araya',
      'Av. Irarrázaval (corredor)',
    ],
    notes: 'Mayor baja de la zona oriente (-46%). Municipio implementó Fuerza Especial de Intervención (FEI) con analítica de datos y coordinación Carabineros. Premio AMUCH seguridad 2025.',
    color: '#f97316',
  },
  {
    id: 'lasCondes',
    name: 'Las Condes',
    center: [-33.4120, -70.5400],
    crimeIndex: 42,
    portonazos2024: 53,
    portonazos2025: 69,
    encerronas2024: 2,
    trend: 'sube',
    trendPct: +30,
    hotspots: [
      'Av. Apoquindo (sector Escuela Militar)',
      'Av. Presidente Kennedy',
      'Av. Padre Hurtado',
      'Costanera Norte (accesos)',
      'Av. Vitacura (corredor)',
    ],
    notes: 'Una de solo dos comunas que SUBIÓ en 2025 (+30%). Efecto globo: la red de pórticos lectores de patentes redujo otros delitos vehiculares a la mitad, pero desplazó portonazos hacia el interior.',
    color: '#eab308',
  },
  {
    id: 'laReina',
    name: 'La Reina',
    center: [-33.4490, -70.5570],
    crimeIndex: 35,
    portonazos2024: 63,
    portonazos2025: 26,
    encerronas2024: 3,
    trend: 'baja',
    trendPct: -54,
    hotspots: [
      'Calle Bramante',
      'Calle Julia Bernstein (sector Bachelet)',
      'Av. Larraín (corredor)',
      'Sector alto residencial',
    ],
    notes: 'Segunda mayor baja porcentual de la región (-54%). En oct 2024 se desarticuló una banda que operaba en Ñuñoa y La Reina simultáneamente (3 detenidos).',
    color: '#84cc16',
  },
  {
    id: 'providencia',
    name: 'Providencia',
    center: [-33.4380, -70.6160],
    crimeIndex: 38,
    portonazos2024: 45,
    portonazos2025: 58,
    encerronas2024: 4,
    trend: 'sube',
    trendPct: +29,
    hotspots: [
      'Accesos Américo Vespucio',
      'Eje Vicuña Mackenna (límite Macul)',
      'Av. Providencia (corredor comercial)',
      'Sector Baquedano',
    ],
    notes: 'Históricamente con la mayor reducción de la región (2019-2021), la tendencia se revirtió en 2024-2025. Segunda comuna que aumentó junto a Las Condes.',
    color: '#eab308',
  },
  {
    id: 'sanJoaquin',
    name: 'San Joaquín',
    center: [-33.4960, -70.6380],
    crimeIndex: 58,
    portonazos2024: 18,
    portonazos2025: 22,
    encerronas2024: 0,
    trend: 'sube',
    trendPct: +57,
    hotspots: [
      'Población La Legua (zona estructurada)',
      'Av. Las Industrias',
      'Sector La Castrina',
      'Av. San Francisco',
    ],
    notes: 'Perfil delictual distinto: menos portonazos clásicos pero robo de vehículos general subió +57% en sector La Castrina (77→121 casos 2023-2024). La Legua es zona de crimen organizado identificada por Carabineros.',
    color: '#f97316',
  },
];

// Heat map points - arrays of [lat, lng, intensity]
// intensity: 0-1, higher = more crime
// Generated from known hotspot intersections + interpolated clusters

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
  // ÑUÑOA — crimeIndex 72 (mayor en el grupo)
  // ═══════════════════════════════════════
  // Coventry / San Juan de Luz - hotspot confirmado
  ...scatter(-33.4580, -70.6080, 0.92, 0.003, 8, 'portonazo', 'noche'),
  ...scatter(-33.4580, -70.6080, 0.75, 0.003, 4, 'portonazo', 'tarde'),
  // Luis Beltrán / Rengo
  ...scatter(-33.4720, -70.5950, 0.88, 0.003, 7, 'portonazo', 'noche'),
  // Irarrázaval corridor
  ...scatter(-33.4560, -70.6100, 0.80, 0.004, 9, 'portonazo', 'tarde'),
  ...scatter(-33.4560, -70.6100, 0.70, 0.003, 5, 'encerrona', 'noche'),
  // Vicuña Mackenna / Vespucio (límite Macul) - top hotspot RM
  ...scatter(-33.4900, -70.6200, 0.95, 0.004, 10, 'encerrona', 'noche'),
  ...scatter(-33.4900, -70.6200, 0.85, 0.003, 7, 'portonazo', 'noche'),
  // Rotonda Rodrigo de Araya
  ...scatter(-33.4850, -70.6050, 0.90, 0.003, 8, 'encerrona', 'noche'),
  // Estadio Nacional área
  ...scatter(-33.4660, -70.6070, 0.70, 0.004, 8, 'portonazo', 'tarde'),
  ...scatter(-33.4660, -70.6070, 0.60, 0.003, 5, 'portonazo', 'noche'),
  // Centro Ñuñoa
  ...scatter(-33.4620, -70.5980, 0.72, 0.005, 10, 'portonazo', 'noche'),
  ...scatter(-33.4620, -70.5980, 0.55, 0.004, 7, 'portonazo', 'tarde'),
  // Av. Marchant Pereira
  ...scatter(-33.4490, -70.6050, 0.65, 0.003, 6, 'portonazo', 'tarde'),
  // Borde oriente Ñuñoa
  ...scatter(-33.4750, -70.5820, 0.62, 0.004, 7, 'portonazo', 'noche'),
  // Sur Ñuñoa / límite Macul
  ...scatter(-33.4970, -70.5950, 0.75, 0.004, 8, 'portonazo', 'noche'),

  // ═══════════════════════════════════════
  // SAN JOAQUÍN — crimeIndex 58
  // ═══════════════════════════════════════
  // Población La Legua - zona crimen organizado
  ...scatter(-33.4960, -70.6450, 0.88, 0.004, 9, 'portonazo', 'noche'),
  ...scatter(-33.4960, -70.6450, 0.70, 0.003, 6, 'portonazo', 'tarde'),
  // Av. Las Industrias
  ...scatter(-33.4880, -70.6380, 0.80, 0.004, 8, 'portonazo', 'tarde'),
  ...scatter(-33.4880, -70.6380, 0.75, 0.003, 6, 'portonazo', 'noche'),
  // Sector La Castrina
  ...scatter(-33.5050, -70.6340, 0.82, 0.004, 8, 'portonazo', 'noche'),
  // Av. San Francisco
  ...scatter(-33.5010, -70.6430, 0.78, 0.004, 7, 'portonazo', 'noche'),
  // Norte San Joaquín (límite San Miguel)
  ...scatter(-33.4800, -70.6500, 0.72, 0.003, 6, 'portonazo', 'noche'),
  // Centro-este San Joaquín
  ...scatter(-33.4950, -70.6260, 0.65, 0.004, 7, 'portonazo', 'tarde'),
  // Zona industrial oeste
  ...scatter(-33.5100, -70.6520, 0.70, 0.003, 5, 'portonazo', 'mañana'),

  // ═══════════════════════════════════════
  // PROVIDENCIA — crimeIndex 38 (pero en alza)
  // ═══════════════════════════════════════
  // Sector Baquedano / límite Santiago
  ...scatter(-33.4390, -70.6360, 0.65, 0.003, 6, 'portonazo', 'noche'),
  ...scatter(-33.4390, -70.6360, 0.55, 0.003, 4, 'encerrona', 'tarde'),
  // Eje Vicuña Mackenna (límite Macul/Ñuñoa)
  ...scatter(-33.4600, -70.6190, 0.70, 0.003, 6, 'encerrona', 'noche'),
  // Av. Providencia (corredor comercial)
  ...scatter(-33.4320, -70.6170, 0.55, 0.004, 7, 'portonazo', 'tarde'),
  ...scatter(-33.4320, -70.6170, 0.50, 0.003, 5, 'portonazo', 'noche'),
  // Pedro de Valdivia
  ...scatter(-33.4280, -70.6060, 0.50, 0.003, 5, 'portonazo', 'tarde'),
  // Tobalaba / límite Las Condes
  ...scatter(-33.4340, -70.5960, 0.55, 0.003, 5, 'portonazo', 'noche'),
  // Salvador área
  ...scatter(-33.4250, -70.6230, 0.48, 0.003, 5, 'portonazo', 'tarde'),
  // Accesos Américo Vespucio
  ...scatter(-33.4580, -70.6080, 0.60, 0.003, 5, 'encerrona', 'noche'),

  // ═══════════════════════════════════════
  // LA REINA — crimeIndex 35 (en baja)
  // ═══════════════════════════════════════
  // Calle Bramante - hotspot confirmado
  ...scatter(-33.4420, -70.5720, 0.62, 0.003, 6, 'portonazo', 'noche'),
  // Calle Julia Bernstein (sector Bachelet)
  ...scatter(-33.4480, -70.5650, 0.58, 0.003, 5, 'portonazo', 'noche'),
  ...scatter(-33.4480, -70.5650, 0.50, 0.002, 3, 'portonazo', 'tarde'),
  // Av. Larraín (corredor)
  ...scatter(-33.4550, -70.5590, 0.55, 0.004, 7, 'portonazo', 'tarde'),
  ...scatter(-33.4550, -70.5590, 0.48, 0.003, 5, 'portonazo', 'noche'),
  // Sector alto residencial (norte La Reina)
  ...scatter(-33.4310, -70.5540, 0.45, 0.004, 6, 'portonazo', 'noche'),
  // Av. Ossa
  ...scatter(-33.4440, -70.5500, 0.42, 0.003, 5, 'portonazo', 'tarde'),
  // Sur La Reina / límite Peñalolén
  ...scatter(-33.4700, -70.5580, 0.40, 0.004, 5, 'portonazo', 'noche'),
  // Tobalaba sector
  ...scatter(-33.4350, -70.5780, 0.48, 0.003, 5, 'portonazo', 'tarde'),

  // ═══════════════════════════════════════
  // LAS CONDES — crimeIndex 42 (en alza +30%)
  // ═══════════════════════════════════════
  // Av. Apoquindo / Escuela Militar - hotspot financiero
  ...scatter(-33.4160, -70.5680, 0.72, 0.004, 8, 'portonazo', 'noche'),
  ...scatter(-33.4160, -70.5680, 0.60, 0.003, 5, 'portonazo', 'tarde'),
  // Av. Presidente Kennedy
  ...scatter(-33.3950, -70.5420, 0.65, 0.004, 7, 'portonazo', 'noche'),
  ...scatter(-33.3950, -70.5420, 0.55, 0.003, 5, 'encerrona', 'tarde'),
  // Av. Padre Hurtado
  ...scatter(-33.3820, -70.5310, 0.60, 0.004, 6, 'portonazo', 'noche'),
  // Costanera Norte accesos
  ...scatter(-33.3990, -70.5540, 0.62, 0.003, 6, 'encerrona', 'noche'),
  // Av. Vitacura (corredor)
  ...scatter(-33.3900, -70.5600, 0.58, 0.004, 7, 'portonazo', 'tarde'),
  // Manquehue sector
  ...scatter(-33.4010, -70.5470, 0.55, 0.003, 6, 'portonazo', 'noche'),
  // Av. Las Condes (corredor este)
  ...scatter(-33.4200, -70.5440, 0.58, 0.005, 8, 'portonazo', 'noche'),
  ...scatter(-33.4200, -70.5440, 0.45, 0.004, 6, 'portonazo', 'tarde'),
  // Sur Las Condes / límite La Reina
  ...scatter(-33.4600, -70.5560, 0.50, 0.003, 5, 'portonazo', 'noche'),
  // El Golf / sector financiero
  ...scatter(-33.4100, -70.5700, 0.65, 0.003, 6, 'portonazo', 'noche'),
];

export const rmStats = {
  totalEncerronas2024: 391, // PDI Jan-Sep 2024
  peakHours: '20:00 – 00:00',
  peakDays: 'Viernes, Lunes, Miércoles',
  perpetratorAge: '46% entre 15-18 años',
  perpetratorGender: '94% masculino',
  targetedVehicles: 'SUV y Station Wagon (BMW, Peugeot, Mazda)',
  topCommuneEncerronas: 'Macul (34), La Florida (30), Peñalolén (16)',
};
