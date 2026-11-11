import React from 'react';
import { motion } from 'motion/react';
import { usePlatform } from '../../context/PlatformContext';
import { Shield, Building2, Lock, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutUsPageProps {
  onOpenDeveloperModal: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onOpenDeveloperModal }) => {
  const { setSelectedMarketplaceEstateId } = usePlatform();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800">
            <Shield className="w-3.5 h-3.5" />
            <span>ShieldNet Technologies Ltd</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display mb-4">
            About ShieldNet Hub
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
            Your Estate. Your Sales. Your Customers. One Connected Platform.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-12 space-y-12">
        {/* Core Vision */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            The Digital Operating Ecosystem for Property Commerce
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            ShieldNet Hub is not another generic property listing site or simple broker directory. It is an intelligent, multi-tenant property commerce and estate operations ecosystem connecting property developers, estate owners, agents, buyers, investors, and estate management teams through one digital platform.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            It brings the entire property business lifecycle together: property discovery, estate advertising, cadastral plot inventory, customer acquisition, field sales management, viewing appointments, reservations, independent payment reconciliation, post-sale buyer relationship management (Buyer Property Passports), and physical infrastructure milestone tracking.
          </p>
        </div>

        {/* Intellectual Property & Multi-Tenant Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display mb-2">
              Platform Ownership & Tenant Isolation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ShieldNet Technologies retains exclusive ownership and control of the reusable platform software, source code, multi-tenant architecture, and AI orchestration. Each participating developer operates within a strictly isolated private business workspace with zero data leakage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display mb-2">
              Governed Real Estate AI Fleet
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our 10 specialized AI agents operate within strictly audited semantic guardrails. In accordance with platform governance, AI agents cannot independently approve reservations, alter prices, or confirm that payments have been received without authorized human verification.
            </p>
          </div>
        </div>

        {/* First Pilot Estate */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
              Active Demonstration Pilot
            </span>
            <h3 className="text-xl font-bold font-display">Velvet Villa, Apo Gude, Abuja FCT</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
              Velvet Villa serves as the live pilot demonstrating how participating developers showcase inventory, capture enquiries, coordinate field agents, approve reservations, and verify collections on ShieldNet Hub.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedMarketplaceEstateId('estate-velvet-villa')}
              className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl shadow transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore Velvet Villa Pilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenDeveloperModal}
              className="px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl shadow transition-colors whitespace-nowrap cursor-pointer"
            >
              Become a Development Partner
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
