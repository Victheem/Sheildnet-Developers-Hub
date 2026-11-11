import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { UserRole } from '../../types';
import {
  Shield,
  Layers,
  ChevronDown,
  Building2,
  Users,
  Briefcase,
  DollarSign,
  UserCheck,
  TrendingUp,
  Wrench,
  ExternalLink,
  Sparkles,
  Maximize2,
  Minimize2,
  Lock,
} from 'lucide-react';

interface NavbarProps {
  onOpenDeveloperModal: () => void;
  activeNavSection: string;
  setActiveNavSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDeveloperModal,
  activeNavSection,
  setActiveNavSection,
}) => {
  const {
    currentEnvironment,
    setCurrentEnvironment,
    currentRole,
    setCurrentRole,
    selectedMarketplaceEstateId,
    setSelectedMarketplaceEstateId,
    developers,
    activeDeveloperId,
    setActiveDeveloperId,
    activePage,
    setActivePage,
    isFullscreen,
    toggleFullscreen,
  } = usePlatform();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; title: string; desc: string; icon: any }[] = [
    {
      role: 'SUPER_ADMIN',
      title: 'ShieldNet Super Admin',
      desc: 'Platform governance, developer approvals & AI controls',
      icon: Shield,
    },
    {
      role: 'DEVELOPER_ADMIN',
      title: 'Developer Admin (Grandview)',
      desc: 'Business HQ, Velvet Villa inventory & operations',
      icon: Building2,
    },
    {
      role: 'SALES_MANAGER',
      title: 'Sales Manager',
      desc: 'Pipeline oversight, lead assignment & reservation approvals',
      icon: Briefcase,
    },
    {
      role: 'PROPERTY_AGENT',
      title: 'Property Agent (Chidi)',
      desc: 'Assigned leads, viewing coordination & reservations',
      icon: Users,
    },
    {
      role: 'FINANCE_OFFICER',
      title: 'Finance Officer (Amina)',
      desc: 'Payment verification, receipt issuance & reconciliation',
      icon: DollarSign,
    },
    {
      role: 'BUYER',
      title: 'Buyer (Dr. Emeka)',
      desc: 'Property Passport ID, allocation status & payment schedule',
      icon: UserCheck,
    },
    {
      role: 'INVESTOR',
      title: 'Investor (Alhaji Bashir)',
      desc: 'Capital contributed, accrued return & distributions',
      icon: TrendingUp,
    },
    {
      role: 'ESTATE_MANAGER',
      title: 'Estate Manager (Kabir)',
      desc: 'Infrastructure progress, contractors & work orders',
      icon: Wrench,
    },
  ];

  const currentRoleInfo = roles.find((r) => r.role === currentRole) || roles[0];

  return (
    <>
      {/* Ecosystem Role Switcher Dock */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 sm:px-8 lg:px-12 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">Platform Mode:</span>
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
              }}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                currentEnvironment === 'MARKETPLACE'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Public Marketplace
            </button>
            <button
              onClick={() => setCurrentEnvironment('WORKSPACE')}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                currentEnvironment === 'WORKSPACE'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Business Workspace
            </button>
          </div>
          <button
            onClick={() => {
              setCurrentEnvironment('MARKETPLACE');
              setSelectedMarketplaceEstateId(null);
              setActivePage('developer-login');
            }}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>Developer Login · Velvet Villa & Love Gate</span>
          </button>
        </div>

        {/* Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            <span className="text-slate-400">Active Persona:</span>
            <span className="font-semibold text-sky-400 flex items-center gap-1.5">
              <currentRoleInfo.icon className="w-3.5 h-3.5" />
              {currentRoleInfo.title}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Role / Authorized Workspace
              </div>
              <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = r.role === currentRole;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        setCurrentRole(r.role);
                        setRoleDropdownOpen(false);
                        setCurrentEnvironment('WORKSPACE');
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${
                        isSelected ? 'bg-sky-50/70 dark:bg-sky-950/30' : ''
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg mt-0.5 ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-semibold ${
                              isSelected
                                ? 'text-sky-600 dark:text-sky-400'
                                : 'text-slate-900 dark:text-slate-200'
                            }`}
                          >
                            {r.title}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 font-medium px-1.5 py-0.5 rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {r.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones, gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 lg:px-12 py-3.5 w-full">
        <div className="w-full flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              setCurrentEnvironment('MARKETPLACE');
              setSelectedMarketplaceEstateId(null);
              setActivePage('home');
              setActiveNavSection('home');
            }}
            className="flex items-center gap-2.5 text-slate-900 hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-sky-600 transition-colors">
              <Shield className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-tight font-display">
                ShieldNet Hub
              </span>
              <span className="text-[10px] text-slate-600 tracking-wider font-semibold block uppercase">
                Property Commerce & Operations
              </span>
            </div>
          </button>

          {/* Zone 2: 5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('home');
                setActiveNavSection('home');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'home' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('estates');
                setActiveNavSection('estates');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'estates' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              Explore Estates
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('properties');
                setActiveNavSection('properties');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'properties' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              Plot Inventory
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('for-developers');
                setActiveNavSection('for-developers');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'for-developers' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              For Developers
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('how-it-works');
                setActiveNavSection('how-it-works');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'how-it-works' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('developer-login');
                setActiveNavSection('developer-login');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activePage === 'developer-login' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>Developer Portal</span>
            </button>
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('about');
                setActiveNavSection('about');
              }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'about' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5'
                  : ''
              }`}
            >
              About ShieldNet
            </button>
          </nav>

          {/* Zone 3: Actions + Full Screen Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Developer Login Action Button */}
            <button
              onClick={() => {
                setCurrentEnvironment('MARKETPLACE');
                setSelectedMarketplaceEstateId(null);
                setActivePage('developer-login');
              }}
              title="Dedicated space login for Velvet Villa & Love Gate Estate developers"
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                activePage === 'developer-login' && currentEnvironment === 'MARKETPLACE' && !selectedMarketplaceEstateId
                  ? 'bg-sky-50 text-sky-700 border-sky-300 ring-2 ring-sky-400/20 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-xs'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Developer Login</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isFullscreen
                  ? 'bg-sky-50 text-sky-700 border-sky-300 ring-2 ring-sky-400/20 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200 shadow-xs'
              }`}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">Exit Full Screen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline">Full Screen</span>
                </>
              )}
            </button>

            {currentEnvironment === 'MARKETPLACE' ? (
              <button
                onClick={() => setCurrentEnvironment('WORKSPACE')}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Workspaces</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentEnvironment('MARKETPLACE');
                  setSelectedMarketplaceEstateId(null);
                  setActivePage('home');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Public Marketplace</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
