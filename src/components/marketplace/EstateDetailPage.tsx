import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Estate, Plot } from '../../types';
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  Building,
  ShieldCheck,
  Share2,
  FileText,
  DollarSign,
  Send,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';

interface EstateDetailPageProps {
  estateId: string;
  onBack: () => void;
  onSelectPlotForEnquiry: (plot: Plot) => void;
}

export const EstateDetailPage: React.FC<EstateDetailPageProps> = ({
  estateId,
  onBack,
  onSelectPlotForEnquiry,
}) => {
  const { estates, plots, submitMarketplaceEnquiry, scheduleViewingAppointment } = usePlatform();

  const estate = estates.find((e) => e.id === estateId) || estates[0];
  const estatePlots = plots.filter((p) => p.estateId === estate.id);

  // Filter plots by size in the estate view
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('ALL');
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(estatePlots[0] || null);

  // Forms modals
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);

  // Form states
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryBudget, setEnquiryBudget] = useState('₦7M - ₦14M (Velvet Villa Range)');
  const [enquiryNotes, setEnquiryNotes] = useState('');

  const [viewingDate, setViewingDate] = useState('2026-11-14');
  const [viewingTime, setViewingTime] = useState('11:00 AM');
  const [viewingNotes, setViewingNotes] = useState('Interested in inspecting Apo Gude road gradient and perimeter boundary.');

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMarketplaceEnquiry({
      estateId: estate.id,
      fullName: enquiryName,
      email: enquiryEmail,
      phone: enquiryPhone,
      budgetBand: enquiryBudget,
      plotRefInterest: selectedPlot?.plotRef,
      notes: enquiryNotes,
    });
    setEnquiryModalOpen(false);
  };

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleViewingAppointment({
      estateId: estate.id,
      leadName: enquiryName || 'Interested Buyer',
      leadEmail: enquiryEmail || 'buyer@example.com',
      leadPhone: enquiryPhone || '+234 800 000 0000',
      date: viewingDate,
      time: viewingTime,
      notes: viewingNotes,
    });
    setViewingModalOpen(false);
  };

  const filteredEstatePlots = estatePlots.filter((p) => {
    if (selectedSizeFilter !== 'ALL' && p.sizeSqm !== parseInt(selectedSizeFilter, 10)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8 lg:px-12 w-full">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Estates</span>
          </button>
          <div className="text-xs text-slate-500 hidden sm:block">
            <span>Marketplace</span>
            <span className="mx-2">/</span>
            <span>{estate.locationCity}</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-slate-900">{estate.name}</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-6">
        {/* Estate Title & Primary Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider mb-1">
              <span>{estate.district}, {estate.locationCity}</span>
              <span aria-hidden="true">·</span>
              <span>Cadastral Survey Verified</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
              {estate.name}
            </h1>
            <p className="text-slate-500 text-sm mt-1">{estate.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewingModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule On-Site Inspection</span>
            </button>
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Inbound Enquiry</span>
            </button>
          </div>
        </div>

        {/* Gallery Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-2xl overflow-hidden mb-10">
          <div className="lg:col-span-2 h-72 sm:h-96 relative bg-slate-900">
            <img
              src={estate.heroImage}
              alt={estate.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-semibold border border-white/20">
              Masterplan Cadastral Layout
            </div>
          </div>
          <div className="h-72 sm:h-96 relative bg-slate-900 hidden lg:block">
            <img
              src={estate.galleryImages[1] || estate.heroImage}
              alt={`${estate.name} entrance and roads`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-semibold border border-white/20">
              Access Way & Security Gate
            </div>
          </div>
        </div>

        {/* Layout: Main Specs on Left, Booking & Pricing Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description & Developer Profile */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 font-display mb-3">
                Estate Master Description
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {estate.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">
                      Participating Developer
                    </span>
                    <span className="text-sm font-bold text-slate-900">{estate.developerName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Partner Account</span>
                </div>
              </div>
            </div>

            {/* Verified Infrastructure Progress (Part 6 Module 5) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Verified Infrastructure Milestones
                </h2>
                <span className="text-xs text-slate-500">Physical Audits Recorded</span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Transparent milestones tracked on-site. Infrastructure progress directly impacts allocation readiness and property valuation.
              </p>

              <div className="space-y-4">
                {estate.infrastructure.map((item) => {
                  let statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
                  if (item.status === 'VERIFIED_COMPLETED') {
                    statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
                  } else if (item.status === 'IN_PROGRESS') {
                    statusColor = 'text-sky-700 bg-sky-50 border-sky-200';
                  }

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/70"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${statusColor}`}
                          >
                            {item.status.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs font-bold text-slate-900 tabular-nums">
                            {item.progressPercent}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden mb-2">
                        <div
                          className="bg-sky-600 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                        <span>Contractor: {item.responsibleParty}</span>
                        {item.verifiedBy && (
                          <span className="text-emerald-700 font-medium">
                            ✓ {item.verifiedBy} ({item.verificationDate})
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-slate-600 italic mt-1.5">{item.notes}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Approved Estate Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
                Approved Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {estate.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Plot Cadastral Map & Selector */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">
                    Interactive Plot Inventory & Demarcations
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a plot below to inspect dimensions, approved price, and reservation status.
                  </p>
                </div>

                {/* Size Segmented Control */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setSelectedSizeFilter('ALL')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedSizeFilter === 'ALL'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Sizes
                  </button>
                  <button
                    onClick={() => setSelectedSizeFilter('250')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedSizeFilter === '250'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    250 sqm
                  </button>
                  <button
                    onClick={() => setSelectedSizeFilter('350')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedSizeFilter === '350'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    350 sqm
                  </button>
                  <button
                    onClick={() => setSelectedSizeFilter('500')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedSizeFilter === '500'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    500 sqm
                  </button>
                </div>
              </div>

              {/* Grid of Plots */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6">
                {filteredEstatePlots.map((plot) => {
                  const isSelected = selectedPlot?.id === plot.id;
                  let bgStatus = 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-950';
                  if (plot.status === 'RESERVED') {
                    bgStatus = 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950';
                  } else if (plot.status === 'SOLD') {
                    bgStatus = 'bg-slate-100 border-slate-300 text-slate-400 opacity-70 cursor-not-allowed';
                  }

                  return (
                    <button
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`p-3 rounded-xl border text-left transition-all relative ${bgStatus} ${
                        isSelected ? 'ring-2 ring-sky-500 shadow-md scale-102' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold">{plot.plotRef}</span>
                        <span className="text-[9px] font-semibold uppercase">{plot.status}</span>
                      </div>
                      <div className="text-[11px] font-medium">{plot.sizeSqm} sqm</div>
                      <div className="text-[10px] text-slate-500 mt-1 tabular-nums">
                        ₦{(plot.priceApproved / 1000000).toFixed(1)}M
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Plot Inspection Panel */}
              {selectedPlot && (
                <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-sky-400 text-sm">
                        Plot {selectedPlot.plotRef}
                      </span>
                      <span className="text-xs text-slate-400">· {selectedPlot.category}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold uppercase">
                        {selectedPlot.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 space-x-4">
                      <span>Area: <strong className="text-white">{selectedPlot.sizeSqm} sqm</strong></span>
                      <span>Dimensions: <strong className="text-white font-mono">{selectedPlot.dimensions}</strong></span>
                      <span>Approved Price: <strong className="text-sky-300 tabular-nums">₦{selectedPlot.priceApproved.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  {selectedPlot.status === 'AVAILABLE' ? (
                    <button
                      onClick={() => {
                        onSelectPlotForEnquiry(selectedPlot);
                        setEnquiryModalOpen(true);
                      }}
                      className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-lg shadow transition-colors whitespace-nowrap"
                    >
                      Enquire on Plot {selectedPlot.plotRef}
                    </button>
                  ) : (
                    <span className="text-xs text-amber-300 font-medium">
                      Status: {selectedPlot.status} (Not Available for New Reservation)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Approved Pricing & Payment Spread Calculator */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 sticky top-24 shadow-sm">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Approved Reference Price
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-display tabular-nums mb-1">
                ₦{estate.startingPrice.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mb-6">
                Indicative base price for 250 sqm plot. Subject to developer payment milestones.
              </div>

              {/* Indicative Pilot Price List for Velvet Villa */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                  Official Plot Size Schedule
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-medium text-slate-700">250 sqm Plot</span>
                  <span className="font-bold text-slate-900 tabular-nums">₦7,000,000</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-medium text-slate-700">350 sqm Plot</span>
                  <span className="font-bold text-slate-900 tabular-nums">₦9,800,000</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-medium text-slate-700">500 sqm Plot</span>
                  <span className="font-bold text-slate-900 tabular-nums">₦14,000,000</span>
                </div>
              </div>

              {/* Payment Plans Available */}
              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="text-xs font-semibold text-slate-900 mb-2">
                  Approved Payment Options
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {estate.approvedPaymentOptions.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Booking Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inbound Enquiry</span>
                </button>
                <button
                  onClick={() => setViewingModalOpen(true)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Physical Inspection</span>
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">
                  Enquiries are securely dispatched directly to {estate.developerName}'s CRM.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal (No login wall!) */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Submit Enquiry to {estate.developerName}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Connect directly with the developer's authorized sales officers. No account registration required.
            </p>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Emeka Nwosu"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="emeka@example.com"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plot of Interest</label>
                <input
                  type="text"
                  value={selectedPlot ? `Plot ${selectedPlot.plotRef} (${selectedPlot.sizeSqm} sqm — ₦${selectedPlot.priceApproved.toLocaleString()})` : 'General Estate Allocation'}
                  readOnly
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Band</label>
                <select
                  value={enquiryBudget}
                  onChange={(e) => setEnquiryBudget(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="₦7M - ₦10M">₦7,000,000 – ₦10,000,000 (250 sqm - 350 sqm)</option>
                  <option value="₦10M - ₦15M">₦10,000,000 – ₦15,000,000 (350 sqm - 500 sqm)</option>
                  <option value="Above ₦15M">Above ₦15,000,000 (Multiple Allocations)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Inquire about payment schedules, allocation timelines, or survey plans..."
                  value={enquiryNotes}
                  onChange={(e) => setEnquiryNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow"
                >
                  Send Enquiry to Developer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewing Modal */}
      {viewingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-1">
              Book Physical Site Inspection
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Arrange an accompanied viewing with an assigned sales agent at {estate.name}, {estate.district}.
            </p>

            <form onSubmit={handleViewingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Emeka Nwosu"
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={viewingDate}
                    onChange={(e) => setViewingDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                  <select
                    value={viewingTime}
                    onChange={(e) => setViewingTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM (Morning Session)</option>
                    <option value="11:30 AM">11:30 AM (Mid-day Session)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Session)</option>
                    <option value="04:00 PM">04:00 PM (Late Afternoon Session)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inspection Focus</label>
                <textarea
                  rows={2}
                  value={viewingNotes}
                  onChange={(e) => setViewingNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setViewingModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow"
                >
                  Confirm Inspection Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
