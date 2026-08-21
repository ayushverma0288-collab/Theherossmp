import { NextResponse } from 'next/server';

const PANEL_URL = 'https://gp.skyraincloud.in';
const SERVER_ID = '69dcc439';
const PANEL_API_KEY = 'ptlc_gSsHjVuLvvbK05Mb4RGDyrUW0mXcm661aNnLs0TTyCW';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1539869461954306048/DvR9UTemM8lPlMl_imqtHxbm64SyncRDO4OE';

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

    // Cash rewards
    if (rawReward.includes('cash') || rawReward.includes('money')) {
      let amount = 10000;
      if (rawReward.includes('50k')) amount = 50000;
      else if (rawReward.includes('100k')) amount = 100000;
      else if (rawReward.includes('20k')) amount = 20000;

      commandToRun = `eco give ${formattedPlayer} ${amount}`;
    } 
    // Item rewards (Direct Give Command)
    else {
      let item = 'golden_apple';
      let count = 1;

      if (rawReward.includes('netherite')) { item = 'netherite_ingot'; count = 1; }
      else if (rawReward.includes('totem')) { item = 'totem_of_undying'; count = 1; }
      else if (rawReward.includes('32 g-apple')) { item = 'golden_apple'; count = 32; }
      else if (rawReward.includes('enchanted g-apple') || rawReward.includes('god apple')) { item = 'enchanted_golden_apple'; count = 1; }
      else if (rawReward.includes('dia block')) { item = 'diamond_block'; count = 20; }

      // Direct /give command execute hogi
      commandToRun = `minecraft:give ${formattedPlayer} ${item} ${count}`;
    }

    await fetch(`${PANEL_URL}/api/client/servers/${SERVER_ID}/command`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PANEL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: commandToRun }),
    });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
