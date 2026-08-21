import { NextResponse } from 'next/server';

const PANEL_URL = 'https://gp.skyraincloud.in';
const SERVER_ID = '69dcc439';
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
    const rawReward = rewardName ? rewardName.trim().toLowerCase() : '';

    let commandToRun = '';

    // Cash / Economy Rewards Logic
    if (rawReward.includes('cash') || rawReward.includes('money')) {
      let amount = 10000; // Default 10k
      if (rawReward.includes('50k')) amount = 50000;
      else if (rawReward.includes('100k')) amount = 100000;
      else if (rawReward.includes('20k')) amount = 20000;
      else if (rawReward.includes('10k')) amount = 10000;

      commandToRun = `eco give ${formattedPlayer} ${amount}`;
    } 
    // Standard Items Logic
    else {
      let itemName = rawReward.replace(/^\d+\s+/, '').replace(/\s+/g, '_');
      
      // Minecraft valid item names mapping
      if (itemName.includes('netherite')) itemName = 'netherite_ingot';
      else if (itemName.includes('god_apple') || itemName.includes('apple')) itemName = 'enchanted_golden_apple';
      else if (itemName.includes('totem')) itemName = 'totem_of_undying';
      else if (itemName.includes('diamond_block')) itemName = 'diamond_block';
      else if (itemName.includes('fly')) itemName = 'elytra';

      commandToRun = `give ${formattedPlayer} ${itemName} 1`;
    }

    // OfflineCommands wrapper to support offline players
    const finalCommand = `offlinecommand ${formattedPlayer} ${commandToRun}`;

    // 1. Console me Command Bhejna
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

    // 2. Discord Webhook Notification
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: '🎰 Wheel Spin Reward Executed',
            color: isServerSuccess ? 3066993 : 15158332,
            fields: [
              { name: '👤 Player', value: `\`${formattedPlayer}\``, inline: true },
              { name: '🎁 Reward', value: `\`${rewardName}\``, inline: true },
              { name: '💻 Executed Command', value: `\`\`\`${finalCommand}\`\`\``, inline: false },
            ],
            footer: { text: 'TheHerosSMP System' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    return NextResponse.json({ success: isServerSuccess });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
