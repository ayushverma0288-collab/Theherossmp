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
    
    // Space ko underscore (_) se replace karein taaki Minecraft item ID correct rahe (e.g. netherite_ingot)
    let rawReward = rewardName ? rewardName.trim().toLowerCase() : 'god_apple';
    rawReward = rawReward.replace(/^1\s+/, '').replace(/\s+/g, '_'); 

    // Proper OfflineCommands command format
    const finalCommand = `offlinecommand ${formattedPlayer} give ${formattedPlayer} ${rawReward} 1`;

    // 1. SkyRainCloud Panel API Command Request
    const serverResponse = await fetch(`${PANEL_URL}/api/client/servers/${SERVER_ID}/command`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PANEL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ command: finalCommand }),
    });

    const isServerSuccess = serverResponse.ok;
    const serverStatusText = isServerSuccess ? 'SUCCESS' : `FAILED (${serverResponse.status})`;

    // 2. Discord Webhook Send
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '🎰 Wheel Spin Reward Executed',
            color: isServerSuccess ? 3066993 : 15158332, // Green if success, Red if panel fail
            fields: [
              { name: '👤 Player', value: `\`${formattedPlayer}\``, inline: true },
              { name: '🎁 Reward', value: `\`${rawReward}\``, inline: true },
              { name: '📡 Panel Status', value: `\`${serverStatusText}\``, inline: true },
              { name: '💻 Executed Command', value: `\`\`\`${finalCommand}\`\`\``, inline: false },
            ],
            footer: { text: 'TheHerosSMP System' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: true, serverStatus: serverStatusText });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
