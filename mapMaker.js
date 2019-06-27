function drawMap() {
    for (let y = 0; y < map.length; y++) {
        const elementY = map[y];
        for (let x = 0; x < elementY.length; x++) {
            const elementX = map[y][x];

            if (elementX == "0") {
                continue;
            }
            if (elementX == "P") {
                if (playerStartposX == -1) {
                    playerStartposX = x * tileSize + 10;
                    playerStartposY = y * tileSize + startY;
                }
            } else  if (elementX == "E") {
                enemiesSpawnIndex ++;
                enemiesSpawnPos [enemiesSpawnIndex] = new SpawnPosition(x * tileSize, y * tileSize + startY);
                continue;
            } else {
                ctx.beginPath();
                ctx.fillStyle = colors[elementX - 1];
                ctx.fillRect(x*tileSize, y * tileSize + startY, tileSize, tileSize);
                ctx.fill();
                ctx.closePath();
                //playerPhysics(x * tileSize, y * tileSize + startY, tileSize);
            }
        }
    }
}

function drawBlock(x, y, e) {
    if (e == "0" || e == "E") {
        return;
    }
    if (e == "P") {
        if (playerStartposX == -1) {
            playerStartposX = x * tileSize + 10;
            playerStartposY = y * tileSize + startY;
        }
    } else {
        ctx.beginPath();
        // BOTTOM PART:
        ctx.fillStyle = colors[e - 1];
        ctx.fillRect(x*tileSize, y * tileSize + startY, tileSize, tileSize);
        // GRASS PART:
        if (y != 0 && map[y - 1][x] != "1") {
        ctx.fillStyle = topColors[e - 1];
        ctx.fillRect(x*tileSize, y * tileSize + startY, tileSize, tileSize * (1-80/100));
        }


        //ctx.strokeStyle = strokeColors[e - 1];
        //ctx.strokeRect(x*tileSize, y * tileSize + startY, tileSize, tileSize);
        //ctx.fill();
        ctx.closePath();
        //playerPhysics(x * tileSize, y * tileSize + startY, tileSize);
    }
}

function checkEnemiesSpawnPos() {
    
    for (let y = 0; y < map.length; y++) {
        const elementY = map[y];
        for (let x = 0; x < elementY.length; x++) {
            const elementX = map[y][x];

            if (elementX == "E") {
                enemiesSpawnIndex ++;
                enemiesSpawnPos [enemiesSpawnIndex] = new SpawnPosition(x * tileSize, y * tileSize + startY);
            } 
        }
    }
}