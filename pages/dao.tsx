import ProposalCard from '../components/ProposalCard';

export default function DaoPage() {
  const proposal = {
    title: "NFT Sigorta Önerisi",
    description: "Pi cüzdanınızdaki NFT varlıklarını kapsayalım mı?",
    choices: ["Evet", "Hayır"]
  };

  return (
    <ProposalCard {...proposal} />
  );
}
