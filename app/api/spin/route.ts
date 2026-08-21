import { NextResponse } from 'next/server';

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

const PANEL_URL = 'https://gp.skyraincloud.in';
const SERVER_ID = '1a6b910';
const PANEL_API_KEY = 'ptlc_S1wlrpXVPY9ljA76AvYYfLTjUKkJKywR4VzTESMNpi5';

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
    const finalCommand = cleanCommand.replace(/%PLAYER%/g, formattedPlayer);

    const response = await fetch(`${PANEL_URL}/api/client/servers/${SERVER_ID}/command`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PANEL_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ command: finalCommand }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Panel API Error:", errorText);
      return NextResponse.json({ error: 'Failed to execute command via Panel API' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Reward executed successfully!' });

  } catch (err: any) {
    console.error("Execution Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
