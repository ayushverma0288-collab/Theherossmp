import { NextResponse } from 'next/server';

// Apne Discord Channel ka Webhook URL yahan paste karein
const DISCORD_WEBHOOK_URL = 'YOUR_DISCORD_WEBHOOK_URL_HERE';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName } = body;

    if (!playerName) {
      return NextResponse.json({ error: 'Player name missing' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    const formattedReward = rewardName ? rewardName.trim() : 'God Apple';

    // OfflineCommands format (Offline & Online dono ke liye kaam karta hai)
    const finalCommand = `offlinecommand ${formattedPlayer} give ${formattedPlayer} ${formattedReward.toLowerCase()} 1`;

    // 1. Minecraft Server Console par Command Bhejna
    await fetch('http://amd-9-1.skyraincloud.in:19872/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: 'my_secret_key_123',
        command: finalCommand,
      }),
    });

    // 2. Discord Embed Message Send Karna
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
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
    }

    return NextResponse.json({ success: true, message: 'Reward Sent!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
