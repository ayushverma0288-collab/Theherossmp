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

    // 1. Cash / Money Rewards (Essentials Economy)
    if (rawReward.includes('cash') || rawReward.includes('money')) {
      let amount = 10000;
      if (rawReward.includes('50k')) amount = 50000;
      else if (rawReward.includes('100k')) amount = 100000;
      else if (rawReward.includes('20k')) amount = 20000;
      else if (rawReward.includes('10k')) amount = 10000;

      commandToRun = `eco give ${formattedPlayer} ${amount}`;
    } 
    // 2. 1 Hour Fly Pass (Essentials Fly / TempFly)
    else if (rawReward.includes('fly')) {
      commandToRun = `tempfly ${formattedPlayer} 1h`;
    }
    // 3. Minecraft Standard Items
    else {
      let item = 'golden_apple';
      let count = 1;

      if (rawReward.includes('netherite')) {
        item = 'netherite_ingot';
        count = 1;
      } else if (rawReward.includes('totem')) {
        item = 'totem_of_undying';
        count = 1;
      } else if (rawReward.includes('32 g-apple') || rawReward.includes('g-apple')) {
        item = 'golden_apple';
        count = 32;
      } else if (rawReward.includes('god apple') || rawReward.includes('god_apple')) {
        item = 'enchanted_golden_apple';
        count = 1;
      } else if (rawReward.includes('dia block') || rawReward.includes('diamond')) {
        item = 'diamond_block';
        count = 20;
      }

      // Exact Vanilla Minecraft Command Format
      commandToRun = `give ${formattedPlayer} minecraft:${item} ${count}`;
    }

    // OfflineCommands Plugin Format
    const finalCommand = `offlinecommand ${formattedPlayer} ${commandToRun}`;

    // Panel API Execution
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

    // Discord Notification
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
