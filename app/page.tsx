"use client";
import React, { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const serverIP = "play.theherossmp.com";

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "#fff", fontFamily: "sans-serif", minHeight: "100vh", margin: 0 }}>
      {/* Navigation Bar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", background: "#161616", borderBottom: "2px solid #e50914" }}>
        <h1 style={{ color: "#e50914", margin: 0, fontSize: "1.5rem", letterSpacing: "1px" }}>THEHEROS<span style={{ color: "#fff" }}>SMP</span></h1>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#dashboard" style={{ color: "#aaa", textDecoration: "none" }}>Dashboard</a>
          <a href="#leaderboard" style={{ color: "#aaa", textDecoration: "none" }}>Leaderboard</a>
          <a href="#store" style={{ color: "#aaa", textDecoration: "none" }}>Store</a>
          <a href="#discord" style={{ color: "#5865F2", textDecoration: "none", fontWeight: "bold" }}>Discord</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 1rem", background: "radial-gradient(circle, #2a080a 0%, #0d0d0d 100%)" }}>
        <h2 style={{ fontSize: "3rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>The Ultimate Minecraft SMP</h2>
        <p style={{ color: "#aaa", fontSize: "1.1rem", marginBottom: "2rem" }}>Join hundreds of players in a competitive & friendly Minecraft survival network.</p>

        {/* Server IP Card */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", background: "#1a1a1a", padding: "0.8rem 1.5rem", borderRadius: "8px", border: "1px solid #333" }}>
          <div>
            <span style={{ color: "#22c55e", fontSize: "0.9rem" }}>● SERVER ONLINE</span>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "1px" }}>{serverIP}</div>
          </div>
          <button onClick={copyIP} style={{ background: "#e50914", color: "#fff", border: "none", padding: "0.6rem 1.2rem", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            {copied ? "COPIED!" : "COPY IP"}
          </button>
        </div>
      </section>

      {/* Server Dashboard */}
      <section id="dashboard" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Server Dashboard</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Live Online Players</span>
            <h2 style={{ color: "#22c55e", margin: "0.5rem 0 0" }}>24 / 100</h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Java / Bedrock Status</span>
            <h2 style={{ color: "#fff", margin: "0.5rem 0 0" }}>Online ⚡</h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Server Version</span>
            <h2 style={{ color: "#fff", margin: "0.5rem 0 0" }}>1.20.x - 1.21</h2>
          </div>
          <div style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", border: "1px solid #262626" }}>
            <span style={{ color: "#aaa" }}>Server Ping</span>
            <h2 style={{ color: "#22c55e", margin: "0.5rem 0 0" }}>28 ms</h2>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Leaderboard</h3>
        <div style={{ background: "#161616", marginTop: "1.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #262626" }}>
          <table style={{ width: "100%", textWrap: "wrap", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#222", color: "#aaa" }}>
                <th style={{ padding: "1rem" }}>Rank</th>
                <th style={{ padding: "1rem" }}>Player</th>
                <th style={{ padding: "1rem" }}>Kills</th>
                <th style={{ padding: "1rem" }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "1rem" }}>🥇 #1</td>
                <td style={{ padding: "1rem", color: "#e50914", fontWeight: "bold" }}>ayushverma</td>
                <td style={{ padding: "1rem" }}>482</td>
                <td style={{ padding: "1rem", color: "#22c55e" }}>$150,000</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #222" }}>
                <td style={{ padding: "1rem" }}>🥈 #2</td>
                <td style={{ padding: "1rem" }}>HeroGamer</td>
                <td style={{ padding: "1rem" }}>310</td>
                <td style={{ padding: "1rem", color: "#22c55e" }}>$98,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Store Ranks */}
      <section id="store" style={{ padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h3 style={{ borderLeft: "4px solid #e50914", paddingLeft: "0.5rem", fontSize: "1.8rem" }}>Server Store Ranks</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {["VIP", "MVP", "LEGEND"].map((rank) => (
            <div key={rank} style={{ background: "#161616", padding: "1.5rem", borderRadius: "8px", textAlign: "center", border: "1px solid #333" }}>
              <h2 style={{ color: "#e50914" }}>{rank}</h2>
              <p style={{ color: "#aaa" }}>Custom Perks & Kits</p>
              <button style={{ background: "#fff", color: "#000", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Buy Rank</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
