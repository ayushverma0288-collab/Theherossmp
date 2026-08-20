'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MainComponent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'ranks' | 'crates' | 'spin'>('spin');
  const [copiedJava, setCopiedJava] = useState(false);
  const [copiedBedrock, setCopiedBedrock] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [selectedCrate, setSelectedCrate] = useState<string | null>(null);

  // Spin Wheel States
  const [username, setUsername] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonReward, setWonReward] = useState<string | null>(null);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);

  // Referral System & Admin Pass
  const [myRefCode, setMyRefCode] = useState('');
  const [usedRefCode, setUsedRefCode] = useState('');
  const [extraSpins, setExtraSpins] = useState<number>(0);
  const [copiedRef, setCopiedRef] = useState(false);

  // 🔑 Secret Admin Passcode
  const SECRET_ADMIN_PASS = "mrayushdr143";

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
    let ref = localStorage.getItem('my_referral_code');
    if (!ref) {
      ref = 'HERO-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      localStorage.setItem('my_referral_code', ref);
    }
    setMyRefCode(ref);

    const savedExtraSpins = localStorage.getItem('extra_spins_count');
    if (savedExtraSpins) {
      setExtraSpins(parseInt(savedExtraSpins, 10));
    }

    const urlRef = searchParams.get('ref');
    if (urlRef) {
      setUsedRefCode(urlRef);
    }

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
  }, [searchParams]);

  const isAdmin = () => adminPasscode.trim() === SECRET_ADMIN_PASS || username.trim() === SECRET_ADMIN_PASS;

  const canSpin = () => {
    if (isAdmin()) return true;
    if (extraSpins > 0) return true;
    if (!lastSpinTime) return true;
    const now = Date.now();
    const hoursPassed = (now - lastSpinTime) / (1000 * 60 * 60);
    return hoursPassed >= 24;
  };

  const sendDiscordNotification = async (playerName: string, rewardName: string, command: string) => {
    try {
      await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, rewardName, command })
      });
    } catch (e) {
      console.error("Failed to trigger API spin notification", e);
    }
  };

  const handleSpin = () => {
    if (!username.trim()) {
      alert('Please enter your Minecraft Gamertag first!');
      return;
    }
    if (!canSpin()) {
      alert('Cooldown active! Spin again in 24 Hours or use Admin Code.');
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);
    setWonReward(null);

    const totalSlices = spinRewards.length;
    const sliceAngle = 360 / totalSlices;
    const randomIndex = Math.floor(Math.random() * totalSlices);
    const selected = spinRewards[randomIndex];

    // Perfect alignment fix: arrow points at 0 degrees top
    const targetAngle = (totalSlices - randomIndex) * sliceAngle - (sliceAngle / 2);
    const fullSpins = 360 * 5; 
    const currentRotationOffset = wheelRotation % 360;
    const newTotalRotation = wheelRotation + fullSpins + (targetAngle - currentRotationOffset + 360) % 360;

    setWheelRotation(newTotalRotation);

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

  const copyRefLink = () => {
    const link = `${window.location.origin}?ref=${myRefCode}`;
    navigator.clipboard.writeText(link);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
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
    { id: 'master', name: 'Master Crate', price: '₹150', sub: '7 Keys included', color: '#eab308', icon: '📦' },
    { id: 'god', name: 'God Crate', price: '₹450', sub: '7 Keys included', color: '#a855f7', icon: '🔮' },
    { id: 'spawner', name: 'Spawner Crate', price: '₹220', sub: '7 Keys included', color: '#3b82f6', icon: '⚙️' },
    { id: 'silver', name: 'Silver Crate', price: 'Playable', sub: '1 Hour = 2 Keys', color: '#9ca3af', icon: '🛡️' },
    { id: 'key', name: 'Key Crate', price: '₹410', sub: '7 Keys included', color: '#ec4899', icon: '🔑' }
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

      {activeTab === 'spin' && (
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <h2 style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '22px' }}>🎡 Daily Reward Wheel</h2>
          <p style={{ color: '#aaaaaa', fontSize: '13px', marginBottom: '16px' }}>Enter Gamertag & Spin every 24 Hours for free rewards!</p>

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
              marginBottom: '10px',
              textAlign: 'center',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />

          <input
            type="text"
            placeholder="Admin Passcode / Referral (Optional)"
            value={adminPasscode}
            onChange={(e) => setAdminPasscode(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.2)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: '#ffffff',
              fontSize: '12px',
              textAlign: 'center',
              marginBottom: '10px',
              outline: 'none'
            }}
          />

          {isAdmin() && (
            <div style={{ padding: '6px', backgroundColor: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '6px', fontSize: '12px', color: '#eab308', marginBottom: '16px', fontWeight: 'bold' }}>
              ⚡ ADMIN MODE ACTIVE: UNLIMITED SPINS!
            </div>
          )}

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
            </div>
          )}
        </div>
      )}
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
