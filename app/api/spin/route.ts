import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { playerName, rewardName } = body;

    if (!playerName) {
      return NextResponse.json({ error: 'Player name missing' }, { status: 400 });
    }

    const formattedPlayer = playerName.trim();
    const formattedReward = rewardName ? rewardName.trim() : 'God Apple';

    // OfflineCommands format me command set kiya gaya hai
    const finalCommand = `offlinecommand ${formattedPlayer} give ${formattedPlayer} ${formattedReward.toLowerCase()} 1`;

    const response = await fetch('http://amd-9-1.skyraincloud.in:19872/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: 'my_secret_key_123',
        command: finalCommand,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to execute command via DirectBridge' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Reward executed successfully!' });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
