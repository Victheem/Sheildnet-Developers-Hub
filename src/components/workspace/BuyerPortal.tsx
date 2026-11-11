import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  UserCheck,
  ShieldCheck,
  FileText,
  DollarSign,
  Download,
  Calendar,
  Layers,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';

export const BuyerPortal: React.FC = () => {
  const { buyerPassport, estates, createMaintenanceOrder, setCurrentEnvironment, setSelectedMarketplaceEstateId } = usePlatform();

  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState<'Drainage Clearing' | 'Solar Streetlight Repair' | 'Road Sub-Base' | 'Security Patrol'>('Drainage Clearing');
  const [ticketDescription, setTicketDescription] = useState('');

  const velvetVilla = estates.find((e) => e.id === 'estate-velvet-villa') || estates[0];

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMaintenanceOrder({
      estateId: velvetVilla.id,
      plotRef: buyerPassport.plotRef,
      category: ticketCategory,
      description: ticketDescription,
      priority: 'MEDIUM',
    });
    setMaintenanceModalOpen(false);
    setTicketDescription('');
  };

  const percentPaid = Math.min(100, Math.round((buyerPassport.totalAmountPaid / buyerPassport.totalAgreedPrice) * 100));

  return (
    <div className="space-y-6">
      {/* Header with Property Passport ID Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Digital Property Account · {buyerPassport.buyerName}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Buyer Property Passport & Vault
          </h1>
          <p className="text-xs text-slate-500">
            Official cadastral title documentation, payment schedules, and estate development oversight.
          </p>
        </div>

        {/* Passport ID Card */}
        <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center gap-3 border border-slate-800 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-sky-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Verified Property Passport ID
            </div>
            <div className="text-sm font-mono font-bold tracking-wider text-sky-300">
              {buyerPassport.passportId}
            </div>
          </div>
        </div>
      </div>

      {/* Property Allocation Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-lg font-bold text-slate-900">
                Plot {buyerPassport.plotRef}
              </span>
              <span className="text-xs text-slate-500">({buyerPassport.plotSizeSqm} sqm Demarcated Parcel)</span>
              <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200 uppercase">
                {buyerPassport.allocationStatus.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              {buyerPassport.estateName} · Allocated on {buyerPassport.purchaseDate}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMaintenanceModalOpen(true)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-slate-500" />
              <span>Submit Resident Request</span>
            </button>
            <button
              onClick={() => {
                setSelectedMarketplaceEstateId(null);
                setCurrentEnvironment('MARKETPLACE');
              }}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore More Estates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Financial Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700">Financial Commitment Fulfillment</span>
            <span className="font-bold text-sky-700 tabular-nums">{percentPaid}% Settled</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-sky-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentPaid}%` }}
            />
          </div>
        </div>

        {/* Financial Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Total Agreed Price
            </span>
            <div className="text-xl font-bold text-slate-900 tabular-nums">
              ₦{buyerPassport.totalAgreedPrice.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Approved plot rate</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] text-emerald-800 uppercase tracking-wider block mb-1">
              Confirmed Paid to Date
            </span>
            <div className="text-xl font-bold text-emerald-950 tabular-nums">
              ₦{buyerPassport.totalAmountPaid.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 mt-0.5 block">Reconciled bank transfers</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-[11px] text-amber-800 uppercase tracking-wider block mb-1">
              Outstanding Balance
            </span>
            <div className="text-xl font-bold text-amber-950 tabular-nums">
              ₦{buyerPassport.outstandingBalance.toLocaleString()}
            </div>
            <span className="text-[10px] text-amber-700 mt-0.5 block">
              Due next: {buyerPassport.nextInstallmentDate || 'Upon allocation handover'}
            </span>
          </div>
        </div>
      </div>

      {/* Verified Document Vault */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 font-display mb-1">
          Cryptographically Verified Document Vault
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Statutory title instruments, registered cadastral surveys, and confirmed electronic receipts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {buyerPassport.documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-5 h-5 text-sky-600" />
                  {doc.verified ? (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Pending
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                <div className="text-[11px] text-slate-400 mt-0.5">{doc.type} · {doc.date}</div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View / Download Document</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Estate Development Updates */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 font-display mb-1">
          Estate Infrastructure Progress Feed
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Real-time physical audit records from Velvet Villa, Apo Gude.
        </p>

        <div className="space-y-3">
          {velvetVilla.infrastructure.slice(0, 3).map((inf) => (
            <div key={inf.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">{inf.name}</span>
                <span className="text-[11px] text-slate-500">Contractor: {inf.responsibleParty}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-sky-700 tabular-nums block">{inf.progressPercent}%</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">{inf.status.replace(/_/g, ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Request Modal */}
      {maintenanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">
              Submit Resident / Plot Maintenance Request
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Dispatched directly to the on-site Velvet Villa Estate Operations Manager.
            </p>

            <form onSubmit={handleMaintenanceSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue Category *</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Drainage Clearing">Drainage Channel Clearing</option>
                  <option value="Solar Streetlight Repair">Solar Streetlight Servicing</option>
                  <option value="Road Sub-Base">Access Road Grading</option>
                  <option value="Security Patrol">Security Access Request</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plot Location</label>
                <input
                  type="text"
                  readOnly
                  value={`Plot ${buyerPassport.plotRef} · ${buyerPassport.estateName}`}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the issue requiring contractor inspection..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setMaintenanceModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg shadow"
                >
                  Dispatch to Estate Operations
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
