import React, { useState } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { MarketplaceHome } from './components/marketplace/MarketplaceHome';
import { EstateDetailPage } from './components/marketplace/EstateDetailPage';
import { DeveloperOnboardingModal } from './components/marketplace/DeveloperOnboardingModal';
import { WorkspaceLayout } from './components/workspace/WorkspaceLayout';
import { Plot } from './types';

import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { ExploreEstatesPage } from './components/pages/ExploreEstatesPage';
import { PlotInventoryPage } from './components/pages/PlotInventoryPage';
import { ForDevelopersPage } from './components/pages/ForDevelopersPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { DeveloperLoginPage } from './components/pages/DeveloperLoginPage';

const MainAppContent: React.FC = () => {
  const {
    currentEnvironment,
    setCurrentEnvironment,
    selectedMarketplaceEstateId,
    setSelectedMarketplaceEstateId,
    activePage,
    setActivePage,
    isFullscreen,
    toggleFullscreen,
  } = usePlatform();

  const [activeNavSection, setActiveNavSection] = useState('home');
  const [developerModalOpen, setDeveloperModalOpen] = useState(false);

  const handleSelectPlotForEnquiry = (plot: Plot) => {
    setSelectedMarketplaceEstateId(plot.estateId);
  };

  const getPageKey = () => {
    if (currentEnvironment === 'WORKSPACE') return 'workspace-view';
    if (selectedMarketplaceEstateId) return `estate-detail-${selectedMarketplaceEstateId}`;
    return `page-${activePage}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar with Active Persona & Fullscreen Toggle */}
      <Navbar
        onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
        activeNavSection={activeNavSection}
        setActiveNavSection={setActiveNavSection}
      />

      {/* Main Full-Page Multipage View with Smooth Transitions */}
      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={getPageKey()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-[calc(100vh-65px)] flex flex-col"
          >
            {currentEnvironment === 'WORKSPACE' ? (
              <WorkspaceLayout />
            ) : selectedMarketplaceEstateId ? (
              <EstateDetailPage
                estateId={selectedMarketplaceEstateId}
                onBack={() => setSelectedMarketplaceEstateId(null)}
                onSelectPlotForEnquiry={handleSelectPlotForEnquiry}
              />
            ) : activePage === 'developer-login' ? (
              <DeveloperLoginPage
                onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
              />
            ) : activePage === 'estates' ? (
              <ExploreEstatesPage
                onSelectEstate={(estateId) => setSelectedMarketplaceEstateId(estateId)}
                onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
              />
            ) : activePage === 'properties' ? (
              <PlotInventoryPage
                onSelectPlotForEnquiry={handleSelectPlotForEnquiry}
                onSelectEstate={(estateId) => setSelectedMarketplaceEstateId(estateId)}
              />
            ) : activePage === 'for-developers' ? (
              <ForDevelopersPage
                onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
              />
            ) : activePage === 'how-it-works' ? (
              <HowItWorksPage />
            ) : activePage === 'about' ? (
              <AboutUsPage
                onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
              />
            ) : (
              <MarketplaceHome
                onOpenDeveloperModal={() => setDeveloperModalOpen(true)}
                onSelectEstate={(estateId) => setSelectedMarketplaceEstateId(estateId)}
                onSelectPlotForEnquiry={handleSelectPlotForEnquiry}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Developer Onboarding Application Modal */}
      <DeveloperOnboardingModal
        isOpen={developerModalOpen}
        onClose={() => setDeveloperModalOpen(false)}
      />

      {/* Floating Quick Action Full Screen Controller */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleFullscreen}
          className={`px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs font-bold cursor-pointer border ${
            isFullscreen
              ? 'bg-sky-600 text-white border-sky-400 ring-4 ring-sky-500/20'
              : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 ring-2 ring-black/10'
          }`}
          title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen View'}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4 text-sky-200" />
              <span>Exit Full Screen</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 text-sky-400" />
              <span>Full Screen View</span>
            </>
          )}
        </button>
      </div>

      {/* Reactive Feedback Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <MainAppContent />
    </PlatformProvider>
  );
}
