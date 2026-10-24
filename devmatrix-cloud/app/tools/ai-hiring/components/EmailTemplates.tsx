'use client';

import React, { useState } from 'react';

interface EmailTemplatesProps {
  candidate: any;
  jobTitle: string;
  onClose: () => void;
}

const TEMPLATES = {
  interview: (name: string, role: string) => `Subject: Interview Invitation: ${role} at [Company Name]

Hi ${name},

Thank you for applying to the ${role} position at [Company Name]. We were impressed by your background and would like to invite you for an interview.

Please let us know your availability for next week.

Best regards,
Hiring Team`,

  rejection: (name: string, role: string) => `Subject: Update on your application for ${role}

Hi ${name},

Thank you for your interest in the ${role} position at [Company Name].

While we were impressed with your skills, we have decided to move forward with other candidates who more closely match our current needs. We will keep your resume on file for future openings.

Best regards,
Hiring Team`,

  offer: (name: string, role: string) => `Subject: Job Offer: ${role} at [Company Name]

Hi ${name},

We are excited to offer you the position of ${role} at [Company Name]!

We were very impressed with your interviews and believe you will be a great addition to our team.

Best regards,
Hiring Team`
};

export default function EmailTemplates({ candidate, jobTitle, onClose }: EmailTemplatesProps) {
  const [type, setType] = useState<'interview' | 'rejection' | 'offer'>('interview');
  const [content, setContent] = useState(TEMPLATES['interview'](candidate.name, jobTitle));
  const [copied, setCopied] = useState(false);

  const handleTypeChange = (newType: 'interview' | 'rejection' | 'offer') => {
    setType(newType);
    setContent(TEMPLATES[newType](candidate.name, jobTitle));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white">Email Candidate: {candidate.name}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {['interview', 'rejection', 'offer'].map((t) => (
              <button
                key={t}
                onClick={() => handleTypeChange(t as any)}
                className={`px-3 py-1.5 text-sm rounded-md capitalize transition-colors ${
                  type === t
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none resize-none text-slate-800 dark:text-slate-200"
          />

          <div className="mt-4 flex justify-end gap-2">
             <button
               onClick={onClose}
               className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800"
             >
               Cancel
             </button>
             <button
               onClick={handleCopy}
               className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm rounded-lg flex items-center gap-2"
             >
               {copied ? (
                 <>
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   Copied!
                 </>
               ) : (
                 <>
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                   Copy to Clipboard
                 </>
               )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
