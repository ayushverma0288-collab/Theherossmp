import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// Channel IDs
const CONSOLE_COMMAND_CHANNEL = '1539525464064790558'; // Direct console command
const PUBLIC_ANNOUNCE_CHANNEL = '1539868772389748747'; // Reward announcement

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

    // Command Logic Mappings
    let consoleCmd = `minecraft:give ${formattedPlayer} golden_apple 1`;
    
    if (rewardLower.includes('7k') || rewardLower.includes('7000')) {
      consoleCmd = `eco give ${formattedPlayer} 7000`;
    } else if (rewardLower.includes('fly')) {
      consoleCmd = `tempgrant user ${formattedPlayer} essentials.fly 1h`;
    } else if (rewardLower.includes('dia') || rewardLower.includes('diamond')) {
      consoleCmd = `minecraft:give ${formattedPlayer} diamond_block 20`;
    } else if (rewardLower.includes('32') || rewardLower.includes('g-apple')) {
      consoleCmd = `minecraft:give ${formattedPlayer} golden_apple 32`;
    } else if (rewardLower.includes('enchanted') || rewardLower.includes('god')) {
      consoleCmd = `minecraft:give ${formattedPlayer} enchanted_golden_apple 1`;
    } else if (rewardLower.includes('totem')) {
      consoleCmd = `minecraft:give ${formattedPlayer} totem_of_undying 1`;
    } else if (rewardLower.includes('netherite')) {
      consoleCmd = `minecraft:give ${formattedPlayer} netherite_ingot 1`;
    }

    // 1. Bare command to Console Channel
    await fetch(`https://discord.com/api/v10/channels/${CONSOLE_COMMAND_CHANNEL}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: consoleCmd }),
    });

    // 2. Announcement to Reward Channel
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

    return NextResponse.json({ success: true, message: 'Both channels notified!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
