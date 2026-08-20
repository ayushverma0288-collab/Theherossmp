'use client';
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '16px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        
        <h1 style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center', margin: '10px 0 20px 0' }}>
          <span style={{ color: '#e53e3e' }}>THEHERO</span>
          <span style={{ color: '#ffffff' }}>SMP</span>
        </h1>

        <div style={{
          backgroundColor: 'rgba(18, 18, 18, 0.95)',
          borderRadius: '16px',
          padding: '6px',
          display: 'flex',
          justify: 'space-around',
          marginBottom: '20px'
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
                backgroundColor: activeTab === tab.id ? '#e53e3e' : 'transparent',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '8px 10px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderRadius: '20px', padding: '18px', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Server Status</span>
                <span style={{ fontSize: '20px', color: '#e53e3e', fontWeight: 'bold' }}>1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '13px' }}>
                <span style={{ color: '#38a169', fontWeight: 'bold' }}>● ONLINE</span>
                <span style={{ color: '#a0aec0' }}>Players Online</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderRadius: '20px', padding: '18px', color: '#fff' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Java Edition</h3>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '14px' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>
                COPY JAVA IP
              </button>
            </div>

            <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', borderRadius: '20px', padding: '18px', color: '#fff' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Bedrock / PE Edition</h3>
              <p style={{ fontSize: '12px', color: '#a0aec0' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ fontSize: '12px', color: '#a0aec0', marginBottom: '14px' }}>Port: 19144</p>
              <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>
                COPY BEDROCK IP
              </button>
            </div>
          </div>
        )}

        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.95)', borderRadius: '24px', padding: '20px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ color: '#e53e3e', fontSize: '18px', fontWeight: 'bold', marginBottom: '6px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ color: '#a0aec0', fontSize: '12px', marginBottom: '16px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>
            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '10px' }} />
            <input type="text" placeholder="Admin Passcode / Referral (Optional)" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: '#000', border: '1px solid #333', color: 'white', marginBottom: '16px' }} />
            <div style={{ margin: '20px auto', width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #e53e3e', background: 'conic-gradient(#38a169 0deg 51deg, #ecc94b 51deg 102deg, #00b4d8 102deg 153deg, #ed8936 153deg 204deg, #4a5568 204deg 255deg, #9f7aea 255deg 306deg, #3182ce 306deg 360deg)' }} />
            <button style={{ width: '100%', backgroundColor: '#4a5568', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>
              SPIN AGAIN IN 24H ⏳
            </button>
          </div>
        )}

        {activeTab === 'social' && (
          <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.95)', borderRadius: '24px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', color: '#fff' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Join Our Community</h2>
            <button style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>JOIN DISCORD SERVER 💬</button>
            <button style={{ backgroundColor: '#E1306C', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>FOLLOW INSTAGRAM PROFILE 📸</button>
            <button style={{ backgroundColor: '#C13584', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: 'bold' }}>JOIN INSTAGRAM GROUP CHAT 💬</button>
          </div>
        )}

        {activeTab === 'rank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#fff' }}>
            {[{ name: 'VIP Rank', price: '₹200', color: '#ecc94b' }, { name: 'VIP++ Rank', price: '₹280', color: '#ecc94b' }, { name: 'MVP Rank', price: '₹190', color: '#63b3ed' }, { name: 'MVP++ Rank', price: '₹240', color: '#b794f4' }].map((r, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(18, 18, 18, 0.85)', border: `1.5px solid ${r.color}`, borderRadius: '20px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: r.color, fontSize: '18px', fontWeight: 'bold' }}>{r.name}</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{r.price}</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontWeight: 'bold' }}>BUY VIA DISCORD 🛒</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'crates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #d69e2e', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#ecc94b', fontWeight: 'bold' }}>Master Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹150</div>
              </div>
              <div style={{ backgroundColor: 'rgba(18, 18, 18, 0.9)', border: '1.5px solid #805ad5', borderRadius: '20px', padding: '14px', textAlign: 'center' }}>
                <div style={{ color: '#b794f4', fontWeight: 'bold' }}>God Crate</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>₹450</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
