import React, { useState } from 'react';
import ProposalCard from '../components/ProposalCard';
import VoteConfirmation from '../components/VoteConfirmation';

interface Proposal {
  id: string | number;
  title: string;
  description: string;
  choices: string[];
}

export default function DaoPage(): React.JSX.Element {
  const [votedChoice, setVotedChoice] = useState<string | null>(null);

  const proposal: Proposal = {
    id: "nft-insurance-001",
    title: "NFT Sigorta Önerisi",
    description: "Pi cüzdanınızdaki NFT varlıklarını kapsayalım mı?",
    choices: ["Evet", "Hayır"]
  };

  const handleVote = async (choice: string) => {
    // Simüle edilmiş oylama veya akıllı kontrat / Snapshot entegrasyonu
    await new Promise((resolve) => setTimeout(resolve, 800));
    setVotedChoice(choice);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">DAO Yönetim Paneli</h1>
      
      {votedChoice ? (
        <VoteConfirmation proposalId={proposal.id} choice={votedChoice} />
      ) : (
        <ProposalCard 
          id={proposal.id}
          title={proposal.title}
          description={proposal.description}
          choices={proposal.choices}
          onVote={handleVote}
        />
      )}
    </div>
  );
}
