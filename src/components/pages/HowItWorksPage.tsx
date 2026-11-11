import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  DollarSign,
  UserCheck,
  ShieldCheck,
  Calendar,
  Layers,
  FileCheck,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setActivePage, setCurrentEnvironment } = usePlatform();
  const [activePersona, setActivePersona] = useState<'BUYER' | 'DEVELOPER' | 'INVESTOR'>('BUYER');

  const workflows = [
    {
      step: '01',
      title: 'Developer Onboarding & Workspace Isolation',
      desc: 'A developer registers. ShieldNet Super Admin reviews corporate credentials and activates an isolated tenant workspace with cadastral inventory controls.',
      badge: 'Platform Security',
    },
    {
      step: '02',
      title: 'Cadastral Inventory & Approved Pricing',
      desc: 'The developer uploads masterplan demarcations (e.g. Velvet Villa Apo Gude: 250 sqm @ ₦7.0M, 350 sqm @ ₦9.8M, 500 sqm @ ₦14.0M) and infrastructure milestones.',
      badge: 'Inventory Management',
    },
    {
      step: '03',
      title: 'Public Discovery Without Login Friction',
      desc: 'Public visitors browse verified estate boundaries and approved prices. They can submit an enquiry or book an inspection without an account barrier.',
      badge: 'Public Commerce',
    },
    {
      step: '04',
      title: 'Automated CRM Routing to Field Agents',
      desc: 'Inbound enquiries enter the developer’s private CRM. Sales Managers assign leads to field agents like Agent Chidi Okafor.',
      badge: 'Sales Operations',
    },
    {
      step: '05',
      title: 'Accompanied Inspection & Viewing',
      desc: 'The assigned agent coordinates gate clearance and conducts on-site beacon inspection with the prospective buyer.',
      badge: 'Customer Engagement',
    },
    {
      step: '06',
      title: 'Statutory Reservation Approval',
      desc: 'The buyer or agent requests a reservation. A designated Sales Director reviews and approves it, locking the plot to prevent duplicate claims.',
      badge: 'Dual-Control Governance',
    },
    {
      step: '07',
      title: 'Independent Payment Verification',
      desc: 'Buyer makes a bank transfer. The Finance Officer independently reconciles the deposit against bank records before confirming receipt.',
      badge: 'Financial Integrity',
    },
    {
      step: '08',
      title: 'Receipt Issuance & Allocation Transition',
      desc: 'Official receipt (`SHN-REC-2026-XXXX`) is issued. The plot status automatically transitions from RESERVED to SOLD, and audit logs are recorded.',
      badge: 'Statutory Accounting',
    },
    {
      step: '09',
      title: 'Buyer Property Passport Activation',
      desc: 'The buyer receives their Property Passport ID (`SHN-ABJ-VV-2026-084`), access to the verified document vault, and real-time infrastructure progress.',
      badge: 'Post-Sale Lifecycle',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Header */}
      <div className="bg-slate-900 text-white py-14 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800">
            <Compass className="w-3.5 h-3.5" />
            <span>The 9 Essential Connected MVP Workflows</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display mb-3">
            How ShieldNet Hub Connects the Property Lifecycle
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From initial public discovery and field inspection to statutory reservation approvals, two-officer payment reconciliation, and lifelong Property Passports.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-12">
        {/* Step by Step Timeline */}
        <div className="space-y-6">
          {workflows.map((wf, idx) => (
            <div
              key={wf.step}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-mono font-black text-lg flex items-center justify-center shrink-0">
                  {wf.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200 uppercase tracking-wider">
                      {wf.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {wf.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-3xl">
                    {wf.desc}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                <span>Verified in Engine</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Interactive Navigation Banner */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-display">Experience the Platform in Action</h4>
            <p className="text-xs text-slate-500 mt-1">
              Explore the interactive cadastral plot map or dive into the role workspaces.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('properties')}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Cadastral Plots</span>
            </button>
            <button
              onClick={() => setCurrentEnvironment('WORKSPACE')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Enter Workspace Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
