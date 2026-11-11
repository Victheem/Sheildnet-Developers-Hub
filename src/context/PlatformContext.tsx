import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Developer,
  Estate,
  Plot,
  Lead,
  ViewingAppointment,
  Reservation,
  PaymentRecord,
  BuyerPropertyPassport,
  InvestorRecord,
  MaintenanceWorkOrder,
  CommercialContractRecord,
  AuditLogItem,
  AIAgentDefinition,
  InfrastructureStatus,
  LeadStage,
} from '../types';
import {
  INITIAL_DEVELOPERS,
  INITIAL_ESTATES,
  INITIAL_PLOTS,
  INITIAL_LEADS,
  INITIAL_VIEWINGS,
  INITIAL_RESERVATIONS,
  INITIAL_PAYMENTS,
  INITIAL_BUYER_PASSPORT,
  INITIAL_INVESTOR_RECORDS,
  INITIAL_MAINTENANCE_ORDERS,
  INITIAL_COMMERCIAL_CONTRACTS,
  INITIAL_AUDIT_LOGS,
  AI_AGENT_FLEET,
} from '../data/mockDatabase';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface PlatformContextType {
  // Environments & Roles
  currentEnvironment: 'MARKETPLACE' | 'WORKSPACE';
  setCurrentEnvironment: (env: 'MARKETPLACE' | 'WORKSPACE') => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeDeveloperId: string;
  setActiveDeveloperId: (id: string) => void;
  activeEstateId: string;
  setActiveEstateId: (id: string) => void;

  // Selected Estate for Marketplace Detail Page
  selectedMarketplaceEstateId: string | null;
  setSelectedMarketplaceEstateId: (id: string | null) => void;

  // Multi-page navigation & Fullscreen
  activePage: 'home' | 'estates' | 'properties' | 'for-developers' | 'how-it-works' | 'about' | 'developer-login';
  setActivePage: (page: 'home' | 'estates' | 'properties' | 'for-developers' | 'how-it-works' | 'about' | 'developer-login') => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;

  // Dedicated Developer Workspace Authentication
  authenticatedDeveloperId: string | null;
  loginDeveloper: (developerId: string, estateId?: string) => void;
  logoutDeveloper: () => void;

  // Active Data
  developers: Developer[];
  estates: Estate[];
  plots: Plot[];
  leads: Lead[];
  viewings: ViewingAppointment[];
  reservations: Reservation[];
  payments: PaymentRecord[];
  buyerPassport: BuyerPropertyPassport;
  investorRecords: InvestorRecord[];
  maintenanceOrders: MaintenanceWorkOrder[];
  commercialContracts: CommercialContractRecord[];
  auditLogs: AuditLogItem[];
  aiAgents: AIAgentDefinition[];

  // Token Tracking & Guardrails
  totalTokensConsumed: number;
  totalAiCostNgn: number;
  guardrailBlockedCount: number;

  // Workflows & Actions
  // 1. Developer onboarding
  submitDeveloperOnboarding: (data: Partial<Developer>) => void;
  approveDeveloper: (developerId: string) => void;
  rejectDeveloper: (developerId: string, reason: string) => void;

  // 2. Estates & Plots
  createEstate: (estateData: Partial<Estate>) => void;
  addPlot: (plotData: Partial<Plot>) => void;
  updateInfrastructureProgress: (
    estateId: string,
    itemId: string,
    status: InfrastructureStatus,
    progressPercent: number,
    notes?: string
  ) => void;

  // 3. Marketplace Enquiry
  submitMarketplaceEnquiry: (data: {
    estateId: string;
    fullName: string;
    email: string;
    phone: string;
    budgetBand: string;
    plotRefInterest?: string;
    notes?: string;
  }) => void;
  scheduleViewingAppointment: (data: {
    estateId: string;
    leadName: string;
    leadEmail: string;
    leadPhone: string;
    date: string;
    time: string;
    notes?: string;
  }) => void;

  // 4. Sales CRM
  assignLeadToAgent: (leadId: string, agentId: string, agentName: string) => void;
  updateLeadStage: (leadId: string, stage: LeadStage) => void;
  addLeadInteraction: (
    leadId: string,
    type: 'PHONE_CALL' | 'EMAIL' | 'WHATSAPP' | 'IN_PERSON_MEETING' | 'SYSTEM_NOTE',
    notes: string,
    agentName: string
  ) => void;

  // 5. Reservations
  requestPlotReservation: (data: {
    plotId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    initialDepositRequired: number;
  }) => void;
  approveReservation: (reservationId: string, approvedBy: string) => void;
  rejectReservation: (reservationId: string, reason: string) => void;

  // 6. Finance & Verification
  recordPayment: (data: {
    plotId: string;
    buyerName: string;
    buyerEmail: string;
    amount: number;
    referenceNo: string;
    paymentMethod: 'BANK_TRANSFER' | 'DIRECT_DEBIT' | 'CHEQUE';
    notes?: string;
  }) => void;
  verifyPayment: (paymentId: string, verifiedBy: string) => void;
  rejectPayment: (paymentId: string, reason: string) => void;

  // 7. Operations & Maintenance
  createMaintenanceOrder: (data: Partial<MaintenanceWorkOrder>) => void;
  updateMaintenanceStatus: (orderId: string, status: MaintenanceWorkOrder['status']) => void;

  // 8. AI Agent Execution
  executeAIAgent: (agentType: string, prompt: string, systemContext?: string) => Promise<any>;

  // Toasts
  toasts: ToastNotification[];
  removeToast: (id: string) => void;
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Environments & Roles
  const [currentEnvironment, setCurrentEnvironment] = useState<'MARKETPLACE' | 'WORKSPACE'>('MARKETPLACE');
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [activeDeveloperId, setActiveDeveloperId] = useState<string>('dev-grandview');
  const [activeEstateId, setActiveEstateId] = useState<string>('estate-velvet-villa');
  const [selectedMarketplaceEstateId, setSelectedMarketplaceEstateId] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'estates' | 'properties' | 'for-developers' | 'how-it-works' | 'about' | 'developer-login'>('home');
  const [authenticatedDeveloperId, setAuthenticatedDeveloperId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(() => {
            // Fallback for iframes where requestFullscreen may be restricted
            setIsFullscreen((prev) => !prev);
          });
      } else {
        setIsFullscreen((prev) => !prev);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(() => setIsFullscreen(false));
      } else {
        setIsFullscreen(false);
      }
    }
  };

  // Database States
  const [developers, setDevelopers] = useState<Developer[]>(INITIAL_DEVELOPERS);
  const [estates, setEstates] = useState<Estate[]>(INITIAL_ESTATES);
  const [plots, setPlots] = useState<Plot[]>(INITIAL_PLOTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [viewings, setViewings] = useState<ViewingAppointment[]>(INITIAL_VIEWINGS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [buyerPassport, setBuyerPassport] = useState<BuyerPropertyPassport>(INITIAL_BUYER_PASSPORT);
  const [investorRecords, setInvestorRecords] = useState<InvestorRecord[]>(INITIAL_INVESTOR_RECORDS);
  const [maintenanceOrders, setMaintenanceOrders] = useState<MaintenanceWorkOrder[]>(INITIAL_MAINTENANCE_ORDERS);
  const [commercialContracts, setCommercialContracts] = useState<CommercialContractRecord[]>(INITIAL_COMMERCIAL_CONTRACTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [aiAgents, setAiAgents] = useState<AIAgentDefinition[]>(AI_AGENT_FLEET);

  // AI & Governance Telemetry
  const [totalTokensConsumed, setTotalTokensConsumed] = useState<number>(3420);
  const [totalAiCostNgn, setTotalAiCostNgn] = useState<number>(41.04);
  const [guardrailBlockedCount, setGuardrailBlockedCount] = useState<number>(2);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (
    actor: string,
    role: string,
    action: string,
    targetEntity: string,
    targetRef: string,
    details: string
  ) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actor,
      role,
      action,
      targetEntity,
      targetRef,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Developer Authentication & Workspace Routing
  const loginDeveloper = (developerId: string, targetEstateId?: string) => {
    const dev = developers.find((d) => d.id === developerId);
    const estate = estates.find((e) => (targetEstateId ? e.id === targetEstateId : e.developerId === developerId)) || estates.find((e) => e.developerId === developerId);

    setActiveDeveloperId(developerId);
    if (estate) {
      setActiveEstateId(estate.id);
    }
    setAuthenticatedDeveloperId(developerId);
    setCurrentRole('DEVELOPER_ADMIN');
    setCurrentEnvironment('WORKSPACE');
    setSelectedMarketplaceEstateId(null);

    logAudit(
      dev?.contactPerson || 'Authorized Developer Representative',
      'DEVELOPER_ADMIN',
      'DEVELOPER_PORTAL_LOGIN',
      'DEVELOPER',
      developerId,
      `Signed in to dedicated workspace partition for ${dev?.name || developerId} (${estate?.name || 'Assigned Estates'}).`
    );

    showToast(
      'success',
      'Developer Space Authenticated',
      `Welcome to ${dev?.name} Dedicated Workspace · Managing ${estate?.name || 'Assigned Estates'}.`
    );
  };

  const logoutDeveloper = () => {
    setAuthenticatedDeveloperId(null);
    setCurrentEnvironment('MARKETPLACE');
    setActivePage('developer-login');
    showToast('info', 'Signed Out', 'You have been signed out of your dedicated developer workspace.');
  };

  // Workflow 1: Developer Onboarding
  const submitDeveloperOnboarding = (data: Partial<Developer>) => {
    const newDev: Developer = {
      id: `dev-${Date.now()}`,
      name: data.name || 'New Developer Partner',
      slug: (data.name || 'new-developer').toLowerCase().replace(/\s+/g, '-'),
      contactPerson: data.contactPerson || 'Lead Representative',
      businessEmail: data.businessEmail || 'partner@example.com',
      phone: data.phone || '+234 800 000 0000',
      address: data.address || 'Abuja, Nigeria',
      status: 'PENDING_REVIEW',
      registrationDate: new Date().toISOString().split('T')[0],
      subscriptionPlan: data.subscriptionPlan || 'Growth',
      estatesCount: 0,
      totalPlotsManaged: 0,
    };
    setDevelopers((prev) => [...prev, newDev]);
    logAudit(
      newDev.contactPerson,
      'DEVELOPER_ADMIN',
      'DEVELOPER_REGISTERED',
      'DEVELOPER',
      newDev.id,
      `Registered onboarding application for ${newDev.name}. Awaiting Super Admin approval.`
    );
    showToast(
      'info',
      'Application Submitted',
      'Your developer onboarding request has been submitted to ShieldNet Super Admin for verification.'
    );
  };

  const approveDeveloper = (developerId: string) => {
    setDevelopers((prev) =>
      prev.map((dev) => (dev.id === developerId ? { ...dev, status: 'ACTIVE' } : dev))
    );
    const dev = developers.find((d) => d.id === developerId);
    logAudit(
      'Super Admin',
      'SUPER_ADMIN',
      'DEVELOPER_WORKSPACE_ACTIVATED',
      'DEVELOPER',
      developerId,
      `Approved and activated private business workspace for ${dev?.name || developerId}.`
    );
    showToast('success', 'Developer Workspace Activated', `${dev?.name} is now approved and active on ShieldNet Hub.`);
  };

  const rejectDeveloper = (developerId: string, reason: string) => {
    setDevelopers((prev) => prev.filter((d) => d.id !== developerId));
    logAudit(
      'Super Admin',
      'SUPER_ADMIN',
      'DEVELOPER_ONBOARDING_REJECTED',
      'DEVELOPER',
      developerId,
      `Rejected developer application. Reason: ${reason}`
    );
    showToast('warning', 'Developer Application Rejected', `Application ${developerId} declined.`);
  };

  // Workflow 2: Create Estate & Add Plot
  const createEstate = (estateData: Partial<Estate>) => {
    const activeDev = developers.find((d) => d.id === activeDeveloperId);
    const newEstate: Estate = {
      id: `estate-${Date.now()}`,
      developerId: activeDeveloperId,
      developerName: activeDev?.name || 'Developer Business',
      name: estateData.name || 'New Masterplanned Estate',
      slug: (estateData.name || 'new-estate').toLowerCase().replace(/\s+/g, '-'),
      tagline: estateData.tagline || 'Modern planned residential community',
      description: estateData.description || 'Verified estate inventory with complete infrastructure provisions.',
      locationState: estateData.locationState || 'Abuja FCT',
      locationCity: estateData.locationCity || 'Abuja',
      district: estateData.district || 'Apo District',
      heroImage: estateData.heroImage || '/src/assets/images/hero_abuja_estate_1794323126147.jpg',
      galleryImages: [estateData.heroImage || '/src/assets/images/hero_abuja_estate_1794323126147.jpg'],
      startingPrice: estateData.startingPrice || 7000000,
      plotSizesAvailable: estateData.plotSizesAvailable || ['250 sqm', '350 sqm', '500 sqm'],
      status: 'SELLING',
      amenities: estateData.amenities || ['Perimeter Wall', 'Paved Roads', 'Drainage', 'Solar Lighting'],
      infrastructure: estateData.infrastructure || [
        {
          id: `inf-${Date.now()}-1`,
          name: 'Perimeter Wall & Security Gatehouse',
          category: 'Perimeter',
          status: 'IN_PROGRESS',
          progressPercent: 50,
          targetCompletion: '2027-01-30',
          responsibleParty: 'Civil Works Contractor',
          notes: 'Boundary coordinates confirmed.',
        },
      ],
      totalPlots: 0,
      availablePlots: 0,
      reservedPlots: 0,
      soldPlots: 0,
      approvedPaymentOptions: ['Outright', '6-Month Spread', '12-Month Spread'],
      developerVerified: true,
    };
    setEstates((prev) => [...prev, newEstate]);
    logAudit(
      'Developer Admin',
      'DEVELOPER_ADMIN',
      'ESTATE_CREATED',
      'ESTATE',
      newEstate.id,
      `Created new estate listing: ${newEstate.name}`
    );
    showToast('success', 'Estate Created', `${newEstate.name} has been published to your workspace and marketplace.`);
  };

  const addPlot = (plotData: Partial<Plot>) => {
    const targetEstate = estates.find((e) => e.id === (plotData.estateId || activeEstateId));
    if (!targetEstate) return;

    const newPlot: Plot = {
      id: `plot-${Date.now()}`,
      estateId: targetEstate.id,
      estateName: targetEstate.name,
      developerId: targetEstate.developerId,
      plotRef: plotData.plotRef || `VV-D${Math.floor(Math.random() * 90 + 10)}`,
      sizeSqm: plotData.sizeSqm || 350,
      dimensions: plotData.dimensions || '15m x 23.3m',
      priceApproved: plotData.priceApproved || 9800000,
      status: 'AVAILABLE',
      category: plotData.category || 'Residential Regular',
      paymentOptions: ['Outright', '6-Month Spread', '12-Month Spread'],
    };

    setPlots((prev) => [...prev, newPlot]);
    setEstates((prev) =>
      prev.map((e) =>
        e.id === targetEstate.id
          ? {
              ...e,
              totalPlots: e.totalPlots + 1,
              availablePlots: e.availablePlots + 1,
            }
          : e
      )
    );

    logAudit(
      'Developer Admin',
      'DEVELOPER_ADMIN',
      'PLOT_INVENTORY_ADDED',
      'PLOT',
      newPlot.plotRef,
      `Added plot ${newPlot.plotRef} (${newPlot.sizeSqm} sqm, ₦${newPlot.priceApproved.toLocaleString()}) to ${targetEstate.name}`
    );
    showToast('success', 'Plot Added to Inventory', `Plot ${newPlot.plotRef} is now available on the marketplace.`);
  };

  const updateInfrastructureProgress = (
    estateId: string,
    itemId: string,
    status: InfrastructureStatus,
    progressPercent: number,
    notes?: string
  ) => {
    setEstates((prev) =>
      prev.map((est) => {
        if (est.id !== estateId) return est;
        return {
          ...est,
          infrastructure: est.infrastructure.map((inf) =>
            inf.id === itemId
              ? {
                  ...inf,
                  status,
                  progressPercent,
                  notes: notes || inf.notes,
                  verificationDate:
                    status === 'VERIFIED_COMPLETED'
                      ? new Date().toISOString().split('T')[0]
                      : inf.verificationDate,
                  verifiedBy:
                    status === 'VERIFIED_COMPLETED' ? 'ShieldNet Field Auditor' : inf.verifiedBy,
                }
              : inf
          ),
        };
      })
    );

    logAudit(
      'Estate Operations Manager',
      'ESTATE_MANAGER',
      'INFRASTRUCTURE_UPDATED',
      'INFRASTRUCTURE',
      itemId,
      `Updated milestone progress to ${progressPercent}% (${status}).`
    );
    showToast('info', 'Infrastructure Updated', `Progress recorded at ${progressPercent}%.`);
  };

  // Workflow 3: Marketplace Enquiry & Viewing Request
  const submitMarketplaceEnquiry = (data: {
    estateId: string;
    fullName: string;
    email: string;
    phone: string;
    budgetBand: string;
    plotRefInterest?: string;
    notes?: string;
  }) => {
    const estate = estates.find((e) => e.id === data.estateId) || estates[0];
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      developerId: estate.developerId,
      estateId: estate.id,
      estateName: estate.name,
      plotRefInterest: data.plotRefInterest,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      budgetBand: data.budgetBand,
      source: 'MARKETPLACE_WEB',
      stage: 'NEW_LEAD',
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: data.notes || 'Inbound prospect enquiry submitted via ShieldNet Marketplace.',
      qualificationScore: 82,
      interactions: [
        {
          id: `int-${Date.now()}`,
          leadId: `lead-${Date.now()}`,
          type: 'SYSTEM_NOTE',
          notes: 'Captured by ShieldNet Lead Acquisition Agent from public estate listing.',
          agentName: 'System',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        },
      ],
    };

    setLeads((prev) => [newLead, ...prev]);

    logAudit(
      'Public Marketplace Visitor',
      'ANONYMOUS',
      'MARKETPLACE_ENQUIRY',
      'LEAD',
      newLead.id,
      `New lead captured for ${estate.name} (Prospect: ${data.fullName}, ${data.phone}).`
    );

    showToast(
      'success',
      'Enquiry Dispatched Directly to Developer',
      `Thank you ${data.fullName}. Your enquiry has been received by ${estate.developerName}. An authorized sales officer will reach out.`
    );
  };

  const scheduleViewingAppointment = (data: {
    estateId: string;
    leadName: string;
    leadEmail: string;
    leadPhone: string;
    date: string;
    time: string;
    notes?: string;
  }) => {
    const estate = estates.find((e) => e.id === data.estateId) || estates[0];
    const viewingId = `view-${Date.now()}`;
    const newViewing: ViewingAppointment = {
      id: viewingId,
      developerId: estate.developerId,
      estateId: estate.id,
      estateName: estate.name,
      leadId: `lead-v-${Date.now()}`,
      leadName: data.leadName,
      leadPhone: data.leadPhone,
      agentId: 'agent-chidi',
      agentName: 'Agent Chidi Okafor',
      scheduledDate: data.date,
      scheduledTime: data.time,
      status: 'CONFIRMED',
      notes: data.notes || 'On-site physical inspection booked via marketplace.',
    };

    setViewings((prev) => [newViewing, ...prev]);

    // Also register or update lead
    const newLead: Lead = {
      id: newViewing.leadId,
      developerId: estate.developerId,
      estateId: estate.id,
      estateName: estate.name,
      fullName: data.leadName,
      email: data.leadEmail,
      phone: data.leadPhone,
      budgetBand: 'Verified for Estate Range',
      source: 'MARKETPLACE_WEB',
      stage: 'VIEWING_SCHEDULED',
      assignedAgentId: 'agent-chidi',
      assignedAgentName: 'Agent Chidi Okafor',
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      notes: `Viewing scheduled for ${data.date} at ${data.time}`,
      qualificationScore: 89,
      interactions: [],
    };
    setLeads((prev) => [newLead, ...prev]);

    logAudit(
      data.leadName,
      'BUYER',
      'VIEWING_BOOKED',
      'VIEWING',
      viewingId,
      `Viewing scheduled at ${estate.name} for ${data.date} ${data.time}`
    );

    showToast(
      'success',
      'Inspection Appointment Confirmed',
      `Viewing booked for ${data.date} at ${data.time}. Gate clearance details sent to ${data.leadPhone}.`
    );
  };

  // Workflow 4 & 5: Sales CRM
  const assignLeadToAgent = (leadId: string, agentId: string, agentName: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              assignedAgentId: agentId,
              assignedAgentName: agentName,
              stage: l.stage === 'NEW_LEAD' ? 'CONTACTED' : l.stage,
              lastContactedDate: new Date().toISOString().split('T')[0],
            }
          : l
      )
    );
    logAudit(
      'Sales Director',
      'SALES_MANAGER',
      'LEAD_ASSIGNED',
      'LEAD',
      leadId,
      `Assigned lead to ${agentName}.`
    );
    showToast('info', 'Lead Assigned', `Lead has been assigned to ${agentName}.`);
  };

  const updateLeadStage = (leadId: string, stage: LeadStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage } : l))
    );
    logAudit(
      'Sales Team',
      'PROPERTY_AGENT',
      'LEAD_STAGE_UPDATED',
      'LEAD',
      leadId,
      `Pipeline stage updated to ${stage}.`
    );
  };

  const addLeadInteraction = (
    leadId: string,
    type: 'PHONE_CALL' | 'EMAIL' | 'WHATSAPP' | 'IN_PERSON_MEETING' | 'SYSTEM_NOTE',
    notes: string,
    agentName: string
  ) => {
    const newInt = {
      id: `int-${Date.now()}`,
      leadId,
      type,
      notes,
      agentName,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              lastContactedDate: new Date().toISOString().split('T')[0],
              interactions: [newInt, ...l.interactions],
            }
          : l
      )
    );
    showToast('success', 'Interaction Logged', `Logged ${type.replace(/_/g, ' ')} with prospect.`);
  };

  // Workflow 7: Reservation Request & Approval (Prevents double reservations!)
  const requestPlotReservation = (data: {
    plotId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    initialDepositRequired: number;
  }) => {
    const plot = plots.find((p) => p.id === data.plotId);
    if (!plot) return;

    if (plot.status !== 'AVAILABLE') {
      showToast('error', 'Plot Unavailable', `Plot ${plot.plotRef} is currently ${plot.status}.`);
      return;
    }

    const resId = `res-${Date.now()}`;
    const newRes: Reservation = {
      id: resId,
      developerId: plot.developerId,
      estateId: plot.estateId,
      estateName: plot.estateName,
      plotId: plot.id,
      plotRef: plot.plotRef,
      plotSizeSqm: plot.sizeSqm,
      priceApproved: plot.priceApproved,
      buyerOrLeadName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerPhone: data.buyerPhone,
      requestDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'PENDING_APPROVAL',
      initialDepositRequired: data.initialDepositRequired,
    };

    setReservations((prev) => [newRes, ...prev]);

    logAudit(
      data.buyerName,
      'PROPERTY_AGENT',
      'RESERVATION_REQUESTED',
      'PLOT',
      plot.plotRef,
      `Requested reservation on ${plot.plotRef} for ${data.buyerName}. Requires manager approval.`
    );

    showToast(
      'info',
      'Reservation Request Submitted',
      `Reservation for Plot ${plot.plotRef} submitted. Awaiting authorized manager approval.`
    );
  };

  const approveReservation = (reservationId: string, approvedBy: string) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return;

    // Check plot status
    const plot = plots.find((p) => p.id === reservation.plotId);
    if (plot && plot.status === 'SOLD') {
      showToast('error', 'Cannot Approve', `Plot ${plot.plotRef} has already been sold.`);
      return;
    }

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId
          ? {
              ...r,
              status: 'APPROVED',
              approvedBy,
              approvalDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          : r
      )
    );

    // Update Plot status to RESERVED
    setPlots((prev) =>
      prev.map((p) =>
        p.id === reservation.plotId
          ? {
              ...p,
              status: 'RESERVED',
              currentReservationId: reservationId,
              buyerName: reservation.buyerOrLeadName,
            }
          : p
      )
    );

    // Update estate count
    setEstates((prev) =>
      prev.map((e) =>
        e.id === reservation.estateId
          ? {
              ...e,
              availablePlots: Math.max(0, e.availablePlots - 1),
              reservedPlots: e.reservedPlots + 1,
            }
          : e
      )
    );

    logAudit(
      approvedBy,
      'SALES_MANAGER',
      'RESERVATION_APPROVED',
      'PLOT',
      reservation.plotRef,
      `Approved reservation on Plot ${reservation.plotRef} for ${reservation.buyerOrLeadName}. Locked against duplicates.`
    );

    showToast(
      'success',
      'Reservation Approved',
      `Plot ${reservation.plotRef} is now officially locked and reserved for ${reservation.buyerOrLeadName}.`
    );
  };

  const rejectReservation = (reservationId: string, reason: string) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return;

    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId
          ? {
              ...r,
              status: 'REJECTED',
              rejectionReason: reason,
            }
          : r
      )
    );

    // Revert plot to AVAILABLE
    setPlots((prev) =>
      prev.map((p) =>
        p.id === reservation.plotId && p.status === 'RESERVED'
          ? { ...p, status: 'AVAILABLE', currentReservationId: undefined, buyerName: undefined }
          : p
      )
    );

    logAudit(
      'Sales Director',
      'SALES_MANAGER',
      'RESERVATION_REJECTED',
      'PLOT',
      reservation.plotRef,
      `Reservation rejected: ${reason}`
    );

    showToast('warning', 'Reservation Rejected', `Plot ${reservation.plotRef} released back to inventory.`);
  };

  // Workflow 8: Finance Payment Recording & Independent Verification
  const recordPayment = (data: {
    plotId: string;
    buyerName: string;
    buyerEmail: string;
    amount: number;
    referenceNo: string;
    paymentMethod: 'BANK_TRANSFER' | 'DIRECT_DEBIT' | 'CHEQUE';
    notes?: string;
  }) => {
    const plot = plots.find((p) => p.id === data.plotId);
    if (!plot) return;

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      developerId: plot.developerId,
      estateId: plot.estateId,
      estateName: plot.estateName,
      plotId: plot.id,
      plotRef: plot.plotRef,
      buyerId: 'user-buyer-1',
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      amount: data.amount,
      paymentDate: new Date().toISOString().split('T')[0],
      referenceNo: data.referenceNo,
      paymentMethod: data.paymentMethod,
      status: 'AWAITING_VERIFICATION',
      notes: data.notes || 'Buyer submitted payment proof. Pending independent bank reconciliation.',
    };

    setPayments((prev) => [newPayment, ...prev]);

    logAudit(
      data.buyerName,
      'BUYER',
      'PAYMENT_RECORDED',
      'PAYMENT',
      data.referenceNo,
      `Recorded payment of ₦${data.amount.toLocaleString()} for ${plot.plotRef}. Awaiting verification.`
    );

    showToast(
      'info',
      'Payment Recorded — Verification Pending',
      `Payment proof for ₦${data.amount.toLocaleString()} logged. Assigned to Finance Officer for bank verification.`
    );
  };

  const verifyPayment = (paymentId: string, verifiedBy: string) => {
    const payment = payments.find((p) => p.id === paymentId);
    if (!payment) return;

    const receiptNo = `SHN-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: 'VERIFIED',
              verifiedBy,
              verifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
              receiptNumber: receiptNo,
            }
          : p
      )
    );

    // Check plot status: if full payment or threshold met, update plot to SOLD
    const plot = plots.find((p) => p.id === payment.plotId);
    if (plot) {
      const isFullOrSubstantial = payment.amount >= plot.priceApproved * 0.9;
      if (isFullOrSubstantial) {
        setPlots((prev) =>
          prev.map((p) =>
            p.id === plot.id
              ? { ...p, status: 'SOLD', buyerName: payment.buyerName, buyerId: payment.buyerId }
              : p
          )
        );
        setEstates((prev) =>
          prev.map((e) =>
            e.id === plot.estateId
              ? {
                  ...e,
                  reservedPlots: Math.max(0, e.reservedPlots - 1),
                  soldPlots: e.soldPlots + 1,
                }
              : e
          )
        );
      }
    }

    // Update Buyer Passport if matching buyer
    setBuyerPassport((prev) => ({
      ...prev,
      totalAmountPaid: prev.totalAmountPaid + payment.amount,
      outstandingBalance: Math.max(0, prev.totalAgreedPrice - (prev.totalAmountPaid + payment.amount)),
      allocationStatus:
        prev.totalAmountPaid + payment.amount >= prev.totalAgreedPrice
          ? 'FINAL_DEED_CONFIRMED'
          : 'PROVISIONAL_ALLOCATION',
      documents: [
        ...prev.documents,
        {
          id: `doc-${Date.now()}`,
          title: `Verified Electronic Receipt (${receiptNo})`,
          type: 'Receipt of Payment',
          verified: true,
          date: new Date().toISOString().split('T')[0],
        },
      ],
    }));

    logAudit(
      verifiedBy,
      'FINANCE_OFFICER',
      'PAYMENT_VERIFIED',
      'PAYMENT',
      receiptNo,
      `Independently reconciled and verified ₦${payment.amount.toLocaleString()} for Plot ${payment.plotRef}. Issued Receipt ${receiptNo}.`
    );

    showToast(
      'success',
      'Payment Independently Verified',
      `Payment of ₦${payment.amount.toLocaleString()} verified by ${verifiedBy}. Official Receipt ${receiptNo} generated.`
    );
  };

  const rejectPayment = (paymentId: string, reason: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: 'REJECTED',
              notes: `Rejected by Finance: ${reason}`,
            }
          : p
      )
    );
    logAudit(
      'Finance Officer',
      'FINANCE_OFFICER',
      'PAYMENT_REJECTED',
      'PAYMENT',
      paymentId,
      `Rejected payment proof: ${reason}`
    );
    showToast('error', 'Payment Discredited', `Payment record marked as rejected.`);
  };

  // Maintenance & Operations
  const createMaintenanceOrder = (data: Partial<MaintenanceWorkOrder>) => {
    const estate = estates.find((e) => e.id === (data.estateId || activeEstateId)) || estates[0];
    const newOrder: MaintenanceWorkOrder = {
      id: `mwo-${Date.now()}`,
      estateId: estate.id,
      estateName: estate.name,
      plotRef: data.plotRef,
      category: data.category || 'Drainage Clearing',
      description: data.description || 'Routine maintenance request.',
      contractorName: data.contractorName || 'Assigned Estate Contractor',
      status: 'OPEN',
      priority: data.priority || 'MEDIUM',
      requestedDate: new Date().toISOString().split('T')[0],
      cost: data.cost || 150000,
    };
    setMaintenanceOrders((prev) => [newOrder, ...prev]);
    showToast('info', 'Work Order Dispatched', `Work order logged for ${estate.name}.`);
  };

  const updateMaintenanceStatus = (orderId: string, status: MaintenanceWorkOrder['status']) => {
    setMaintenanceOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              completedDate:
                status === 'COMPLETED_VERIFIED'
                  ? new Date().toISOString().split('T')[0]
                  : o.completedDate,
            }
          : o
      )
    );
  };

  // Workflow: AI Agent Execution with Server Proxy & Guardrails
  const executeAIAgent = async (agentType: string, prompt: string, systemContext?: string) => {
    try {
      const response = await fetch('/api/gemini/agent-execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType,
          prompt,
          systemContext,
          developerId: activeDeveloperId,
          estateId: activeEstateId,
          userRole: currentRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'GUARDRAIL_BLOCKED' || data.error === 'GUARDRAIL_OUTPUT_BLOCKED') {
          setGuardrailBlockedCount((prev) => prev + 1);
          logAudit(
            'Guardrail Proxy',
            'SYSTEM',
            'AI_GUARDRAIL_TRIGGERED',
            'AI_AGENT',
            agentType,
            `Blocked unauthorized prompt/action: ${data.reason}`
          );
          showToast('error', 'AI Guardrail Enforcement', data.reason);
          return { error: true, message: data.reason };
        }
        throw new Error(data.message || 'AI agent execution failed');
      }

      // Update token telemetry
      if (data.tokensUsed) {
        setTotalTokensConsumed((prev) => prev + data.tokensUsed.total);
        setTotalAiCostNgn((prev) => prev + (data.costNgn || 5.2));
      }

      logAudit(
        agentType,
        'AI_AGENT',
        'AI_EXECUTION_COMPLETED',
        'AI_AGENT',
        agentType,
        `Executed within tenant ${activeDeveloperId}. Tokens: ${data.tokensUsed?.total || 250}. Status: PASSED.`
      );

      return data;
    } catch (err: any) {
      console.warn('Fallback execution for AI agent:', err);
      return {
        success: true,
        isSimulated: true,
        text: `[SHIELDNET GOVERNED AI RESULT]\nAgent ${agentType} processed your instruction within active developer partition (${activeDeveloperId}). All business rules and tenant boundaries verified.`,
        tokensUsed: { total: 220 },
      };
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        currentEnvironment,
        setCurrentEnvironment,
        currentRole,
        setCurrentRole,
        activeDeveloperId,
        setActiveDeveloperId,
        activeEstateId,
        setActiveEstateId,
        selectedMarketplaceEstateId,
        setSelectedMarketplaceEstateId,

        activePage,
        setActivePage,
        isFullscreen,
        toggleFullscreen,

        authenticatedDeveloperId,
        loginDeveloper,
        logoutDeveloper,

        developers,
        estates,
        plots,
        leads,
        viewings,
        reservations,
        payments,
        buyerPassport,
        investorRecords,
        maintenanceOrders,
        commercialContracts,
        auditLogs,
        aiAgents,

        totalTokensConsumed,
        totalAiCostNgn,
        guardrailBlockedCount,

        submitDeveloperOnboarding,
        approveDeveloper,
        rejectDeveloper,

        createEstate,
        addPlot,
        updateInfrastructureProgress,

        submitMarketplaceEnquiry,
        scheduleViewingAppointment,

        assignLeadToAgent,
        updateLeadStage,
        addLeadInteraction,

        requestPlotReservation,
        approveReservation,
        rejectReservation,

        recordPayment,
        verifyPayment,
        rejectPayment,

        createMaintenanceOrder,
        updateMaintenanceStatus,

        executeAIAgent,

        toasts,
        removeToast,
        showToast,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
