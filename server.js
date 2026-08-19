const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TheHerosSMP | Official Minecraft Network</title>
    <meta name="description" content="Join TheHerosSMP - Top Minecraft Java & Bedrock SMP with custom ranks, live leaderboards, events, and active community!">
    <meta name="keywords" content="TheHerosSMP, Minecraft SMP, Minecraft Server, Java Bedrock SMP, Minecraft Leaderboards">
    <style>
        :root {
            --red: #ff3333;
            --dark: #0f0f12;
            --card-bg: #181820;
            --card-border: #2a2a38;
            --text-light: #f5f5f7;
            --text-muted: #a0a0ab;
            --green: #00ff66;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        body { background-color: var(--dark); color: var(--text-light); padding-bottom: 50px; }

        header {
            text-align: center;
            padding: 50px 20px 30px;
            background: radial-gradient(circle at top, rgba(255, 51, 51, 0.25) 0%, rgba(15, 15, 18, 1) 75%);
        }
        h1 { font-size: 3rem; color: var(--red); text-shadow: 0 0 20px rgba(255, 51, 51, 0.6); letter-spacing: 2px; }
        .subtitle { color: var(--text-muted); margin-top: 5px; font-size: 1.1rem; }

        .hero-btn-container { margin-top: 25px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
        .ip-card {
            background: var(--card-bg);
            border: 1px solid var(--red);
            padding: 10px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 0 15px rgba(255, 51, 51, 0.2);
        }
        .ip-text { font-weight: bold; font-size: 1.1rem; color: var(--green); letter-spacing: 1px; }

        .btn {
            background: var(--red);
            color: white;
            border: none;
            padding: 10px 18px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover { background: #d62828; transform: translateY(-2px); }
        .btn-discord { background: #5865F2; }
        .btn-discord:hover { background: #4752C4; }

        .container {
            max-width: 1100px;
            margin: 30px auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 20px;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }
        .card-header {
            font-size: 1.25rem;
            color: var(--red);
            border-bottom: 2px solid var(--red);
            padding-bottom: 8px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .stat-list { list-style: none; }
        .stat-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .stat-item:last-child { border-bottom: none; }

        .rank-badge {
            background: #22222e;
            border: 1px solid #3a3a4c;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: bold;
        }

        footer { text-align: center; margin-top: 40px; color: var(--text-muted); font-size: 0.9rem; }
    </style>
</head>
<body>

    <header>
        <h1>THEHEROSSMP</h1>
        <p class="subtitle">Official Minecraft Java & Bedrock Network</p>

        <div class="hero-btn-container">
            <div class="ip-card">
                <span class="ip-text">PLAY.THEHEROSSMP.COM</span>
                <button class="btn" onclick="navigator.clipboard.writeText('PLAY.THEHEROSSMP.COM'); alert('IP Copied!');">Copy IP</button>
            </div>
            <a href="https://discord.gg/yourlink" target="_blank" class="btn btn-discord">Join Discord</a>
        </div>
    </header>

    <div class="container">

        <!-- Server Dashboard -->
        <div class="card">
            <div class="card-header">📊 Server Dashboard</div>
            <ul class="stat-list">
                <li class="stat-item"><span>Live Status:</span> <strong id="server-status" style="color:var(--green)">Online</strong></li>
                <li class="stat-item"><span>Online Players:</span> <strong id="player-count">Loading...</strong></li>
                <li class="stat-item"><span>Java / Bedrock:</span> <span style="color:var(--green)">Supported</span></li>
                <li class="stat-item"><span>Server Version:</span> <span>1.20.x - 1.21.x</span></li>
                <li class="stat-item"><span>Uptime:</span> <span>99.9%</span></li>
            </ul>
        </div>

        <!-- Leaderboards -->
        <div class="card">
            <div class="card-header">🏆 Top Leaderboards</div>
            <ul class="stat-list">
                <li class="stat-item"><span>💰 Richest Player:</span> <strong>PlayerOne ($500K)</strong></li>
                <li class="stat-item"><span>⚔️ Top Kills:</span> <strong>HeroGamer (1,240 Kills)</strong></li>
                <li class="stat-item"><span>⏳ Most Playtime:</span> <strong>CraftMaster (320h)</strong></li>
                <li class="stat-item"><span>🏅 Top Player:</span> <strong>Legend_01</strong></li>
            </ul>
        </div>

        <!-- Store & Ranks -->
        <div class="card">
            <div class="card-header">🛒 Store & Ranks</div>
            <ul class="stat-list">
                <li class="stat-item">
                    <span>VIP Rank</span>
                    <button class="btn" style="padding:4px 10px;">Buy</button>
                </li>
                <li class="stat-item">
                    <span>MVP Rank</span>
                    <button class="btn" style="padding:4px 10px;">Buy</button>
                </li>
                <li class="stat-item">
                    <span>LEGEND Rank</span>
                    <button class="btn" style="padding:4px 10px;">Buy</button>
                </li>
                <li class="stat-item">
                    <span>Custom Tags</span>
                    <button class="btn" style="padding:4px 10px;">View</button>
                </li>
            </ul>
        </div>

        <!-- Events & Community -->
        <div class="card">
            <div class="card-header">🎉 Events & Community</div>
            <ul class="stat-list">
                <li class="stat-item"><span>Current Event:</span> <span class="rank-badge" style="color:var(--red);">PvP Tournament</span></li>
                <li class="stat-item"><span>Countdown:</span> <strong>2 Days Left</strong></li>
                <li class="stat-item"><span>Discord Members:</span> <span>1,500+ Active</span></li>
                <li class="stat-item"><span>YouTube / IG:</span> <span>@TheHerosSMP</span></li>
            </ul>
        </div>

    </div>

    <footer>
        &copy; 2026 TheHerosSMP Network. All rights reserved. Not affiliated with Mojang AB.
    </footer>

    <script>
        fetch('https://api.mcsrvstat.us/2/play.hypixel.net')
            .then(res => res.json())
            .then(data => {
                if(data.online) {
                    document.getElementById('server-status').innerText = 'Online';
                    document.getElementById('player-count').innerText = data.players.online + ' / ' + data.players.max;
                } else {
                    document.getElementById('server-status').innerText = 'Offline';
                    document.getElementById('server-status').style.color = 'red';
                    document.getElementById('player-count').innerText = '0 / 0';
                }
            });
    </script>
</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});
