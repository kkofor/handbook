'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Search,
  Phone,
  Mail,
  Clock,
  Navigation,
  ExternalLink,
  Store,
  Warehouse,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Building2,
  Layers,
  Globe2,
  AlertCircle,
  Truck,
  ShoppingCart,
  Wrench,
} from 'lucide-react';

interface DealersMapPageProps {
  onBackToGuides?: () => void;
  onNavigate?: (view: string) => void;
  onOpenChecklistModal?: () => void;
}

export interface DealerLocation {
  id: string;
  name: string;
  status: 'Open' | 'Coming Soon';
  badge: string;
  province: string;
  city: string;
  address: string;
  postal: string;
  phone: string;
  email: string;
  hours: string;
  lat: number;
  lng: number;
  services: string[];
  description: string;
}

// Authentic VanStro Dealer network footprints from vanstro.ca/dealers/map/
const DEALERS_DATA: DealerLocation[] = [
  {
    id: 'winnipeg-hq',
    name: 'VanStro Central Warehouse & Winnipeg Pickup',
    status: 'Open',
    badge: 'Central Distribution & Support (Open)',
    province: 'Manitoba',
    city: 'Winnipeg',
    address: '856 Century Street (Distribution & Order Pickup)',
    postal: 'Winnipeg, MB R3H 0M5',
    phone: '204-777-6668',
    email: 'dealer@vanstro.ca',
    hours: 'Mon – Fri: 8:30 AM – 5:00 PM CST',
    lat: 49.8951,
    lng: -97.2023,
    services: [
      'Order Pickup Bay',
      'Customer Support',
      'Cabinet & Vanity Displays',
      'Central Logistics Hub',
    ],
    description:
      'VanStro central Canadian warehouse and distribution facility. Open for order pickup, dealer fulfillment, and product support.',
  },
  {
    id: 'brandon-contractors-corner',
    name: "Contractor's Corner (Brandon)",
    status: 'Open',
    badge: 'Authorized Dealer (Open)',
    province: 'Manitoba',
    city: 'Brandon',
    address: '408 Park Ave E',
    postal: 'Brandon, MB R7A 7A8',
    phone: '204-728-2233',
    email: 'support@vanstro.ca',
    hours: 'Mon – Fri: 8:00 AM – 5:00 PM CST',
    lat: 49.8398,
    lng: -99.9324,
    services: [
      'Local Order Pickup',
      'Showroom Samples',
      'Contractor Direct Supply',
      'Local Delivery Coordination',
    ],
    description:
      "Authorized VanStro local dealer serving Brandon and the Westman region with localized order execution, pickup, and contractor support.",
  },
  {
    id: 'saanich-bc',
    name: 'Saanich / Victoria Dealer Partner',
    status: 'Coming Soon',
    badge: 'Pacific Footprint (Coming Soon)',
    province: 'British Columbia',
    city: 'Saanich / Victoria',
    address: 'Vernon Avenue',
    postal: 'Saanich, BC V8X 2W7',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    hours: 'Opening Scheduled 2026',
    lat: 48.4552,
    lng: -123.3768,
    services: [
      'Local Order Execution',
      'Showroom Display',
      'Pickup Staging',
      'Separate Installation Services',
    ],
    description:
      'Upcoming Pacific dealer location serving Vancouver Island contractors and homeowners with local order pickup and showroom viewing.',
  },
  {
    id: 'calgary-ab',
    name: 'Calgary Commercial Partner',
    status: 'Coming Soon',
    badge: 'Alberta Footprint (Coming Soon)',
    province: 'Alberta',
    city: 'Calgary',
    address: 'Dartmouth Road SE Area',
    postal: 'Calgary, AB T2G 2M3',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    hours: 'Opening Scheduled 2026',
    lat: 51.0267,
    lng: -114.0456,
    services: [
      'Regional Contractor Staging',
      'Local Order Handoff',
      'Cabinet & Vanity Samples',
    ],
    description:
      'Upcoming Alberta partner hub facilitating local order staging and trade customer support across the Calgary metropolitan region.',
  },
  {
    id: 'saskatoon-sk',
    name: 'Saskatoon Prairie Partner',
    status: 'Coming Soon',
    badge: 'Saskatchewan Footprint (Coming Soon)',
    province: 'Saskatchewan',
    city: 'Saskatoon',
    address: '3rd Avenue North Corridor',
    postal: 'Saskatoon, SK S7K 0J5',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    hours: 'Opening Scheduled 2026',
    lat: 52.1332,
    lng: -106.67,
    services: [
      'Local Order Pickup',
      'Trade Account Support',
      'Showroom Staging',
    ],
    description:
      'Upcoming Saskatchewan dealer partner location serving Saskatoon, Regina, and central Prairie renovation contractors.',
  },
  {
    id: 'pointe-claire-qc',
    name: 'Pointe-Claire / Montreal Commercial Partner',
    status: 'Coming Soon',
    badge: 'Quebec Footprint (Coming Soon)',
    province: 'Quebec',
    city: 'Pointe-Claire / Montreal',
    address: 'Saint-Jean Boulevard Corridor',
    postal: 'Pointe-Claire, QC H9R 3J3',
    phone: '514-697-3928',
    email: 'dealer@vanstro.ca',
    hours: 'Opening Scheduled 2026',
    lat: 45.4526,
    lng: -73.8188,
    services: [
      'Bilingual Support (FR/EN)',
      'Local Order Execution',
      'Showroom Sample Point',
    ],
    description:
      'Upcoming bilingual Eastern Canada partner location handling Greater Montreal order execution and contractor pickup.',
  },
  {
    id: 'waterloo-on',
    name: 'Waterloo Regional Partner',
    status: 'Coming Soon',
    badge: 'Ontario Footprint (Coming Soon)',
    province: 'Ontario',
    city: 'Waterloo',
    address: 'Northfield Drive Area',
    postal: 'Waterloo, ON N2L 4E4',
    phone: '1-855-826-7876',
    email: 'dealer@vanstro.ca',
    hours: 'Opening Scheduled 2026',
    lat: 43.4984,
    lng: -80.5367,
    services: [
      'Local Order Pickup',
      'Showroom Displays',
      'Separate Contractor Installation',
    ],
    description:
      'Upcoming Southern Ontario partner location providing local order preparation and showroom consultations for the Waterloo Region.',
  },
];

const PROVINCES = [
  'All Canada',
  'Manitoba',
  'Alberta',
  'Quebec',
  'Saskatchewan',
  'British Columbia',
  'Ontario',
];

// Helper camera controller to smoothly pan/zoom map on dealer selection
function MapCameraSynchronizer({
  activeLocation,
}: {
  activeLocation?: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !activeLocation) return;
    map.panTo({ lat: activeLocation.lat, lng: activeLocation.lng });
    map.setZoom(12);
  }, [map, activeLocation]);

  return null;
}

// Marker component with attached InfoWindow for Google Maps
function DealerInteractiveMarker({
  dealer,
  isSelected,
  onSelect,
}: {
  dealer: DealerLocation;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: dealer.lat, lng: dealer.lng }}
        title={dealer.name}
        onClick={onSelect}
      >
        <div
          className={`relative flex items-center justify-center rounded-full transition-transform cursor-pointer shadow-lg ${
            isSelected
              ? 'w-10 h-10 bg-[#181715] text-[#C5A069] border-2 border-[#9B7A4F] scale-110 z-20'
              : dealer.status === 'Open'
              ? 'w-9 h-9 bg-[#9B7A4F] text-white border-2 border-white hover:scale-110'
              : 'w-8 h-8 bg-white text-[#8C827A] border-2 border-[#DFD6C5] hover:scale-110 opacity-90'
          }`}
        >
          {dealer.id === 'winnipeg-hq' ? (
            <Building2 className="w-4 h-4" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
        </div>
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} onCloseClick={onSelect} maxWidth={300}>
          <div className="p-1 font-sans text-xs text-[#181715]">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={`text-[9px] font-mono uppercase px-1.5 py-0.5 font-bold ${
                  dealer.status === 'Open'
                    ? 'bg-[#EBF7EE] text-[#1E7E34] border border-[#C3E6CB]'
                    : 'bg-[#FAF5EE] text-[#8C827A] border border-[#DFD6C5]'
                }`}
              >
                {dealer.status}
              </span>
              <span className="text-[10px] font-mono uppercase text-[#9B7A4F] font-semibold">
                {dealer.city}
              </span>
            </div>
            <h4 className="font-serif-luxury font-bold text-sm text-[#181715] mb-1 leading-snug">
              {dealer.name}
            </h4>
            <p className="text-[11px] text-[#6B665F] mb-2 leading-relaxed">
              {dealer.address}
            </p>
            <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-[#EAE6DF]">
              <span className="font-mono font-bold text-[#181715]">{dealer.phone}</span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  dealer.address + ', ' + dealer.postal
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9B7A4F] hover:underline font-semibold"
              >
                Directions →
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function DealersMapPage({
  onBackToGuides,
  onNavigate,
  onOpenChecklistModal,
}: DealersMapPageProps) {
  const [selectedProvince, setSelectedProvince] = useState<string>('All Canada');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDealerId, setActiveDealerId] = useState<string>('winnipeg-hq');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Setup Quota Defense Listener per GMP Skill Case A guidelines
  useEffect(() => {
    (window as unknown as { gm_authFailure: () => void }).gm_authFailure = () => {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    };

    const origError = console.error;
    console.error = (...args: unknown[]) => {
      origError.apply(console, args);
      const msg = args.map((a) => String(a)).join(' ');
      if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
    };

    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };

    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
      console.error = origError;
    };
  }, []);

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    (typeof window !== 'undefined'
      ? (window as unknown as { GOOGLE_MAPS_API_KEY?: string }).GOOGLE_MAPS_API_KEY
      : '') ||
    '';

  const filteredDealers = useMemo(() => {
    return DEALERS_DATA.filter((dealer) => {
      const matchesProvince =
        selectedProvince === 'All Canada' || dealer.province === selectedProvince;

      const matchesStatus =
        selectedStatus === 'All' || dealer.status === selectedStatus;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dealer.name.toLowerCase().includes(query) ||
        dealer.city.toLowerCase().includes(query) ||
        dealer.address.toLowerCase().includes(query) ||
        dealer.province.toLowerCase().includes(query);

      return matchesProvince && matchesStatus && matchesSearch;
    });
  }, [selectedProvince, selectedStatus, searchQuery]);

  const activeDealer = useMemo(() => {
    return (
      DEALERS_DATA.find((d) => d.id === activeDealerId) ||
      filteredDealers[0] ||
      DEALERS_DATA[0]
    );
  }, [activeDealerId, filteredDealers]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#181715] flex flex-col font-sans selection:bg-[#9B7A4F]/20 selection:text-[#181715]">
      {/* Client-Side Quota Defense Banner (Case A) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Universal Top Navigation */}
      <Navbar
        currentView="dealers-map"
        onNavigate={onNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenChecklist={onOpenChecklistModal}
      />

      <main className="flex-1">
        {/* =========================================================================
            HEADER: Authentic VanStro Dealer Network Header
        ========================================================================= */}
        <section className="pt-12 pb-12 border-b border-[#EAE6DF] bg-gradient-to-b from-[#FAF8F5] to-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase mb-6">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('about')}
                className="text-[#8C827A] hover:text-[#181715] transition-colors"
              >
                VanStro Canada
              </button>
              <span className="text-[#C5A069]">/</span>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('dealer-program')}
                className="text-[#8C827A] hover:text-[#181715] transition-colors"
              >
                Dealer Network
              </button>
              <span className="text-[#C5A069]">/</span>
              <span className="text-[#181715] font-bold">Authorized Dealer Map</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF5EE] border border-[#DFD6C5] text-[#9B7A4F] text-[11px] font-mono uppercase tracking-widest font-semibold mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Canadian Authorized Dealer Network</span>
                </div>
                <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#181715] font-normal tracking-tight">
                  VanStro Cabinet Dealer Map
                </h1>
                <p className="text-sm sm:text-base text-[#6B665F] mt-3 leading-relaxed">
                  Locate participating independent VanStro dealers across Canada for local order pickup, fulfillment, showroom displays, and contractor services.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('dealer-program')}
                  className="px-5 py-3 bg-[#181715] hover:bg-[#9B7A4F] text-[#FAF7F2] text-xs font-mono uppercase tracking-widest font-semibold transition-colors flex items-center gap-2"
                >
                  <span>Become a Dealer</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A069]" />
                </button>
              </div>
            </div>

            {/* How the VanStro Dealer Network Works (Authentic from vanstro.ca/dealers/map/) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#EAE6DF]">
              <div className="p-4 bg-white border border-[#DFD6C5] flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-[#9B7A4F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-mono text-xs uppercase font-bold text-[#181715] tracking-wider">
                    Online Ordering &amp; National Pricing
                  </h3>
                  <p className="text-xs text-[#5A554E] mt-1 leading-relaxed">
                    Customers order and pay online at transparent national platform prices. The selected local dealer prepares the order for local pickup or arranges local delivery.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#DFD6C5] flex items-start gap-3">
                <Wrench className="w-5 h-5 text-[#9B7A4F] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-mono text-xs uppercase font-bold text-[#181715] tracking-wider">
                    Local Execution &amp; Support
                  </h3>
                  <p className="text-xs text-[#5A554E] mt-1 leading-relaxed">
                    Local dealers operate independently to handle product handoffs, customer returns, after-sales support, and separate on-site services like installation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEARCH & FILTER CONTROLS BAR
        ========================================================================= */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] py-4 shadow-[0_2px_10px_rgba(24,23,21,0.03)]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A]" />
                <input
                  type="text"
                  placeholder="Search by city, address, or dealer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#DFD6C5] text-xs font-sans text-[#181715] focus:outline-none focus:border-[#9B7A4F] rounded-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C827A] hover:text-[#181715]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-[#8C827A] uppercase hidden sm:inline">
                  Status:
                </span>
                <div className="flex items-center border border-[#DFD6C5] bg-[#FAF7F2] p-0.5">
                  {['All', 'Open', 'Coming Soon'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        selectedStatus === st
                          ? 'bg-[#181715] text-[#FAF7F2] font-semibold'
                          : 'text-[#6B665F] hover:text-[#181715]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Province Pill Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {PROVINCES.map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setSelectedProvince(prov)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedProvince === prov
                        ? 'bg-[#181715] text-[#FAF7F2] font-semibold'
                        : 'bg-[#FAF7F2] text-[#6B665F] hover:bg-[#F0ECE4] border border-[#DFD6C5]'
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MAP + LOCATOR SPLIT VIEW (GOOGLE MAPS)
        ========================================================================= */}
        <section className="py-10 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Google Map */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#FAF7F2] border border-[#DFD6C5] p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAE6DF] mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#9B7A4F] font-bold block">
                        Interactive Google Map
                      </span>
                      <h3 className="font-serif-luxury text-lg font-medium text-[#181715]">
                        Canadian Dealer &amp; Warehouse Locations
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#7A746B]">
                      {filteredDealers.length} Locations Listed
                    </span>
                  </div>

                  {/* Google Maps Container */}
                  <div className="relative w-full h-[400px] sm:h-[460px] bg-[#EAE6DF] border border-[#DFD6C5] overflow-hidden">
                    <APIProvider apiKey={apiKey} libraries={['marker']}>
                      <Map
                        mapId={'DEMO_MAP_ID'}
                        defaultCenter={{ lat: 51.5, lng: -96.5 }}
                        defaultZoom={4}
                        gestureHandling={'greedy'}
                        disableDefaultUI={false}
                        style={{ width: '100%', height: '100%' }}
                        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                      >
                        <MapCameraSynchronizer
                          activeLocation={
                            activeDealer ? { lat: activeDealer.lat, lng: activeDealer.lng } : null
                          }
                        />

                        {filteredDealers.map((dealer) => (
                          <DealerInteractiveMarker
                            key={dealer.id}
                            dealer={dealer}
                            isSelected={activeDealer.id === dealer.id}
                            onSelect={() => setActiveDealerId(dealer.id)}
                          />
                        ))}
                      </Map>
                    </APIProvider>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-[#7A746B] mt-3 pt-2.5 border-t border-[#EAE6DF]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#9B7A4F]" />
                        <span>Open for Pickup &amp; Support</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-white border border-[#DFD6C5]" />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px]">
                      Click pin to view contact &amp; hours
                    </span>
                  </div>
                </div>

                {/* Selected Dealer Inspection Card */}
                {activeDealer && (
                  <div className="bg-white border-2 border-[#9B7A4F] p-6 shadow-md">
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#EAE6DF] mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9px] font-mono uppercase px-2 py-0.5 font-bold ${
                              activeDealer.status === 'Open'
                                ? 'bg-[#EBF7EE] text-[#1E7E34] border border-[#C3E6CB]'
                                : 'bg-[#FAF5EE] text-[#8C827A] border border-[#DFD6C5]'
                            }`}
                          >
                            {activeDealer.status}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-[#9B7A4F] font-semibold">
                            {activeDealer.city}, {activeDealer.province}
                          </span>
                        </div>
                        <h3 className="font-serif-luxury text-2xl text-[#181715] font-medium">
                          {activeDealer.name}
                        </h3>
                      </div>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          activeDealer.address + ', ' + activeDealer.postal
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#181715] hover:bg-[#9B7A4F] text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#C5A069]" />
                        <span>Get Directions</span>
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed mb-5">
                      {activeDealer.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF7F2] border border-[#DFD6C5] mb-5 text-xs text-[#5A554E]">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#9B7A4F] shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#181715] block">Address:</strong>
                            <span>{activeDealer.address}</span>
                            <span className="block text-[#8C827A] font-mono mt-0.5">
                              {activeDealer.postal}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#9B7A4F] shrink-0" />
                          <div>
                            <strong className="text-[#181715]">Hours: </strong>
                            <span>{activeDealer.hours}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#9B7A4F] shrink-0" />
                          <div>
                            <strong className="text-[#181715]">Phone: </strong>
                            <a
                              href={`tel:${activeDealer.phone}`}
                              className="font-mono text-[#181715] hover:text-[#9B7A4F] font-semibold"
                            >
                              {activeDealer.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#9B7A4F] shrink-0" />
                          <div>
                            <strong className="text-[#181715]">Email: </strong>
                            <a
                              href={`mailto:${activeDealer.email}`}
                              className="font-mono text-[#181715] hover:text-[#9B7A4F]"
                            >
                              {activeDealer.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verified Capabilities */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C827A] font-bold block mb-2">
                        Dealer Services
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeDealer.services.map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#DFD6C5] text-xs font-mono text-[#181715]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9B7A4F]" />
                            <span>{service}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Dealer Cards Directory List */}
              <div className="lg:col-span-5 space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE6DF]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8C827A] font-bold">
                    Participating Locations ({filteredDealers.length})
                  </span>
                  <span className="text-[11px] font-mono text-[#9B7A4F]">
                    {selectedProvince}
                  </span>
                </div>

                {filteredDealers.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF7F2] border border-[#DFD6C5]">
                    <p className="text-xs text-[#7A746B] mb-3">
                      No locations found matching &quot;{searchQuery}&quot;.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedProvince('All Canada');
                        setSelectedStatus('All');
                      }}
                      className="px-4 py-2 bg-[#181715] text-white text-xs font-mono uppercase tracking-wider"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredDealers.map((dealer) => {
                    const isSelected = activeDealer.id === dealer.id;
                    return (
                      <div
                        key={dealer.id}
                        onClick={() => setActiveDealerId(dealer.id)}
                        className={`p-5 border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF7F2] border-[#9B7A4F] shadow-sm ring-1 ring-[#9B7A4F]'
                            : 'bg-white border-[#DFD6C5] hover:border-[#9B7A4F]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span
                            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 font-bold ${
                              dealer.status === 'Open'
                                ? 'bg-[#EBF7EE] text-[#1E7E34] border border-[#C3E6CB]'
                                : 'bg-[#FAF5EE] text-[#8C827A] border border-[#DFD6C5]'
                            }`}
                          >
                            {dealer.status}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C827A] uppercase">
                            {dealer.province}
                          </span>
                        </div>

                        <h4 className="font-serif-luxury text-base text-[#181715] font-medium mb-1">
                          {dealer.name}
                        </h4>
                        <p className="text-xs text-[#6B665F] mb-3 line-clamp-1">
                          {dealer.address}
                        </p>

                        <div className="flex items-center justify-between text-xs pt-2.5 border-t border-[#EAE6DF]">
                          <span className="font-mono text-[#181715] font-semibold">
                            {dealer.phone}
                          </span>
                          <span className="text-[#9B7A4F] font-mono text-[11px] flex items-center gap-1">
                            <span>Select on Map</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Dealer Recruitment Card */}
                <div className="p-6 bg-[#181715] text-[#FAF7F2] mt-6">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A069] font-bold block mb-1">
                    Dealer Network
                  </span>
                  <h4 className="font-serif-luxury text-lg text-white font-medium mb-2">
                    Operate a local showroom or contracting business?
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-4">
                    Learn how the VanStro Dealer Program separates digital product supply from localized dealer services.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('dealer-program')}
                    className="w-full py-2.5 bg-[#9B7A4F] hover:bg-[#C5A069] text-white text-xs font-mono uppercase tracking-widest font-semibold transition-colors text-center"
                  >
                    View Dealer Program Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
