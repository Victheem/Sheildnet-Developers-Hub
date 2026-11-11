import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Plot } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  Layers,
  MapPin,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface PlotInventoryPageProps {
  onSelectPlotForEnquiry: (plot: Plot) => void;
  onSelectEstate: (estateId: string) => void;
}

export const PlotInventoryPage: React.FC<PlotInventoryPageProps> = ({
  onSelectPlotForEnquiry,
  onSelectEstate,
}) => {
  const { plots, estates, submitMarketplaceEnquiry, scheduleViewingAppointment } = usePlatform();

  const [searchRef, setSearchRef] = useState('');
  const [sizeFilter, setSizeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [estateFilter, setEstateFilter] = useState<string>('ALL');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const [selectedPlot, setSelectedPlot] = useState<Plot>(plots[0]);
  const [inspectionDrawerOpen, setInspectionDrawerOpen] = useState(false);

  // Quick form states in inspection drawer
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [actionTab, setActionTab] = useState<'ENQUIRY' | 'VIEWING'>('ENQUIRY');
  const [preferredDate, setPreferredDate] = useState('2026-11-14');

  const filteredPlots = plots.filter((plot) => {
    if (estateFilter !== 'ALL' && plot.estateId !== estateFilter) return false;
    if (sizeFilter !== 'ALL' && plot.sizeSqm !== parseInt(sizeFilter, 10)) return false;
    if (statusFilter !== 'ALL' && plot.status !== statusFilter) return false;
    if (searchRef.trim() !== '') {
      const q = searchRef.toLowerCase();
      return (
        plot.plotRef.toLowerCase().includes(q) ||
        plot.estateName.toLowerCase().includes(q) ||
        plot.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMarketplaceEnquiry({
      estateId: selectedPlot.estateId,
      fullName: buyerName,
      email: buyerEmail,
      phone: buyerPhone,
      budgetBand: `₦${(selectedPlot.priceApproved / 1000000).toFixed(1)}M Range`,
      plotRefInterest: selectedPlot.plotRef,
      notes: `Inbound enquiry from Cadastral Inventory Browser for Plot ${selectedPlot.plotRef}`,
    });
    setInspectionDrawerOpen(false);
  };

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleViewingAppointment({
      estateId: selectedPlot.estateId,
      leadName: buyerName,
      leadEmail: buyerEmail,
      leadPhone: buyerPhone,
      date: preferredDate,
      time: '11:00 AM',
      notes: `Viewing request for ${selectedPlot.plotRef} (${selectedPlot.estateName})`,
    });
    setInspectionDrawerOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-b border-slate-800 w-full">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Direct Cadastral Discovery</span>
              <span>·</span>
              <span>Real-Time Inventory Status</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
              Plot Inventory & Demarcation Browser
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Inspect verified boundary parcels across Velvet Villa Apo Gude and participating estates. Select a parcel on the masterplan or browse the verified price list.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
              Total Managed Plots: <strong className="text-white tabular-nums">{plots.length}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-8">
        {/* Filters Strip */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by plot ref (e.g. VV-A01, VV-B04), category, or estate..."
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Estate select */}
            <select
              value={estateFilter}
              onChange={(e) => setEstateFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="ALL">All Estates</option>
              {estates.map((est) => (
                <option key={est.id} value={est.id}>
                  {est.name}
                </option>
              ))}
            </select>

            {/* Size Filter */}
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="ALL">All Plot Sizes</option>
              <option value="250">250 sqm (₦7,000,000)</option>
              <option value="350">350 sqm (₦9,800,000)</option>
              <option value="500">500 sqm (₦14,000,000)</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="RESERVED">Reserved</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
        </div>

        {/* Master Layout: Full Screen Edge-to-Edge Responsive Grid */}
        <div className={`grid grid-cols-1 ${isMapExpanded ? 'grid-cols-1' : 'lg:grid-cols-12'} gap-8`}>
          {/* Interactive SVG Cadastral Grid View */}
          <div className={`${isMapExpanded ? 'w-full' : 'lg:col-span-7 xl:col-span-8'} space-y-6`}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Interactive Cadastral Layout Map · Velvet Villa Sector A & B
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any parcel to inspect boundary dimensions, orientation, and approved price schedule.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <button
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                    title={isMapExpanded ? 'Collapse Map' : 'Expand Map to Full Screen Width'}
                  >
                    {isMapExpanded ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Split View</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>Full-Width Map</span>
                      </>
                    )}
                  </button>

                  <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-slate-200">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                      <span>Available</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                      <span>Reserved</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <span className="w-2.5 h-2.5 rounded-sm bg-slate-400" />
                      <span>Sold</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive SVG Cadastral Map Representation */}
              <div className="relative bg-slate-950 rounded-xl p-4 overflow-hidden border border-slate-800">
                <svg
                  viewBox="0 0 800 380"
                  className="w-full h-auto select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Access Road Arterial */}
                  <rect x="0" y="160" width="800" height="60" fill="#1e293b" />
                  <line x1="0" y1="190" x2="800" y2="190" stroke="#f8fafc" strokeDasharray="10 10" strokeWidth="2" opacity="0.4" />
                  <text x="320" y="195" fill="#94a3b8" fontSize="12" fontFamily="monospace" letterSpacing="2">
                    PRIMARY ACCESS ARTERIAL (80% PAVED)
                  </text>

                  {/* Sector A Top Plots */}
                  {plots.slice(0, 5).map((plot, i) => {
                    const isSelected = selectedPlot?.id === plot.id;
                    let fill = '#059669'; // available green
                    if (plot.status === 'RESERVED') fill = '#d97706';
                    if (plot.status === 'SOLD') fill = '#475569';

                    const x = 30 + i * 150;
                    return (
                      <g
                        key={plot.id}
                        onClick={() => setSelectedPlot(plot)}
                        className="cursor-pointer transition-transform hover:opacity-90"
                      >
                        <rect
                          x={x}
                          y="20"
                          width="135"
                          height="125"
                          rx="8"
                          fill={fill}
                          opacity={isSelected ? 1 : 0.85}
                          stroke={isSelected ? '#38bdf8' : '#0f172a'}
                          strokeWidth={isSelected ? '3' : '1'}
                        />
                        <text x={x + 15} y="55" fill="#ffffff" fontWeight="bold" fontSize="14" fontFamily="monospace">
                          {plot.plotRef}
                        </text>
                        <text x={x + 15} y="80" fill="#e2e8f0" fontSize="12">
                          {plot.sizeSqm} sqm
                        </text>
                        <text x={x + 15} y="110" fill="#f8fafc" fontWeight="bold" fontSize="11" fontFamily="sans-serif">
                          ₦{(plot.priceApproved / 1000000).toFixed(1)}M
                        </text>
                      </g>
                    );
                  })}

                  {/* Sector B Bottom Plots */}
                  {plots.slice(5, 10).map((plot, i) => {
                    const isSelected = selectedPlot?.id === plot.id;
                    let fill = '#059669';
                    if (plot.status === 'RESERVED') fill = '#d97706';
                    if (plot.status === 'SOLD') fill = '#475569';

                    const x = 30 + i * 150;
                    return (
                      <g
                        key={plot.id}
                        onClick={() => setSelectedPlot(plot)}
                        className="cursor-pointer transition-transform hover:opacity-90"
                      >
                        <rect
                          x={x}
                          y="235"
                          width="135"
                          height="125"
                          rx="8"
                          fill={fill}
                          opacity={isSelected ? 1 : 0.85}
                          stroke={isSelected ? '#38bdf8' : '#0f172a'}
                          strokeWidth={isSelected ? '3' : '1'}
                        />
                        <text x={x + 15} y="270" fill="#ffffff" fontWeight="bold" fontSize="14" fontFamily="monospace">
                          {plot.plotRef}
                        </text>
                        <text x={x + 15} y="295" fill="#e2e8f0" fontSize="12">
                          {plot.sizeSqm} sqm
                        </text>
                        <text x={x + 15} y="325" fill="#f8fafc" fontWeight="bold" fontSize="11" fontFamily="sans-serif">
                          ₦{(plot.priceApproved / 1000000).toFixed(1)}M
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Inventory Table List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Verified Plot Schedule ({filteredPlots.length} Results)
                </span>
                <span className="text-xs text-slate-500">Fixed Developer Approved Prices</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Plot Ref</th>
                      <th className="px-4 py-3">Estate</th>
                      <th className="px-4 py-3">Area</th>
                      <th className="px-4 py-3">Dimensions</th>
                      <th className="px-4 py-3">Approved Price</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredPlots.map((plot) => {
                      const isSelected = selectedPlot?.id === plot.id;
                      let badge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                      if (plot.status === 'RESERVED') badge = 'bg-amber-50 text-amber-700 border-amber-200';
                      if (plot.status === 'SOLD') badge = 'bg-slate-100 text-slate-500 border-slate-200';

                      return (
                        <tr
                          key={plot.id}
                          onClick={() => setSelectedPlot(plot)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-sky-50/70' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="px-4 py-3 font-bold font-mono text-slate-900">
                            {plot.plotRef}
                          </td>
                          <td className="px-4 py-3 text-slate-600">{plot.estateName}</td>
                          <td className="px-4 py-3 font-semibold text-slate-800">{plot.sizeSqm} sqm</td>
                          <td className="px-4 py-3 font-mono text-slate-500">{plot.dimensions}</td>
                          <td className="px-4 py-3 font-bold text-slate-900 tabular-nums">
                            ₦{plot.priceApproved.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${badge}`}>
                              {plot.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {plot.status === 'AVAILABLE' ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPlot(plot);
                                  setInspectionDrawerOpen(true);
                                }}
                                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded font-semibold text-[11px] shadow-sm"
                              >
                                Reserve
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">Unavailable</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Inspection & Booking Panel */}
          <div className={isMapExpanded ? 'w-full' : 'lg:col-span-5 xl:col-span-4'}>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block mb-1">
                  Selected Cadastral Parcel
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 font-mono">
                    Plot {selectedPlot.plotRef}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                      selectedPlot.status === 'AVAILABLE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : selectedPlot.status === 'RESERVED'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {selectedPlot.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{selectedPlot.estateName}</div>
              </div>

              {/* Specs */}
              <div className="space-y-2.5 text-xs text-slate-600 border-y border-slate-100 py-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Demarcated Area:</span>
                  <strong className="text-slate-900">{selectedPlot.sizeSqm} sqm</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Perimeter Boundaries:</span>
                  <span className="font-mono text-slate-800">{selectedPlot.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parcel Category:</span>
                  <span className="font-medium text-slate-800">{selectedPlot.category}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-500 font-semibold">Approved Price:</span>
                  <strong className="text-base text-slate-900 font-bold tabular-nums">
                    ₦{selectedPlot.priceApproved.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Actions */}
              {selectedPlot.status === 'AVAILABLE' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActionTab('ENQUIRY');
                      setInspectionDrawerOpen(true);
                    }}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inbound Enquiry</span>
                  </button>
                  <button
                    onClick={() => {
                      setActionTab('VIEWING');
                      setInspectionDrawerOpen(true);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Physical Viewing</span>
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  This plot is currently <strong>{selectedPlot.status}</strong>. Explore adjacent available plots in Sector A.
                </div>
              )}

              <button
                onClick={() => onSelectEstate(selectedPlot.estateId)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors text-center"
              >
                View Full Estate Masterplan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Inspection Drawer */}
      <AnimatePresence>
        {inspectionDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
            >
              <button
                onClick={() => setInspectionDrawerOpen(false)}
                className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block mb-1">
                  Plot Reference {selectedPlot.plotRef} · {selectedPlot.estateName}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {actionTab === 'ENQUIRY' ? 'Submit Direct Inbound Enquiry' : 'Book Physical Site Viewing'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Approved Price: <strong>₦{selectedPlot.priceApproved.toLocaleString()}</strong> ({selectedPlot.sizeSqm} sqm)
                </p>
              </div>

              {/* Mode switch */}
              <div className="flex p-1 bg-slate-100 rounded-lg mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActionTab('ENQUIRY')}
                  className={`flex-1 py-1.5 rounded-md transition-colors ${
                    actionTab === 'ENQUIRY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Direct Enquiry
                </button>
                <button
                  type="button"
                  onClick={() => setActionTab('VIEWING')}
                  className={`flex-1 py-1.5 rounded-md transition-colors ${
                    actionTab === 'VIEWING' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Schedule Site Inspection
                </button>
              </div>

              {actionTab === 'ENQUIRY' ? (
                <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Emeka Nwosu"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="buyer@example.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setInspectionDrawerOpen(false)}
                      className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg shadow"
                    >
                      Send Enquiry to Developer CRM
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleViewingSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Emeka Nwosu"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="pt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setInspectionDrawerOpen(false)}
                      className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow"
                    >
                      Book Physical Inspection
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
