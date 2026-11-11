import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Estate, Plot } from '../../types';
import {
  Search,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  TrendingUp,
  Cpu,
  Compass,
  FileCheck,
  Layers,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface MarketplaceHomeProps {
  onOpenDeveloperModal: () => void;
  onSelectEstate: (estateId: string) => void;
  onSelectPlotForEnquiry: (plot: Plot) => void;
}

export const MarketplaceHome: React.FC<MarketplaceHomeProps> = ({
  onOpenDeveloperModal,
  onSelectEstate,
  onSelectPlotForEnquiry,
}) => {
  const { estates, plots, setActivePage } = usePlatform();

  // Search and filter states
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchBudget, setSearchBudget] = useState('All');
  const [searchSize, setSearchSize] = useState('All');
  const [activeEstateFilter, setActiveEstateFilter] = useState('ALL');

  // Filter estates
  const filteredEstates = estates.filter((estate) => {
    if (searchLocation !== 'All' && !estate.locationCity.toLowerCase().includes(searchLocation.toLowerCase()) && !estate.locationState.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Filter plots
  const filteredPlots = plots.filter((plot) => {
    if (activeEstateFilter !== 'ALL' && plot.estateId !== activeEstateFilter) return false;
    if (searchCategory !== 'All' && plot.category !== searchCategory) return false;
    if (searchSize !== 'All') {
      const sizeVal = parseInt(searchSize, 10);
      if (plot.sizeSqm !== sizeVal) return false;
    }
    if (searchBudget !== 'All') {
      if (searchBudget === 'under-10m' && plot.priceApproved >= 10000000) return false;
      if (searchBudget === '10m-20m' && (plot.priceApproved < 10000000 || plot.priceApproved > 20000000)) return false;
      if (searchBudget === 'over-20m' && plot.priceApproved <= 20000000) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 1. Homepage Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 lg:py-28 px-4 sm:px-8">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_abuja_estate_1794323126147.jpg"
            alt="Masterplanned Abuja residential estate"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-3xl">
            {/* Unboxed Metadata Header (Zero-Pill Rule) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sky-400 mb-4 uppercase">
              <span>Multi-Tenant Property Commerce</span>
              <span aria-hidden="true">·</span>
              <span>Verified Developer Ecosystem</span>
              <span aria-hidden="true">·</span>
              <span>Abuja & Lagos Prime Estates</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display mb-6">
              Find Your Next Property.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
                Discover Your Next Investment.
              </span>{' '}
              Own With Confidence.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
              Explore estates, compare verified property inventory, and connect directly with approved property developers through one connected, intelligent property marketplace.
            </p>
          </div>

          {/* Search Interface Container */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 w-full max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Location / City
                </label>
                <div className="relative">
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none appearance-none font-medium cursor-pointer"
                  >
                    <option value="All">All Locations (Abuja & Lagos)</option>
                    <option value="Abuja">Abuja FCT (Apo Gude & Guzape)</option>
                    <option value="Lagos">Lagos State (Lekki & Epe)</option>
                  </select>
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Property Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Residential Regular">Residential Regular</option>
                  <option value="Residential Corner Piece">Residential Corner Piece</option>
                  <option value="Commercial Boulevard">Commercial Boulevard</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Budget Range (NGN)
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="All">Any Budget</option>
                  <option value="under-10m">Under ₦10,000,000</option>
                  <option value="10m-20m">₦10,000,000 – ₦20,000,000</option>
                  <option value="over-20m">₦20,000,000+</option>
                </select>
              </div>

              {/* Plot Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                  Plot Size
                </label>
                <select
                  value={searchSize}
                  onChange={(e) => setSearchSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="All">All Sizes</option>
                  <option value="250">250 sqm (Medium Residence)</option>
                  <option value="350">350 sqm (Family Duplex)</option>
                  <option value="500">500 sqm (Luxury Villa)</option>
                </select>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>All listings feature developer-approved prices and verified cadastral surveys.</span>
              </div>
              <button
                onClick={() => {
                  const target = document.getElementById('featured-estates');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties ({filteredPlots.length} Available)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Participating Estates Section - Full Screen Edge-to-Edge */}
      <section id="featured-estates" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
              Verified Partner Developments
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Featured Master-Planned Estates
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Discover approved residential and investment properties directly from credentialed developers across Abuja and Lagos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Showing <span className="font-semibold text-slate-900">{filteredEstates.length}</span> active master-planned estates
            </span>
            <button
              onClick={() => setActivePage('estates')}
              className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Explore All Estates & Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredEstates.map((estate) => {
            const isPilot = estate.id === 'estate-velvet-villa';
            return (
              <div
                key={estate.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Estate Photograph */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={estate.heroImage}
                    alt={estate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Indicators */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-md border border-white/20">
                      {isPilot ? 'Flagship Pilot Estate' : 'Verified Partner'}
                    </span>
                    <span className="text-[11px] font-semibold bg-emerald-600/90 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {estate.status}
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {estate.district}, {estate.locationCity}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight font-display">{estate.name}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Developer Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-slate-700">{estate.developerName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{estate.availablePlots} Plots Available</span>
                      <span aria-hidden="true">·</span>
                      <span>{estate.infrastructure.length} Milestones</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {estate.description}
                    </p>

                    {/* Plot Sizes & Approved Pricing */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
                      <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                        Approved Starting Price
                      </div>
                      <div className="text-lg font-bold text-slate-900 tabular-nums">
                        ₦{estate.startingPrice.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          ({estate.plotSizesAvailable[0]})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Available Sizes: {estate.plotSizesAvailable.join(' · ')}
                      </div>
                    </div>

                    {/* Selected Amenities */}
                    <div className="space-y-1.5 mb-6">
                      {estate.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectEstate(estate.id)}
                      className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Explore Estate & Inventory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Direct Plot Inventory Discovery - Full Screen Width */}
      <section className="bg-white py-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-y border-slate-200 w-full">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
                Cadastral Inventory
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
                Browse Verified Plot Allocations
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActivePage('properties')}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Open Full Cadastral Map View</span>
              </button>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setActiveEstateFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeEstateFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Estates ({plots.length})
              </button>
              <button
                onClick={() => setActiveEstateFilter('estate-velvet-villa')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeEstateFilter === 'estate-velvet-villa'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Velvet Villa Apo Gude
              </button>
            </div>
          </div>
        </div>

        {/* Plots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlots.map((plot) => {
              let statusBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (plot.status === 'RESERVED') {
                statusBadge = 'bg-amber-50 text-amber-700 border-amber-200';
              } else if (plot.status === 'SOLD') {
                statusBadge = 'bg-slate-100 text-slate-500 border-slate-200';
              }

              return (
                <div
                  key={plot.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          {plot.plotRef}
                        </span>
                        <div className="text-[11px] text-slate-500 truncate max-w-[160px]">
                          {plot.estateName}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${statusBadge}`}
                      >
                        {plot.status}
                      </span>
                    </div>

                    <div className="space-y-1 my-3 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dimension:</span>
                        <span className="font-medium text-slate-700 font-mono">{plot.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Area:</span>
                        <span className="font-semibold text-slate-800">{plot.sizeSqm} sqm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="font-medium text-slate-700 truncate max-w-[140px]">
                          {plot.category}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80">
                      <div className="text-[10px] uppercase text-slate-400 font-medium">
                        Approved Price
                      </div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">
                        ₦{plot.priceApproved.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2">
                    {plot.status === 'AVAILABLE' ? (
                      <button
                        onClick={() => onSelectPlotForEnquiry(plot)}
                        className="w-full py-1.5 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>Enquire / Book</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectEstate(plot.estateId)}
                        className="w-full py-1.5 px-3 bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium rounded-lg transition-colors text-center"
                      >
                        View Estate Status
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. For Developers: Public Acquisition Section (Part 3.7) */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-4xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3">
              Developer Ecosystem
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-4">
              Your Properties Deserve More Than a Listing.{' '}
              <span className="text-sky-300">Give Your Entire Property Business a Digital Home.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Join ShieldNet Hub as a development partner. Showcase your estates to qualified buyers, orchestrate sales agents, manage inventory allocations, verify payments, and oversee estate operations from one secure private workspace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Unified Cadastral Inventory</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time status synchronization between public marketplace and sales CRM.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Independent Payment Verification</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Two-officer sign-off ensures financial integrity before deeds and allocation letters issue.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Buyer Property Passports</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Retain buyers post-sale with transparent installment tracking and document vaults.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold">Governed AI Agent Fleet</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Specialized agents qualify leads, draft follow-ups, and audit payments under strict guardrails.</p>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenDeveloperModal}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Become a Development Partner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-slate-200 w-full">
        <div className="w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
              The Connected Model
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              One Platform. Complete Property Lifecycle.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Seamless connection between the public property discovery marketplace and private enterprise execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Discover & Inspect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse verified estate layouts. Inspect approved boundary demarcations and request physical on-site viewings without an account barrier.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Reserve & Verify</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit structured plot reservations. Authorized sales managers review requests, lock inventory, and finance teams verify transfers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Own & Oversee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access your digital Property Passport, audit real-time estate road and power milestones, and request resident maintenance services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-slate-800 text-xs w-full">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">ShieldNet Hub</span>
            <span>·</span>
            <span>ShieldNet Technologies Ltd</span>
            <span>·</span>
            <span>All rights reserved © 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <button
              onClick={() => setActivePage('estates')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Explore Estates
            </button>
            <button
              onClick={() => setActivePage('properties')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Plot Map
            </button>
            <button
              onClick={() => setActivePage('for-developers')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              For Developers
            </button>
            <button
              onClick={() => setActivePage('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => setActivePage('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About ShieldNet
            </button>
            <button
              onClick={onOpenDeveloperModal}
              className="text-sky-400 hover:text-sky-300 font-medium transition-colors cursor-pointer"
            >
              Developer Onboarding
            </button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-500 hidden md:inline">Apo Gude, Abuja Pilot</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
