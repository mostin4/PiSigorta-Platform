import React from 'react';

interface VoteItem {
  proposalId: string | number;
  cid: string;
}

interface VoteHistoryProps {
  votes?: VoteItem[];
  className?: string;
}

export default function VoteHistory({ votes = [], className = '' }: VoteHistoryProps): React.JSX.Element {
  if (!votes || votes.length === 0) {
    return (
      <div className={`p-5 bg-white rounded-xl shadow-md border border-gray-100 ${className}`}>
        <h3 className="font-bold text-gray-800 mb-2 text-base">Geçmiş Oylamalar</h3>
        <p className="text-sm text-gray-500">Henüz kaydedilmiş bir oylama geçmişi bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className={`p-5 bg-white rounded-xl shadow-md border border-gray-100 ${className}`}>
      <h3 className="font-bold text-gray-800 mb-3 text-base">Geçmiş Oylamalar</h3>
      <ul className="divide-y divide-gray-100 text-sm">
        {votes.map(({ proposalId, cid }) => (
          <li key={proposalId} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5">
            <span className="font-medium text-gray-700">Teklif #{proposalId}</span>
            <a 
              href={`https://ipfs.io/ipfs/${cid}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline truncate max-w-[220px] sm:max-w-xs font-mono text-xs"
              title={cid}
            >
              {cid}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
