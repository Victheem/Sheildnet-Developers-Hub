import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { Building2, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DeveloperOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperOnboardingModal: React.FC<DeveloperOnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { submitDeveloperOnboarding } = usePlatform();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [proposedEstate, setProposedEstate] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState<'Starter' | 'Growth' | 'Professional'>('Growth');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDeveloperOnboarding({
      name: companyName,
      contactPerson,
      businessEmail,
      phone,
      address,
      subscriptionPlan,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Become a ShieldNet Development Partner
              </h3>
              <p className="text-xs text-slate-500">
                Register your estate development business for private workspace onboarding.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Governance Notice */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-6 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Review & Verification Policy:</strong> Registration creates an onboarding application. Access to private developer workspaces and marketplace publishing is activated only after review and credential verification by ShieldNet Super Admin.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Havencrest Properties Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Managing Director / Lead Officer *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Arc. Ibrahim Babangida"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Corporate Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="partnerships@havencrest.ng"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Direct Telephone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+234 803 000 1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Registered Office Address *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Suite 204, Constitution Plaza, Central Area, Abuja FCT"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Proposed First Estate Name & Location
            </label>
            <input
              type="text"
              placeholder="e.g. Haven Gardens, Kado District, Abuja"
              value={proposedEstate}
              onChange={(e) => setProposedEstate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Subscription Tier
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Starter', 'Growth', 'Professional'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSubscriptionPlan(tier)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    subscriptionPlan === tier
                      ? 'border-sky-500 bg-sky-50 text-sky-950 font-semibold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">{tier}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {tier === 'Starter' && '₦75,000/mo'}
                    {tier === 'Growth' && '₦200,000/mo'}
                    {tier === 'Professional' && '₦450,000/mo'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-lg shadow transition-colors"
            >
              Submit Onboarding Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
