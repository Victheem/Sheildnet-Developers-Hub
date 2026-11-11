import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { LeadStage } from '../../types';
import {
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Phone,
  ArrowRight,
  TrendingUp,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';

export const SalesManagerDashboard: React.FC = () => {
  const {
    leads,
    reservations,
    viewings,
    assignLeadToAgent,
    approveReservation,
    rejectReservation,
    updateLeadStage,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'PIPELINE' | 'ASSIGNMENTS' | 'RESERVATIONS'>('PIPELINE');

  const pendingReservations = reservations.filter((r) => r.status === 'PENDING_APPROVAL');
  const unassignedLeads = leads.filter((l) => !l.assignedAgentId);

  const stages: { stage: LeadStage; title: string; color: string }[] = [
    { stage: 'NEW_LEAD', title: 'New Leads', color: 'border-sky-400' },
    { stage: 'CONTACTED', title: 'Contacted', color: 'border-blue-400' },
    { stage: 'QUALIFIED', title: 'Qualified', color: 'border-indigo-400' },
    { stage: 'VIEWING_SCHEDULED', title: 'Viewing Scheduled', color: 'border-amber-400' },
    { stage: 'RESERVATION_REQUESTED', title: 'Reservation Requested', color: 'border-purple-400' },
    { stage: 'RESERVATION_APPROVED', title: 'Reservation Approved', color: 'border-emerald-400' },
    { stage: 'PAYMENT_CONFIRMED', title: 'Closed / Won', color: 'border-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Sales Operations & CRM Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Sales Manager Directorate
          </h1>
          <p className="text-xs text-slate-500">
            Pipeline velocity, lead qualification, agent assignments, and statutory reservation approvals.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('PIPELINE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'PIPELINE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sales Pipeline
          </button>
          <button
            onClick={() => setActiveTab('ASSIGNMENTS')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'ASSIGNMENTS'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Lead Assignments</span>
            {unassignedLeads.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center font-bold">
                {unassignedLeads.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('RESERVATIONS')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'RESERVATIONS'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Reservation Approvals</span>
            {pendingReservations.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingReservations.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: SALES PIPELINE (Kanban columns) */}
      {activeTab === 'PIPELINE' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>
              Total Active Inquiries: <strong className="text-slate-900">{leads.length}</strong>
            </span>
            <span>A visitor enquiry is an opportunity; only approved reservations reserve inventory.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {stages.slice(0, 4).map(({ stage, title, color }) => {
              const stageLeads = leads.filter((l) => l.stage === stage);
              return (
                <div
                  key={stage}
                  className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200 flex flex-col min-w-[260px]"
                >
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-900">{title}</span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {stageLeads.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs italic">
                        No active prospects
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-xs space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-slate-900">{lead.fullName}</span>
                            <span className="text-[10px] font-mono text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded">
                              {lead.plotRefInterest || 'Apo Gude'}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-500">
                            <div>Phone: {lead.phone}</div>
                            <div>Budget: {lead.budgetBand}</div>
                            <div>Agent: <strong className="text-slate-700">{lead.assignedAgentName || 'Unassigned'}</strong></div>
                          </div>

                          {lead.stage === 'NEW_LEAD' && (
                            <button
                              onClick={() => assignLeadToAgent(lead.id, 'agent-chidi', 'Agent Chidi Okafor')}
                              className="w-full mt-2 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-[11px] font-semibold transition-colors"
                            >
                              Assign to Agent Chidi
                            </button>
                          )}

                          {lead.stage === 'CONTACTED' && (
                            <button
                              onClick={() => updateLeadStage(lead.id, 'QUALIFIED')}
                              className="w-full mt-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold transition-colors"
                            >
                              Advance to Qualified
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LEAD ASSIGNMENTS */}
      {activeTab === 'ASSIGNMENTS' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            Inbound Marketplace Leads & Agent Routing
          </h2>
          <p className="text-xs text-slate-500">
            Route leads coming from the public marketplace directly to designated field property agents.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Prospect Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Plot / Budget Interest</th>
                  <th className="px-4 py-3">Inbound Source</th>
                  <th className="px-4 py-3">Current Agent</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900">{lead.fullName}</td>
                    <td className="px-4 py-3.5">
                      <div>{lead.email}</div>
                      <div className="text-[11px] text-slate-400">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-800">{lead.plotRefInterest || 'Velvet Villa General'}</div>
                      <div className="text-[11px] text-slate-500">{lead.budgetBand}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {lead.assignedAgentName ? (
                        <span className="text-emerald-700 font-semibold">{lead.assignedAgentName}</span>
                      ) : (
                        <span className="text-amber-600 font-semibold italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {!lead.assignedAgentId ? (
                        <button
                          onClick={() => assignLeadToAgent(lead.id, 'agent-chidi', 'Agent Chidi Okafor')}
                          className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-sm"
                        >
                          Assign to Chidi Okafor
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Assigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RESERVATION APPROVALS (Workflow 7) */}
      {activeTab === 'RESERVATIONS' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Statutory Reservation Approvals
              </h2>
              <p className="text-xs text-slate-500">
                Rule: An agent cannot independently approve a reservation unless authorised. Duplicate active reservations for the same plot are strictly prevented.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {pendingReservations.length} Pending Review
            </span>
          </div>

          <div className="space-y-4">
            {reservations.map((res) => {
              const isPending = res.status === 'PENDING_APPROVAL';
              let badge = 'bg-amber-50 text-amber-800 border-amber-200';
              if (res.status === 'APPROVED') {
                badge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              } else if (res.status === 'REJECTED') {
                badge = 'bg-rose-50 text-rose-800 border-rose-200';
              }

              return (
                <div
                  key={res.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isPending
                      ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          Plot {res.plotRef} ({res.plotSizeSqm} sqm)
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badge}`}>
                          {res.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div>
                          Buyer: <strong className="text-slate-900">{res.buyerOrLeadName}</strong> ({res.buyerEmail} · {res.buyerPhone})
                        </div>
                        <div>
                          Approved Price: <strong className="text-slate-900 tabular-nums">₦{res.priceApproved.toLocaleString()}</strong> · Required Deposit: <strong className="text-sky-700 tabular-nums">₦{res.initialDepositRequired.toLocaleString()}</strong>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Requested: {res.requestDate} · Valid until: {res.expiryDate}
                          {res.approvedBy && ` · Approved by: ${res.approvedBy}`}
                        </div>
                      </div>
                    </div>

                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => rejectReservation(res.id, 'Plot reserved for priority syndicated allocation.')}
                          className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approveReservation(res.id, 'Bello Danjuma (Sales Director)')}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve & Lock Plot</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs font-medium text-slate-500">
                        {res.status === 'APPROVED' ? 'Locked in inventory' : 'Released back to stock'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
