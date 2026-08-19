"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [serverData, setServerData] = useState<{ online: boolean; players: { online: number; max: number }; ping: number }>({
    online: false,
    players: { online: 0, max: 0 },
    ping: 0
  });

  const javaIP = "amd-9-1.skyraincloud.in:19144";
  const bedrockIP = "amd-9-1.skyraincloud.in";
  const bedrockPort = "19144";

  // Fetch Live Server Status
  useEffect(() => {
    const fetchServerStatus = async () => {
      const startTime = Date.now();
      try {
        const res = await fetch("https://api.mcsrvstat.us/2/amd-9-1.skyraincloud.in:19144");
        const data = await res.json();
        const endTime = Date.now();
        
        setServerData({
          online: data.online || false,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
          },
          ping: Math.round(endTime - startTime)
        });
      } catch (err) {
        console.error("Server status fetch error:", err);
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000); // 30 seconds auto-refresh
    return () => clearInterval(interval);
  }, []);

  const copyJava = () => {
    navigator.clipboard.writeText(javaIP);
    setCopiedJava(true);
    setTimeout(() => setCopiedJava(false), 2000);
  };

  const copyBedrock = () => {
    navigator.clipboard.writeText(`${bedrockIP}:${bedrockPort}`);
    setCopiedBedrock(true);
    setTimeout(() => setCopiedBedrock(false), 2000);
  };

  const ranksList = ["VIP", "VIP++", "MVP", "MVP++"];
  const tagsList = ["OG_BUILDER", "ADVANCED BUILDER", "BASIC BUILDER", "NOOB", "PRO", "GAREEB"];

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "#fff", fontFamily: "sans-serif", minHeight: "100vh", margin: 0 }}>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", background: "#161616", borderBottom: "2px solid #e50914" }}>
        <h1 style={{ color: "#e50914", margin: 0, fontSize: "1.5rem", letterSpacing: "1px" }}>THEHEROS<span style={{ color: "#fff" }}>SMP</span></h1>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#dashboard" style={{ color: "#aaa", textDecoration: "none" }}>Dashboard</a>
          <a href="#leaderboard" style={{ color: "#aaa", textDecoration: "none" }}>Leaderboard</a>
          <a href="#store" style={{ color: "#aaa", textDecoration: "none" }}>Store & Tags</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 1rem", background: "radial-gradient(circle, #2a080a 0%, #0d0d0d 100%)" }}>
        <h2 style={{ fontSize: "2.8rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>The Ultimate Minecraft SMP</h2>
        <p style={{ color: "#aaa", fontSize: "1.1rem", marginBottom: "2rem" }}>Crossplay Survival Network for Java & Bedrock Edition</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem" }}>
          {/* Java Card */}
          <div style={{ background: "#1a1a1a", padding: "1rem 1.5rem", borderRadius: "8px", border: "1px solid #333", minWidth: "280px", textAlign: "left" }}>
            <span style={{ color: "#22c55e", fontSize: "0.85rem", fontWeight: "bold" }}>● JAVA EDITION</span>
            <div style={{ fontSize: "1rem", fontWeight: "bold", margin: "0.4rem 0", color: "#fff" }}>{javaIP}</div>
            <button onClick={copyJava} style={{ width: "100%", background: "#e50914", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "0.5rem" }}>
              {copiedJava ? "COPIED JAVA IP!" : "COPY JAVA IP"}
            </button>
          </div>

          {/* Bedrock Card */}
          <div style={{ background: "#1a1a1a", padding: "1rem 1.5rem", borderRadius: "8px", border: "1px solid #333", minWidth: "280px", textAlign: "left" }}>
            <span style={{ color: "#3b82f6", fontSize: "0.85rem", fontWeight: "bold" }}>● BEDROCK EDITION</span>
            <div style={{ fontSize: "0.95rem", fontWeight: "bold", marginTop: "0.4rem", color: "#fff" }}>IP: {bedrockIP}</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "bold", color: "#aaa" }}>Port: {bedrockPort}</div>
            <button onClick={copyBedrock} style={{ width: "100%", background: "#e50914", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "0.5rem" }}>
              {copiedBedrock ? "COPIED BEDROCK IP!" : "COPY BEDROCK IP"}
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Live Server Stats</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Live Players</span>
            <h2 style={{ color: serverData.online ? "#22c55e" : "#ef4444", margin: "0.5rem 0 0" }}>
              {serverData.online ? `${serverData.players.online} / ${serverData.players.max}` : "Offline"}
            </h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Server Ping</span>
            <h2 style={{ color: "#22c55e", margin: "0.5rem 0 0" }}>{serverData.ping} ms</h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Supported Versions</span>
            <h2 style={{ color: "#fff", margin: "0.5rem 0 0", fontSize: "1.2rem" }}>1.2.1 ➔ 1.26.1+</h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Host Provider</span>
            <h2 style={{ color: "#e50914", margin: "0.5rem 0 0" }}>SkyRain Cloud</h2>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Leaderboard</h3>
        <div style={{ background: "#161616", marginTop: "1.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #262626" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#222", color: "#aaa" }}>
                <th style={{ padding: "1rem" }}>Rank</th>
                <th style={{ padding: "1rem" }}>Player</th>
                <th style={{ padding: "1rem" }}>Tag</th>
                <th style={{ padding: "1rem" }}>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "1rem" }}>🥇 #1</td>
                <td style={{ padding: "1rem", color: "#e50914", fontWeight: "bold" }}>Samosa_bhaiya</td>
                <td style={{ padding: "1rem", color: "#eab308" }}>[OG_BUILDER]</td>
                <td style={{ padding: "1rem", color: "#a855f7", fontWeight: "bold" }}>MVP++</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "1rem" }}>🥈 #2</td>
                <td style={{ padding: "1rem" }}>ayushverma</td>
                <td style={{ padding: "1rem", color: "#3b82f6" }}>[PRO]</td>
                <td style={{ padding: "1rem", color: "#3b82f6", fontWeight: "bold" }}>MVP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ranks & Tags Store */}
      <section id="store" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Ranks & Perks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {ranksList.map((rank) => (
            <div key={rank} style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", textAlign: "center", border: "1px solid #333" }}>
              <h2 style={{ color: "#e50914" }}>{rank}</h2>
              <p style={{ color: "#aaa" }}>Custom Perks & Kits</p>
              <button style={{ background: "#fff", color: "#000", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Buy Rank</button>
            </div>
          ))}
        </div>

        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem", marginTop: "3rem" }}>Player Tags</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
          {tagsList.map((tag) => (
            <div key={tag} style={{ background: "#1a1a1a", padding: "1rem", borderRadius: "6px", textAlign: "center", border: "1px solid #262626", color: "#eab308", fontWeight: "bold" }}>
              [{tag}]
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
