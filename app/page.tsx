'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* Title */}
        <h1 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', margin: '10px 0 24px 0', letterSpacing: '1px' }}>
          <span style={{ color: '#ff3b30' }}>THEHERO</span>
          <span style={{ color: '#ffffff' }}>SMP</span>
        </h1>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'spin', label: '🎡 Spin' },
            { id: 'social', label: 'Social' },
            { id: 'rank', label: 'Rank/Tag' },
            { id: 'crates', label: '🎁 Crates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#ff3b30' : 'transparent',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 6px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Server Status</span>
                <span style={{ fontSize: '22px', color: '#ff3b30', fontWeight: 'bold' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '14px' }}>
                <span style={{ color: '#34c759', fontWeight: 'bold' }}>● ONLINE</span>
                <span style={{ color: '#a0aec0' }}>Players Online</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px', color: '#fff' }}>Java Edition</h3>
              <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY JAVA IP
              </button>
            </div>

            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px', color: '#fff' }}>Bedrock / PE Edition</h3>
              <p style={{ fontSize: '13px', color: '#a0aec0' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px' }}>Port: 19144</p>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {/* SPIN TAB */}
        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#ff3b30', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '20px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>
            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '12px', outline: 'none' }} />
            <input type="text" placeholder="Admin Passcode / Referral (Optional)" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '20px', outline: 'none' }} />
            <div style={{ margin: '20px auto', width: '180px', height: '180px', borderRadius: '50%', border: '4px solid #ff3b30', background: 'conic-gradient(#38a169 0deg 51deg, #ecc94b 51deg 102deg, #00b4d8 102deg 153deg, #ed8936 153deg 204deg, #4a5568 204deg 255deg, #9f7aea 255deg 306deg, #3182ce 306deg 360deg)' }} />
            <button style={{ width: '100%', backgroundColor: '#3a3a3c', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              SPIN AGAIN IN 24H ⏳
            </button>
          </div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === 'social' && (
          <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>Join Our Community</h2>
            <button style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>JOIN DISCORD SERVER 💬</button>
            <button style={{ backgroundColor: '#E1306C', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>FOLLOW INSTAGRAM PROFILE 📸</button>
            <button style={{ backgroundColor: '#C13584', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>JOIN INSTAGRAM GROUP CHAT 💬</button>
          </div>
        )}

        {/* RANK TAB */}
        {activeTab === 'rank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'VIP Rank', price: '₹200', color: '#ecc94b' },
              { name: 'VIP++ Rank', price: '₹280', color: '#ecc94b' },
              { name: 'MVP Rank', price: '₹190', color: '#63b3ed' },
              { name: 'MVP++ Rank', price: '₹240', color: '#b794f4' }
            ].map((r, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: `1.5px solid ${r.color}`, borderRadius: '20px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                  <span style={{ color: r.color, fontSize: '18px', fontWeight: 'bold' }}>{r.name}</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{r.price}</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>BUY VIA DISCORD 🛒</button>
              </div>
            ))}

            <h3 style={{ color: '#34c759', fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>🎮 Playable Tags (Free)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['OG_BUILDER', 'ADVANCED BUILDER', 'BASIC BUILDER'].map((tag, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', borderLeft: '4px solid #34c759', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#34c759', fontWeight: 'bold' }}>{tag}</div>
                    <div style={{ fontSize: '11px', color: '#a0aec0' }}>Earnable in-game</div>
                  </div>
                  <span style={{ backgroundColor: '#1c3d27', color: '#34c759', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #34c759' }}>PLAYABLE</span>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#ecc94b', fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>💎 Buyable Tags</h3>
            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', borderLeft: '4px solid #ff3b30', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#ff3b30', fontWeight: 'bold', fontSize: '16px' }}>GAREEB Tag</span>
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>₹100</span>
              </div>
              <div style={{ fontSize: '11px', color: '#a0aec0', marginBottom: '12px' }}>Validity: 1 MONTH</div>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>BUY TAG VIA DISCORD 🛒</button>
            </div>
          </div>
        )}

        {/* CRATES TAB */}
        {activeTab === 'crates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { name: 'Master Crate', price: '₹150', color: '#ecc94b', keys: '7 Keys included' },
                { name: 'God Crate', price: '₹450', color: '#b794f4', keys: '7 Keys included' },
                { name: 'Spawner Crate', price: '₹220', color: '#63b3ed', keys: '7 Keys included' },
                { name: 'Silver Crate', price: 'Playable', color: '#a0aec0', keys: '1 Hour = 2 Keys' },
                { name: 'Key Crate', price: '₹410', color: '#e83e8c', keys: '7 Keys included' }
              ].map((c, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: `1.5px solid ${c.color}`, borderRadius: '16px', padding: '12px', textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#8b8b8b', border: '2px solid #373737', borderRadius: '8px', padding: '4px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '10px', color: '#000', fontWeight: 'bold', marginBottom: '2px' }}>{c.name} Rewards</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', backgroundColor: '#8b8b8b' }}>
                      {Array.from({ length: 21 }).map((_, idx) => (
                        <div key={idx} style={{ width: '100%', height: '14px', backgroundColor: '#8b8b8b', border: '1px solid #373737' }} />
                      ))}
                    </div>
                  </div>
                  <div style={{ color: c.color, fontWeight: 'bold', fontSize: '15px' }}>{c.name}</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '2px 0' }}>{c.price}</div>
                  <p style={{ fontSize: '10px', color: '#a0aec0' }}>{c.keys}</p>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Buy Keys for Master Crate</h3>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>PURCHASE ON DISCORD 💬</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
