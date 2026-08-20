'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        <h1 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', margin: '10px 0 24px 0', letterSpacing: '1px' }}>
          <span style={{ color: '#ff3b30' }}>THEHERO</span>
          <span style={{ color: '#ffffff' }}>SMP</span>
        </h1>

        <div style={{
          backgroundColor: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '6px',
          display: 'flex',
          justify: 'space-between',
          marginBottom: '24px',
          border: '1px solid rgba(255,255,255,0.1)'
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
                backgroundColor: activeTab === tab.id ? '#ff3b30' : 'transparent',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Server Status</span>
                <span style={{ fontSize: '22px', color: '#ff3b30', fontWeight: 'bold' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '14px' }}>
                <span style={{ color: '#34c759', fontWeight: 'bold' }}>● ONLINE</span>
                <span style={{ color: '#a0aec0' }}>Players Online</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>Java Edition</h3>
              <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY JAVA IP
              </button>
            </div>

            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>Bedrock / PE Edition</h3>
              <p style={{ fontSize: '13px', color: '#a0aec0' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px' }}>Port: 19144</p>
              <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#ff3b30', fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '20px' }}>Enter Gamertag and Spin every 24 Hours for free rewards!</p>
            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '12px', outline: 'none' }} />
            <input type="text" placeholder="Admin Passcode / Referral (Optional)" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '20px', outline: 'none' }} />
            <div style={{ margin: '20px auto', width: '180px', height: '180px', borderRadius: '50%', border: '4px solid #ff3b30', background: 'conic-gradient(#38a169 0deg 51deg, #ecc94b 51deg 102deg, #00b4d8 102deg 153deg, #ed8936 153deg 204deg, #4a5568 204deg 255deg, #9f7aea 255deg 306deg, #3182ce 306deg 360deg)' }} />
            <button style={{ width: '100%', backgroundColor: '#3a3a3c', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
              SPIN AGAIN IN 24H
            </button>
          </div>
        )}

        {activeTab === 'social' && (
          <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Join Our Community</h2>
            <button style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>JOIN DISCORD SERVER</button>
            <button style={{ backgroundColor: '#E1306C', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>FOLLOW INSTAGRAM PROFILE</button>
            <button style={{ backgroundColor: '#C13584', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold', cursor: 'pointer' }}>JOIN INSTAGRAM GROUP CHAT</button>
          </div>
        )}

        {activeTab === 'rank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[{ name: 'VIP Rank', price: '₹200', color: '#ecc94b' }, { name: 'VIP++ Rank', price: '₹280', color: '#ecc94b' }, { name: 'MVP Rank', price: '₹190', color: '#63b3ed' }, { name: 'MVP++ Rank', price: '₹240', color: '#b794f4' }].map((r, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: `1.5px solid ${r.color}`, borderRadius: '20px', padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: r.color, fontSize: '18px', fontWeight: 'bold' }}>{r.name}</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{r.price}</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#ff3b30', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>BUY VIA DISCORD</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'crates' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: '1.5px solid #d69e2e', borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
              <div style={{ color: '#ecc94b', fontWeight: 'bold', fontSize: '16px' }}>Master Crate</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '8px 0' }}>₹150</div>
            </div>
            <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(10px)', border: '1.5px solid #805ad5', borderRadius: '20px', padding: '18px', textAlign: 'center' }}>
              <div style={{ color: '#b794f4', fontWeight: 'bold', fontSize: '16px' }}>God Crate</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', margin: '8px 0' }}>₹450</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
