'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('spin');

  const spinItems = [
    { label: '$10k Cash', bg: '#4cd964', img: 'https://mc.nerdfonts.com/img/cash.png', emoji: '💵' },
    { label: '32 G-Apple', bg: '#ffcc00', img: 'https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png', emoji: '🍏' },
    { label: '20 Dia Block', bg: '#5ac8fa', img: 'https://minecraft.wiki/images/Block_of_Diamond_JE5_BE3.png', emoji: '💎' },
    { label: 'Totem', bg: '#ff9500', img: 'https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png', emoji: '🗿' },
    { label: 'Netherite', bg: '#5856d6', img: 'https://minecraft.wiki/images/Netherite_Ingot_JE2_BE2.png', emoji: '⬛' },
    { label: 'God Apple', bg: '#af52de', img: 'https://minecraft.wiki/images/Enchanted_Golden_Apple_JE2_BE2.gif', emoji: '🍎' },
    { label: 'Fly Pass', bg: '#007aff', img: 'https://minecraft.wiki/images/Elytra_JE2_BE2.png', emoji: '🛡️' }
  ];

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

        {/* Navigation Bar */}
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

        {/* SPIN TAB (EXACT PIXEL-PERFECT REPLICA) */}
        {activeTab === 'spin' && (
          <div style={{ backgroundColor: 'rgba(20, 20, 20, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px 20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ color: '#ff3b30', fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              🎡 Daily Reward Wheel
            </h2>
            <p style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '20px', lineHeight: '1.4' }}>
              Enter Gamertag & Spin every 24 Hours for free rewards!
            </p>

            <input type="text" placeholder="Enter Minecraft Gamertag" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#141414', border: '1px solid #333', color: 'white', marginBottom: '12px', outline: 'none', textAlign: 'center' }} />
            
            <input type="text" placeholder="Referral Code (Optional - Get 1 Extra Spin)" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#141414', border: '1px solid #ecc94b', color: '#ecc94b', marginBottom: '12px', outline: 'none', textAlign: 'center' }} />
            
            <input type="text" placeholder="Admin Passcode (Optional)" style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#141414', border: '1px solid #333', color: 'white', marginBottom: '24px', outline: 'none', textAlign: 'center' }} />

            {/* Wheel Container */}
            <div style={{ position: 'relative', width: '290px', height: '290px', margin: '0 auto 24px auto' }}>
              
              {/* Top Red Pointer Arrow */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderTop: '22px solid #ff3b30',
                zIndex: 30
              }} />

              {/* Exact Multi-Color Wheel */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '4px solid #ff3b30',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 25px rgba(0,0,0,0.7)'
              }}>
                <svg viewBox="0 0 300 300" style={{ width: '100%', height: '100%' }}>
                  {spinItems.map((item, index) => {
                    const totalSlices = 7;
                    const sliceAngle = 360 / totalSlices;
                    const startAngle = index * sliceAngle - 90;
                    const endAngle = (index + 1) * sliceAngle - 90;

                    const x1 = 150 + 150 * Math.cos((Math.PI * startAngle) / 180);
                    const y1 = 150 + 150 * Math.sin((Math.PI * startAngle) / 180);
                    const x2 = 150 + 150 * Math.cos((Math.PI * endAngle) / 180);
                    const y2 = 150 + 150 * Math.sin((Math.PI * endAngle) / 180);

                    const pathData = `M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`;

                    return (
                      <path key={index} d={pathData} fill={item.bg} stroke="#000" strokeWidth="1.5" />
                    );
                  })}
                </svg>

                {/* Upright Horizontal Overlay Labels and Icons */}
                {spinItems.map((item, index) => {
                  const totalSlices = 7;
                  const angle = (360 / totalSlices) * index + (360 / totalSlices / 2) - 90;
                  const radius = 95;
                  const rad = (angle * Math.PI) / 180;
                  const x = 145 + radius * Math.cos(rad);
                  const y = 145 + radius * Math.sin(rad);

                  return (
                    <div key={index} style={{
                      position: 'absolute',
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                      zIndex: 20
                    }}>
                      <img 
                        src={item.img} 
                        alt={item.label} 
                        style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span style={{
                        color: '#000000',
                        fontSize: '11px',
                        fontWeight: '900',
                        fontFamily: 'sans-serif',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        textShadow: '0px 0px 2px rgba(255,255,255,0.7)'
                      }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button style={{ width: '100%', backgroundColor: '#2c2c2e', color: '#8e8e93', border: '1px solid #3a3a3c', borderRadius: '12px', padding: '16px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
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
                  <div style={{ color: c.color, fontWeight: 'bold', fontSize: '15px' }}>{c.name}</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '2px 0' }}>{c.price}</div>
                  <p style={{ fontSize: '10px', color: '#a0aec0' }}>{c.keys}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
