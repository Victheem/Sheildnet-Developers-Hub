import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Users,
  FileCheck,
  Calculator,
  Lock,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface ForDevelopersPageProps {
  onOpenDeveloperModal: () => void;
}

export const ForDevelopersPage: React.FC<ForDevelopersPageProps> = ({
  onOpenDeveloperModal,
}) => {
  const { setActivePage } = usePlatform();
  // Interactive Developer ROI & Velocity Calculator
  const [numEstates, setNumEstates] = useState<number>(2);
  const [avgPlotPrice, setAvgPlotPrice] = useState<number>(10000000);
  const [plotsPerEstate, setPlotsPerEstate] = useState<number>(45);

  const totalPlots = numEstates * plotsPerEstate;
  const totalGrossInventory = totalPlots * avgPlotPrice;
  const estimatedAnnualReconciliationSaved = Math.round(totalGrossInventory * 0.015);
  const projectedTurnoverVelocity = '4.2x Faster Sales Cycle';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-8 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/velvet_villa_estate_1794323126140.jpg"
            alt="Velvet Villa development"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800">
            <span>Property Developer & Estate Owner Partnership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display mb-6">
            Your Properties Deserve More Than a Listing.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">
              Give Your Entire Business a Digital Home.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            ShieldNet Hub connects your public estate marketing directly with your private sales CRM, field agent coordination, independent payment verification, buyer property passports, and estate operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('developer-login')}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-sky-600" />
              <span>Developer Login (Velvet Villa · Love Gate)</span>
            </button>
            <button
              onClick={onOpenDeveloperModal}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#calculator"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-colors"
            >
              Calculate Developer Yield
            </a>
          </div>
        </div>
      </section>

      {/* The 6 Pillars Grid - Full Screen Edge-to-Edge */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
            Integrated Architecture
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            The 6 Core Operating Pillars for Developers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Replace disconnected spreadsheets, messaging apps, and manual paper receipts with one authorized digital headquarters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              1. Unified Cadastral Inventory
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every plot reference (size, coordinates, approved price, status) is tracked in real-time. Public availability on the marketplace automatically synchronizes with your sales CRM.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              2. Sales Team & Agent Governance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assign marketplace inbound leads to verified property agents. Track interaction logs (Calls, WhatsApp, Meetings) and manage statutory reservation approvals without double bookings.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              3. Independent Payment Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate fake payment screenshots. An authorized Finance Officer must reconcile bank transfers before issuing official receipts (`SHN-REC`) and unlocking plot allocations.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              4. Buyer Property Passports
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Elevate customer trust. Buyers receive structured digital portals with Property Passport IDs, installment schedules, verified document vaults, and transparent title tracking.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              5. Physical Infrastructure Audits
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track physical milestones across Roads, Drainage, Solar Lighting, Perimeter Fencing, and Water Reticulation. Public transparency drives rapid buyer conversion.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
              6. Governed Real Estate AI Fleet
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fleet of 10 specialized AI agents assisting with Lead Qualification, Property Matching, and Sales Briefings under strict semantic guardrails and tenant data isolation.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Developer ROI & Velocity Calculator */}
      <section id="calculator" className="bg-slate-900 text-white py-20 px-4 sm:px-8 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Simulator</span>
            </div>
            <h2 className="text-3xl font-bold font-display">
              Estimate Your Estate Portfolio Impact on ShieldNet Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
              Model your gross inventory pipeline and projected operational acceleration.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Input Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Number of Estates Managed</span>
                  <span className="text-sky-400 tabular-nums">{numEstates} Estates</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={numEstates}
                  onChange={(e) => setNumEstates(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Demarcated Plots Per Estate</span>
                  <span className="text-sky-400 tabular-nums">{plotsPerEstate} Plots</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={plotsPerEstate}
                  onChange={(e) => setPlotsPerEstate(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span>Average Approved Plot Price (NGN)</span>
                  <span className="text-sky-400 tabular-nums">₦{(avgPlotPrice / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="50000000"
                  step="1000000"
                  value={avgPlotPrice}
                  onChange={(e) => setAvgPlotPrice(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Projected Impact Output */}
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700/80 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-0.5">
                  Total Active Cadastral Inventory
                </span>
                <div className="text-3xl font-extrabold text-white tabular-nums">
                  ₦{totalGrossInventory.toLocaleString()}
                </div>
                <span className="text-xs text-sky-400 font-mono mt-0.5 block">
                  {totalPlots} demarcated plots across {numEstates} estates
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Sales Cycle Velocity</span>
                  <strong className="text-emerald-400">{projectedTurnoverVelocity}</strong>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Reconciliation Risk Eliminated</span>
                  <strong className="text-white tabular-nums">~₦{estimatedAnnualReconciliationSaved.toLocaleString()}</strong>
                </div>
              </div>

              <button
                onClick={onOpenDeveloperModal}
                className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow-lg transition-colors text-center cursor-pointer"
              >
                Apply for Developer Onboarding
              </button>
              <button
                onClick={() => setActivePage('developer-login')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Sign In to Developer Portal (Velvet Villa · Love Gate)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
