import React, { useState } from 'react';

export default function PolicyViewer() {
  const [cid, setCid] = useState('');
  return (
    <div className="p-4">
      <input
        onChange={(e) => setCid(e.target.value)}
        placeholder="IPFS CID gir"
        className="border p-2 w-full mb-4"
      />
      {cid && (
        <iframe
          src={`https://ipfs.io/ipfs/${cid}`}
          style={{ width: '100%', height: '600px' }}
          title="CID Viewer"
        />
      )}
    </div>
  );
}
