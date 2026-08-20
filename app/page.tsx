'use client';
import { useState } from 'react';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-fixed text-white relative">
      {/* Auth Modal Popup */}
      <AuthModal />

      {/* Header Container */}
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <h1 className="text-4xl font-extrabold text-red-600 text-center tracking-wider mb-6 drop-shadow-md">
          THEHEROSMP
        </h1>

        {/* Navigation Tabs */}
        <div className="bg-black/80 backdrop-blur border border-gray-800 p-2 rounded-2xl flex justify-between items-center text-xs font-semibold mb-6 shadow-xl">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'home' ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('spin')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'spin' ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            🎰 Spin
          </button>
          <button 
            onClick={() => setActiveTab('social')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'social' ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            Social
          </button>
          <button 
            onClick={() => setActiveTab('rank')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'rank' ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            Rank/Tag
          </button>
          <button 
            onClick={() => setActiveTab('crates')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'crates' ? 'bg-red-600 text-white font-bold' : 'text-gray-300 hover:text-white'}`}
          >
            🎁 Crates
          </button>
        </div>

        {/* Server Info Cards */}
        <div className="space-y-4">
          <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Server Status</h2>
              <span className="text-xl font-extrabold text-red-500">4</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span className="text-green-500 font-bold">● ONLINE</span>
              <span>Players Online</span>
            </div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-1">Java Edition</h3>
            <p className="text-xs text-gray-400 mb-4">IP: amd-9-1.skyraincloud.in:19144</p>
            <button className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 rounded-xl shadow-lg transition">
              COPY JAVA IP
            </button>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 p-5 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-1">Bedrock / PE Edition</h3>
            <p className="text-xs text-gray-400">IP: amd-9-1.skyraincloud.in</p>
            <p className="text-xs text-gray-400 mb-4">Port: 19144</p>
            <button className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 rounded-xl shadow-lg transition">
              COPY BEDROCK IP
            </button>
          </div>

          <div className="bg-gray-900/90 border border-red-900/50 p-5 rounded-2xl shadow-xl space-y-3">
            <h3 className="text-lg font-bold text-red-500 mb-2">👑 Server Owner & Admin</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">👑 Server Owner</span>
              <span className="bg-yellow-600/30 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-xl text-xs font-bold">
                Sriyash Rajesh Pagi
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">🤝 Co-Owner</span>
              <span className="bg-amber-700/30 text-amber-400 border border-amber-600/50 px-3 py-1 rounded-xl text-xs font-bold">
                Dhuruv
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">⚡ Server Admin</span>
              <span className="bg-purple-800/30 text-purple-300 border border-purple-600/50 px-3 py-1 rounded-xl text-xs font-bold">
                Samosa_bhaiya
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
