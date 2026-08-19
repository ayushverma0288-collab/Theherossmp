'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/163.61.39.57:19144')
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          setOnlineCount(data.players.online || 0);
          setMaxPlayers(data.players.max || 0);
          if (data.players.list) {
            setPlayers(data.players.list);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="min-h-screen p-6 text-white flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-center tracking-wide text-red-500 drop-shadow">
          THEHEROSSMP
        </h1>

        {/* Server IP Info */}
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-xl border border-red-500/30 text-center space-y-4">
          <h2 className="text-2xl font-bold">THE ULTIMATE MINECRAFT SMP</h2>
          <div className="space-y-2">
            <p><span className="text-green-400 font-bold">JAVA IP:</span> 163.61.39.57:19144</p>
            <p><span className="text-blue-400 font-bold">BEDROCK IP:</span> 163.61.39.57 | <span className="font-bold">PORT:</span> 19144</p>
          </div>
        </div>

        {/* Live Online Players Section */}
        <div className="bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
            Online Players ({onlineCount} / {maxPlayers})
          </h3>

          {players.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {players.map((player, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                  <img
                    src={`https://mc-heads.net/avatar/${player}/32`}
                    alt={player}
                    className="w-8 h-8 rounded"
                  />
                  <span className="text-sm font-medium text-gray-200">{player}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">
              {onlineCount > 0 ? "Player names hidden by server settings" : "No players online right now."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
