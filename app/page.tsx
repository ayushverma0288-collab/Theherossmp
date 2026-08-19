'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks'>('dashboard');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.mcsrvstat.us/3/163.61.39.57:19144')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          setOnlineCount(data.players?.online || 0);
          setMaxPlayers(data.players?.max || 0);
          if (data.players?.list) {
            setPlayers(data.players.list);
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
    marginBottom: '10px',
    transition: 'background 0.2s'
  };

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      {/* Header Logo */}
      <h1 style={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        THEHEROS<span style={{ color: '#ffffff' }}>SMP</span>
      </h1>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '6px', borderRadius: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: activeTab === 'dashboard' ? '#dc2626' : 'transparent', color: '#ffffff'
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('community')}
          style={{
            flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: activeTab === 'community' ? '#dc2626' : 'transparent', color: '#ffffff'
          }}
        >
          Community & Socials
        </button>
        <button
          onClick={() => setActiveTab('ranks')}
          style={{
            flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
            backgroundColor: activeTab === 'ranks' ? '#dc2626' : 'transparent', color: '#ffffff'
          }}
        >
          Ranks & Tags
        </button>
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
            <p style={{ margin: '8px 0', fontFamily: 'monospace' }}>163.61.39.57:19144</p>
            <button onClick={() => copyToClipboard('163.61.39.57:19144', 'java')} style={buttonStyle}>
              {copiedJava ? 'COPIED!' : 'COPY JAVA IP'}
            </button>
          </div>

          <div style={cardStyle}>
            <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>● BEDROCK EDITION</span>
            <p style={{ margin: '8px 0 4px 0', fontFamily: 'monospace' }}>IP: 163.61.39.57</p>
            <p style={{ margin: '0', fontFamily: 'monospace' }}>Port: 19144</p>
            <button onClick={() => copyToClipboard('163.61.39.57', 'bedrock')} style={buttonStyle}>
              {copiedBedrock ? 'COPIED!' : 'COPY BEDROCK IP'}
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: '18px', margin: '0 0 12px 0' }}>
              <span style={{ color: '#22c55e' }}>●</span> Live Online Players ({onlineCount} / {maxPlayers})
            </h3>
            {players.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {players.map((player, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '6px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://mc-heads.net/avatar/${player}/24`} alt={player} style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                    <span style={{ fontSize: '14px' }}>{player}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#888888', fontStyle: 'italic', margin: 0 }}>
                {onlineCount > 0 ? "Players online." : "No players online right now."}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COMMUNITY & SOCIALS */}
      {activeTab === 'community' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>Join Our Community</h2>
          
          <a href="https://discord.gg/wR7UZzWakM" target="_blank" rel="noreferrer" style={linkBoxStyle}>
            <div style={{ fontWeight: 'bold', color: '#5865F2', fontSize: '16px' }}>👾 Discord Server</div>
            <div style={{ color: '#aaaaaa', fontSize: '12px', marginTop: '4px' }}>Join our Discord community for chat and updates.</div>
          </a>

          <a href="https://www.instagram.com/modihater7?igsh=MWpnNWsyNzY0dHRzcA==" target="_blank" rel="noreferrer" style={linkBoxStyle}>
            <div style={{ fontWeight: 'bold', color: '#E1306C', fontSize: '16px' }}>📸 Instagram Page</div>
            <div style={{ color: '#aaaaaa', fontSize: '12px', marginTop: '4px' }}>Follow us on Instagram for photos & reels.</div>
          </a>

          <a href="https://ig.me/j/AbbBXSakl1QBm9YN/" target="_blank" rel="noreferrer" style={linkBoxStyle}>
            <div style={{ fontWeight: 'bold', color: '#F77737', fontSize: '16px' }}>💬 Instagram Group Chat</div>
            <div style={{ color: '#aaaaaa', fontSize: '12px', marginTop: '4px' }}>Join our official Instagram group chat.</div>
          </a>
        </div>
      )}

      {/* TAB 3: RANKS & TAGS */}
      {activeTab === 'ranks' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#dc2626', margin: '0 0 12px 0' }}>Server Ranks</h2>
          <p style={{ color: '#cccccc' }}>Ranks & Perks store details coming soon!</p>
        </div>
      )}
    </main>
  );
}
