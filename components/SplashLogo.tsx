import React from 'react';

export default function SplashLogo() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-white">
      <img
        src="/logo.svg"
        alt="PiSigorta Logo"
        className="w-28 h-28 mb-4 animate-pulse"
      />
      <h1 className="text-xl font-bold text-indigo-800">PiSigorta Platform</h1>
      <p className="text-sm text-gray-600 mt-2">DAO destekli merkeziyetsiz sigorta</p>
    </div>
  );
}
