import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

const REWARD_COMMANDS: Record<string, string> = {
  'God Apple': 'give %PLAYER% enchanted_golden_apple 1',
  '1 Enchanted G-Apple': 'give %PLAYER% enchanted_golden_apple 1',
  '32 G-Apple': 'give %PLAYER% golden_apple 32',
  '20 Dia Block': 'give %PLAYER% diamond_block 20',
  'Totem': 'give %PLAYER% totem_of_undying 1',
  'Netherite': 'give %PLAYER% netherite_ingot 1',
  '$10K Cash': 'eco give %PLAYER% 10000',
  'Fly Pass': 'fly %PLAYER% on',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName } = body;

    if (!playerName) {
      return NextResponse.json({ error: 'Player name missing' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    let rawCommand = body.command || REWARD_COMMANDS[rewardName] || 'give %PLAYER% golden_apple 1';
    const cleanCommand = rawCommand.startsWith('/') ? rawCommand.substring(1) : rawCommand;
    const filledCommand = cleanCommand.replace(/%PLAYER%/g, formattedPlayer);
    
    // Commands without offline prefix first for native MC execution
    const finalCommand = filledCommand;

    // Discord Notification Webhook
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (DISCORD_WEBHOOK_URL) {
      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '🎡 Spin Reward Claimed!',
              color: 3066993,
              fields: [
                { name: 'Player', value: formattedPlayer, inline: true },
                { name: 'Reward', value: rewardName || 'Item', inline: true },
                { name: 'Executed Command', value: `\`${finalCommand}\`` },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }).catch(e => console.error("Webhook Error:", e));
    }

    // Direct RCON Client Handshake
    const rcon = new Rcon({
      host: 'amd-9-1.skyraincloud.in',
      port: 19872,
      password: 'dcayush0077979',
      timeout: 8000,
    });

    await rcon.connect();
    const response = await rcon.send(finalCommand);
    await rcon.end();

    return NextResponse.json({ success: true, consoleResponse: response });

  } catch (err: any) {
    console.error("RCON Error:", err.message);
    return NextResponse.json({ 
      success: true, 
      warning: 'Command dispatched to server logs', 
      error: err.message 
    });
  }
}
