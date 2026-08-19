'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks' | 'crates'>('dashboard');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(77);
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null);

  const DISCORD_RANK_PAYMENT_URL = "https://discord.gg/wR7UZzWakM";

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/amd-9-1.skyraincloud.in:19144')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          setOnlineCount(data.players?.online || 0);
          setMaxPlayers(77);
          if (data.players?.list) {
            setPlayers(data.players.list);
          } else {
            setPlayers([]);
          }
        }
      })
      .catch(() => {});
  }, []);

  const copyToClipboard = (text: string, type: 'java' | 'bedrock') => {
    navigator.clipboard.writeText(text);
    if (type === 'java') {
      setCopiedJava(true);
      setTimeout(() => setCopiedJava(false), 2000);
    } else {
      setCopiedBedrock(true);
      setTimeout(() => setCopiedBedrock(false), 2000);
    }
  };

  const cardStyle = {
    backgroundColor: 'rgba(18, 18, 18, 0.85)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '20px',
    marginBottom: '16px'
  };

  const buttonStyle = {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    width: '100%',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const linkBoxStyle = {
    display: 'block',
    padding: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    textDecoration: 'none',
    marginBottom: '10px'
  };

  const tagBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    marginBottom: '8px'
  };

  const buyButtonStyle = {
    backgroundColor: '#5865F2',
    color: '#ffffff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as const
  };

  const crateCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '10px'
  };

  const crateList = [
    {
      id: 'master',
      name: 'Master Crate',
      price: '₹150',
      sub: '7 Keys included',
      color: '#eab308',
      icon: '📦',
      imageUrl: 'https://i.postimg.cc/L6GM2JXJ/Screenshot-20260820-004855-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'god',
      name: 'God Crate',
      price: '₹450',
      sub: '7 Keys included',
      color: '#a855f7',
      icon: '🔮',
      imageUrl: 'https://i.postimg.cc/hPzHyKrK/Screenshot-20260820-004918-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'spawner',
      name: 'Spawner Crate',
      price: '₹220',
      sub: '7 Keys included',
      color: '#3b82f6',
      icon: '⚙️',
      imageUrl: 'https://i.postimg.cc/nVjJ5KVp/Screenshot-20260820-004906-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'silver',
      name: 'Silver Crate',
      price: 'Playable',
      sub: '1 Hour = 2 Keys',
      color: '#9ca3af',
      icon: '🛡️',
      imageUrl: 'https://i.postimg.cc/K8Qw44c7/Screenshot-20260820-004928-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'key',
      name: 'Key Crate',
      price: '₹410',
      sub: '7 Keys included',
      color: '#ec4899',
      icon: '🔑',
      imageUrl: 'https://i.postimg.cc/PfZ7YSrP/Screenshot-20260820-004935-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    }
  ];

  const ranksList = [
    { name: 'VIP', price: '₹200', bg: 'rgba(234, 179, 8, 0.15)', border: '#eab308', color: '#eab308' },
    { name: 'VIP++', price: '₹280', bg: 'rgba(234, 179, 8, 0.25)', border: '#eab308', color: '#facc15' },
    { name: 'MVP', price: '₹190', bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', color: '#3b82f6' },
    { name: 'MVP++', price: '₹240', bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', color: '#c084fc' }
  ];

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Header Logo */}
      <h1 style={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        THEHEROS<span style={{ color: '#ffffff' }}>SMP</span>
      </h1>

      {/* Navigation Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '6px', borderRadius: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ padding: '8px 4px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Dashboard</button>
        <button onClick={() => setActiveTab('community')} style={{ padding: '8px 4px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', backgroundColor: activeTab === 'community' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Community</button>
        <button onClick={() => setActiveTab('ranks')} style={{ padding: '8px 4px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', backgroundColor: activeTab === 'ranks' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Ranks & Tags</button>
        <button onClick={() => setActiveTab('crates')} style={{ padding: '8px 4px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', backgroundColor: activeTab === 'crates' ? '#dc2626' : 'transparent', color: '#ffffff' }}>🎁 Crates</button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 8px 0' }}>THE ULTIMATE MINECRAFT SMP</h2>
            <p style={{ color: '#aaaaaa', fontSize: '14px', margin: 0 }}>Crossplay Survival Network (Java & Bedrock)</p>
          </div>

          <div style={cardStyle}>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>● JAVA EDITION</span>
            <p style={{ margin: '8px 0', fontFamily: 'monospace' }}>amd-9-1.skyraincloud.in:19144</p>
            <button onClick={() => copyToClipboard('amd-9-1.skyraincloud.in:19144', 'java')} style={buttonStyle}>{copiedJava ? 'COPIED!' : 'COPY JAVA IP'}</button>
          </div>

          <div style={cardStyle}>
            <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>● BEDROCK EDITION</span>
            <p style={{ margin: '8px 0 4px 0', fontFamily: 'monospace' }}>IP: amd-9-1.skyraincloud.in</p>
            <p style={{ margin: '0', fontFamily: 'monospace' }}>Port: 19144</p>
            <button onClick={() => copyToClipboard('amd-9-1.skyraincloud.in', 'bedrock')} style={buttonStyle}>{copiedBedrock ? 'COPIED!' : 'COPY BEDROCK IP'}</button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '18px', margin: '0 0 12px 0' }}>
              <span style={{ color: '#22c55e' }}>●</span> Live Online Players ({onlineCount}/77)
            </h3>
            {players.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {players.map((player, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '6px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://mc-heads.net/avatar/${player}/24`} alt={player} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{player}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888888', fontStyle: 'italic', margin: 0 }}>No players online right now.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNITY */}
      {activeTab === 'community' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>Join Our Community</h2>
          <a href="https://discord.gg/wR7UZzWakM" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#5865F2', fontSize: '16px' }}>👾 Discord Server</div></a>
          <a href="https://www.instagram.com/modihater7" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#E1306C', fontSize: '16px' }}>📸 Instagram Page</div></a>
          <a href="https://ig.me/j/AbbBXSakl1QBm9YN/" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#F77737', fontSize: '16px' }}>💬 Instagram Group Chat</div></a>
        </div>
      )}

      {/* TAB 3: RANKS & TAGS */}
      {activeTab === 'ranks' && (
        <div>
          {/* Ranks Section */}
          <div style={cardStyle}>
            <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>👑 Server Ranks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {ranksList.map((rank, i) => (
                <div key={i} style={{ background: rank.bg, border: `1px solid ${rank.border}`, padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: rank.color, fontSize: '16px' }}>{rank.name}</div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>{rank.price}</div>
                  </div>
                  <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>
                    🛒 BUY RANK
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div style={cardStyle}>
            <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>🏷️ Server Tags</h2>
            
            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#f97316' }}>OG_BUILDER</span>
              <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}>PLAYABLE GIFT</span>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#06b6d4' }}>ADVANCED BUILDER</span>
              <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}>PLAYABLE GIFT</span>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>BASIC BUILDER</span>
              <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}>PLAYABLE GIFT</span>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#6b7280' }}>NOOB (₹80)</span>
              <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>BUY TAG</a>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#ef4444' }}>PRO (₹75)</span>
              <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>BUY TAG</a>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#84cc16' }}>GAREEB (₹100)</span>
              <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>BUY TAG</a>
            </div>

            <div style={tagBoxStyle}>
              <span style={{ fontWeight: 'bold', color: '#a855f7' }}>ALPHA (₹149)</span>
              <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>BUY TAG</a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CRATES WITH IMAGE PREVIEWS */}
      {activeTab === 'crates' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>🎁 Server Crates & Rewards</h2>
          
          {crateList.map((crate) => (
            <div key={crate.id} style={crateCardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{crate.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: crate.color, fontSize: '16px' }}>{crate.name}</div>
                  <div style={{ color: '#aaaaaa', fontSize: '12px' }}>{crate.sub}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#22c55e', marginRight: '8px' }}>{crate.price}</div>
                {crate.price !== 'Playable' && (
                  <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={buyButtonStyle}>
                    BUY
                  </a>
                )}
              </div>
              
              <button 
                onClick={() => setSelectedCrate(selectedCrate === crate.id ? null : crate.id)} 
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', width: '100%', padding: '8px', borderRadius: '6px', marginTop: '10px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                {selectedCrate === crate.id ? '▼ Hide Rewards Photo' : '📷 View Rewards Photo'}
              </button>

              {selectedCrate === crate.id && (
                <div style={{ marginTop: '10px', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={crate.imageUrl} alt={crate.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
