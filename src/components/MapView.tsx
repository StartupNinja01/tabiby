import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Doctor } from '@/data/doctors';

// Fix Leaflet's broken default icon paths when bundled with Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)['_getIconUrl'];
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapViewProps {
  doctors: Doctor[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function makeIcon(initials: string, isSelected: boolean, hasToday: boolean) {
  const bg = isSelected ? '#0d9488' : hasToday ? '#10b981' : '#475569';
  const border = isSelected ? '#fff' : '#fff';
  const size = isSelected ? 44 : 36;
  const shadow = isSelected
    ? '0 0 0 3px #0d9488, 0 4px 12px rgba(0,0,0,0.35)'
    : '0 2px 8px rgba(0,0,0,0.25)';

  return L.divIcon({
    className: '',
    html: `<div style="
      background:${bg};
      color:#fff;
      border-radius:50%;
      width:${size}px;
      height:${size}px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:${isSelected ? 12 : 11}px;
      font-weight:700;
      border:3px solid ${border};
      box-shadow:${shadow};
      cursor:pointer;
      transition:all 0.15s ease;
      font-family:Inter,sans-serif;
      letter-spacing:0;
    ">${initials}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

function makePopupHtml(doc: Doctor): string {
  const nextSlot = doc.availableSlots[0] ?? null;
  const slotBadge = nextSlot
    ? `<p style="background:#f0fdf4;color:#166534;font-size:11px;padding:3px 8px;border-radius:20px;margin:6px 0 0;display:inline-block;font-weight:600;">
        🕒 ${nextSlot}
       </p>`
    : `<p style="background:#f1f5f9;color:#64748b;font-size:11px;padding:3px 8px;border-radius:20px;margin:6px 0 0;display:inline-block;">No slots today</p>`;

  return `
    <div style="min-width:200px;max-width:240px;font-family:Inter,system-ui,sans-serif;line-height:1.4;">
      <p style="font-weight:700;font-size:14px;margin:0 0 2px;color:#0f172a;">${doc.name}</p>
      <p style="color:#0d9488;font-size:12px;font-weight:600;margin:0 0 4px;">${doc.specialty}</p>
      <p style="color:#64748b;font-size:12px;margin:0 0 4px;">⭐ ${doc.rating} · ${doc.reviews} reviews</p>
      <p style="color:#334155;font-size:12px;margin:0;">📍 ${doc.clinic}</p>
      ${slotBadge}
      <div style="margin-top:10px;">
        <a href="/book/${doc.id}"
           style="display:block;background:#0d9488;color:#fff;text-align:center;padding:7px 12px;border-radius:6px;font-size:12px;font-weight:700;text-decoration:none;">
          Book Appointment
        </a>
      </div>
    </div>
  `;
}

export default function MapView({ doctors, selectedId, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  // Stable callback ref so the effect dependencies don't change on every render
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const rebuildMarkers = useCallback(
    (map: L.Map, docs: Doctor[], selId: number | null) => {
      // Remove old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();

      docs.forEach((doc) => {
        if (doc.lat == null || doc.lng == null) return;

        const isSelected = doc.id === selId;
        const hasToday = doc.availableSlots.some((s) => s.startsWith('Today'));
        const icon = makeIcon(doc.initials, isSelected, hasToday);

        const marker = L.marker([doc.lat, doc.lng], { icon, zIndexOffset: isSelected ? 1000 : 0 })
          .addTo(map)
          .bindPopup(makePopupHtml(doc), {
            maxWidth: 260,
            className: 'tabiby-popup',
          });

        marker.on('click', () => {
          onSelectRef.current(doc.id);
        });

        if (isSelected) {
          marker.openPopup();
        }

        markersRef.current.set(doc.id, marker);
      });
    },
    [],
  );

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [25.2854, 51.531],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;
    rebuildMarkers(map, doctors, selectedId);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers when doctors list or selection changes
  useEffect(() => {
    if (!mapRef.current) return;
    rebuildMarkers(mapRef.current, doctors, selectedId);
  }, [doctors, selectedId, rebuildMarkers]);

  // Pan to selected doctor
  useEffect(() => {
    if (!mapRef.current || selectedId == null) return;
    const doc = doctors.find((d) => d.id === selectedId);
    if (doc?.lat && doc?.lng) {
      mapRef.current.setView([doc.lat, doc.lng], 14, { animate: true });
    }
  }, [selectedId, doctors]);

  return (
    <>
      <style>{`
        .tabiby-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          padding: 0;
        }
        .tabiby-popup .leaflet-popup-content {
          margin: 14px 14px;
        }
        .tabiby-popup .leaflet-popup-tip {
          background: #fff;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ minHeight: 480 }}
        aria-label="Map showing doctor locations in Doha"
      />
    </>
  );
}
