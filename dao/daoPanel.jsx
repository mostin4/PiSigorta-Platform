import React from 'react';
import ProposalCard from '../components/ProposalCard';
import daoConfig from './daoConfig.json';
import { submitProposal } from '../services/snapshotService';

interface Proposal {
  id: string;
  title: string;
  body?: string;
  choices: string[];
  start: number;
  end: number;
}

export default function DaoPanel(): React.JSX.Element {
  const handleVote = async (proposalId: string, choice: string) => {
    try {
      console.log(`Teklif (${proposalId}) için oy kullanılıyor: ${choice}`);
      // İsteğe bağlı olarak burada Snapshot veya akıllı kontrat oylama servisi tetiklenebilir
    } catch (error) {
      console.error("Oylama işlemi başarısız:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">DAO Oylama Paneli</h1>
      <div className="grid gap-6">
        {daoConfig.proposals.map((proposal: Proposal) => (
          <ProposalCard
            key={proposal.id}
            id={proposal.id}
            title={proposal.title}
            description={proposal.body || "Topluluk oylamasına açık öneri"}
            choices={proposal.choices}
            onVote={(choice) => handleVote(proposal.id, choice)}
          />
        ))}
      </div>
    </div>
  );
}
