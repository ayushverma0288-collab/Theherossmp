import { NextResponse } from 'next/server';

const PANEL_URL = 'https://gp.skyraincloud.in';
const SERVER_ID = '1a6b910';
const PANEL_API_KEY = 'ptlc_gSsHjVuLwvbK05MbWRGDyrUM0mXcm661aNnLsOTTyCW';
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

    // Player online ho ya offline, console direct give command bhejega
    const finalCommand = `give ${formattedPlayer} ${formattedReward.toLowerCase()} 1`;

    // 1. Console me Direct Command Send
    await fetch(`${PANEL_URL}/api/client/servers/${SERVER_ID}/command`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PANEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: finalCommand }),
    });

    // 2. Discord Log Notification
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '🎰 Wheel Spin Reward',
            color: 3066993,
            fields: [
              { name: '👤 Player', value: `\`${formattedPlayer}\``, inline: true },
              { name: '🎁 Reward', value: `\`${formattedReward}\``, inline: true },
              { name: '💻 Executed Command', value: `\`\`\`${finalCommand}\`\`\``, inline: false },
            ],
            footer: { text: 'TheHerosSMP Spin System' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, message: 'Done!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
