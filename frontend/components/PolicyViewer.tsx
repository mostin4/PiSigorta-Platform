import React, { useState } from 'react';

interface PolicyViewerProps {
  initialCid?: string;
  className?: string;
}

export default function PolicyViewer({ initialCid = '', className = '' }: PolicyViewerProps): React.JSX.Element {
  const [cidInput, setCidInput] = useState<string>(initialCid);
  const [activeCid, setActiveCid] = useState<string>(initialCid);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cidInput.trim()) return;
    setActiveCid(cidInput.trim());
    setIsLoading(true);
  };

  return (
    <div className={`p-6 bg-white rounded-xl shadow-md border border-gray-100 ${className}`}>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={cidInput}
            onChange={(e) => setCidInput(e.target.value)}
            placeholder="IPFS CID gir (örn: bafybeig...)"
            className="border border-gray-300 p-2.5 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Yükle
          </button>
        </div>
      </form>

      {activeCid && (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <span className="text-sm text-gray-600 animate-pulse font-medium">IPFS verisi yükleniyor...</span>
            </div>
          )}
          <iframe
            src={`https://ipfs.io/ipfs/${activeCid}`}
            style={{ width: '100%', height: '600px' }}
            title="IPFS CID Viewer"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setIsLoading(false)}
            className="border-0"
          />
        </div>
      )}
    </div>
  );
}
