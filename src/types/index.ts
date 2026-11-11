export type UserRole =
  | 'SUPER_ADMIN'
  | 'DEVELOPER_ADMIN'
  | 'SALES_MANAGER'
  | 'PROPERTY_AGENT'
  | 'FINANCE_OFFICER'
  | 'BUYER'
  | 'INVESTOR'
  | 'ESTATE_MANAGER';

export type PlotStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

export type LeadStage =
  | 'NEW_LEAD'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'VIEWING_SCHEDULED'
  | 'VIEWING_COMPLETED'
  | 'NEGOTIATION'
  | 'RESERVATION_REQUESTED'
  | 'RESERVATION_APPROVED'
  | 'PAYMENT_CONFIRMED'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export type InfrastructureStatus =
  | 'PLANNED'
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED_AWAITING_VERIFICATION'
  | 'VERIFIED_COMPLETED'
  | 'DELAYED';

export interface Developer {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  contactPerson: string;
  businessEmail: string;
  phone: string;
  address: string;
  status: 'ACTIVE' | 'PENDING_REVIEW' | 'SUSPENDED';
  registrationDate: string;
  subscriptionPlan: 'Starter' | 'Growth' | 'Professional' | 'Enterprise';
  estatesCount: number;
  totalPlotsManaged: number;
}

export interface InfrastructureItem {
  id: string;
  name: string;
  category: 'Roads' | 'Electricity' | 'Water' | 'Drainage' | 'Perimeter' | 'Security' | 'Street Lighting' | 'Landscaping';
  status: InfrastructureStatus;
  progressPercent: number;
  targetCompletion: string;
  responsibleParty: string;
  verifiedBy?: string;
  verificationDate?: string;
  notes: string;
}

export interface Estate {
  id: string;
  developerId: string;
  developerName: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  locationState: string;
  locationCity: string;
  district: string;
  heroImage: string;
  galleryImages: string[];
  startingPrice: number;
  plotSizesAvailable: string[];
  status: 'SELLING' | 'SOLD_OUT' | 'COMING_SOON';
  amenities: string[];
  infrastructure: InfrastructureItem[];
  totalPlots: number;
  availablePlots: number;
  reservedPlots: number;
  soldPlots: number;
  approvedPaymentOptions: string[];
  developerVerified: boolean;
}

export interface Plot {
  id: string;
  estateId: string;
  estateName: string;
  developerId: string;
  plotRef: string; // e.g. VV-A01
  sizeSqm: number; // 250, 350, 500
  dimensions: string; // e.g. "15m x 23.3m"
  priceApproved: number; // 7,000,000, 9,800,000, 14,000,000
  status: PlotStatus;
  category: 'Residential Regular' | 'Residential Corner Piece' | 'Commercial Boulevard';
  paymentOptions: string[];
  currentReservationId?: string;
  buyerName?: string;
  buyerId?: string;
}

export interface LeadInteraction {
  id: string;
  leadId: string;
  type: 'PHONE_CALL' | 'EMAIL' | 'WHATSAPP' | 'IN_PERSON_MEETING' | 'SYSTEM_NOTE';
  notes: string;
  agentName: string;
  date: string;
}

export interface Lead {
  id: string;
  developerId: string;
  estateId: string;
  estateName: string;
  plotRefInterest?: string;
  fullName: string;
  email: string;
  phone: string;
  budgetBand: string;
  source: 'MARKETPLACE_WEB' | 'DIRECT_REFERRAL' | 'AGENT_OUTREACH' | 'CAMPAIGN';
  stage: LeadStage;
  assignedAgentId?: string;
  assignedAgentName?: string;
  createdDate: string;
  lastContactedDate?: string;
  notes: string;
  interactions: LeadInteraction[];
  qualificationScore?: number;
}

export interface ViewingAppointment {
  id: string;
  developerId: string;
  estateId: string;
  estateName: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  agentId: string;
  agentName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}

export interface Reservation {
  id: string;
  developerId: string;
  estateId: string;
  estateName: string;
  plotId: string;
  plotRef: string;
  plotSizeSqm: number;
  priceApproved: number;
  buyerOrLeadName: string;
  buyerEmail: string;
  buyerPhone: string;
  requestDate: string;
  expiryDate: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
  initialDepositRequired: number;
}

export interface PaymentRecord {
  id: string;
  developerId: string;
  estateId: string;
  estateName: string;
  plotId: string;
  plotRef: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  amount: number;
  paymentDate: string;
  referenceNo: string;
  paymentMethod: 'BANK_TRANSFER' | 'DIRECT_DEBIT' | 'CHEQUE';
  status: 'AWAITING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  verifiedBy?: string;
  verifiedDate?: string;
  receiptNumber?: string;
  notes?: string;
}

export interface BuyerPropertyPassport {
  passportId: string; // e.g. SHN-ABJ-VV-2026-084
  buyerName: string;
  buyerEmail: string;
  estateId: string;
  estateName: string;
  plotRef: string;
  plotSizeSqm: number;
  allocationStatus: 'PROVISIONAL_ALLOCATION' | 'FINAL_DEED_CONFIRMED';
  purchaseDate: string;
  totalAgreedPrice: number;
  totalAmountPaid: number;
  outstandingBalance: number;
  nextInstallmentDate?: string;
  documents: {
    id: string;
    title: string;
    type: 'Deed of Partition' | 'Receipt of Payment' | 'Survey Plan' | 'Allocation Letter';
    verified: boolean;
    date: string;
  }[];
}

export interface InvestorRecord {
  id: string;
  investorName: string;
  investorEmail: string;
  projectId: string;
  projectTitle: string;
  capitalContributed: number;
  projectedReturnRate: number; // e.g. 24%
  accruedReturn: number;
  realizedProfit: number;
  distributedProfit: number;
  outstandingDistribution: number;
  investmentDate: string;
  maturityDate: string;
  status: 'ACTIVE' | 'MATURED' | 'CLOSED';
}

export interface MaintenanceWorkOrder {
  id: string;
  estateId: string;
  estateName: string;
  plotRef?: string;
  category: 'Drainage Clearing' | 'Solar Streetlight Repair' | 'Road Sub-Base' | 'Security Patrol' | 'Perimeter Masonry';
  description: string;
  contractorName: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED_VERIFIED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  requestedDate: string;
  completedDate?: string;
  cost: number;
}

export interface CommercialContractRecord {
  id: string;
  developerName: string;
  revenueStream: 'Setup & Onboarding Fee' | 'Monthly SaaS Subscription' | 'Technology License' | 'AI Usage Package' | 'Authorised Sales Commission';
  invoicedAmount: number;
  collectedAmount: number;
  outstandingAmount: number;
  projectedAnnualValue: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  date: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  targetEntity: string;
  targetRef: string;
  details: string;
}

export interface AIAgentDefinition {
  id: string;
  name: string;
  category: 'Sales' | 'Finance' | 'Operations' | 'Intelligence';
  roleDescription: string;
  governanceRules: string[];
  tokenCostPerRun: number;
  active: boolean;
}
