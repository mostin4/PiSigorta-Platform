import React, { useState } from 'react';

interface ProposalCardProps {
  id?: string | number;
  title: string;
  description: string;
  choices: string[];
  onVote?: (choice: string) => Promise<void> | void;
}

export default function ProposalCard({ title, description, choices, onVote }: ProposalCardProps): React.JSX.Element {
  const [selected, setSelected] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!selected || !onVote) return;
    try {
      setIsSubmitting(true);
      await onVote(selected);
    } catch (error) {
      console.error("Oylama hatası:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-lg max-w-md mx-auto my-4 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      <div className="mt-4 flex flex-col gap-2">
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            disabled={isSubmitting}
            className={`border px-4 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
              selected === choice
                ? 'bg-green-500 text-white border-green-500 shadow-sm'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
            }`}
            onClick={() => setSelected(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {onVote && (
        <button
          type="button"
          disabled={!selected || isSubmitting}
          onClick={handleSubmit}
          className={`mt-4 w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors ${
            !selected || isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Oyu Onayla'}
        </button>
      )}
    </div>
  );
}
