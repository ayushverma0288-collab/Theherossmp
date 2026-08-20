'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks' | 'crates' | 'spin'>('dashboard');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null);

  // Spin Wheel States
  const [username, setUsername] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1539869461954306048/DvR9UTenWMiPiMl_imqtHxbm64SynzROOhDDsQi1Ae-xgmkjIaQMOy-2T_bx90a43J5"; 
  const DISCORD_RANK_PAYMENT_URL = "https://discord.gg/wR7UZzWakM";

  const spinRewards = [
    { id: 1, name: '32 Golden Apples', shortText: '32 G-Apple', color: '#eab308', icon: 'https://i.postimg.cc/CMJqVjsK/1423-goldenapple.png', command: '/give %PLAYER% golden_apple 32' },
    { id: 2, name: '20 Diamond Blocks', shortText: '20 Dia Block', color: '#06b6d4', icon: 'https://i.postimg.cc/BQktqNLg/4178-mc-diamond-block.png', command: '/give %PLAYER% diamond_block 20' },
    { id: 3, name: 'Totem of Undying', shortText: 'Totem', color: '#f59e0b', icon: 'https://i.postimg.cc/BvcvB0hx/7301-totem-mc.png', command: '/give %PLAYER% totem_of_undying 1' },
    { id: 4, name: '1 Netherite Ingot', shortText: 'Netherite', color: '#4b5563', icon: 'https://i.postimg.cc/rszFTtqh/5032-Netherite-ingot.png', command: '/give %PLAYER% netherite_ingot 1' },
    { id: 5, name: '1 Enchanted G-Apple', shortText: 'God Apple', color: '#a855f7', icon: 'https://i.postimg.cc/wBV6skvV/2024-enchantedgoldenapple.png', command: '/give %PLAYER% enchanted_golden_apple 1' },
    { id: 6, name: '1 Hour Fly Pass', shortText: 'Fly Pass', color: '#3b82f6', icon: 'https://i.postimg.cc/GtBrVwjj/6758-Elytra.png', command: '/tempgrant %PLAYER% fly 1h' },
    { id: 7, name: '10k In-Game Cash', shortText: '$10k Cash', color: '#22c55e', icon: 'https://i.postimg.cc/d3zvKHHc/7347-minecraftmoney.png', command: '/eco give %PLAYER% 10000' },
  ];

  useEffect(() => {
    const savedTime = localStorage.getItem('last_spin_time');
    if (savedTime) {
      setLastSpinTime(parseInt(savedTime, 10));
    }

    const fetchPlayers = async () => {
      try {
        let res = await fetch(`https://api.mcsrvstat.us/bedrock/3/amd-9-1.skyraincloud.in:19144?t=${Date.now()}`);
        let data = await res.json();

        if (!data || !data.online || data.players?.online === 0) {
          res = await fetch(`https://api.mcsrvstat.us/3/amd-9-1.skyraincloud.in:19144?t=${Date.now()}`);
          data = await res.json();
        }

        if (data && data.online) {
          setOnlineCount(data.players?.online || 0);
          if (data.players && Array.isArray(data.players.list)) {
            setPlayers(data.players.list);
          } else {
            setPlayers([]);
          }
        } else {
          setOnlineCount(0);
          setPlayers([]);
        }
      } catch {
        setOnlineCount(0);
        setPlayers([]);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 10000);
    return () => clearInterval(interval);
  }, []);

  const canSpin = () => {
    if (!lastSpinTime) return true;
    const now = Date.now();
    const hoursPassed = (now - lastSpinTime) / (1000 * 60 * 60);
    return hoursPassed >= 24;
  };

  const sendDiscordNotification = async (playerName: string, rewardName: string, command: string) => {
    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🎉 NEW DAILY SPIN REWARD CLAIMED!',
            color: 15158332,
            fields: [
              { name: '👤 Player Gamertag', value: `\`${playerName}\``, inline: true },
              { name: '🎁 Reward Won', value: `**${rewardName}**`, inline: true },
              { name: '💻 Admin Console Command', value: `\`\`\`${command.replace('%PLAYER%', playerName)}\`\`\`` }
            ],
            footer: { text: 'TheHerosSMP Web Reward System' },
            timestamp: new Date().toISOString()
          }]
        })
      });
    } catch (e) {
      console.error("Failed to send webhook notification", e);
    }
  };

  const handleSpin = () => {
    if (!username.trim()) {
      alert('Please enter your Minecraft Gamertag first!');
      return;
    }
    if (!canSpin()) {
      alert('You can only spin once every 24 hours!');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setWonReward(null);

    const randomIndex = Math.floor(Math.random() * spinRewards.length);
    const selected = spinRewards[randomIndex];

    const degreesPerSlice = 360 / spinRewards.length;
    const targetSliceDegree = 360 - (randomIndex * degreesPerSlice);
    const extraRounds = 360 * 5;
    const totalNewRotation = wheelRotation + extraRounds + targetSliceDegree;

    setWheelRotation(totalNewRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(selected.name);
      const now = Date.now();
      setLastSpinTime(now);
      localStorage.setItem('last_spin_time', now.toString());

      sendDiscordNotification(username, selected.name, selected.command);
    }, 4000);
  };

  const copyToClipboard = (text: string, type: 'java' | 'bedrock') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'java') {
        setCopiedJava(true);
        setTimeout(() => setCopiedJava(false), 2000);
      } else {
        setCopiedBedrock(true);
        setTimeout(() => setCopiedBedrock(false), 2000);
      }
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
    { id: 'master', name: 'Master Crate', price: '₹150', sub: '7 Keys included', color: '#eab308', icon: '📦', imageUrl: 'https://i.postimg.cc/L6GM2JXJ/Screenshot-20260820-004855-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg' },
    { id: 'god', name: 'God Crate', price: '₹450', sub: '7 Keys included', color: '#a855f7', icon: '🔮', imageUrl: 'https://i.postimg.cc/hPzHyKrK/Screenshot-20260820-004918-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg' },
    { id: 'spawner', name: 'Spawner Crate', price: '₹220', sub: '7 Keys included', color: '#3b82f6', icon: '⚙️', imageUrl: 'https://i.postimg.cc/nVjJ5KVp/Screenshot-20260820-004906-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg' },
    { id: 'silver', name: 'Silver Crate', price: 'Playable', sub: '1 Hour = 2 Keys', color: '#9ca3af', icon: '🛡️', imageUrl: 'https://i.postimg.cc/K8Qw44c7/Screenshot-20260820-004928-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg' },
    { id: 'key', name: 'Key Crate', price: '₹410', sub: '7 Keys included', color: '#ec4899', icon: '🔑', imageUrl: 'https://i.postimg.cc/PfZ7YSrP/Screenshot-20260820-004935-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg' }
  ];

  const ranksList = [
    { name: 'VIP', price: '₹200', bg: 'rgba(234, 179, 8, 0.15)', border: '#eab308', color: '#eab308' },
    { name: 'VIP++', price: '₹280', bg: 'rgba(234, 179, 8, 0.25)', border: '#eab308', color: '#facc15' },
    { name: 'MVP', price: '₹190', bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', color: '#3b82f6' },
    { name: 'MVP++', price: '₹240', bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', color: '#c084fc' }
  ];

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        THEHEROS<span style={{ color: '#ffffff' }}>SMP</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '6px', borderRadius: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Home</button>
        <button onClick={() => setActiveTab('spin')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'spin' ? '#dc2626' : 'transparent', color: '#ffffff' }}>🎡 Spin</button>
        <button onClick={() => setActiveTab('community')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'community' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Social</button>
        <button onClick={() => setActiveTab('ranks')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'ranks' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Ranks</button>
        <button onClick={() => setActiveTab('crates')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'crates' ? '#dc2626' : 'transparent', color: '#ffffff' }}>🎁 Crates</button>
      </div>

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
              <p style={{ color: '#888888', fontStyle: 'italic', margin: 0 }}>
                {onlineCount > 0 ? `${onlineCount} player(s) online` : 'No players online right now.'}
              </p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'spin' && (
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '22px' }}>🎡 Daily Reward Wheel</h2>
          <p style={{ color: '#aaaaaa', fontSize: '13px', marginBottom: '20px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>

          <input
            type="text"
            placeholder="Enter Minecraft Gamertag"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#ffffff',
              fontSize: '14px',
              marginBottom: '20px',
              textAlign: 'center',
              outline: 'none'
            }}
          />

          <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 20px auto' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '20px solid #dc2626',
              zIndex: 10
            }}></div>

            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '4px solid #dc2626',
              position: 'relative',
              overflow: 'hidden',
              transform: `rotate(${wheelRotation}deg)`,
              transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              background: 'conic-gradient(#eab308 0 51.4deg, #06b6d4 51.4deg 102.8deg, #f59e0b 102.8deg 154.2deg, #4b5563 154.2deg 205.6deg, #a855f7 205.6deg 257deg, #3b82f6 257deg 308.4deg, #22c55e 308.4deg 360deg)'
            }}>
              {spinRewards.map((item, index) => {
                const angle = (index * (360 / spinRewards.length)) + (360 / spinRewards.length / 2);
                return (
                  <div key={item.id} style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '0px',
                    height: '0px',
                    transform: `rotate(${angle}deg) translateY(-90px) rotate(-${angle}deg)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.icon} alt={item.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#ffffff', textShadow: '1px 1px 2px #000', whiteSpace: 'nowrap' }}>{item.shortText}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning || !canSpin()}
            style={{
              ...buttonStyle,
              backgroundColor: canSpin() ? '#dc2626' : '#4b5563',
              cursor: canSpin() ? 'pointer' : 'not-allowed',
              opacity: isSpinning ? 0.7 : 1
            }}>
            {isSpinning ? 'SPINNING...' : canSpin() ? 'SPIN THE WHEEL 🎯' : 'SPIN AGAIN IN 24H ⏳'}
          </button>

          {wonReward && (
            <div style={{ marginTop: '16px', padding: '14px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', borderRadius: '8px' }}>
              <h3 style={{ margin: 0, color: '#22c55e', fontSize: '18px' }}>🎉 Congratulations {username}!</h3>
              <p style={{ margin: '6px 0 0 0', fontSize: '15px' }}>You won: <strong>{wonReward}</strong>!</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#aaaaaa' }}>Your reward log has been sent to server admins via Discord!</p>
            </div>
          )}

          <div style={{ marginTop: '24px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#eab308' }}>🏆 Possible Wheel Rewards:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '6px' }}>
              {spinRewards.map((r) => (
                <div key={r.id} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.icon} alt={r.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                  <span style={{ fontWeight: 'bold' }}>{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div style={cardStyle}>
          <h2 style={{ color: '#dc2626', margin: '0 0 16px 0', fontSize: '20px' }}>Join Our Community</h2>
          <a href="https://discord.gg/wR7UZzWakM" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#5865F2', fontSize: '16px' }}>👾 Discord Server</div></a>
          <a href="https://www.instagram.com/modihater7" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#E1306C', fontSize: '16px' }}>📸 Instagram Page</div></a>
          <a href="https://ig.me/j/AbbBXSakl1QBm9YN/" target="_blank" rel="noreferrer" style={linkBoxStyle}><div style={{ fontWeight: 'bold', color: '#F77737', fontSize: '16px' }}>💬 Instagram Group Chat</div></a>
        </div>
      )}

      {activeTab === 'ranks' && (
        <div>
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
