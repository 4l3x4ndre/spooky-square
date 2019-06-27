projectileSettings = {
    x: 0,
    y: 0,
    yOffset: 0,
    color: "aqua",//b3b300
    size: 0,
    speed: 17,
    canShoot: true,
    fireRate: 400,
    ammo: 10
}
projectileSettings.size = player.size * 20/100;
projectileSettings.yOffset = player.size / 3;
projectileSettings.speed = player.speed * 250/100;

var projectiles = {};
var projectileIndex = 0;

function Projectile(x, y, p, d) {
    this.x = x;
    this.y = y + p.yOffset;
    this.color = p.color;
    this.size = p.size;
    this.d = d;
    this.speed = p.speed;
    projectileIndex ++;
    projectiles[projectileIndex] = this;
    this.id = projectileIndex;
}

Projectile.prototype.draw = function() {
    this.x  += this.d * this.speed;
    mapIndex = Math.round((this.y - startY) / tileSize);
    if (mapIndex < 0) {
        delete projectiles[this.id];
        return;
    }
    for (var i = 0; i < map[mapIndex].length; i++) {
        if (map[mapIndex][i] == "P" || map[mapIndex][i] == "0" || map[mapIndex][i] == "E") {
            continue;
        }
        if (this.d < 0) {
            if (this.x < i * tileSize + tileSize && this.x > i * tileSize) {
                delete projectiles[this.id];
            }
        } else {
            if (this.x + this.size > i*tileSize && this.x + this.size < i * tileSize + tileSize) {
                delete projectiles[this.id];
            }
        }
    }

    if (this.x + this.size < 0 || this.x > canvas.width) {
        delete projectiles[this.id];
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}
Projectile.prototype.checkEnemies = function() {
    for (var i in enemies) {
        var e = enemies[i];
        if ((this.x < e.x + e.size && this.x > e.x) ||
        (this.x + this.size > e.x && this.x + this.size < e.x + e.size)) {

            if ((this.y >= e.y && this.y - this.size/2 <= e.y + e.size) ||
            (this.y + this.size >= e.y && this.y + this.size <= e.y + e.size)) {
                score += (enemies[i].colorIndex+1)*10/2;
                new Particle(this.x, this.y, enemies[i].color);
                playSound(hitSound);
                delete enemies[i];
                waveSettings.aliveCount --;
                delete projectiles[this.id];
                return;
            }
        }
    }
}

function shoot() {
    if (projectileSettings.canShoot && projectileSettings.ammo > 0) {
        var posX = 0;
        if (player.lastD == -1) {
            posX = player.x - player.gunSizeX;
        } else {
            posX = player.x + player.size + player.gunSizeY;
        }
        new Projectile(posX, player.y, projectileSettings, player.lastD);
        projectileSettings.canShoot = false;
        playSound(laser);
        setTimeout(function(){ projectileSettings.canShoot = true; }, projectileSettings.fireRate);
    }
}

function drawProjectiles() {
    for (var i in projectiles) {
        projectiles[i].checkEnemies();
        if (projectiles[i] != null) {
            projectiles[i].draw();
        }
    }
}