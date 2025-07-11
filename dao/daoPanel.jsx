import ProposalCard from '../components/ProposalCard';
import daoConfig from './daoConfig.json';

export default function DaoPanel() {
  return (
    <div className="p-4">
      {daoConfig.proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          title={proposal.title}
          description="Topluluk oylamasına açık öneri"
          choices={proposal.choices}
        />
      ))}
    </div>
  );
}
