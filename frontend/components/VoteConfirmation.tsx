import React from 'react';

interface VoteConfirmationProps {
  proposalId: string | number;
  choice: string;
  className?: string;
}

export default function VoteConfirmation({ 
  proposalId, 
  choice, 
  className = '' 
}: VoteConfirmationProps): React.JSX.Element {
  return (
    <div className={`bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm text-center animate-fadeIn ${className}`}>
      <div className="flex items-center justify-center gap-2 text-green-800 text-sm font-medium">
        <span className="text-base" role="img" aria-label="Success">✅</span>
        <span>
          <strong className="font-semibold">{proposalId}</strong> için <em className="not-italic font-bold text-green-900">"{choice}"</em> seçimine oy verdiniz!
        </span>
      </div>
    </div>
  );
}
