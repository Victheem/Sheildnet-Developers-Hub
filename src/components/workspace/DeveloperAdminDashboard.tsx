import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Plot } from '../../types';
import {
  Building2,
  Layers,
  DollarSign,
  Plus,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const DeveloperAdminDashboard: React.FC = () => {
  const {
    developers,
    activeDeveloperId,
    estates,
    plots,
    addPlot,
    createEstate,
    leads,
    payments,
    reservations,
    loginDeveloper,
    setActivePage,
    setCurrentEnvironment,
  } = usePlatform();

  const developer = developers.find((d) => d.id === activeDeveloperId) || developers[0];
  const devEstates = estates.filter((e) => e.developerId === developer.id);
  const devPlots = plots.filter((p) => p.developerId === developer.id);

  const availablePlots = devPlots.filter((p) => p.status === 'AVAILABLE').length;
  const reservedPlots = devPlots.filter((p) => p.status === 'RESERVED').length;
  const soldPlots = devPlots.filter((p) => p.status === 'SOLD').length;

  const totalSalesVolume = devPlots
    .filter((p) => p.status === 'SOLD')
    .reduce((sum, p) => sum + p.priceApproved, 0);

  const verifiedPaymentsCollected = payments
    .filter((p) => p.developerId === developer.id && p.status === 'VERIFIED')
    .reduce((sum, p) => sum + p.amount, 0);

  // Modal to add new plot
  const [addPlotModalOpen, setAddPlotModalOpen] = useState(false);
  const [plotRef, setPlotRef] = useState('');
  const [plotSize, setPlotSize] = useState<number>(350);
  const [plotDimensions, setPlotDimensions] = useState('15m x 23.3m');
  const [plotPrice, setPlotPrice] = useState<number>(9800000);
  const [plotCategory, setPlotCategory] = useState<Plot['category']>('Residential Regular');

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devEstates[0]) return;

    addPlot({
      estateId: devEstates[0].id,
      plotRef: plotRef || `VV-X${Math.floor(Math.random() * 90 + 10)}`,
      sizeSqm: Number(plotSize),
      dimensions: plotDimensions,
      priceApproved: Number(plotPrice),
      category: plotCategory,
    });

    setAddPlotModalOpen(false);
    setPlotRef('');
  };

  return (
    <div className="space-y-6">
      {/* Header with Developer Dedicated Space Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Dedicated Workspace · {developer.name}</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
              Managing {devEstates[0]?.name || 'Estate'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Business Headquarters & Cadastral Operations
          </h1>
          <p className="text-xs text-slate-500">
            Dedicated private workspace managing {devEstates[0]?.name || developer.name} cadastral inventory, sales conversions, and customer allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Quick Space Switcher between Velvet Villa and Love Gate */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => loginDeveloper('dev-grandview', 'estate-velvet-villa')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeDeveloperId === 'dev-grandview'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Velvet Villa Space
            </button>
            <button
              onClick={() => loginDeveloper('dev-lovegate', 'estate-love-gate')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeDeveloperId === 'dev-lovegate'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Love Gate Space
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentEnvironment('MARKETPLACE');
              setActivePage('developer-login');
            }}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            title="Switch Developer or return to login"
          >
            Switch Space
          </button>

          <button
            onClick={() => setAddPlotModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Plot</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Inventory</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {devPlots.length} Plots
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-700 font-semibold">{availablePlots} Available</span>
            <span>·</span>
            <span className="text-amber-700 font-semibold">{reservedPlots} Reserved</span>
            <span>·</span>
            <span className="text-slate-500 font-semibold">{soldPlots} Sold</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Confirmed Sold Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            ₦{totalSalesVolume.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            From {soldPlots} fully allocated plots
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Verified Collections</span>
            <DollarSign className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            ₦{verifiedPaymentsCollected.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Reconciled bank transfers by Finance Officer
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Enquiries in CRM</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {leads.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {reservations.length} total reservation requests
          </div>
        </div>
      </div>

      {/* Flagship Pilot Estate Card: Velvet Villa Apo Gude */}
      {devEstates[0] && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{devEstates[0].district}, {devEstates[0].locationCity}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {devEstates[0]?.name || 'Estate'} (Active Managed Space)
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md font-semibold border border-emerald-200">
                Live on Public Marketplace
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Approved Starting Price</span>
              <strong className="text-sm font-bold text-slate-900 tabular-nums">
                ₦{devEstates[0].startingPrice.toLocaleString()}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Plot Size Schedule</span>
              <strong className="text-sm font-bold text-slate-900">
                {devEstates[0].plotSizesAvailable.join(' · ')}
              </strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-0.5">Infrastructure Audits</span>
              <strong className="text-sm font-bold text-slate-900">
                {devEstates[0].infrastructure.length} Milestones Tracked
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Real-Time Plot Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Demarcated Plot Inventory ({devPlots.length} Plots)
            </h3>
            <p className="text-xs text-slate-500">
              Live database state reflecting availability, approved prices, and active reservations.
            </p>
          </div>
          <button
            onClick={() => setAddPlotModalOpen(true)}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Plot</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Plot Reference</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Dimensions</th>
                <th className="px-5 py-3">Area (sqm)</th>
                <th className="px-5 py-3">Approved Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Buyer / Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {devPlots.map((plot) => {
                let badge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (plot.status === 'RESERVED') {
                  badge = 'bg-amber-50 text-amber-700 border-amber-200';
                } else if (plot.status === 'SOLD') {
                  badge = 'bg-slate-100 text-slate-500 border-slate-200';
                }

                return (
                  <tr key={plot.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-bold font-mono text-slate-900">
                      {plot.plotRef}
                    </td>
                    <td className="px-5 py-3.5">{plot.category}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-500">{plot.dimensions}</td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{plot.sizeSqm} sqm</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 tabular-nums">
                      ₦{plot.priceApproved.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${badge}`}>
                        {plot.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-slate-800">
                      {plot.buyerName || <span className="text-slate-400 italic">None</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Plot Modal */}
      {addPlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
              Add Demarcated Plot to {devEstates[0]?.name || developer.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter official survey plot coordinates, area, and approved price.
            </p>

            <form onSubmit={handleAddPlot} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plot Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VV-B05"
                  value={plotRef}
                  onChange={(e) => setPlotRef(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area (sqm) *</label>
                  <select
                    value={plotSize}
                    onChange={(e) => {
                      const size = Number(e.target.value);
                      setPlotSize(size);
                      if (size === 250) {
                        setPlotPrice(7000000);
                        setPlotDimensions('12.5m x 20m');
                      } else if (size === 350) {
                        setPlotPrice(9800000);
                        setPlotDimensions('15m x 23.3m');
                      } else if (size === 500) {
                        setPlotPrice(14000000);
                        setPlotDimensions('20m x 25m');
                      }
                    }}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value={250}>250 sqm (₦7.0M)</option>
                    <option value={350}>350 sqm (₦9.8M)</option>
                    <option value={500}>500 sqm (₦14.0M)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dimensions *</label>
                  <input
                    type="text"
                    required
                    value={plotDimensions}
                    onChange={(e) => setPlotDimensions(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Approved Price (NGN) *
                </label>
                <input
                  type="number"
                  required
                  value={plotPrice}
                  onChange={(e) => setPlotPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 tabular-nums font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Conforms to {devEstates[0]?.name || 'Estate'} approved pricing schedule.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plot Category *</label>
                <select
                  value={plotCategory}
                  onChange={(e) => setPlotCategory(e.target.value as Plot['category'])}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Residential Regular">Residential Regular</option>
                  <option value="Residential Corner Piece">Residential Corner Piece</option>
                  <option value="Commercial Boulevard">Commercial Boulevard</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddPlotModalOpen(false)}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-lg shadow"
                >
                  Save & Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
