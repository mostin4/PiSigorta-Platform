import React, { useState } from 'react';

export default function PolicyViewer() {
  const [cid, setCid] = useState('');
  return (
    <div>
      <input onChange={(e) => setCid(e.target.value)} placeholder="IPFS CID gir" />
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
