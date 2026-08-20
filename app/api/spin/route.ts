import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { playerName, rewardName, command } = await req.json();

    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1539869461954306048/DvR9UTenWMiPiMl_imqtHxhbm64SynzROOhDDsQi1Ae-xgmkjIaQMOy-2T_bx90a43J5"; 

    const payload = {
      embeds: [
        {
          title: "🎉 Daily Wheel Reward Won!",
          color: 3066993,
          fields: [
            { name: "👤 Player Gamertag", value: `\`${playerName}\``, inline: true },
            { name: "🎁 Reward", value: `**${rewardName}**`, inline: true },
            { name: "⚡ Console Command", value: `\`${command.replace('%PLAYER%', playerName)}\``, inline: false }
          ],
          footer: { text: "TheHerosSMP Website Spin Log" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending webhook:", err);
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 });
  }
}
