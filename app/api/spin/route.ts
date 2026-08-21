import { NextResponse } from 'next/server';

const PANEL_URL = 'https://gp.skyraincloud.in';
const SERVER_ID = '69dcc439';
const PANEL_API_KEY = 'ptlc_gSsHjVuLvvbK05Mb4RGDyrUW0mXcm661aNnLs0TTyCW';

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

    // 1. 7k Money
    if (rawReward.includes('7k') || rawReward.includes('money') || rawReward.includes('cash')) {
      commandToRun = `eco give ${formattedPlayer} 7000`;
    } 
    // 2. 1 Hour Fly
    else if (rawReward.includes('fly')) {
      commandToRun = `tempgrant user ${formattedPlayer} essentials.fly 1h`;
    }
    // 3. Item Rewards
    else {
      let item = 'golden_apple';
      let count = 1;

      if (rawReward.includes('netherite')) {
        item = 'netherite_ingot';
        count = 1;
      } 
      else if (rawReward.includes('totem')) {
        item = 'totem_of_undying';
        count = 1;
      } 
      else if (rawReward.includes('32 g-apple') || (rawReward.includes('golden apple') && !rawReward.includes('enchanted'))) {
        item = 'golden_apple';
        count = 32;
      } 
      else if (rawReward.includes('enchanted') || rawReward.includes('god apple')) {
        item = 'enchanted_golden_apple';
        count = 1;
      } 
      else if (rawReward.includes('dia') || rawReward.includes('dimond') || rawReward.includes('diamond')) {
        item = 'diamond_block';
        count = 20;
      }

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
