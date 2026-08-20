import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export async function POST(req: Request) {
  try {
    const { playerName, rewardName, command } = await req.json();

    if (!playerName || !command) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    // In-game command execute karne ke liye slash '/' hataya hai
    const cleanCommand = command.startsWith('/') ? command.substring(1) : command;
    const finalCommand = cleanCommand.replace(/%PLAYER%/g, formattedPlayer);

    // SkyRainCloud RCON Connection
    const rcon = await Rcon.connect({
      host: 'amd-9-1.skyraincloud.in',
      port: 25575,
      password: 'dcayush0077979',
    });

    const response = await rcon.send(finalCommand);
    await rcon.end();

    return NextResponse.json({ success: true, consoleResponse: response });
  } catch (error: any) {
    console.error('RCON Error:', error);
    return NextResponse.json(
      { error: 'Failed to execute command on server', details: error.message },
      { status: 500 }
    );
  }
}
