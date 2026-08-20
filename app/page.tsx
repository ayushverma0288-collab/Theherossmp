'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<string | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('smp_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('smp_user', email);
      setUser(email);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('smp_user');
    setUser(null);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative font-sans">
      
      {/* POPUP MODAL FOR UNAUTHENTICATED USERS */}
      {!user && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl relative">
            <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">
              {isRegister ? 'Register Account' : 'Login Required'}
            </h2>

            <form onSubmit={handleAuth} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition mt-2 shadow-lg"
              >
                {isRegister ? 'Register & Continue' : 'Login'}
              </button>
            </form>

            <p className="text-neutral-400 text-xs mt-4 text-center">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-red-400 underline font-semibold ml-1"
              >
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {user && (
          <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800 p-3 rounded-2xl mb-4">
            <span className="text-sm font-semibold text-green-400">👤 {user}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-red-600 text-center tracking-wider mb-6 drop-shadow-md">
          THEHEROSMP
        </h1>

        {/* Navigation Tabs */}
        <div className="bg-neutral-900/90 border border-neutral-800 p-1.5 rounded-2xl flex justify-between items-center text-xs font-semibold mb-6 shadow-xl">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'home' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('spin')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'spin' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            🎰 Spin
          </button>
          <button 
            onClick={() => setActiveTab('social')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'social' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            Social
          </button>
          <button 
            onClick={() => setActiveTab('rank')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'rank' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            Rank/Tag
          </button>
          <button 
            onClick={() => setActiveTab('crates')} 
            className={`px-3 py-2 rounded-xl transition ${activeTab === 'crates' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
          >
            🎁 Crates
          </button>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Server Status</h2>
              <span className="text-xl font-extrabold text-red-500">4</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-400">
              <span className="text-green-500 font-bold">● ONLINE</span>
              <span>Players Online</span>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-1">Java Edition</h3>
            <p className="text-xs text-neutral-400 mb-4">IP: amd-9-1.skyraincloud.in:19144</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition">
              COPY JAVA IP
            </button>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-1">Bedrock / PE Edition</h3>
            <p className="text-xs text-neutral-400">IP: amd-9-1.skyraincloud.in</p>
            <p className="text-xs text-neutral-400 mb-4">Port: 19144</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition">
              COPY BEDROCK IP
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
