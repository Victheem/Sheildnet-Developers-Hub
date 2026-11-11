import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Lead, Plot } from '../../types';
import {
  Users,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Plus,
  Clock,
  CheckCircle2,
  DollarSign,
  Send,
  Building,
} from 'lucide-react';

export const PropertyAgentDashboard: React.FC = () => {
  const {
    leads,
    viewings,
    plots,
    addLeadInteraction,
    requestPlotReservation,
    scheduleViewingAppointment,
  } = usePlatform();

  const myLeads = leads.filter((l) => l.assignedAgentId === 'agent-chidi' || !l.assignedAgentId);
  const myViewings = viewings.filter((v) => v.agentId === 'agent-chidi');

  // Interaction Modal State
  const [interactionModalOpen, setInteractionModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [interactionType, setInteractionType] = useState<'PHONE_CALL' | 'EMAIL' | 'WHATSAPP' | 'IN_PERSON_MEETING'>('PHONE_CALL');
  const [interactionNotes, setInteractionNotes] = useState('');

  // Reservation Submission Modal State
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [resBuyerName, setResBuyerName] = useState('');
  const [resBuyerEmail, setResBuyerEmail] = useState('');
  const [resBuyerPhone, setResBuyerPhone] = useState('');
  const [resDeposit, setResDeposit] = useState<number>(2940000);

  const availablePlots = plots.filter((p) => p.status === 'AVAILABLE');

  const handleLogInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    addLeadInteraction(
      selectedLead.id,
      interactionType,
      interactionNotes,
      'Agent Chidi Okafor'
    );
    setInteractionModalOpen(false);
    setInteractionNotes('');
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlotId) return;

    requestPlotReservation({
      plotId: selectedPlotId,
      buyerName: resBuyerName,
      buyerEmail: resBuyerEmail,
      buyerPhone: resBuyerPhone,
      initialDepositRequired: Number(resDeposit),
    });

    setReservationModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Field Agent Operations · Agent Chidi Okafor</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Agent Sales Desk & Client Follow-ups
          </h1>
          <p className="text-xs text-slate-500">
            Assigned marketplace inquiries, on-site inspection bookings, and formal reservation submissions.
          </p>
        </div>

        <button
          onClick={() => {
            if (availablePlots.length > 0) {
              setSelectedPlotId(availablePlots[0].id);
              setResDeposit(availablePlots[0].priceApproved * 0.3);
            }
            setReservationModalOpen(true);
          }}
          className="px-4 py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Reservation Request</span>
        </button>
      </div>

      {/* Agent Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Assigned Active Leads</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">{myLeads.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Prioritized for Apo Gude allocation</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Scheduled Site Viewings</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums mt-1">{myViewings.length}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Physical inspections coordinated</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Approved Commission Accrual</div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums mt-1">₦490,000</div>
          <div className="text-[11px] text-slate-500 mt-0.5">5% commission on verified sales</div>
        </div>
      </div>

      {/* Assigned Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">
              My Active Prospective Buyers ({myLeads.length})
            </h3>
            <p className="text-xs text-slate-500">
              Record calls, meetings, WhatsApp notes, or advance their qualification score.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Prospect Name</th>
                <th className="px-5 py-3">Interest / Budget</th>
                <th className="px-5 py-3">Stage</th>
                <th className="px-5 py-3">Last Contacted</th>
                <th className="px-5 py-3">Interactions</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {myLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{lead.fullName}</div>
                    <div className="text-[11px] text-slate-500">{lead.phone} · {lead.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-slate-800">{lead.plotRefInterest || 'Velvet Villa'}</div>
                    <div className="text-[11px] text-slate-500">{lead.budgetBand}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-semibold bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200">
                      {lead.stage.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 font-mono">
                    {lead.lastContactedDate || lead.createdDate.split(' ')[0]}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {lead.interactions.length}
                    </span>{' '}
                    logged
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setInteractionModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs"
                    >
                      Log Interaction
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPlotId(availablePlots[0]?.id || '');
                        setResBuyerName(lead.fullName);
                        setResBuyerEmail(lead.email);
                        setResBuyerPhone(lead.phone);
                        setResDeposit(availablePlots[0]?.priceApproved * 0.3 || 2100000);
                        setReservationModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded font-semibold text-xs shadow-sm"
                    >
                      Reserve Plot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interaction Modal */}
      {interactionModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">
              Log Interaction with {selectedLead.fullName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All interactions update the customer timeline in the central CRM.
            </p>

            <form onSubmit={handleLogInteraction} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interaction Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'PHONE_CALL', label: 'Phone Call', icon: Phone },
                    { type: 'WHATSAPP', label: 'WhatsApp', icon: MessageSquare },
                    { type: 'EMAIL', label: 'Email', icon: Mail },
                    { type: 'IN_PERSON_MEETING', label: 'In-Person', icon: Calendar },
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInteractionType(type as any)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 font-medium ${
                        interactionType === type
                          ? 'border-sky-500 bg-sky-50 text-sky-900 font-semibold'
                          : 'border-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary / Client Feedback *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Discussed 350 sqm allocation at Velvet Villa. Client requested survey beacon confirmation..."
                  value={interactionNotes}
                  onChange={(e) => setInteractionNotes(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setInteractionModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-lg shadow"
                >
                  Save Interaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reservation Submission Modal (Workflow 7) */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">
              Submit Statutory Plot Reservation Request
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Rule: Reservations must be reviewed and approved by the Sales Director before inventory locks.
            </p>

            <form onSubmit={handleReservationSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Available Plot *</label>
                <select
                  required
                  value={selectedPlotId}
                  onChange={(e) => {
                    setSelectedPlotId(e.target.value);
                    const plot = plots.find((p) => p.id === e.target.value);
                    if (plot) setResDeposit(plot.priceApproved * 0.3);
                  }}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {availablePlots.map((plot) => (
                    <option key={plot.id} value={plot.id}>
                      {plot.plotRef} — {plot.sizeSqm} sqm (₦{plot.priceApproved.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Buyer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barrister Kenneth Obi"
                  value={resBuyerName}
                  onChange={(e) => setResBuyerName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Buyer Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="k.obi@legal.com"
                    value={resBuyerEmail}
                    onChange={(e) => setResBuyerEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Buyer Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={resBuyerPhone}
                    onChange={(e) => setResBuyerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Initial Commitment Deposit Required (NGN)
                </label>
                <input
                  type="number"
                  required
                  value={resDeposit}
                  onChange={(e) => setResDeposit(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold tabular-nums focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setReservationModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg shadow"
                >
                  Submit for Manager Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
