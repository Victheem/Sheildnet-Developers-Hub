import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePlatform } from '../../context/PlatformContext';
import {
  Building2,
  ShieldCheck,
  Lock,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  MapPin,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  UserCheck,
} from 'lucide-react';

interface DeveloperLoginPageProps {
  onOpenDeveloperModal: () => void;
}

export const DeveloperLoginPage: React.FC<DeveloperLoginPageProps> = ({
  onOpenDeveloperModal,
}) => {
  const { developers, estates, loginDeveloper, showToast } = usePlatform();

  // Custom Form Login state
  const [selectedDeveloperId, setSelectedDeveloperId] = useState('dev-grandview');
  const [loginEmail, setLoginEmail] = useState('info@grandviewestates.ng');
  const [accessKey, setAccessKey] = useState('SHIELD-SEC-9921-KEY');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Target estates
  const velvetVillaEstate = estates.find((e) => e.id === 'estate-velvet-villa') || estates[0];
  const loveGateEstate = estates.find((e) => e.id === 'estate-love-gate') || estates[1];

  const grandviewDev = developers.find((d) => d.id === 'dev-grandview') || developers[0];
  const loveGateDev = developers.find((d) => d.id === 'dev-lovegate') || developers[1];

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const targetDev = developers.find((d) => d.id === selectedDeveloperId) || grandviewDev;
      const targetEstate = estates.find((e) => e.developerId === targetDev.id);
      loginDeveloper(targetDev.id, targetEstate?.id);
    }, 400);
  };

  const handleDirectLaunch = (developerId: string, estateId: string) => {
    loginDeveloper(developerId, estateId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-slate-50 text-slate-900 pb-24"
    >
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-b border-slate-800 relative overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/src/assets/images/hero_abuja_estate_1794323126147.jpg"
            alt="ShieldNet Developer Portal"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 w-full max-w-5xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3 bg-sky-950/70 px-3.5 py-1.5 rounded-full border border-sky-800">
            <Lock className="w-3.5 h-3.5" />
            <span>Developer Tenant Authentication · Multi-Tenant Isolation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display mb-4">
            Developer Workspace Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Welcome to the ShieldNet developer entrance. Each credentialed real estate development partner accesses their own isolated, private business environment to manage cadastral demarcations, sales pipelines, independent payment reconciliation, and infrastructure progress.
          </p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-10">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
            Dedicated Developer Spaces
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Select Your Estate Development Space
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click below to enter the dedicated private headquarters for each partner estate.
          </p>
        </div>

        {/* Primary 2 Developer Spaces (Velvet Villa & Love Gate Estate) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Velvet Villa, Apo Gude (Grandview Estates Ltd) */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            {/* Visual Header */}
            <div className="relative h-60 bg-slate-900 overflow-hidden">
              <img
                src={velvetVillaEstate.heroImage}
                alt="Velvet Villa Estate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-bold bg-sky-500 text-white px-3 py-1 rounded-md shadow-sm">
                  Live Pilot Space
                </span>
                <span className="text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-md border border-white/20">
                  {grandviewDev.subscriptionPlan} Plan
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Apo Gude, Abuja FCT</span>
                </div>
                <h3 className="text-2xl font-bold font-display">{velvetVillaEstate.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">Developer: {grandviewDev.name}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Plots</span>
                    <strong className="text-lg font-bold text-slate-900 tabular-nums">{velvetVillaEstate.totalPlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Available</span>
                    <strong className="text-lg font-bold text-emerald-600 tabular-nums">{velvetVillaEstate.availablePlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reserved/Sold</span>
                    <strong className="text-lg font-bold text-sky-600 tabular-nums">
                      {velvetVillaEstate.reservedPlots + velvetVillaEstate.soldPlots}
                    </strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>FCDA Verified Cadastral Layout & 48 Demarcated Plots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Independent Two-Officer Payment Reconciliation Desk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Field Viewing Logs & Sales CRM Pipeline</span>
                  </div>
                </div>

                <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-100 text-xs text-slate-600">
                  <span className="font-semibold text-sky-900 block mb-0.5">Authorized Credentials:</span>
                  <span className="font-mono text-slate-700">{grandviewDev.businessEmail}</span>
                </div>
              </div>

              <button
                onClick={() => handleDirectLaunch('dev-grandview', 'estate-velvet-villa')}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:bg-sky-600"
              >
                <span>Enter Velvet Villa Developer Space</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Love Gate Estate (Love Gate Properties Ltd) */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
            {/* Visual Header */}
            <div className="relative h-60 bg-slate-900 overflow-hidden">
              <img
                src={loveGateEstate.heroImage}
                alt="Love Gate Estate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-bold bg-emerald-600 text-white px-3 py-1 rounded-md shadow-sm">
                  Smart Eco-Luxury Space
                </span>
                <span className="text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded-md border border-white/20">
                  {loveGateDev.subscriptionPlan} Plan
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Airport Road Expressway Corridor, Abuja</span>
                </div>
                <h3 className="text-2xl font-bold font-display">{loveGateEstate.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">Developer: {loveGateDev.name}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Plots</span>
                    <strong className="text-lg font-bold text-slate-900 tabular-nums">{loveGateEstate.totalPlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Available</span>
                    <strong className="text-lg font-bold text-emerald-600 tabular-nums">{loveGateEstate.availablePlots}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reserved/Sold</span>
                    <strong className="text-lg font-bold text-sky-600 tabular-nums">
                      {loveGateEstate.reservedPlots + loveGateEstate.soldPlots}
                    </strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Smart Biometric Gatehouse & 36 Demarcated Boundary Parcels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dual-Lane Boulevard Milestone & Solar Reticulation Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exclusive Agent Lead Allocations & Buyer Passport Issuance</span>
                  </div>
                </div>

                <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-100 text-xs text-slate-600">
                  <span className="font-semibold text-sky-900 block mb-0.5">Authorized Credentials:</span>
                  <span className="font-mono text-slate-700">{loveGateDev.businessEmail}</span>
                </div>
              </div>

              <button
                onClick={() => handleDirectLaunch('dev-lovegate', 'estate-love-gate')}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:bg-sky-600"
              >
                <span>Enter Love Gate Estate Developer Space</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Custom Enterprise Credentials Login Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
                <KeyRound className="w-4 h-4" />
                <span>Enterprise Authentication Form</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Sign In with Developer Credentials
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your company's corporate email and security token to route into your private tenant partition.
              </p>
            </div>

            <form onSubmit={handleCustomLogin} className="space-y-5">
              {/* Target Space Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Target Developer Space
                </label>
                <select
                  value={selectedDeveloperId}
                  onChange={(e) => {
                    const devId = e.target.value;
                    setSelectedDeveloperId(devId);
                    if (devId === 'dev-grandview') {
                      setLoginEmail('info@grandviewestates.ng');
                    } else if (devId === 'dev-lovegate') {
                      setLoginEmail('director@lovegateestate.ng');
                    } else if (devId === 'dev-apex') {
                      setLoginEmail('contact@apexurban.com');
                    } else if (devId === 'dev-capital') {
                      setLoginEmail('partnerships@capitalcrest.ng');
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 cursor-pointer"
                >
                  <option value="dev-grandview">Velvet Villa, Apo Gude (Grandview Estates Ltd)</option>
                  <option value="dev-lovegate">Love Gate Estate (Love Gate Properties Ltd)</option>
                  <option value="dev-apex">Cedar Crest, Lekki (Apex Urban Living)</option>
                  <option value="dev-capital">Silver Valley, Guzape (Capital Crest Developers)</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Developer Business Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="e.g. director@lovegateestate.ng"
                />
              </div>

              {/* Password / Access Token */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Workspace Security Token / Key
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Demo token active</span>
                </div>
                <input
                  type="password"
                  required
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                  placeholder="Enter security key"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Authenticating Workspace...</span>
                  ) : (
                    <>
                      <span>Authenticate & Launch Dedicated Space</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Developer Onboarding Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 block mb-1">
              New Property Developer?
            </span>
            <h4 className="text-xl font-bold font-display">
              Onboard Your Estates on ShieldNet Hub
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Experience the power of multi-tenant estate management. Get an isolated enterprise workspace with real-time cadastral inventory sync, field agent coordination, and audited two-officer financial reconciliation.
            </p>
          </div>
          <button
            onClick={onOpenDeveloperModal}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl shadow transition-colors whitespace-nowrap cursor-pointer"
          >
            Apply for Developer Onboarding
          </button>
        </div>
      </div>
    </motion.div>
  );
};
