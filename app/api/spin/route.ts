import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// Channel IDs
const CONSOLE_COMMAND_CHANNEL = '1539525464064790558'; // Direct console command channel
const PUBLIC_ANNOUNCE_CHANNEL = '1539868772389748747'; // Reward announcement channel

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName } = body;

    if (!playerName) {
      return NextResponse.json({ error: 'Player name missing' }, { status: 400 });
    }

    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Bot token missing in Vercel settings' }, { status: 500 });
    }

    const formattedPlayer = playerName.trim();
    const rawReward = rewardName ? rewardName.trim() : 'Unknown Reward';
    const rewardLower = rawReward.toLowerCase();

    // Exact Clean Commands (Without 'minecraft:' prefix)
    let consoleCmd = `give ${formattedPlayer} golden_apple 1`;
    
    if (rewardLower.includes('7k') || rewardLower.includes('7000')) {
      consoleCmd = `eco give ${formattedPlayer} 7000`;
    } else if (rewardLower.includes('fly')) {
      consoleCmd = `tempgrant user ${formattedPlayer} essentials.fly 1h`;
    } else if (rewardLower.includes('dia') || rewardLower.includes('diamond')) {
      consoleCmd = `give ${formattedPlayer} diamond_block 20`;
    } else if (rewardLower.includes('32') || rewardLower.includes('g-apple')) {
      consoleCmd = `give ${formattedPlayer} golden_apple 32`;
    } else if (rewardLower.includes('enchanted') || rewardLower.includes('god')) {
      consoleCmd = `give ${formattedPlayer} enchanted_golden_apple 1`;
    } else if (rewardLower.includes('totem')) {
      consoleCmd = `give ${formattedPlayer} totem_of_undying 1`;
    } else if (rewardLower.includes('netherite')) {
      consoleCmd = `give ${formattedPlayer} netherite_ingot 1`;
    }

    // 1. Post exact command to Server Console Channel
    await fetch(`https://discord.com/api/v10/channels/${CONSOLE_COMMAND_CHANNEL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: consoleCmd }),
    });

    // 2. Post visual announcement to Daily Rewards Channel
    await fetch(`https://discord.com/api/v10/channels/${PUBLIC_ANNOUNCE_CHANNEL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🎉 **Spin Reward Claimed!**\n👤 **Player:** \`${formattedPlayer}\`\n🎁 **Reward Won:** **${rawReward}**`,
      }),
    });

    return NextResponse.json({ success: true, message: 'Commands sent successfully!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
