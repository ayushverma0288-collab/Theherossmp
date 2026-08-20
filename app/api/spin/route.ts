import { NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1539869461954306048/DvR9UTenWMiPiMl_imqtHxbm64SynzROOhDDsQi1Ae-xgmkjIaQMOy-2T_bx90a43J5";

export async function POST(request: Request) {
  try {
    const { playerName, rewardName, command } = await request.json();

    if (!playerName || !rewardName) {
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    const res = await fetch(DISCORD_WEBHOOK_URL, {
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

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: 'Webhook failed', details: errText }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
