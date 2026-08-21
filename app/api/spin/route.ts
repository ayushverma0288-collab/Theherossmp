import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export async function POST(req: Request) {
  try {
    const { playerName, rewardName, command } = await req.json();

    if (!playerName || !command) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    const cleanCommand = command.startsWith('/') ? command.substring(1) : command;
    const filledCommand = cleanCommand.replace(/%PLAYER%/g, formattedPlayer);
    
    // OfflineCommands Plugin Syntax
    const finalCommand = `offline ${filledCommand}`;

    // 1. Send Discord Webhook First (Ensures notification is never missed)
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (DISCORD_WEBHOOK_URL) {
      try {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: '🎡 Spin Reward Claimed!',
                color: 3066993,
                fields: [
                  { name: 'Player', value: formattedPlayer, inline: true },
                  { name: 'Reward', value: rewardName, inline: true },
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

    // 2. Execute Command via RCON
    try {
      const rcon = await Rcon.connect({
        host: 'amd-9-1.skyraincloud.in',
        port: 25575,
        password: 'dcayush0077979',
        timeout: 5000,
      });

      const response = await rcon.send(finalCommand);
      await rcon.end();

      return NextResponse.json({ success: true, consoleResponse: response });
    } catch (rconErr: any) {
      console.error('RCON Failed:', rconErr);
      return NextResponse.json({ 
        success: true, 
        warning: 'Discord notified, but RCON connection failed.',
        rconError: rconErr.message 
      });
    }

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
