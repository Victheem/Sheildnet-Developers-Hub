import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { motion } from 'motion/react';
import {
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ExploreEstatesPageProps {
  onSelectEstate: (estateId: string) => void;
  onOpenDeveloperModal: () => void;
}

export const ExploreEstatesPage: React.FC<ExploreEstatesPageProps> = ({
  onSelectEstate,
  onOpenDeveloperModal,
}) => {
  const { estates } = usePlatform();

  const [locationFilter, setLocationFilter] = useState<'ALL' | 'Abuja' | 'Lagos'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SELLING' | 'SOLD_OUT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparingEstates, setComparingEstates] = useState<string[]>([]);

  const filtered = estates.filter((e) => {
    if (locationFilter !== 'ALL' && !e.locationCity.toLowerCase().includes(locationFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'ALL' && e.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.district.toLowerCase().includes(q) ||
        e.developerName.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleCompare = (estateId: string) => {
    if (comparingEstates.includes(estateId)) {
      setComparingEstates(comparingEstates.filter((id) => id !== estateId));
    } else {
      if (comparingEstates.length >= 2) {
        setComparingEstates([comparingEstates[1], estateId]);
      } else {
        setComparingEstates([...comparingEstates, estateId]);
      }
    }
  };

  const comparedEstateObjects = estates.filter((e) => comparingEstates.includes(e.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Full-Page Hero Header */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/hero_abuja_estate_1794323126147.jpg"
            alt="Abuja estates"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            <span>Marketplace Catalog</span>
            <span>·</span>
            <span>Verified Participating Developments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-3">
            Explore Master-Planned Estates
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Discover verified residential and land banking communities directly from approved property developers. Each estate features validated survey coordinates, transparent infrastructure milestones, and fixed developer pricing.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by estate name, district (e.g. Apo Gude, Guzape, Lekki), or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Location Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['ALL', 'Abuja', 'Lagos'] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    locationFilter === loc
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {loc === 'ALL' ? 'All Cities' : loc}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-medium px-2">
              Showing <strong className="text-slate-900">{filtered.length}</strong> estates
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Drawer (if 2 selected) */}
      {comparedEstateObjects.length === 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-8"
        >
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold font-display">Side-by-Side Estate Comparison</h3>
              </div>
              <button
                onClick={() => setComparingEstates([])}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear Comparison
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-xs">
              {comparedEstateObjects.map((est) => (
                <div key={est.id} className="space-y-3">
                  <div className="font-bold text-base text-sky-300 font-display">{est.name}</div>
                  <div className="text-slate-400">{est.developerName} · {est.locationCity}</div>
                  <div className="p-3 bg-slate-800/80 rounded-xl space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Starting Price:</span>
                      <strong className="text-white tabular-nums">₦{est.startingPrice.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Plot Sizes:</span>
                      <span className="text-white">{est.plotSizesAvailable.join(' · ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Inventory:</span>
                      <span className="text-emerald-400 font-bold">{est.availablePlots} plots</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectEstate(est.id)}
                    className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg transition-colors text-center"
                  >
                    Inspect Full Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Estates Cards Grid - Full Screen Edge-to-Edge */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filtered.map((estate) => {
            const isPilot = estate.id === 'estate-velvet-villa';
            const isCompared = comparingEstates.includes(estate.id);

            return (
              <div
                key={estate.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Visual Image */}
                <div className="relative h-60 bg-slate-900 overflow-hidden">
                  <img
                    src={estate.heroImage}
                    alt={estate.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-md border border-white/20">
                      {isPilot ? 'Flagship Pilot Estate' : 'Verified Partner'}
                    </span>
                    <button
                      onClick={() => toggleCompare(estate.id)}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-colors ${
                        isCompared
                          ? 'bg-sky-500 text-white border-sky-400'
                          : 'bg-white/80 text-slate-800 hover:bg-white border-white/40'
                      }`}
                    >
                      {isCompared ? 'Comparing' : '+ Compare'}
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{estate.district}, {estate.locationCity}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight font-display">{estate.name}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">{estate.developerName}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-medium">{estate.availablePlots} Plots Left</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {estate.description}
                    </p>

                    {/* Price and Sizes Box */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Starting Plot Price
                      </div>
                      <div className="text-lg font-bold text-slate-900 tabular-nums">
                        ₦{estate.startingPrice.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Sizes: {estate.plotSizesAvailable.join(' · ')}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectEstate(estate.id)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Estate & Cadastral Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
