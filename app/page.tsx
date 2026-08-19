'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks'>('dashboard');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/163.61.39.57:19144')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          setOnlineCount(data.players?.online || 0);
          setMaxPlayers(data.players?.max || 0);
          if (data.players?.list) {
            setPlayers(data.players.list);
          }
        }
      })
      .catch(() => {});
  }, []);

  const copyToClipboard = (text: string, type: 'java' | 'bedrock') => {
    navigator.clipboard.writeText(text);
    if (type === 'java') {
      setCopiedJava(true);
      setTimeout(() => setCopiedJava(false), 2000);
    } else {
      setCopiedBedrock(true);
      setTimeout(() => setCopiedBedrock(false), 2000);
    }
  };

  return (
    <main className="min-h-screen text-white p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header Logo */}
      <header className="flex justify-between items-center py-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-red-600 drop-shadow">
          THEHEROS<span className="text-white">SMP</span>
        </h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-2 rounded-lg font-bold text-xs sm:text-sm transition ${
            activeTab === 'dashboard' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2 rounded-lg font-bold text-xs sm:text-sm transition ${
            activeTab === 'community' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Community & Socials
        </button>
        <button
          onClick={() => setActiveTab('ranks')}
          className={`flex-1 py-2 rounded-lg font-bold text-xs sm:text-sm transition ${
            activeTab === 'ranks' ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'
          }`}
        >
          Ranks & Tags
        </button>
      </nav>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Main Title Banner */}
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-red-500/30 text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold">THE ULTIMATE MINECRAFT SMP</h2>
            <p className="text-gray-300 text-xs sm:text-sm">Crossplay Survival Network (Java & Bedrock)</p>
          </div>

          {/* IP Boxes */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Java Edition */}
            <div className="bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                <span className="font-bold text-green-400 text-sm">JAVA EDITION</span>
              </div>
              <p className="font-mono text-sm text-gray-200">163.61.39.57:19144</p>
              <button
                onClick={() => copyToClipboard('163.61.39.57:19144', 'java')}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 font-bold text-sm rounded-lg transition"
              >
                {copiedJava ? 'COPIED!' : 'COPY JAVA IP'}
              </button>
            </div>

            {/* Bedrock Edition */}
            <div className="bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                <span className="font-bold text-blue-400 text-sm">BEDROCK EDITION</span>
              </div>
              <div className="text-sm font-mono text-gray-200">
                <p>IP: 163.61.39.57</p>
                <p>Port: 19144</p>
              </div>
              <button
                onClick={() => copyToClipboard('163.61.39.57', 'bedrock')}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 font-bold text-sm rounded-lg transition"
              >
                {copiedBedrock ? 'COPIED!' : 'COPY BEDROCK IP'}
              </button>
            </div>
          </div>

          {/* Server Stats & Live Players */}
          <div className="bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
              Live Online Players ({onlineCount} / {maxPlayers})
            </h3>

            {players.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {players.map((player, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 p-2 rounded-lg border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://mc-heads.net/avatar/${player}/32`}
                      alt={player}
                      className="w-7 h-7 rounded"
                    />
                    <span className="text-xs sm:text-sm font-medium truncate">{player}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-xs sm:text-sm italic">
                {onlineCount > 0 ? "Players are currently online." : "No players online right now."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNITY & SOCIALS */}
      {activeTab === 'community' && (
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-red-500">Join Our Community</h2>
          <div className="space-y-3">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition"
            >
              <h3 className="font-bold text-blue-400">Discord Server</h3>
              <p className="text-xs text-gray-300">Join our Discord community for events, announcements, and support.</p>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition"
            >
              <h3 className="font-bold text-red-400">YouTube Channel</h3>
              <p className="text-xs text-gray-300">Watch official SMP trailers and updates.</p>
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: RANKS & TAGS */}
      {activeTab === 'ranks' && (
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-xl font-bold text-red-500">Server Ranks & Store</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-yellow-500/30 space-y-2">
              <h3 className="text-lg font-bold text-yellow-400">VIP Rank</h3>
              <p className="text-xs text-gray-300">Custom prefix, fly in lobby, extra homes, and exclusive tags.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-red-500/30 space-y-2">
              <h3 className="text-lg font-bold text-red-400">HERO Rank</h3>
              <p className="text-xs text-gray-300">All VIP perks + custom particle trails and priority join access.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
