import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { PaymentRecord } from '../../types';
import {
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  ShieldCheck,
  Receipt,
  Download,
  Printer,
  Plus,
} from 'lucide-react';

export const FinanceOfficerDashboard: React.FC = () => {
  const { payments, verifyPayment, rejectPayment, recordPayment, plots } = usePlatform();

  const [activeTab, setActiveTab] = useState<'AWAITING' | 'VERIFIED' | 'NEW_RECORD'>('AWAITING');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  // New payment form
  const [payPlotId, setPayPlotId] = useState('');
  const [payBuyerName, setPayBuyerName] = useState('');
  const [payBuyerEmail, setPayBuyerEmail] = useState('');
  const [payAmount, setPayAmount] = useState<number>(3500000);
  const [payReference, setPayReference] = useState('');
  const [payMethod, setPayMethod] = useState<'BANK_TRANSFER' | 'DIRECT_DEBIT' | 'CHEQUE'>('BANK_TRANSFER');
  const [payNotes, setPayNotes] = useState('');

  const awaitingPayments = payments.filter((p) => p.status === 'AWAITING_VERIFICATION');
  const verifiedPayments = payments.filter((p) => p.status === 'VERIFIED');

  const totalVerifiedAmount = verifiedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalAwaitingAmount = awaitingPayments.reduce((sum, p) => sum + p.amount, 0);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payPlotId) return;

    recordPayment({
      plotId: payPlotId,
      buyerName: payBuyerName,
      buyerEmail: payBuyerEmail,
      amount: Number(payAmount),
      referenceNo: payReference || `TRX-${Date.now()}`,
      paymentMethod: payMethod,
      notes: payNotes,
    });

    setActiveTab('AWAITING');
    setPayBuyerName('');
    setPayReference('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Financial Operations & Treasury · Amina Bello (CFO)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Independent Payment Verification & Audit
          </h1>
          <p className="text-xs text-slate-500">
            Mandatory Governance: A payment screenshot is not proof. Payment confirmation requires independent bank reconciliation.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('AWAITING')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'AWAITING'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Awaiting Verification</span>
            {awaitingPayments.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {awaitingPayments.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('VERIFIED')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'VERIFIED'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Verified Ledger ({verifiedPayments.length})
          </button>
          <button
            onClick={() => {
              if (plots.length > 0) setPayPlotId(plots[0].id);
              setActiveTab('NEW_RECORD');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1 ${
              activeTab === 'NEW_RECORD'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Bank Deposit</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Reconciled Cash in Bank</div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">
            ₦{totalVerifiedAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Independently verified and issued receipts</div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
          <div className="text-xs text-amber-800 font-medium">Unverified Payments in Queue</div>
          <div className="text-2xl font-bold text-amber-950 tabular-nums mt-1">
            ₦{totalAwaitingAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 mt-0.5">{awaitingPayments.length} transactions pending bank confirmation</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Statutory Compliance Status</div>
          <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audit Ledger Active</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Strict double-entry reversal policy enforced</div>
        </div>
      </div>

      {/* TAB 1: AWAITING VERIFICATION QUEUE */}
      {activeTab === 'AWAITING' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Payments Awaiting Bank Reconciliation
              </h2>
              <p className="text-xs text-slate-500">
                Verify funds received in Stanbic IBTC / GTBank corporate accounts before confirming plot allocations.
              </p>
            </div>
          </div>

          {awaitingPayments.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-900">Queue is Clear</h4>
              <p className="text-xs text-slate-500 mt-1">All recorded payments have been independently reconciled.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {awaitingPayments.map((pay) => (
                <div
                  key={pay.id}
                  className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-slate-900 tabular-nums">
                        ₦{pay.amount.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        Plot {pay.plotRef}
                      </span>
                      <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                        AWAITING INDEPENDENT VERIFICATION
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5">
                      <div>
                        Payer: <strong className="text-slate-900">{pay.buyerName}</strong> ({pay.buyerEmail})
                      </div>
                      <div className="font-mono text-[11px] text-slate-500">
                        Bank Reference: <strong className="text-slate-800">{pay.referenceNo}</strong> · Method: {pay.paymentMethod}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Date Logged: {pay.paymentDate} · Estate: {pay.estateName}
                      </div>
                      {pay.notes && (
                        <div className="text-[11px] text-slate-600 italic mt-1">{pay.notes}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => rejectPayment(pay.id, 'Transaction reference not found on bank statement.')}
                      className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200"
                    >
                      Reject Proof
                    </button>
                    <button
                      onClick={() => verifyPayment(pay.id, 'Amina Bello (Chief Finance Officer)')}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Issue Official Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VERIFIED TRANSACTIONS LEDGER */}
      {activeTab === 'VERIFIED' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Audited & Reconciled Payments Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Transactions independently certified with timestamped audit records.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Receipt No</th>
                  <th className="px-5 py-3">Buyer Name</th>
                  <th className="px-5 py-3">Plot Reference</th>
                  <th className="px-5 py-3">Amount Confirmed</th>
                  <th className="px-5 py-3">Verified By</th>
                  <th className="px-5 py-3">Audit Date</th>
                  <th className="px-5 py-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {verifiedPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-sky-700">
                      {pay.receiptNumber || 'SHN-REC-2026-0042'}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-900">{pay.buyerName}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-600">{pay.plotRef}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-700 tabular-nums">
                      ₦{pay.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{pay.verifiedBy}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-400">{pay.verifiedDate || pay.paymentDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedReceipt(pay)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs flex items-center gap-1 ml-auto"
                      >
                        <Receipt className="w-3.5 h-3.5 text-slate-500" />
                        <span>Inspect Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RECORD BANK PAYMENT FORM */}
      {activeTab === 'NEW_RECORD' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
          <h2 className="text-lg font-bold text-slate-900 font-display mb-1">
            Record New Bank Transfer / Direct Settlement
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Log an offline or direct bank transfer for a plot allocation. A status of Awaiting Verification is set until reconciled.
          </p>

          <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Plot Allocation *</label>
              <select
                required
                value={payPlotId}
                onChange={(e) => setPayPlotId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {plots.map((plot) => (
                  <option key={plot.id} value={plot.id}>
                    {plot.plotRef} — {plot.estateName} ({plot.sizeSqm} sqm, ₦{plot.priceApproved.toLocaleString()}) [{plot.status}]
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Emeka Nwosu"
                  value={payBuyerName}
                  onChange={(e) => setPayBuyerName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payer Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="payer@example.com"
                  value={payBuyerEmail}
                  onChange={(e) => setPayBuyerEmail(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount Transferred (NGN) *</label>
                <input
                  type="number"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold tabular-nums focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bank Reference / NIP Session ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GTB-NIP-9921004"
                  value={payReference}
                  onChange={(e) => setPayReference(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Audit Notes / Branch Details</label>
              <textarea
                rows={2}
                placeholder="Stanbic IBTC Corporate Account deposit advice..."
                value={payNotes}
                onChange={(e) => setPayNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab('AWAITING')}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-lg shadow"
              >
                Log for Independent Verification
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Official Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl border border-slate-300 relative">
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                  ShieldNet Technologies Platform
                </div>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  Official Electronic Payment Receipt
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Receipt Ref: <strong className="font-mono text-slate-900">{selectedReceipt.receiptNumber || 'SHN-REC-2026-0042'}</strong>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded border border-emerald-300 uppercase tracking-wider block">
                  VERIFIED & RECONCILED
                </span>
                <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                  {selectedReceipt.verifiedDate || selectedReceipt.paymentDate}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs mb-8">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block mb-0.5">Received From:</span>
                  <strong className="text-slate-900 text-sm block">{selectedReceipt.buyerName}</strong>
                  <span className="text-slate-500">{selectedReceipt.buyerEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Estate Development:</span>
                  <strong className="text-slate-900 text-sm block">{selectedReceipt.estateName}</strong>
                  <span className="font-mono text-slate-600">Plot {selectedReceipt.plotRef}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 flex items-center justify-between">
                <div>
                  <span className="text-sky-900 text-xs font-semibold uppercase tracking-wider block">
                    Amount Certified & Confirmed
                  </span>
                  <div className="text-2xl font-black text-slate-900 tabular-nums">
                    ₦{selectedReceipt.amount.toLocaleString()}
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span>Method: {selectedReceipt.paymentMethod}</span>
                  <div className="font-mono text-[11px] text-slate-700">Ref: {selectedReceipt.referenceNo}</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span>Verified By Officer: <strong className="text-slate-800">{selectedReceipt.verifiedBy || 'Amina Bello (CFO)'}</strong></span>
                <span className="text-emerald-700 font-semibold">✓ Cryptographic Audit Stamp</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg shadow flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
