'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Store,
  Warehouse,
  CheckCircle2,
  Clock,
  Copy,
  Check,
} from 'lucide-react';

interface DealersMapPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

interface DealerItem {
  id: string;
  code: string;
  name: string;
  status: 'Open' | 'Coming soon';
  province: string;
  city: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
}

const DEALERS: DealerItem[] = [
  {
    id: 'mb01',
    code: 'MB01-MAIN',
    name: 'Yuan Construction Ltd.',
    status: 'Open',
    province: 'Manitoba',
    city: 'Winnipeg, MB',
    address: '856 Century Street',
    postal: 'R3H 0M5',
    phone: '204 221 8288',
    email: 'MB01@VANSTRO.CA',
    lat: 49.909,
    lng: -97.1591,
  },
  {
    id: 'mb02',
    code: 'MB02',
    name: "Contractor's Corner",
    status: 'Open',
    province: 'Manitoba',
    city: 'Brandon, MB',
    address: '408 Park Ave E',
    postal: 'R7A 7A2',
    phone: '(204) 727-3799',
    email: 'contactus@contractorscorner.ca',
    lat: 49.8304,
    lng: -99.9239,
  },
  {
    id: 'ab10',
    code: 'AB10',
    name: 'Calgary Territory',
    status: 'Coming soon',
    province: 'Alberta',
    city: 'Calgary, AB',
    address: 'Dealer Partner Territory (Recruiting)',
    postal: '',
    phone: '1-855-VANSTRO',
    email: 'dealer@vanstro.ca',
    lat: 51.0455,
    lng: -114.0565,
  },
  {
    id: 'bc10',
    code: 'BC10',
    name: 'Saanich / Victoria Territory',
    status: 'Coming soon',
    province: 'British Columbia',
    city: 'Saanich, BC',
    address: 'Dealer Partner Territory (Recruiting)',
    postal: '',
    phone: '1-855-VANSTRO',
    email: 'dealer@vanstro.ca',
    lat: 48.4594,
    lng: -123.3765,
  },
  {
    id: 'on10',
    code: 'ON10',
    name: 'Waterloo Territory',
    status: 'Coming soon',
    province: 'Ontario',
    city: 'Waterloo, ON',
    address: 'Dealer Partner Territory (Recruiting)',
    postal: '',
    phone: '1-855-VANSTRO',
    email: 'dealer@vanstro.ca',
    lat: 43.4633,
    lng: -80.5201,
  },
  {
    id: 'qc10',
    code: 'QC10',
    name: 'Pointe-Claire Territory',
    status: 'Coming soon',
    province: 'Quebec',
    city: 'Pointe-Claire, QC',
    address: 'Dealer Partner Territory (Recruiting)',
    postal: '',
    phone: '1-855-VANSTRO',
    email: 'dealer@vanstro.ca',
    lat: 45.4486,
    lng: -73.8171,
  },
  {
    id: 'sk10',
    code: 'SK10',
    name: 'Saskatoon Territory',
    status: 'Coming soon',
    province: 'Saskatchewan',
    city: 'Saskatoon, SK',
    address: 'Dealer Partner Territory (Recruiting)',
    postal: '',
    phone: '1-855-VANSTRO',
    email: 'dealer@vanstro.ca',
    lat: 52.1307,
    lng: -106.6602,
  },
];

function MapController({ selectedDealer }: { selectedDealer: DealerItem | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (map && selectedDealer) {
      map.panTo({ lat: selectedDealer.lat, lng: selectedDealer.lng });
      map.setZoom(12);
    }
  }, [map, selectedDealer]);
  return null;
}

export default function DealersMapPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: DealersMapPageProps) {
  const [selectedDealer, setSelectedDealer] = useState<DealerItem | null>(DEALERS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterProvince, setFilterProvince] = useState<string>('ALL');

  const filteredDealers = DEALERS.filter(
    (d) => filterProvince === 'ALL' || d.province === filterProvince
  );

  const copyAddress = (d: DealerItem) => {
    navigator.clipboard.writeText(`${d.name}, ${d.address}, ${d.city}${d.postal ? ' ' + d.postal : ''}`);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <div className="min-h-screen bg-white text-[#10201d] font-sans antialiased selection:bg-[#f28a0b]/20 selection:text-[#003f3f]">
      <Navbar
        currentView="dealers-map"
        onNavigate={onNavigate}
        onOpenChecklist={onOpenChecklistModal}
      />

      {/* Hero */}
      <section className="border-b border-[#d9e1df] bg-white pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5f7376] mb-6">
            <button
              type="button"
              onClick={onBackToGuides}
              className="hover:text-[#003f3f] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true" className="text-[#d9e1df]">/</span>
            <span className="text-[#5f7376]">Dealer program</span>
            <span aria-hidden="true" className="text-[#d9e1df]">/</span>
            <span className="text-[#003f3f] font-semibold">Dealer map</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] tracking-wider block">
              National Footprints
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003f3f] tracking-tight leading-[1.1]">
              Dealer Map
            </h1>
            <p className="text-base sm:text-lg text-[#315b60] leading-relaxed font-normal">
              Find a participating independent VanStro dealer for local product support, pickup and order fulfillment.
            </p>
          </div>
        </div>
      </section>

      {/* Map & Dealer Locations Section */}
      <section className="py-10 border-b border-[#d9e1df] bg-[#f5f8f7]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#003f3f]">
                Dealer locations
              </h2>
              <p className="text-xs sm:text-sm text-[#5f7376]">
                Select a marker to view dealer contact details. 7 dealer locations.
              </p>
            </div>

            {/* Province filters */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-md border border-[#d9e1df] text-xs">
              {['ALL', 'Manitoba', 'Alberta', 'British Columbia', 'Ontario', 'Quebec', 'Saskatchewan'].map((prov) => (
                <button
                  key={prov}
                  type="button"
                  onClick={() => setFilterProvince(prov)}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    filterProvince === prov
                      ? 'bg-[#003f3f] text-white font-semibold'
                      : 'text-[#5f7376] hover:text-[#003f3f]'
                  }`}
                >
                  {prov === 'ALL' ? 'All Canada' : prov}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="w-full h-[420px] sm:h-[480px] bg-white border border-[#d9e1df] rounded-xl overflow-hidden shadow-xs relative">
            {googleMapsApiKey ? (
              <APIProvider apiKey={googleMapsApiKey}>
                <Map
                  defaultCenter={{ lat: 51.5, lng: -98.0 }}
                  defaultZoom={4}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  className="w-full h-full"
                >
                  <MapController selectedDealer={selectedDealer} />
                  {filteredDealers.map((d) => (
                    <AdvancedMarker
                      key={d.id}
                      position={{ lat: d.lat, lng: d.lng }}
                      onClick={() => setSelectedDealer(d)}
                    >
                      <div className={`px-2 py-1 rounded-md text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1 border ${
                        d.status === 'Open'
                          ? 'bg-[#003f3f] text-white border-[#003f3f]'
                          : 'bg-white text-[#003f3f] border-[#d9e1df]'
                      }`}>
                        <MapPin className="w-3 h-3 text-[#f28a0b]" />
                        <span>{d.code}</span>
                      </div>
                    </AdvancedMarker>
                  ))}

                  {selectedDealer && (
                    <InfoWindow
                      position={{ lat: selectedDealer.lat, lng: selectedDealer.lng }}
                      onCloseClick={() => setSelectedDealer(null)}
                    >
                      <div className="p-2 space-y-1 text-xs text-[#10201d]">
                        <span className="font-bold text-[#003f3f] block">{selectedDealer.name} ({selectedDealer.code})</span>
                        <p>{selectedDealer.address}, {selectedDealer.city}</p>
                        <p className="font-mono text-[#5f7376]">{selectedDealer.phone}</p>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          selectedDealer.status === 'Open' ? 'bg-[#edf4ee] text-[#0b7a4b]' : 'bg-[#f5f8f7] text-[#5f7376]'
                        }`}>
                          {selectedDealer.status}
                        </span>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#f5f8f7]">
                <MapPin className="w-10 h-10 text-[#f28a0b] mb-2" />
                <p className="text-sm font-bold text-[#003f3f]">Interactive Location Map</p>
                <p className="text-xs text-[#5f7376] max-w-sm mt-1">
                  Operating warehouse in Winnipeg, independent dealer representation in Brandon, and expanding dealer territories across Canada.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Directory Cards Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
          <div className="border-b border-[#d9e1df] pb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#f28a0b] block mb-1">
              Local dealer contacts
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003f3f]">
              Find the Nearest Support Contact
            </h2>
            <p className="text-xs sm:text-sm text-[#5f7376] mt-2 leading-relaxed max-w-3xl">
              The local dealer selected for an order confirms availability and coordinates pickup, delivery options, return requests and after-sales assistance. Contact that dealer for installation or other separately offered local services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((d) => {
              const isSelected = selectedDealer?.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDealer(d)}
                  className={`p-6 border rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#003f3f] bg-[#fafbfb] shadow-md ring-1 ring-[#003f3f]'
                      : 'border-[#d9e1df] bg-white hover:border-[#003f3f]/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#003f3f] px-2 py-0.5 bg-[#f5f8f7] rounded border border-[#d9e1df]">
                        {d.code}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        d.status === 'Open'
                          ? 'bg-[#edf4ee] text-[#0b7a4b]'
                          : 'bg-[#f5f8f7] text-[#5f7376]'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#003f3f]">{d.name}</h3>
                      <p className="text-xs text-[#5f7376]">{d.province}</p>
                    </div>

                    <div className="text-xs text-[#10201d] space-y-1.5 pt-2">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#f28a0b] mt-0.5 shrink-0" />
                        <span>{d.address}, {d.city} {d.postal}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#f28a0b] shrink-0" />
                        <span className="font-mono">{d.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#f28a0b] shrink-0" />
                        <span>{d.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#d9e1df] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyAddress(d);
                      }}
                      className="text-[#5f7376] hover:text-[#003f3f] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === d.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#0b7a4b]" />
                          <span className="text-[#0b7a4b]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.address} ${d.city} ${d.postal}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#003f3f] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d9e1df] bg-white py-10 text-xs text-[#5f7376]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-[#003f3f]">VanStro Global Supply Inc.</p>
            <p>856 Century Street, Winnipeg, MB R3H 0M5 · Canada</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:18558267876" className="hover:text-[#003f3f]">1-855-VANSTRO</a>
            <a href="mailto:dealer@vanstro.ca" className="hover:text-[#003f3f]">dealer@vanstro.ca</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
