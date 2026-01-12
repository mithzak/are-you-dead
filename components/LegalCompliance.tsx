
import React from 'react';
import { ScaleIcon, ShieldCheckIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const LegalCompliance: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Legal & Privacy Framework</h2>
        <p className="text-gray-500 text-sm">Ensuring GDPR compliance and liability protection for the MVP release.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <LockClosedIcon className="h-6 w-6" />
            <h3 className="font-bold text-lg">Privacy & Data (GDPR)</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Explicit opt-in for location tracking with clear usage explanation.",
              "Data Minimization: Only store 'Last Known Location', not a movement history.",
              "Right to Erasure: Simple 'Delete Account' button that purges all logs & PII.",
              "Consent logs: Storing timestamps of when TOS/Privacy Policy were accepted."
            ].map((item, i) => (
              <li key={i} className="flex items-start text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2 shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-red-600 mb-4">
            <ScaleIcon className="h-6 w-6" />
            <h3 className="font-bold text-lg">Liability Disclaimer</h3>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-[11px] font-mono text-red-800 uppercase tracking-tighter">
            "THIS APP IS NOT AN EMERGENCY SERVICE. THE USER ACKNOWLEDGES THAT TECHNICAL FAILURES (NETWORK, BATTERY, SERVER ERRORS) MAY PREVENT ALERTS FROM REACHING CONTACTS. THE USER IS SOLELY RESPONSIBLE FOR THEIR SAFETY."
          </div>
          <p className="text-xs text-gray-500 italic">
            This disclaimer must be displayed during onboarding and accessible via settings at all times.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
        <div className="flex items-center space-x-3 mb-4">
          <ShieldCheckIcon className="h-8 w-8 text-amber-600" />
          <h3 className="text-xl font-bold text-amber-900">Zero Authority Integration Rule</h3>
        </div>
        <p className="text-sm text-amber-800 leading-relaxed mb-4">
          To maintain MVP-safe status and avoid extreme legal liability (False Alarm fees, data sharing laws with police), 
          the application <strong>MUST NOT</strong> automatically call emergency services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/50 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-1">Approved Method</h4>
            <p className="text-xs text-amber-800">Use `url_launcher` in Flutter to trigger `tel:112` or `tel:911`. The user must see the dialer and press 'Call' themselves.</p>
          </div>
          <div className="bg-white/50 p-4 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900 mb-1">Prohibited Method</h4>
            <p className="text-xs text-amber-800">Background calling, automatic SMS to police dispatch, or integration with governmental safety APIs.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-3xl text-white">
        <div className="flex items-center space-x-2 mb-4">
          <DocumentTextIcon className="h-6 w-6 text-gray-400" />
          <h3 className="font-bold text-lg">Compliance Audit Checklist</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['GDPR', 'CCPA', 'SOC2 (Future)', 'Apple Privacy'].map(t => (
            <div key={t} className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-center text-xs font-bold text-gray-300">
              {t} Ready
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalCompliance;
