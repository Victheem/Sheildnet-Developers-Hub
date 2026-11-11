import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { InfrastructureStatus, MaintenanceWorkOrder } from '../../types';
import {
  Wrench,
  CheckCircle2,
  Clock,
  Layers,
  AlertTriangle,
  Building,
  ShieldCheck,
  Plus,
  Compass,
} from 'lucide-react';

export const EstateManagerDashboard: React.FC = () => {
  const {
    estates,
    updateInfrastructureProgress,
    maintenanceOrders,
    createMaintenanceOrder,
    updateMaintenanceStatus,
  } = usePlatform();

  const estate = estates.find((e) => e.id === 'estate-velvet-villa') || estates[0];

  const [activeTab, setActiveTab] = useState<'INFRASTRUCTURE' | 'MAINTENANCE' | 'CONTRACTORS'>('INFRASTRUCTURE');

  // Work order modal
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [orderCategory, setOrderCategory] = useState<MaintenanceWorkOrder['category']>('Drainage Clearing');
  const [orderDesc, setOrderDesc] = useState('');
  const [orderContractor, setOrderContractor] = useState('HydroCivil Contractors');
  const [orderCost, setOrderCost] = useState<number>(350000);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    createMaintenanceOrder({
      estateId: estate.id,
      category: orderCategory,
      description: orderDesc,
      contractorName: orderContractor,
      cost: Number(orderCost),
    });
    setNewOrderModal(false);
    setOrderDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            <Wrench className="w-3.5 h-3.5" />
            <span>Estate Operations & Physical Infrastructure · Engr. Kabir Lawan</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">
            Estate Infrastructure & Facilities Engineering
          </h1>
          <p className="text-xs text-slate-500">
            Operations headquarters for {estate.name}, Apo Gude, Abuja FCT.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('INFRASTRUCTURE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'INFRASTRUCTURE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Infrastructure Tracker ({estate.infrastructure.length})
          </button>
          <button
            onClick={() => setActiveTab('MAINTENANCE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'MAINTENANCE'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Maintenance Work Orders ({maintenanceOrders.length})
          </button>
        </div>
      </div>

      {/* TAB 1: INFRASTRUCTURE MILESTONES TRACKER */}
      {activeTab === 'INFRASTRUCTURE' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Physical Infrastructure Audit & Status Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Track the 8 required operational dimensions: Roads, Electricity, Water, Drainage, Perimeter, Security, Street lighting, and Landscaping.
                </p>
              </div>
              <span className="text-xs text-slate-500">Live Cadastral Log</span>
            </div>

            <div className="space-y-4">
              {estate.infrastructure.map((item) => {
                let badge = 'bg-amber-50 text-amber-800 border-amber-200';
                if (item.status === 'VERIFIED_COMPLETED') {
                  badge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                } else if (item.status === 'IN_PROGRESS') {
                  badge = 'bg-sky-50 text-sky-800 border-sky-200';
                }

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm text-slate-900">{item.name}</span>
                          <span className="text-xs font-mono text-slate-400">({item.category})</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Responsible Contractor: <strong className="text-slate-700">{item.responsibleParty}</strong> · Target: {item.targetCompletion}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${badge}`}>
                          {item.status.replace(/_/g, ' ')}
                        </span>
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900 tabular-nums">
                            {item.progressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-3">
                      <div
                        className="bg-sky-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>

                    {/* Quick Update Controls for Estate Manager */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Update Progress:</span>
                        {[50, 75, 90, 100].map((pct) => (
                          <button
                            key={pct}
                            onClick={() =>
                              updateInfrastructureProgress(
                                estate.id,
                                item.id,
                                pct === 100 ? 'VERIFIED_COMPLETED' : 'IN_PROGRESS',
                                pct,
                                pct === 100 ? 'Physical inspection verified and commissioned.' : undefined
                              )
                            }
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              item.progressPercent === pct
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>

                      {item.verifiedBy && (
                        <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.verifiedBy} ({item.verificationDate})</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MAINTENANCE WORK ORDERS */}
      {activeTab === 'MAINTENANCE' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Contractor Work Orders & Resident Dispatches
              </h2>
              <p className="text-xs text-slate-500">
                Log maintenance requests, assign engineering contractors, and verify completed site works.
              </p>
            </div>
            <button
              onClick={() => setNewOrderModal(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue New Work Order</span>
            </button>
          </div>

          <div className="space-y-3">
            {maintenanceOrders.map((order) => {
              let badge = 'bg-sky-50 text-sky-800 border-sky-200';
              if (order.status === 'COMPLETED_VERIFIED') {
                badge = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              } else if (order.status === 'OPEN') {
                badge = 'bg-amber-50 text-amber-800 border-amber-200';
              }

              return (
                <div
                  key={order.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-slate-900">{order.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badge}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Priority: {order.priority}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{order.description}</p>
                    <div className="text-[11px] text-slate-500">
                      Contractor: <strong className="text-slate-800">{order.contractorName}</strong> · Estimated Cost: ₦{order.cost.toLocaleString()} · Logged: {order.requestedDate}
                    </div>
                  </div>

                  {order.status !== 'COMPLETED_VERIFIED' ? (
                    <button
                      onClick={() => updateMaintenanceStatus(order.id, 'COMPLETED_VERIFIED')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm whitespace-nowrap self-start sm:self-center"
                    >
                      Verify Work Completed
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold self-start sm:self-center">
                      ✓ Inspected & Certified
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New Work Order Modal */}
      {newOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-1">
              Issue Contractor Work Order
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Authorize maintenance or civil repairs at {estate.name}.
            </p>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Category *</label>
                <select
                  value={orderCategory}
                  onChange={(e) => setOrderCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Drainage Clearing">Drainage Channel Clearing</option>
                  <option value="Solar Streetlight Repair">Solar Streetlight Servicing</option>
                  <option value="Road Sub-Base">Road Sub-Base Paving</option>
                  <option value="Security Patrol">Security Access Maintenance</option>
                  <option value="Perimeter Masonry">Perimeter Wall Masonry</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Contractor *</label>
                <input
                  type="text"
                  required
                  value={orderContractor}
                  onChange={(e) => setOrderContractor(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Cost (NGN) *</label>
                <input
                  type="number"
                  required
                  value={orderCost}
                  onChange={(e) => setOrderCost(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold tabular-nums focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Specify exact milestones, location within estate, and deliverables..."
                  value={orderDesc}
                  onChange={(e) => setOrderDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewOrderModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-lg shadow"
                >
                  Dispatch Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
