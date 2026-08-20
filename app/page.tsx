'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-fixed bg-center text-white font-sans p-4 relative">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center tracking-wider drop-shadow-md">
          <span className="text-red-600">THEHERO</span>
          <span className="text-white">SMP</span>
        </h1>

        {/* Navigation Bar */}
        <div className="bg-black/80 backdrop-blur-md border border-gray-800 p-1.5 rounded-2xl flex justify-between items-center text-xs font-semibold shadow-2xl">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'home' ? 'bg-red-600 text-white font-bold' : 'text-gray-300'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('spin')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1 ${activeTab === 'spin' ? 'bg-red-600 text-white font-bold' : 'text-gray-300'}`}
          >
            🎡 Spin
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'social' ? 'bg-red-600 text-white font-bold' : 'text-gray-300'}`}
          >
            Social
          </button>
          <button
            onClick={() => setActiveTab('rank')}
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'rank' ? 'bg-red-600 text-white font-bold' : 'text-gray-300'}`}
          >
            Ranks
          </button>
          <button
            onClick={() => setActiveTab('crates')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1 ${activeTab === 'crates' ? 'bg-red-600 text-white font-bold' : 'text-gray-300'}`}
          >
            🎁 Crates
          </button>
        </div>

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <div className="bg-black/75 backdrop-blur border border-gray-800 p-5 rounded-2xl shadow-2xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">Server Status</h2>
                <span className="text-xl font-extrabold text-red-500">4</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="text-green-500 font-bold">● ONLINE</span>
                <span>Players Online</span>
              </div>
            </div>

            <div className="bg-black/75 backdrop-blur border border-gray-800 p-5 rounded-2xl shadow-2xl">
              <h3 className="text-lg font-bold mb-1">Java Edition</h3>
              <p className="text-xs text-gray-400 mb-4">IP: amd-9-1.skyraincloud.in:19144</p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition">
                COPY JAVA IP
              </button>
            </div>

            <div className="bg-black/75 backdrop-blur border border-gray-800 p-5 rounded-2xl shadow-2xl">
              <h3 className="text-lg font-bold mb-1">Bedrock / PE Edition</h3>
              <p className="text-xs text-gray-400">IP: amd-9-1.skyraincloud.in</p>
              <p className="text-xs text-gray-400 mb-4">Port: 19144</p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition">
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SPIN */}
        {activeTab === 'spin' && (
          <div className="bg-black/80 backdrop-blur border border-gray-800 p-6 rounded-3xl text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold text-red-500 flex items-center justify-center gap-2">
              🎡 Daily Reward Wheel
            </h2>
            <p className="text-xs text-gray-400">Enter Gamertag & Spin every 24 Hours for free rewards!</p>
            
            <input
              type="text"
              placeholder="Enter Minecraft Gamertag"
              className="w-full bg-black/60 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none"
            />
            <input
              type="text"
              placeholder="Referral Code (Optional - Get 1 Extra Spin)"
              className="w-full bg-black/60 border border-amber-500/60 rounded-xl p-3 text-sm focus:outline-none text-amber-300"
            />
            <input
              type="password"
              placeholder="Admin Passcode (Optional)"
              className="w-full bg-black/60 border border-gray-700 rounded-xl p-3 text-sm focus:outline-none"
            />

            <div className="py-4 flex justify-center">
              <div className="w-56 h-56 rounded-full border-4 border-red-600 bg-gradient-to-r from-green-500 via-yellow-500 via-blue-500 to-purple-500 flex items-center justify-center font-bold text-black shadow-2xl">
                WHEEL
              </div>
            </div>

            <button className="w-full bg-slate-700 text-gray-300 font-bold py-3 rounded-xl">
              SPIN AGAIN IN 24H ⏳
            </button>
          </div>
        )}

        {/* TAB 3: SOCIAL */}
        {activeTab === 'social' && (
          <div className="bg-black/80 backdrop-blur border border-gray-800 p-6 rounded-3xl text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Join Our Community</h2>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
              JOIN DISCORD SERVER 💬
            </button>
            <button className="w-full bg-pink-600 hover:bg-pink-700 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
              FOLLOW INSTAGRAM PROFILE 📸
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
              JOIN INSTAGRAM GROUP CHAT 💬
            </button>
          </div>
        )}

        {/* TAB 4: RANKS & TAGS */}
        {activeTab === 'rank' && (
          <div className="space-y-4">
            {/* VIP Rank */}
            <div className="bg-black/60 backdrop-blur border border-amber-500/70 p-5 rounded-2xl relative shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-amber-400">VIP Rank</span>
                <span className="text-xl font-extrabold text-white">₹200</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition">
                BUY VIA DISCORD 🛒
              </button>
            </div>

            {/* VIP++ Rank */}
            <div className="bg-black/60 backdrop-blur border border-yellow-500/70 p-5 rounded-2xl relative shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-yellow-400">VIP++ Rank</span>
                <span className="text-xl font-extrabold text-white">₹280</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition">
                BUY VIA DISCORD 🛒
              </button>
            </div>

            {/* MVP Rank */}
            <div className="bg-black/60 backdrop-blur border border-blue-500/70 p-5 rounded-2xl relative shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-blue-400">MVP Rank</span>
                <span className="text-xl font-extrabold text-white">₹190</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition">
                BUY VIA DISCORD 🛒
              </button>
            </div>

            {/* MVP++ Rank */}
            <div className="bg-black/60 backdrop-blur border border-purple-500/70 p-5 rounded-2xl relative shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-purple-400">MVP++ Rank</span>
                <span className="text-xl font-extrabold text-white">₹240</span>
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition">
                BUY VIA DISCORD 🛒
              </button>
            </div>

            {/* Tags Section */}
            <div className="pt-4 space-y-3">
              <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                🎮 Playable Tags (Free)
              </h3>
              
              <div className="bg-black/80 border border-green-600/50 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-green-500">OG_BUILDER</div>
                  <div className="text-xs text-gray-400">Earnable in-game</div>
                </div>
                <span className="border border-green-500 text-green-400 text-xs px-3 py-1 rounded-lg">PLAYABLE</span>
              </div>

              <div className="bg-black/80 border border-green-600/50 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-green-500">ADVANCED BUILDER</div>
                  <div className="text-xs text-gray-400">Earnable in-game</div>
                </div>
                <span className="border border-green-500 text-green-400 text-xs px-3 py-1 rounded-lg">PLAYABLE</span>
              </div>

              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 pt-2">
                💎 Buyable Tags
              </h3>

              <div className="bg-black/80 border border-red-600/50 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-red-500">GAREEB Tag</div>
                    <div className="text-xs text-gray-400">Validity: 1 MONTH</div>
                  </div>
                  <span className="text-xl font-bold">₹100</span>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs transition">
                  BUY TAG VIA DISCORD 🛒
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CRATES */}
        {activeTab === 'crates' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Master Crate */}
              <div className="bg-black/80 border border-yellow-500/70 p-3 rounded-2xl text-center space-y-1">
                <div className="text-yellow-400 font-bold text-sm">Master Crate</div>
                <div className="text-lg font-extrabold">₹150</div>
                <div className="text-xs text-gray-400">7 Keys included</div>
              </div>

              {/* God Crate */}
              <div className="bg-black/80 border border-purple-500/70 p-3 rounded-2xl text-center space-y-1">
                <div className="text-purple-400 font-bold text-sm">God Crate</div>
                <div className="text-lg font-extrabold">₹450</div>
                <div className="text-xs text-gray-400">7 Keys included</div>
              </div>

              {/* Spawner Crate */}
              <div className="bg-black/80 border border-blue-500/70 p-3 rounded-2xl text-center space-y-1">
                <div className="text-blue-400 font-bold text-sm">Spawner Crate</div>
                <div className="text-lg font-extrabold">₹220</div>
                <div className="text-xs text-gray-400">7 Keys included</div>
              </div>

              {/* Silver Crate */}
              <div className="bg-black/80 border border-gray-500/70 p-3 rounded-2xl text-center space-y-1">
                <div className="text-gray-300 font-bold text-sm">Silver Crate</div>
                <div className="text-lg font-extrabold text-green-400">Playable</div>
                <div className="text-xs text-gray-400">1 Hour = 2 Keys</div>
              </div>
            </div>

            {/* Key Crate */}
            <div className="bg-black/80 border border-pink-500/70 p-4 rounded-2xl text-center space-y-1 max-w-[200px] mx-auto">
              <div className="text-pink-400 font-bold text-sm">Key Crate</div>
              <div className="text-lg font-extrabold">₹410</div>
              <div className="text-xs text-gray-400">7 Keys included</div>
            </div>

            <div className="bg-black/90 border border-gray-800 p-5 rounded-2xl text-center space-y-3">
              <h3 className="font-bold text-lg">Buy Keys for Master Crate</h3>
              <button className="w-full bg-red-600 hover:bg-red-700 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                PURCHASE ON DISCORD 💬
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
