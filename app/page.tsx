'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('rank');

  return (
    <main style={{
      minHeight: '100vh',
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        
        {/* Title */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: '900',
          textAlign: 'center',
          letterSpacing: '2px',
          marginBottom: '20px',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          <span style={{ color: '#ef4444' }}>THEHERO</span>
          <span>SMP</span>
        </h1>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #1f2937',
          padding: '6px',
          borderRadius: '16px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'spin', label: '🎡 Spin' },
            { id: 'social', label: 'Social' },
            { id: 'rank', label: 'Ranks' },
            { id: 'crates', label: '🎁 Crates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 12px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab.id ? '#dc2626' : 'transparent',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(15,23,42,0.85)', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Server Status</h2>
                <span style={{ fontSize: '20px', color: '#ef4444', fontWeight: 'bold' }}>4</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>
                <span style={{ color: '#22c55e', fontWeight: 'bold' }}>● ONLINE</span>
                <span>Players Online</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(15,23,42,0.85)', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0' }}>Java Edition</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY JAVA IP
              </button>
            </div>

            <div style={{ backgroundColor: 'rgba(15,23,42,0.85)', border: '1px solid #1e293b', padding: '20px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0' }}>Bedrock / PE Edition</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 2px 0' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0' }}>Port: 19144</p>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {/* SPIN TAB */}
        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #1f2937', padding: '24px', borderRadius: '24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>
            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid #374151', color: 'white', marginBottom: '12px', boxSizing: 'border-box' }} />
            <input type="text" placeholder="Referral Code (Optional)" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid #f59e0b', color: '#fbbf24', marginBottom: '20px', boxSizing: 'border-box' }} />
            <button style={{ width: '100%', backgroundColor: '#475569', color: '#cbd5e1', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold' }}>SPIN AGAIN IN 24H ⏳</button>
          </div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === 'social' && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #1f2937', padding: '24px', borderRadius: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Join Our Community</h2>
            <button style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold' }}>JOIN DISCORD SERVER 💬</button>
            <button style={{ backgroundColor: '#db2777', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold' }}>FOLLOW INSTAGRAM PROFILE 📸</button>
            <button style={{ backgroundColor: '#9333ea', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold' }}>JOIN INSTAGRAM GROUP CHAT 💬</button>
          </div>
        )}

        {/* RANKS TAB */}
        {activeTab === 'rank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', border: '1.5px solid #f59e0b', padding: '16px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyBetween: 'space-between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fbbf24' }}>VIP Rank</span>
                <span style={{ fontSize: '20px', fontWeight: '900' }}>₹200</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', border: '1.5px solid #eab308', padding: '16px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#facc15' }}>VIP++ Rank</span>
                <span style={{ fontSize: '20px', fontWeight: '900' }}>₹280</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', border: '1.5px solid #3b82f6', padding: '16px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa' }}>MVP Rank</span>
                <span style={{ fontSize: '20px', fontWeight: '900' }}>₹190</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', border: '1.5px solid #a855f7', padding: '16px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#c084fc' }}>MVP++ Rank</span>
                <span style={{ fontSize: '20px', fontWeight: '900' }}>₹240</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#4ade80', margin: '16px 0 0 0' }}>🎮 Playable Tags (Free)</h3>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #22c55e', padding: '14px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#22c55e' }}>OG_BUILDER</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Earnable in-game</div>
              </div>
              <span style={{ border: '1px solid #22c55e', color: '#4ade80', padding: '4px 10px', borderRadius: '8px', fontSize: '12px' }}>PLAYABLE</span>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #22c55e', padding: '14px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#22c55e' }}>ADVANCED BUILDER</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Earnable in-game</div>
              </div>
              <span style={{ border: '1px solid #22c55e', color: '#4ade80', padding: '4px 10px', borderRadius: '8px', fontSize: '12px' }}>PLAYABLE</span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#facc15', margin: '12px 0 0 0' }}>💎 Buyable Tags</h3>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #ef4444', padding: '16px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#ef4444' }}>GAREEB Tag</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>Validity: 1 MONTH</div>
                </div>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹100</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '10px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>BUY TAG VIA DISCORD 🛒</button>
            </div>
          </div>
        )}

        {/* CRATES TAB */}
        {activeTab === 'crates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #f59e0b', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '14px' }}>Master Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹150</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>7 Keys included</div>
              </div>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #a855f7', padding: '16px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ color: '#c084fc', fontWeight: 'bold', fontSize: '14px' }}>God Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹450</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>7 Keys included</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', border: '1px solid #1f2937', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Buy Keys for Master Crate</h3>
              <button style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold' }}>PURCHASE ON DISCORD 💬</button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
