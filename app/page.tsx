'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('rank');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        {/* BRAND LOGO */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: '900',
          textAlign: 'center',
          letterSpacing: '1px',
          margin: '10px 0 20px 0',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          <span style={{ color: '#e53e3e' }}>THEHERO</span>
          <span style={{ color: '#ffffff' }}>SMP</span>
        </h1>

        {/* NAVIGATION BAR */}
        <div style={{
          backgroundColor: 'rgba(18, 18, 18, 0.92)',
          borderRadius: '16px',
          padding: '5px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'spin', label: '🎡 Spin' },
            { id: 'social', label: 'Social' },
            { id: 'rank', label: 'Rank/Tag' },
            { id: 'crates', label: '🎁 Crates' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: isActive ? '#e53e3e' : 'transparent',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: '0.2s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.88)', borderRadius: '20px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Server Status</span>
                <span style={{ fontSize: '20px', color: '#e53e3e', fontWeight: 'bold' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '13px' }}>
                <span style={{ color: '#38a169', fontWeight: 'bold' }}>● ONLINE</span>
                <span style={{ color: '#a0aec0' }}>Players Online</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.88)', borderRadius: '20px', padding: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Java Edition</h3>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '14px' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY JAVA IP
              </button>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.88)', borderRadius: '20px', padding: '18px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>Bedrock / PE Edition</h3>
              <p style={{ fontSize: '12px', color: '#a0aec0' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '14px' }}>Port: 19144</p>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SPIN */}
        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.92)', borderRadius: '24px', padding: '20px', textAlign: 'center' }}>
            <h2 style={{ color: '#e53e3e', fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ color: '#a0aec0', fontSize: '12px', marginBottom: '16px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>
            
            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', marginBottom: '10px' }} />
            <input type="text" placeholder="Admin Passcode / Referral (Optional)" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid #333', color: 'white', marginBottom: '16px' }} />

            <div style={{ margin: '20px auto', width: '210px', height: '210px', borderRadius: '50%', border: '4px solid #e53e3e', background: 'conic-gradient(#38a169 0deg 51deg, #ecc94b 51deg 102deg, #00b4d8 102deg 153deg, #ed8936 153deg 204deg, #4a5568 204deg 255deg, #9f7aea 255deg 306deg, #3182ce 306deg 360deg)', display: 'flex', alignItems: 'center', justifyCenter: 'center', boxShadow: '0 0 15px rgba(229,62,62,0.4)' }} />

            <button style={{ width: '100%', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>
              SPIN AGAIN IN 24H ⏳
            </button>
          </div>
        )}

        {/* TAB 3: SOCIAL */}
        {activeTab === 'social' && (
          <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.92)', borderRadius: '24px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Join Our Community</h2>
            <button style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>JOIN DISCORD SERVER 💬</button>
            <button style={{ backgroundColor: '#E1306C', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>FOLLOW INSTAGRAM PROFILE 📸</button>
            <button style={{ backgroundColor: '#C13584', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>JOIN INSTAGRAM GROUP CHAT 💬</button>
          </div>
        )}

        {/* TAB 4: RANKS & TAGS */}
        {activeTab === 'rank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* VIP RANK */}
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.65)', border: '1.5px solid #d69e2e', borderRadius: '20px', padding: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#ecc94b', fontSize: '20px', fontWeight: 'bold' }}>VIP Rank</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹200</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            {/* VIP++ RANK */}
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.65)', border: '1.5px solid #d69e2e', borderRadius: '20px', padding: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#ecc94b', fontSize: '20px', fontWeight: 'bold' }}>VIP++ Rank</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹280</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            {/* MVP RANK */}
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.65)', border: '1.5px solid #3182ce', borderRadius: '20px', padding: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#63b3ed', fontSize: '20px', fontWeight: 'bold' }}>MVP Rank</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹190</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            {/* MVP++ RANK */}
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.65)', border: '1.5px solid #805ad5', borderRadius: '20px', padding: '16px', backdropFilter: 'blur(10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: '#b794f4', fontSize: '20px', fontWeight: 'bold' }}>MVP++ Rank</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>₹240</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
            </div>

            {/* PLAYABLE TAGS SECTION */}
            <h3 style={{ color: '#38a169', fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>🎮 Playable Tags (Free)</h3>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderLeft: '4px solid #38a169', borderRadius: '16px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#38a169', fontWeight: 'bold', fontSize: '15px' }}>OG_BUILDER</div>
                <div style={{ color: '#a0aec0', fontSize: '12px' }}>Earnable in-game</div>
              </div>
              <span style={{ border: '1px solid #38a169', color: '#38a169', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>PLAYABLE</span>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderLeft: '4px solid #38a169', borderRadius: '16px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#38a169', fontWeight: 'bold', fontSize: '15px' }}>ADVANCED BUILDER</div>
                <div style={{ color: '#a0aec0', fontSize: '12px' }}>Earnable in-game</div>
              </div>
              <span style={{ border: '1px solid #38a169', color: '#38a169', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>PLAYABLE</span>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderLeft: '4px solid #38a169', borderRadius: '16px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#38a169', fontWeight: 'bold', fontSize: '15px' }}>BASIC BUILDER</div>
                <div style={{ color: '#a0aec0', fontSize: '12px' }}>Earnable in-game</div>
              </div>
              <span style={{ border: '1px solid #38a169', color: '#38a169', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>PLAYABLE</span>
            </div>

            {/* BUYABLE TAGS SECTION */}
            <h3 style={{ color: '#ecc94b', fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>💎 Buyable Tags</h3>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderLeft: '4px solid #e53e3e', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ color: '#e53e3e', fontWeight: 'bold', fontSize: '16px' }}>GAREEB Tag</div>
                  <div style={{ color: '#a0aec0', fontSize: '12px' }}>Validity: 1 MONTH</div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>₹100</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '10px', padding: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                BUY TAG VIA DISCORD 🛒
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: CRATES */}
        {activeTab === 'crates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              
              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #d69e2e', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#ecc94b', fontWeight: 'bold', fontSize: '15px' }}>Master Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹150</div>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>7 Keys included</div>
              </div>

              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #805ad5', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#b794f4', fontWeight: 'bold', fontSize: '15px' }}>God Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹450</div>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>7 Keys included</div>
              </div>

              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #3182ce', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#63b3ed', fontWeight: 'bold', fontSize: '15px' }}>Spawner Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹220</div>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>7 Keys included</div>
              </div>

              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #718096', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#e2e8f0', fontWeight: 'bold', fontSize: '15px' }}>Silver Crate</div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38a169', margin: '4px 0' }}>Playable</div>
                <div style={{ fontSize: '11px', color: '#a0aec0' }}>1 Hour = 2 Keys</div>
              </div>

            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #d53f8c', borderRadius: '20px', padding: '14px', textAlign: 'center', width: '60%', margin: '0 auto' }}>
              <div style={{ color: '#fbb6ce', fontWeight: 'bold', fontSize: '15px' }}>Key Crate</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹410</div>
              <div style={{ fontSize: '11px', color: '#a0aec0' }}>7 Keys included</div>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.92)', borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Buy Keys for Master Crate</h3>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>
                PURCHASE ON DISCORD 💬
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
