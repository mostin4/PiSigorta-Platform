export default function VoteConfirmation({ proposalId, choice }) {
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow-md text-center animate-fadeIn">
      ✅ <strong>{proposalId}</strong> için <em>{choice}</em> seçimine oy verdiniz!
    </div>
  );
}
