import React, { useState } from 'react';

interface PolicyViewerProps {
  initialCid?: string;
  className?: string;
}

export default function PolicyViewer({ initialCid = '', className = '' }: PolicyViewerProps): React.JSX.Element {
  const [inputCid, setInputCid] = useState<string>(initialCid);
  const [activeCid, setActiveCid] = useState<string>(initialCid);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCid.trim()) return;
    setActiveCid(inputCid.trim());
    setIsLoading(true);
  };

  return (
    <div className={`p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto my-4 ${className}`}>
      <h3 className="font-bold text-gray-800 mb-4 text-lg">IPFS Poliçe ve Veri Görüntüleyici</h3>
      
      <form onSubmit={handleLoad} className="flex gap-2 mb-4">
        <input 
          type="text"
          value={inputCid}
          onChange={(e) => setInputCid(e.target.value)} 
          placeholder="IPFS CID girin (örn: bafybeig...)" 
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer"
        >
          Görüntüle
        </button>
      </form>

      {activeCid && (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <span className="text-sm text-gray-600 animate-pulse font-medium">IPFS içeriği yükleniyor...</span>
            </div>
          )}
          <iframe
            src={`https://ipfs.io/ipfs/${activeCid}`}
            style={{ width: '100%', height: '500px' }}
            title="IPFS Content Viewer"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setIsLoading(false)}
            className="border-0"
          />
        </div>
      )}
    </div>
  );
}
