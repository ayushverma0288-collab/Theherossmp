'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MainComponent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks' | 'crates' | 'spin'>('dashboard');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null);

  // Spin Wheel States
  const [username, setUsername] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);

  const [myRefCode, setMyRefCode] = useState('');
  const [extraSpins, setExtraSpins] = useState<number>(0);

  const SECRET_ADMIN_PASS = "mrayushdr143";
  const DISCORD_RANK_PAYMENT_URL = "https://discord.gg/wR7UZzWakM";
  const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/modihater7?igsh=MWpnNWsyNzY0dHRzcA==";
  const INSTAGRAM_GROUP_URL = "https://ig.me/j/AbbBXSakl1QBm9YN/";

  const spinRewards = [
    { 
      id: 1, 
      name: '32 Golden Apples', 
      shortText: '32 G-Apple', 
      command: '/give %PLAYER% golden_apple 32',
      icon: 'https://i.postimg.cc/RCRXbspx/1423-goldenapple.png'
    },
    { 
      id: 2, 
      name: '20 Diamond Blocks', 
      shortText: '20 Dia Block', 
      command: '/give %PLAYER% diamond_block 20',
      icon: 'https://i.postimg.cc/qRQyQYJP/6626-mc-diamond.png'
    },
    { 
      id: 3, 
      name: 'Totem of Undying', 
      shortText: 'Totem', 
      command: '/give %PLAYER% totem_of_undying 1',
      icon: 'https://i.postimg.cc/j2FNY7J1/7301-totem-mc.png'
    },
    { 
      id: 4, 
      name: '1 Netherite Ingot', 
      shortText: 'Netherite', 
      command: '/give %PLAYER% netherite_ingot 1',
      icon: 'https://i.postimg.cc/W3ftdPbc/5032-Netherite-ingot.png'
    },
    { 
      id: 5, 
      name: '1 Enchanted G-Apple', 
      shortText: 'God Apple', 
      command: '/give %PLAYER% enchanted_golden_apple 1',
      icon: 'https://i.postimg.cc/hPmht6FD/2024-enchantedgoldenapple.png'
    },
    { 
      id: 6, 
      name: '1 Hour Fly Pass', 
      shortText: 'Fly Pass', 
      command: '/tempgrant %PLAYER% fly 1h',
      icon: 'https://i.postimg.cc/50j2dkq4/6758-Elytra.png'
    },
    { 
      id: 7, 
      name: '10k In-Game Cash', 
      shortText: '$10k Cash', 
      command: '/eco give %PLAYER% 10000',
      icon: 'https://i.postimg.cc/mkHZhz5n/7347-minecraftmoney.png'
    },
  ];

  useEffect(() => {
    let ref = localStorage.getItem('my_referral_code');
    if (!ref) {
      ref = 'HERO-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      localStorage.setItem('my_referral_code', ref);
    }
    setMyRefCode(ref);

    const savedExtraSpins = localStorage.getItem('extra_spins_count');
    if (savedExtraSpins) setExtraSpins(parseInt(savedExtraSpins, 10));

    const savedTime = localStorage.getItem('last_spin_time');
    if (savedTime) setLastSpinTime(parseInt(savedTime, 10));

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
        } else {
          setOnlineCount(0);
        }
      } catch {
        setOnlineCount(0);
      }
    };

    fetchPlayers();
    const interval = setInterval(fetchPlayers, 10000);
    return () => clearInterval(interval);
  }, [searchParams]);

  const isAdmin = () => adminPasscode.trim() === SECRET_ADMIN_PASS || username.trim() === SECRET_ADMIN_PASS;

  const canSpin = () => {
    if (isAdmin()) return true;
    if (extraSpins > 0) return true;
    if (!lastSpinTime) return true;
    return (Date.now() - lastSpinTime) / (1000 * 60 * 60) >= 24;
  };

  const sendDiscordNotification = async (playerName: string, rewardName: string, command: string) => {
    try {
      await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, rewardName, command })
      });
    } catch (e) {
      console.error("Discord API fail", e);
    }
  };

  const handleSpin = () => {
    if (!username.trim()) {
      alert('Pehle apna Minecraft Gamertag daalein!');
      return;
    }
    if (!canSpin()) {
      alert('24 Hours ka Cooldown active hai!');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setWonReward(null);

    const totalSlices = spinRewards.length;
    const sliceAngle = 360 / totalSlices;
    const randomIndex = Math.floor(Math.random() * totalSlices);
    const selected = spinRewards[randomIndex];

    const targetAngle = (totalSlices - randomIndex) * sliceAngle - (sliceAngle / 2);
    const fullSpins = 360 * 5;
    const currentOffset = wheelRotation % 360;
    const newRotation = wheelRotation + fullSpins + ((targetAngle - currentOffset + 360) % 360);

    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(selected.name);

      if (!isAdmin()) {
        if (extraSpins > 0) {
          const newExtra = extraSpins - 1;
          setExtraSpins(newExtra);
          localStorage.setItem('extra_spins_count', newExtra.toString());
        } else {
          const now = Date.now();
          setLastSpinTime(now);
          localStorage.setItem('last_spin_time', now.toString());
        }
      }

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

  const crateList = [
    {
      id: 'master',
      name: 'Master Crate',
      price: '₹150',
      sub: '7 Keys included',
      color: '#eab308',
      image: 'https://i.postimg.cc/nhpJvwWR/Screenshot-20260820-004855-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'god',
      name: 'God Crate',
      price: '₹450',
      sub: '7 Keys included',
      color: '#a855f7',
      image: 'https://i.postimg.cc/XJFH1nG5/Screenshot-20260820-004918-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'spawner',
      name: 'Spawner Crate',
      price: '₹220',
      sub: '7 Keys included',
      color: '#3b82f6',
      image: 'https://i.postimg.cc/dVx5qhG7/Screenshot-20260820-004906-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'silver',
      name: 'Silver Crate',
      price: 'Playable',
      sub: '1 Hour = 2 Keys',
      color: '#9ca3af',
      image: 'https://i.postimg.cc/Xq482d6w/Screenshot-20260820-004928-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    },
    {
      id: 'key',
      name: 'Key Crate',
      price: '₹410',
      sub: '7 Keys included',
      color: '#ec4899',
      image: 'https://i.postimg.cc/YChxytZT/Screenshot-20260820-004935-Mojo-Launcher-(Minecraft-Java-Edition-for-Android).jpg'
    }
  ];

  const ranksList = [
    { name: 'VIP', price: '₹200', bg: 'rgba(234, 179, 8, 0.15)', border: '#eab308', color: '#eab308' },
    { name: 'VIP++', price: '₹280', bg: 'rgba(234, 179, 8, 0.25)', border: '#eab308', color: '#facc15' },
    { name: 'MVP', price: '₹190', bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', color: '#3b82f6' },
    { name: 'MVP++', price: '₹240', bg: 'rgba(168, 85, 247, 0.2)', border: '#a855f7', color: '#c084fc' }
  ];

  const playableTags = [
    { name: 'OG_BUILDER', type: 'Playable Tag', desc: 'Earnable in-game' },
    { name: 'ADVANCED BUILDER', type: 'Playable Tag', desc: 'Earnable in-game' },
    { name: 'BASIC BUILDER', type: 'Playable Tag', desc: 'Earnable in-game' }
  ];

  const paidTags = [
    { name: 'GAREEB Tag', price: '₹100', duration: '1 MONTH', color: '#ef4444' },
    { name: 'NOOB Tag', price: '₹80', duration: '20 DAYS', color: '#f97316' },
    { name: 'PRO Tag', price: '₹80', duration: '30 DAYS', color: '#10b981' },
    { name: 'GALAXY Tag', price: '₹90', duration: '25 DAYS', color: '#8b5cf6' },
    { name: 'ALPHA Tag', price: '₹140', duration: '2 MONTHS', color: '#06b6d4' }
  ];

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <div>
        <h1 style={{ color: '#dc2626', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          THEHEROS<span style={{ color: '#ffffff' }}>SMP</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '6px', borderRadius: '10px', marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Home</button>
          <button onClick={() => setActiveTab('spin')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'spin' ? '#dc2626' : 'transparent', color: '#ffffff' }}>🎡 Spin</button>
          <button onClick={() => setActiveTab('community')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'community' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Social</button>
          <button onClick={() => setActiveTab('ranks')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'ranks' ? '#dc2626' : 'transparent', color: '#ffffff' }}>Rank/Tag</button>
          <button onClick={() => setActiveTab('crates')} style={{ padding: '8px 2px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', backgroundColor: activeTab === 'crates' ? '#dc2626' : 'transparent', color: '#ffffff' }}>🎁 Crates</button>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <>
            <div style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Server Status</h2>
                  <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: 'bold' }}>● ONLINE</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626' }}>{onlineCount}</div>
                  <div style={{ fontSize: '12px', color: '#aaaaaa' }}>Players Online</div>
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Java Edition</h3>
              <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#aaaaaa' }}>IP: amd-9-1.skyraincloud.in:19144</p>
              <button onClick={() => copyToClipboard('amd-9-1.skyraincloud.in:19144', 'java')} style={buttonStyle}>
                {copiedJava ? 'COPIED!' : 'COPY JAVA IP'}
              </button>
            </div>

            <div style={cardStyle}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Bedrock / PE Edition</h3>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#aaaaaa' }}>IP: amd-9-1.skyraincloud.in</p>
              <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#aaaaaa' }}>Port: 19144</p>
              <button onClick={() => copyToClipboard('amd-9-1.skyraincloud.in', 'bedrock')} style={buttonStyle}>
                {copiedBedrock ? 'COPIED!' : 'COPY BEDROCK IP'}
              </button>
            </div>

            {/* SERVER OWNER & ADMIN CARD */}
            <div style={{ ...cardStyle, borderLeft: '4px solid #dc2626' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#dc2626', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>👑 Server Owner & Admin</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#eab308' }}>👑 Server Owner</span>
                  <span style={{ fontSize: '14px', backgroundColor: 'rgba(234, 179, 8, 0.2)', padding: '4px 10px', borderRadius: '6px', border: '1px solid #eab308', fontWeight: 'bold', color: '#facc15' }}>Sriyash Rajesh Pagi</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#a855f7' }}>⚡ Server Admin</span>
                  <span style={{ fontSize: '14px', backgroundColor: 'rgba(168, 85, 247, 0.2)', padding: '4px 10px', borderRadius: '6px', border: '1px solid #a855f7', fontWeight: 'bold', color: '#c084fc' }}>Samosa_bhaiya</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SPIN WHEEL TAB */}
        {activeTab === 'spin' && (
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <h2 style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '22px' }}>🎡 Daily Reward Wheel</h2>
            <p style={{ color: '#aaaaaa', fontSize: '13px', marginBottom: '16px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Enter Minecraft Gamertag"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '90%',
                  maxWidth: '380px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#ffffff',
                  fontSize: '14px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  outline: 'none',
                  margin: '0 auto'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Admin Passcode / Referral (Optional)"
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                style={{
                  width: '90%',
                  maxWidth: '380px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: '#ffffff',
                  fontSize: '13px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  outline: 'none',
                  margin: '0 auto'
                }}
              />
            </div>

            {isAdmin() && (
              <div style={{ margin: '0 auto 16px auto', maxWidth: '380px', padding: '6px', backgroundColor: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '6px', fontSize: '12px', color: '#eab308', fontWeight: 'bold' }}>
                ⚡ ADMIN MODE ACTIVE: UNLIMITED SPINS!
              </div>
            )}

            <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto 20px auto' }}>
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
                      transform: `rotate(${angle}deg) translateY(-95px) rotate(-${angle}deg)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img src={item.icon} alt={item.shortText} style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }} />
                      <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#ffffff', textShadow: '1px 1px 3px #000', whiteSpace: 'nowrap', marginTop: '2px' }}>{item.shortText}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || !canSpin()}
              style={{
                backgroundColor: canSpin() ? '#dc2626' : '#4b5563',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                width: '90%',
                maxWidth: '380px',
                cursor: canSpin() ? 'pointer' : 'not-allowed',
                opacity: isSpinning ? 0.7 : 1
              }}>
              {isSpinning ? 'SPINNING...' : canSpin() ? 'SPIN THE WHEEL 🎯' : 'SPIN AGAIN IN 24H ⏳'}
            </button>

            {wonReward && (
              <div style={{ marginTop: '16px', padding: '14px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, color: '#22c55e', fontSize: '18px' }}>🎉 Congratulations {username}!</h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '15px' }}>You won: <strong>{wonReward}</strong>!</p>
              </div>
            )}
          </div>
        )}

        {/* SOCIAL / COMMUNITY TAB */}
        {activeTab === 'community' && (
          <div style={cardStyle}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', textAlign: 'center' }}>Join Our Community</h2>

            <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', marginBottom: '10px' }}>
              <button style={{ ...buttonStyle, backgroundColor: '#5865F2' }}>JOIN DISCORD SERVER 💬</button>
            </a>

            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', marginBottom: '10px' }}>
              <button style={{ ...buttonStyle, backgroundColor: '#E1306C' }}>FOLLOW INSTAGRAM PROFILE 📸</button>
            </a>

            <a href={INSTAGRAM_GROUP_URL} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
              <button style={{ ...buttonStyle, backgroundColor: '#C13584' }}>JOIN INSTAGRAM GROUP CHAT 💬</button>
            </a>
          </div>
        )}

        {/* RANK/TAG TAB */}
        {activeTab === 'ranks' && (
          <div>
            {/* Server Ranks Section */}
            <h2 style={{ color: '#dc2626', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #dc2626', paddingBottom: '6px' }}>👑 Server Ranks</h2>
            {ranksList.map((rank, i) => (
              <div key={i} style={{ ...cardStyle, backgroundColor: rank.bg, borderColor: rank.border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: rank.color, fontSize: '20px' }}>{rank.name} Rank</h3>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{rank.price}</span>
                </div>
                <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={buttonStyle}>BUY VIA DISCORD 🛒</button>
                </a>
              </div>
            ))}

            {/* Playable Tags Section */}
            <h2 style={{ color: '#22c55e', fontSize: '20px', fontWeight: 'bold', margin: '24px 0 12px 0', borderBottom: '2px solid #22c55e', paddingBottom: '6px' }}>🎮 Playable Tags (Free)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {playableTags.map((tag, i) => (
                <div key={i} style={{ ...cardStyle, borderLeft: '4px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#22c55e' }}>{tag.name}</h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#aaaaaa' }}>{tag.desc}</p>
                  </div>
                  <span style={{ padding: '4px 8px', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', color: '#22c55e' }}>PLAYABLE</span>
                </div>
              ))}
            </div>

            {/* Buyable Tags Section */}
            <h2 style={{ color: '#eab308', fontSize: '20px', fontWeight: 'bold', margin: '24px 0 12px 0', borderBottom: '2px solid #eab308', paddingBottom: '6px' }}>💎 Buyable Tags</h2>
            {paidTags.map((tag, i) => (
              <div key={i} style={{ ...cardStyle, borderLeft: `4px solid ${tag.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, color: tag.color, fontSize: '18px' }}>{tag.name}</h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#aaaaaa' }}>Validity: {tag.duration}</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{tag.price}</span>
                </div>
                <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{ ...buttonStyle, backgroundColor: tag.color }}>BUY TAG VIA DISCORD 🛒</button>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* CRATES TAB */}
        {activeTab === 'crates' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {crateList.map((crate) => (
                <div key={crate.id} onClick={() => setSelectedCrate(crate.id)} style={{ ...cardStyle, cursor: 'pointer', textAlign: 'center', borderColor: crate.color, padding: '12px' }}>
                  <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <img src={crate.image} alt={crate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ margin: '0 0 4px 0', color: crate.color, fontSize: '16px' }}>{crate.name}</h3>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px' }}>{crate.price}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#aaaaaa' }}>{crate.sub}</p>
                </div>
              ))}
            </div>

            {selectedCrate && (
              <div style={{ ...cardStyle, marginTop: '16px', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>Buy Keys for {crateList.find(c => c.id === selectedCrate)?.name}</h3>
                <a href={DISCORD_RANK_PAYMENT_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={buttonStyle}>PURCHASE ON DISCORD 💬</button>
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT BOTTOM SIGNATURE FOOTER */}
      <footer style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 0 10px 0', marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ fontSize: '12px', color: '#888888', background: 'rgba(0, 0, 0, 0.4)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', fontStyle: 'italic' }}>
          <span>Website made by </span>
          <span style={{ color: '#dc2626', fontWeight: 'bold', fontStyle: 'normal', textShadow: '0 0 8px rgba(220,38,38,0.5)' }}>Samosa_bhaiya ✨</span>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Loading...</div>}>
      <MainComponent />
    </Suspense>
  );
}
