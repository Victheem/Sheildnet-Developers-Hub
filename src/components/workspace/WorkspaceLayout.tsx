import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { UserRole } from '../../types';
import {
  Shield,
  Building2,
  Briefcase,
  Users,
  DollarSign,
  UserCheck,
  TrendingUp,
  Wrench,
  Cpu,
  Layers,
  ArrowLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';

import { SuperAdminDashboard } from './SuperAdminDashboard';
import { DeveloperAdminDashboard } from './DeveloperAdminDashboard';
import { SalesManagerDashboard } from './SalesManagerDashboard';
import { PropertyAgentDashboard } from './PropertyAgentDashboard';
import { FinanceOfficerDashboard } from './FinanceOfficerDashboard';
import { BuyerPortal } from './BuyerPortal';
import { InvestorPortal } from './InvestorPortal';
import { EstateManagerDashboard } from './EstateManagerDashboard';
import { AIAgentFleetHub } from './AIAgentFleetHub';

export const WorkspaceLayout: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    setCurrentEnvironment,
    setSelectedMarketplaceEstateId,
    activeDeveloperId,
    developers,
    loginDeveloper,
    setActivePage,
  } = usePlatform();

  // Internal tab within the workspace (e.g., standard role view vs AI fleet)
  const [activeWorkspaceView, setActiveWorkspaceView] = useState<'DASHBOARD' | 'AI_FLEET'>('DASHBOARD');

  const currentDev = developers.find((d) => d.id === activeDeveloperId) || developers[0];

  const roleLabels: Record<UserRole, { label: string; icon: any; subtitle: string }> = {
    SUPER_ADMIN: {
      label: 'ShieldNet Super Admin',
      icon: Shield,
      subtitle: 'Platform Oversight & Onboarding',
    },
    DEVELOPER_ADMIN: {
      label: 'Developer Administrator',
      icon: Building2,
      subtitle: `${currentDev.name} HQ`,
    },
    SALES_MANAGER: {
      label: 'Sales Director / Manager',
      icon: Briefcase,
      subtitle: 'Pipeline & Reservations',
    },
    PROPERTY_AGENT: {
      label: 'Field Property Agent',
      icon: Users,
      subtitle: 'Agent Chidi Okafor Desk',
    },
    FINANCE_OFFICER: {
      label: 'Chief Finance Officer',
      icon: DollarSign,
      subtitle: 'Amina Bello Verification Desk',
    },
    BUYER: {
      label: 'Buyer Property Passport',
      icon: UserCheck,
      subtitle: 'Dr. Emeka Nwosu (VV-A03)',
    },
    INVESTOR: {
      label: 'ShieldNet Invest Portfolio',
      icon: TrendingUp,
      subtitle: 'Alhaji Bashir Aliyu Syndicate',
    },
    ESTATE_MANAGER: {
      label: 'Estate Operations Manager',
      icon: Wrench,
      subtitle: 'Velvet Villa Apo Gude Works',
    },
  };

  const activeRoleData = roleLabels[currentRole] || roleLabels.SUPER_ADMIN;
  const RoleIcon = activeRoleData.icon;

  const renderActiveDashboard = () => {
    if (activeWorkspaceView === 'AI_FLEET') {
      return <AIAgentFleetHub />;
    }

    switch (currentRole) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />;
      case 'DEVELOPER_ADMIN':
        return <DeveloperAdminDashboard />;
      case 'SALES_MANAGER':
        return <SalesManagerDashboard />;
      case 'PROPERTY_AGENT':
        return <PropertyAgentDashboard />;
      case 'FINANCE_OFFICER':
        return <FinanceOfficerDashboard />;
      case 'BUYER':
        return <BuyerPortal />;
      case 'INVESTOR':
        return <InvestorPortal />;
      case 'ESTATE_MANAGER':
        return <EstateManagerDashboard />;
      default:
        return <DeveloperAdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Workspace Contextual Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 lg:px-12 py-3 w-full">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedMarketplaceEstateId(null);
                setCurrentEnvironment('MARKETPLACE');
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Marketplace</span>
            </button>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-sky-100 text-sky-800">
                <RoleIcon className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-none">
                  {activeRoleData.label}
                </span>
                <span className="text-[10px] text-slate-500">{activeRoleData.subtitle}</span>
              </div>
            </div>
          </div>

          {/* Developer Dedicated Space Switcher (When DEVELOPER_ADMIN) */}
          {currentRole === 'DEVELOPER_ADMIN' && (
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => loginDeveloper('dev-grandview', 'estate-velvet-villa')}
                  className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                    activeDeveloperId === 'dev-grandview'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Velvet Villa Space
                </button>
                <button
                  onClick={() => loginDeveloper('dev-lovegate', 'estate-love-gate')}
                  className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                    activeDeveloperId === 'dev-lovegate'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Love Gate Space
                </button>
              </div>
              <button
                onClick={() => {
                  setCurrentEnvironment('MARKETPLACE');
                  setActivePage('developer-login');
                }}
                className="text-xs text-slate-500 hover:text-sky-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-slate-100"
                title="Switch Developer Tenant or return to login"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">All Developers</span>
              </button>
            </div>
          )}

          {/* Quick Sub-Navigation (Main Role Dashboard vs AI Fleet Hub) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveWorkspaceView('DASHBOARD')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeWorkspaceView === 'DASHBOARD'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Role Workspace
            </button>
            <button
              onClick={() => setActiveWorkspaceView('AI_FLEET')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeWorkspaceView === 'AI_FLEET'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              <span>AI Agent Fleet (10 Specialised)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Body - Full Screen Width */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        {renderActiveDashboard()}
      </main>
    </div>
  );
};
