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

  return (
    <main className="min-h-screen p-4 sm:p-8 text-white flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-3xl sm:text-5xl font-black text-center tracking-wider text-red-600 drop-shadow-lg">
          THEHEROSSMP
        </h1>

        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-red-500/30 text-center space-y-3 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold">THE ULTIMATE MINECRAFT SMP</h2>
          <p className="text-gray-300 text-sm">Crossplay Survival Network (Java & Bedrock)</p>
          
          <div className="pt-2 space-y-2 text-sm sm:text-base">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-green-400 font-bold">JAVA EDITION: </span>
              <span className="font-mono">163.61.39.57:19144</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-blue-400 font-bold">BEDROCK EDITION: </span>
              <span className="font-mono">IP: 163.61.39.57 | Port: 19144</span>
            </div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
            Online Players ({onlineCount} / {maxPlayers})
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
              {onlineCount > 0 ? "Players are online (names hidden)" : "No players online right now."}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
