import React, { useState } from 'react';

export default function ProposalCard({ title, description, choices }: any) {
  const [selected, setSelected] = useState('');

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto my-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>

      <div className="mt-4 flex flex-col gap-2">
        {choices.map((choice: string) => (
          <button
            key={choice}
            className={`border px-4 py-2 rounded ${
              selected === choice ? 'bg-green-500 text-white' : ''
            }`}
            onClick={() => setSelected(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
