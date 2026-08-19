"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
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

  const discordUrl = "https://discord.gg/XFqtJQMPg";
  const instagramUrl = "https://www.instagram.com/modihater7?igsh=MWpnNWsyNzY0dHRzcA==";

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
    const interval = setInterval(fetchServerStatus, 30000);
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
      {/* Navigation Bar */}
      <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", background: "#161616", borderBottom: "2px solid #e50914" }}>
        <h1 style={{ color: "#e50914", margin: 0, fontSize: "1.4rem", letterSpacing: "1px" }}>THEHEROS<span style={{ color: "#fff" }}>SMP</span></h1>
        
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
          <button 
            onClick={() => setActiveTab("dashboard")} 
            style={{ background: activeTab === "dashboard" ? "#e50914" : "transparent", color: "#fff", border: "none", padding: "0.5rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("socials")} 
            style={{ background: activeTab === "socials" ? "#e50914" : "transparent", color: "#fff", border: "none", padding: "0.5rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Community & Socials
          </button>
          <button 
            onClick={() => setActiveTab("ranks")} 
            style={{ background: activeTab === "ranks" ? "#e50914" : "transparent", color: "#fff", border: "none", padding: "0.5rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Ranks & Tags
          </button>
        </div>
      </nav>

      {/* Hero / IP Section */}
      <section style={{ textAlign: "center", padding: "2.5rem 1rem", background: "radial-gradient(circle, #2a080a 0%, #0d0d0d 100%)" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "0.3rem", textTransform: "uppercase" }}>The Ultimate Minecraft SMP</h2>
        <p style={{ color: "#aaa", fontSize: "0.95rem", marginBottom: "1.5rem" }}>Crossplay Survival Network (Java & Bedrock)</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
          {/* Java Card */}
          <div style={{ background: "#1a1a1a", padding: "0.8rem 1.2rem", borderRadius: "8px", border: "1px solid #333", width: "100%", maxWidth: "320px", textAlign: "left" }}>
            <span style={{ color: "#22c55e", fontSize: "0.8rem", fontWeight: "bold" }}>● JAVA EDITION</span>
            <div style={{ fontSize: "0.9rem", fontWeight: "bold", margin: "0.3rem 0", color: "#fff", wordBreak: "break-all" }}>{javaIP}</div>
            <button onClick={copyJava} style={{ width: "100%", background: "#e50914", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
              {copiedJava ? "COPIED JAVA IP!" : "COPY JAVA IP"}
            </button>
          </div>

          {/* Bedrock Card */}
          <div style={{ background: "#1a1a1a", padding: "0.8rem 1.2rem", borderRadius: "8px", border: "1px solid #333", width: "100%", maxWidth: "320px", textAlign: "left" }}>
            <span style={{ color: "#3b82f6", fontSize: "0.8rem", fontWeight: "bold" }}>● BEDROCK EDITION</span>
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", marginTop: "0.3rem", color: "#fff", wordBreak: "break-all" }}>IP: {bedrockIP}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#aaa" }}>Port: {bedrockPort}</div>
            <button onClick={copyBedrock} style={{ width: "100%", background: "#e50914", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "0.4rem" }}>
              {copiedBedrock ? "COPIED BEDROCK IP!" : "COPY BEDROCK IP"}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main style={{ padding: "2rem 1rem", maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div>
            <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.5rem", marginTop: 0 }}>Server Dashboard</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
              <div style={{ background: "#161616", padding: "1.2rem", borderRadius: "8px", border: "1px solid #262626" }}>
                <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Live Online Players</span>
                <h2 style={{ color: serverData.online ? "#22c55e" : "#ef4444", margin: "0.4rem 0 0" }}>
                  {serverData.online ? `${serverData.players.online} / ${serverData.players.max}` : "Offline"}
                </h2>
              </div>
              <div style={{ background: "#161616", padding: "1.2rem", borderRadius: "8px", border: "1px solid #262626" }}>
                <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Server Ping</span>
                <h2 style={{ color: "#22c55e", margin: "0.4rem 0 0" }}>{serverData.ping} ms</h2>
              </div>
              <div style={{ background: "#161616", padding: "1.2rem", borderRadius: "8px", border: "1px solid #262626" }}>
                <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Supported Versions</span>
                <h2 style={{ color: "#fff", margin: "0.4rem 0 0", fontSize: "1.1rem" }}>1.2.1 ➔ 1.26.1+</h2>
              </div>
              <div style={{ background: "#161616", padding: "1.2rem", borderRadius: "8px", border: "1px solid #262626" }}>
                <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Host Provider</span>
                <h2 style={{ color: "#e50914", margin: "0.4rem 0 0", fontSize: "1.1rem" }}>SkyRain Cloud</h2>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMMUNITY & SOCIALS */}
        {activeTab === "socials" && (
          <div>
            <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.5rem", marginTop: 0 }}>Join Our Community</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
              
              {/* Discord Box */}
              <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #5865F2", textAlign: "center" }}>
                <h2 style={{ color: "#5865F2", marginTop: 0 }}>Discord Community</h2>
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Chat with players, get server updates, and create support tickets.</p>
                <a href={discordUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#5865F2", color: "#fff", textDecoration: "none", padding: "0.7rem 1.5rem", borderRadius: "5px", fontWeight: "bold", marginTop: "0.5rem" }}>
                  Join Discord Server
                </a>
              </div>

              {/* Instagram Box */}
              <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #E1306C", textAlign: "center" }}>
                <h2 style={{ color: "#E1306C", marginTop: 0 }}>Instagram Page</h2>
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Follow for server clips, announcements, and giveaways.</p>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#E1306C", color: "#fff", textDecoration: "none", padding: "0.7rem 1.5rem", borderRadius: "5px", fontWeight: "bold", marginTop: "0.5rem" }}>
                  Follow on Instagram
                </a>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: RANKS & TAGS STORE */}
        {activeTab === "ranks" && (
          <div>
            <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.5rem", marginTop: 0 }}>Available Ranks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
              {ranksList.map((rank) => (
                <div key={rank} style={{ background: "#161616", padding: "1.2rem", borderRadius: "8px", textAlign: "center", border: "1px solid #333" }}>
                  <h2 style={{ color: "#e50914", margin: "0 0 0.5rem 0" }}>{rank}</h2>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "1rem" }}>Custom Perks & Kits</p>
                  <button style={{ background: "#fff", color: "#000", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", width: "100%" }}>Buy Rank</button>
                </div>
              ))}
            </div>

            <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.5rem", marginTop: "2rem" }}>Player Tags</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.8rem", marginTop: "1rem" }}>
              {tagsList.map((tag) => (
                <div key={tag} style={{ background: "#1a1a1a", padding: "0.8rem", borderRadius: "6px", textAlign: "center", border: "1px solid #262626", color: "#eab308", fontWeight: "bold", fontSize: "0.85rem" }}>
                  [{tag}]
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
