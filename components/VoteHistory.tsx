export default function VoteHistory({ votes }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold mb-2">Geçmiş Oylamalar</h3>
      <ul className="text-sm">
        {votes.map(({ proposalId, cid }) => (
          <li key={proposalId}>
            <strong>{proposalId}</strong> –{" "}
            <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" className="text-blue-600 underline">
              {cid}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
