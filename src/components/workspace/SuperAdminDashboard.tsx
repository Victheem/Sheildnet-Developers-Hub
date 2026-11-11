import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Shield,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Cpu,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  Receipt,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const {
    developers,
    estates,
    plots,
    approveDeveloper,
    rejectDeveloper,
    commercialContracts,
    auditLogs,
    totalTokensConsumed,
    totalAiCostNgn,
    guardrailBlockedCount,
    aiAgents,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ONBOARDING' | 'COMMERCIAL' | 'AI_GOVERNANCE' | 'AUDIT'>('OVERVIEW');

  const pendingDevelopers = developers.filter((d) => d.status === 'PENDING_REVIEW');
  const activeDevelopers = developers.filter((d) => d.status === 'ACTIVE');

  // Commercial revenue breakdown
  const totalInvoiced = commercialContracts.reduce((sum, c) => sum + c.invoicedAmount, 0);
  const totalCollected = commercialContracts.reduce((sum, c) => sum + c.collectedAmount, 0);
  const totalOutstanding = commercialContracts.reduce((sum, c) => sum + c.outstandingAmount, 0);
  const totalProjected = commercialContracts.reduce((sum, c) => sum + c.projectedAnnualValue, 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>ShieldNet Platform Master Administration</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Super Administrator Control Console
          </h1>
          <p className="text-xs text-slate-500">
            Multi-tenant governance, developer workspace onboarding, AI guardrail telemetry, and commercial interests.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'OVERVIEW'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ONBOARDING')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'ONBOARDING'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Onboarding Queue</span>
            {pendingDevelopers.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingDevelopers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('COMMERCIAL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'COMMERCIAL'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Commercial Interests
          </button>
          <button
            onClick={() => setActiveTab('AI_GOVERNANCE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'AI_GOVERNANCE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Governance
          </button>
          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'AUDIT'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Security Audit
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Platform Vital Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Active Developers</span>
                <Building2 className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {activeDevelopers.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                + {pendingDevelopers.length} pending review
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Managed Estates</span>
                <Layers className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {estates.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {plots.length} total inventory plots
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Platform SaaS Collections</span>
                <DollarSign className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                ₦{totalCollected.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                ₦{totalOutstanding.toLocaleString()} invoiced outstanding
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>AI Token Consumption</span>
                <Cpu className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {totalTokensConsumed.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                ₦{totalAiCostNgn.toFixed(2)} cost · {guardrailBlockedCount} guardrail blocks
              </div>
            </div>
          </div>

          {/* Quick Onboarding Alert Banner */}
          {pendingDevelopers.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">
                    {pendingDevelopers.length} Developer Onboarding Application(s) Awaiting Review
                  </h4>
                  <p className="text-[11px] text-amber-800">
                    {pendingDevelopers[0].name} requested workspace access on {pendingDevelopers[0].registrationDate}.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('ONBOARDING')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg shadow-sm whitespace-nowrap"
              >
                Inspect Applications
              </button>
            </div>
          )}

          {/* Developers Directory Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Participating Property Developer Workspaces
                </h3>
                <p className="text-xs text-slate-500">
                  Tenant workspaces isolated at the database and application boundary.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Developer Partner</th>
                    <th className="px-5 py-3">Lead Contact</th>
                    <th className="px-5 py-3">Plan Tier</th>
                    <th className="px-5 py-3">Estates</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Tenant ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {developers.map((dev) => (
                    <tr key={dev.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{dev.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{dev.address}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div>{dev.contactPerson}</div>
                        <div className="text-[11px] text-slate-500">{dev.businessEmail}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          {dev.subscriptionPlan}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 tabular-nums">
                        {dev.estatesCount} estate ({dev.totalPlotsManaged} plots)
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                            dev.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {dev.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono text-slate-400">
                        {dev.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ONBOARDING QUEUE */}
      {activeTab === 'ONBOARDING' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 font-display mb-1">
              Developer Onboarding & Workspace Authorization
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              In accordance with Part 4.2 of the Master Architecture, registration creates an onboarding request. ShieldNet Super Admin must review and approve credentials before granting private workspace access.
            </p>

            {pendingDevelopers.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-900">All Applications Processed</h4>
                <p className="text-xs text-slate-500 mt-1">There are no pending developer onboarding applications.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDevelopers.map((dev) => (
                  <div
                    key={dev.id}
                    className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-base">{dev.name}</span>
                        <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
                          PENDING APPROVAL
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div>Managing Director: <strong className="text-slate-800">{dev.contactPerson}</strong></div>
                        <div>Email: {dev.businessEmail} · Phone: {dev.phone}</div>
                        <div>Address: {dev.address}</div>
                        <div>Selected Plan Tier: <strong className="text-sky-700">{dev.subscriptionPlan}</strong> · Submitted: {dev.registrationDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => rejectDeveloper(dev.id, 'Insufficient corporate registration credentials.')}
                        className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition-colors"
                      >
                        Decline Application
                      </button>
                      <button
                        onClick={() => approveDeveloper(dev.id)}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Authorize & Activate Workspace</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: MODULE 8 — MY COMMERCIAL INTERESTS */}
      {activeTab === 'COMMERCIAL' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  ShieldNet Technologies — Commercial Performance & Revenue Streams
                </h2>
                <p className="text-xs text-slate-500">
                  Tracking onboarding fees, monthly subscriptions, AI packages, technology fees, and authorized commissions.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Mandatory Accounting Discipline: Revenue figures strictly separated by status.
              </div>
            </div>

            {/* 4 Revenue Columns Separated (Part 6 Module 8) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  1. Invoiced Revenue
                </div>
                <div className="text-xl font-bold text-slate-900 tabular-nums">
                  ₦{totalInvoiced.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">Total invoiced billings across tenants</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                  2. Collected Cash
                </div>
                <div className="text-xl font-bold text-emerald-950 tabular-nums">
                  ₦{totalCollected.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-700 mt-1">Confirmed bank deposits in account</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-1">
                  3. Outstanding Receivables
                </div>
                <div className="text-xl font-bold text-amber-950 tabular-nums">
                  ₦{totalOutstanding.toLocaleString()}
                </div>
                <div className="text-[10px] text-amber-700 mt-1">Due within current billing cycle</div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
                <div className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider mb-1">
                  4. Projected Annual Value
                </div>
                <div className="text-xl font-bold text-sky-950 tabular-nums">
                  ₦{totalProjected.toLocaleString()}
                </div>
                <div className="text-[10px] text-sky-700 mt-1">Annualized contract run-rate (ARR)</div>
              </div>
            </div>

            {/* Commercial Contracts Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Tenant Developer</th>
                    <th className="px-4 py-3">Commercial Stream</th>
                    <th className="px-4 py-3">Invoiced</th>
                    <th className="px-4 py-3">Collected</th>
                    <th className="px-4 py-3">Outstanding</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {commercialContracts.map((con) => (
                    <tr key={con.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900">{con.developerName}</td>
                      <td className="px-4 py-3">{con.revenueStream}</td>
                      <td className="px-4 py-3 tabular-nums font-medium">₦{con.invoicedAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 tabular-nums text-emerald-700 font-bold">₦{con.collectedAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 tabular-nums text-amber-700">₦{con.outstandingAmount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                            con.status === 'PAID'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {con.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-400 font-mono">{con.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AI GOVERNANCE & TOKEN TELEMETRY */}
      {activeTab === 'AI_GOVERNANCE' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  AI Reliability, Guardrail & Token-Cost Proxy Middleware
                </h2>
                <p className="text-xs text-slate-500">
                  Server-side governance managing prompt safety, semantic boundaries, and tenant cost quotas.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Guardrail Engine: Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Total Tokens Consumed</div>
                <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">
                  {totalTokensConsumed.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Gemini 3.8 Flash model execution</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Accumulated AI Operating Cost</div>
                <div className="text-xl font-bold text-slate-900 tabular-nums mt-1">
                  ₦{totalAiCostNgn.toFixed(2)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Charged against tenant AI usage packages</div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-xs text-rose-800 font-medium">Blocked Guardrail Violations</div>
                <div className="text-xl font-bold text-rose-950 tabular-nums mt-1">
                  {guardrailBlockedCount}
                </div>
                <div className="text-[10px] text-rose-700 mt-0.5">Attempted unauthorized financial/price modifications</div>
              </div>
            </div>

            {/* Active AI Agent Specifications */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Fleet of 10 Specialised AI Agents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiAgents.map((agent) => (
                <div key={agent.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{agent.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border">
                      {agent.tokenCostPerRun} tok/run
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">{agent.roleDescription}</p>
                  <div className="text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">Governance Rule:</span> {agent.governanceRules[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SECURITY AUDIT LOG */}
      {activeTab === 'AUDIT' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Immutable Platform Audit Log
              </h2>
              <p className="text-xs text-slate-500">
                Full chronological ledger of reservation approvals, payment verifications, and permission updates.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Total Entries: {auditLogs.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Actor & Role</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700 font-mono">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-sans font-bold text-slate-900">{log.actor}</div>
                      <div className="text-[10px] text-slate-400 uppercase">{log.role}</div>
                    </td>
                    <td className="px-4 py-3 text-sky-700 font-bold whitespace-nowrap">{log.action}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{log.targetEntity}: {log.targetRef}</td>
                    <td className="px-4 py-3 font-sans text-slate-600 min-w-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
