import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { playerName, rewardName } = await req.json();

    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1539869461954306048/DvR9UTenWMiPiMl_imqtHxhbm64SynzROOhDDsQi1Ae-xgmkjIaQMOy-2T_bx90a43J5";

    const rewardImages: Record<string, string> = {
      '32 Golden Apples': 'https://i.postimg.cc/CMJqVjsK/1423-goldenapple.png',
      '20 Diamond Blocks': 'https://i.postimg.cc/BQktqNLg/4178-mc-diamond-block.png',
      'Totem of Undying': 'https://i.postimg.cc/BvcvB0hx/7301-totem-mc.png',
      '1 Netherite Ingot': 'https://i.postimg.cc/rszFTtqh/5032-Netherite-ingot.png',
      '1 Enchanted G-Apple': 'https://i.postimg.cc/wBV6skvV/2024-enchantedgoldenapple.png',
      '1 Hour Fly Pass': 'https://i.postimg.cc/GtBrVwjj/6758-Elytra.png',
      '10k In-Game Cash': 'https://i.postimg.cc/d3zvKHHc/7347-minecraftmoney.png'
    };

    const imageUrl = rewardImages[rewardName] || '';

    const payload = {
      embeds: [
        {
          color: 3066993,
          fields: [
            { name: "👤 Player Name", value: `\`${playerName}\``, inline: true },
            { name: "🎉 Congratulations!", value: `You won **${rewardName}**!`, inline: false }
          ],
          thumbnail: imageUrl ? { url: imageUrl } : undefined
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
