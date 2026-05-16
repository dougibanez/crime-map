'use client';

import { useEffect, useRef, useState } from 'react';
import { communeStats, allHeatPoints, communePolygons, type CrimeType, type TimeFilter } from '@/lib/crimeData';

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

interface Props {
  crimeType: CrimeType;
  timeFilter: TimeFilter;
  selectedCommune: string | null;
  onSelectCommune: (id: string | null) => void;
}

export default function CrimeHeatMap({ crimeType, timeFilter, selectedCommune, onSelectCommune }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heatLayerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (await import('leaflet')) as any;
      await import('leaflet.heat');

      if (!isMounted || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [-33.447, -70.586],
        zoom: 13,
        zoomControl: false,
        // Prevent issues with mobile pinch zoom
        tap: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      leafletMapRef.current = map;

      // ResizeObserver: invalidate map size whenever the container resizes
      // (fixes zoom bugs on mobile Safari and layout transitions)
      const ro = new ResizeObserver(() => {
        map.invalidateSize({ animate: false });
      });
      ro.observe(mapRef.current);

      // Draw commune polygons
      Object.entries(communePolygons).forEach(([id, coords]) => {
        const commune = communeStats.find(c => c.id === id);
        if (!commune) return;

        const poly = L.polygon(coords, {
          color: commune.color,
          weight: 2,
          opacity: 0.9,
          fillColor: commune.color,
          fillOpacity: 0.08,
        });

        poly.on('click', () => { onSelectCommune(id); });
        poly.on('mouseover', () => { poly.setStyle({ fillOpacity: 0.22, weight: 3 }); });
        poly.on('mouseout',  () => { poly.setStyle({ fillOpacity: 0.08, weight: 2 }); });

        const tooltipContent = `
          <div style="font-weight:700;font-size:13px;color:#f9fafb">${commune.name}</div>
          <div style="font-size:11px;color:#9ca3af;margin-top:2px">Portonazos 2024: <b>${commune.portonazos2024}</b></div>
          <div style="font-size:11px;color:${commune.trend === 'sube' ? '#f87171' : '#4ade80'};margin-top:1px">
            ${commune.trend === 'sube' ? '↑' : '↓'} ${Math.abs(commune.trendPct)}% tendencia 2025
          </div>
        `;

        poly.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'center',
          className: 'commune-tooltip',
        });

        poly.addTo(map);
      });

      if (isMounted) setIsLoaded(true);

      return () => ro.disconnect();
    };

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update heat layer when filters change
  useEffect(() => {
    if (!leafletMapRef.current || !isLoaded) return;

    const updateHeat = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (await import('leaflet')) as any;
      await import('leaflet.heat');

      if (heatLayerRef.current) {
        leafletMapRef.current.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }

      const filtered = allHeatPoints.filter(p => {
        const typeMatch = crimeType === 'todos' || p.type === crimeType;
        const timeMatch = timeFilter === 'todos' || p.timeOfDay === timeFilter;
        return typeMatch && timeMatch;
      });

      const points: [number, number, number][] = filtered.map(p => [p.lat, p.lng, p.intensity]);
      if (points.length === 0) return;

      const heat = L.heatLayer(points, {
        radius: 28,
        blur: 20,
        maxZoom: 17,
        max: 1.0,
        minOpacity: 0.3,
        gradient: {
          0.0: '#1e3a5f',
          0.2: '#2563eb',
          0.4: '#16a34a',
          0.55: '#eab308',
          0.7: '#f97316',
          0.85: '#dc2626',
          1.0: '#7f1d1d',
        },
      });

      heat.addTo(leafletMapRef.current);
      heatLayerRef.current = heat;
    };

    updateHeat();
  }, [crimeType, timeFilter, isLoaded]);

  // Pan to selected commune
  useEffect(() => {
    if (!leafletMapRef.current || !selectedCommune) return;
    const commune = communeStats.find(c => c.id === selectedCommune);
    if (commune) {
      leafletMapRef.current.flyTo(commune.center, 14, { duration: 0.8 });
    }
  }, [selectedCommune]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Cargando mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
}
