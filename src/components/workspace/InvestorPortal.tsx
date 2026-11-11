import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  TrendingUp,
  ShieldAlert,
  FileText,
  Download,
  DollarSign,
  PieChart,
  CheckCircle2,
  Calendar,
  Lock,
} from 'lucide-react';

export const InvestorPortal: React.FC = () => {
  const { investorRecords } = usePlatform();

  const record = investorRecords[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>ShieldNet Invest · Syndication Portfolio</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Investor Accounting & Project Yield Statement
          </h1>
          <p className="text-xs text-slate-500">
            Participant: {record?.investorName || 'Alhaji Bashir Aliyu'} · Co-Investment Syndication ID: #INV-2026-09
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Certified Statement</span>
        </button>
      </div>

      {/* Mandatory Regulatory & Accounting Notice (Part 6 Module 4 & Part 11 Rule 10) */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs flex items-start gap-3">
        <Lock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white font-semibold">Strict Regulatory Distinction:</strong> Capital contributed, accrued earnings, and distributed returns are accounted for separately under independent audit procedures. In accordance with platform governance, projected returns are never presented as guaranteed cash or risk-free reserves.
        </div>
      </div>

      {/* Financial Disciplined Grid: 6 Distinct Financial Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Capital Contributed */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            1. Capital Contributed
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            ₦{record.capitalContributed.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Confirmed principal deployed into project</p>
        </div>

        {/* 2. Approved Projected ROI */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider mb-1">
            2. Projected Annual Yield
          </div>
          <div className="text-2xl font-bold text-sky-950 tabular-nums">
            {record.projectedReturnRate}% p.a.
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Contractual underwriting target benchmark</p>
        </div>

        {/* 3. Accrued Return */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            3. Accrued Return to Date
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            ₦{record.accruedReturn.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Contractually accrued milestone profit</p>
        </div>

        {/* 4. Realized Profit */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            4. Realized Net Profit
          </div>
          <div className="text-2xl font-bold text-indigo-950 tabular-nums">
            ₦{record.realizedProfit.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Audited earnings from verified plot sales</p>
        </div>

        {/* 5. Distributed Profit */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm">
          <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            5. Distributed Profit (Paid)
          </div>
          <div className="text-2xl font-bold text-emerald-950 tabular-nums">
            ₦{record.distributedProfit.toLocaleString()}
          </div>
          <p className="text-[10px] text-emerald-700 mt-1">Confirmed wire transfer to investor bank</p>
        </div>

        {/* 6. Outstanding Distribution */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm">
          <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-1">
            6. Outstanding Distribution
          </div>
          <div className="text-2xl font-bold text-amber-950 tabular-nums">
            ₦{record.outstandingDistribution.toLocaleString()}
          </div>
          <p className="text-[10px] text-amber-700 mt-1">Scheduled for next quarterly distribution run</p>
        </div>
      </div>

      {/* Active Project Dossier */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest block mb-1">
              Active Syndication Asset
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">{record.projectTitle}</h3>
          </div>
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md border border-emerald-200">
            Tenure: 12 Months ({record.investmentDate} to {record.maturityDate})
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          Co-investment syndicate funding Phase 1 civil infrastructure works at Velvet Villa, Apo Gude, Abuja. Proceeds are dedicated exclusively to arterial dual-carriageway asphalt paving, concrete drainage channels, and 100-pole solar illumination network.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-900 block mb-1">
              Infrastructure Progress Milestone
            </span>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Road Works & Drainage:</span>
              <strong className="text-slate-900">75% Completed</strong>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Syndication Legal Deed</span>
              <span className="text-[11px] text-slate-500">Executed Co-Investment Agreement</span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Inspect Deed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
