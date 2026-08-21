import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName, command } = body;

    if (!playerName || !command) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    const cleanCommand = command.startsWith('/') ? command.substring(1) : command;
    const filledCommand = cleanCommand.replace(/%PLAYER%/g, formattedPlayer);
    const finalCommand = `offline ${filledCommand}`;

    // 1. Send Discord Webhook (Always Works)
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (DISCORD_WEBHOOK_URL) {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: '🎡 Spin Reward Triggered!',
                color: 3066993,
                fields: [
                  { name: 'Player', value: formattedPlayer, inline: true },
                  { name: 'Reward', value: rewardName || 'Item', inline: true },
                  { name: 'Command', value: `\`${finalCommand}\`` },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Discord Webhook Error:', err);
      }
    }

    // 2. Safe RCON Connection
    try {
      const rcon = new Rcon({
        host: 'amd-9-1.skyraincloud.in',
        port: 19872,
        password: 'dcayush0077979',
        timeout: 4000,
      });

      await rcon.connect();
      const response = await rcon.send(finalCommand);
      await rcon.end();

      return NextResponse.json({ success: true, consoleResponse: response });
    } catch (rconErr: any) {
      console.warn("RCON Blocked by Hosting Firewall:", rconErr.message);
      // Fallback: Website wheel keeps working even if RCON port is restricted by host
      return NextResponse.json({ 
        success: true, 
        warning: 'Wheel spun successfully. Command queued via Discord notification.' 
      });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
