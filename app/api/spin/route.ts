import { NextResponse } from 'next/server';

// Aapka Discord Webhook URL set kar diya gaya hai
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1539869461954306048/DvR9UTenWMiPiMl_imqtHxhbm64SynzROOhDDsQi1Ae-xgmkjIaQMOy-2T_bx90a43J5';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName } = body;

    if (!playerName) {
      return NextResponse.json({ error: 'Player name missing' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    const formattedReward = rewardName ? rewardName.trim() : 'God Apple';

    // OfflineCommands format (Online & Offline dono players ke liye)
    const finalCommand = `offlinecommand ${formattedPlayer} give ${formattedPlayer} ${formattedReward.toLowerCase()} 1`;

    // 1. Server Console ko Command Bhejna
    await fetch('http://amd-9-1.skyraincloud.in:19872/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: 'my_secret_key_123',
        command: finalCommand,
      }),
    });

    // 2. Discord Channel par Message Bhejna
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '🎰 Wheel Spin Reward System',
            color: 3066993, // Green Color
            fields: [
              { name: '👤 Player', value: `\`${formattedPlayer}\``, inline: true },
              { name: '🎁 Reward', value: `\`${formattedReward}\``, inline: true },
              { name: '💻 Executed Command', value: `\`\`\`${finalCommand}\`\`\``, inline: false },
            ],
            footer: { text: 'TheHerosSMP • Offline Support Active' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, message: 'Reward Sent & Logged to Discord!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
