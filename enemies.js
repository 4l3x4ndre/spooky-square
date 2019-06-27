enemySetting = {
    size: 0,
    speed: 1.75,
    color: "blue",
    attackRate: 1000
}
enemySetting.size = player.size;

var enemies = {};
var enemyIndex = 0;

function Enemy (x, y) {
    this.x = x;
    this.y = y;

    this.yMatch = false;
    this.xMatch = false;

    this.lastAttack = 0;
    this.canAttack = true;

    this.size = enemySetting.size;

    //id = Math.floor(Math.random() * 2 + 0.5);
    /*r = Math.random();
    id = 0;
    for (var i = 0; i<enemiesProbabilities[0].length; i++) {
        if (r > enemiesProbabilities[waveSettings.waveId][i]) {
            id = i;
            break;
        }
    }*/
    this.speed = Math.random() * (waveSettings.currentSpeed[1] - waveSettings.currentSpeed[0]) + waveSettings.currentSpeed[0];
    this.colorIndex = Math.round(Math.random() * (enemiesColors.length-1));
    this.color = enemiesColors[this.colorIndex];

    enemyIndex ++;
    enemies[enemyIndex] = this;
    this.id = enemyIndex;
}

Enemy.prototype.draw = function() {
    //this.x  +=  * this.speed;

    this.xMatch = false;
    this.yMatch = false;

    this.canMoveUp = true;
    this.canMoveDown = true;
    this.canMoveRight = true;
    this.canMoveLeft = true;

    if (this.canMoveLeft && this.x > player.x + player.size) {
        this.x -= this.speed;
    } else if (this.canMoveRight && this.x + this.size < player.x) {
        this.x += this.speed;
    } else {
        this.xMatch = true;
    }

    if (this.canMoveUp && this.y > player.y) {
        this.y -= this.speed;
    } else if (this.canMoveDown && this.y + 10 < player.y) {
        this.y += this.speed;
    } else {
        this.yMatch = true;
    }

    if (this.yMatch && this.xMatch) {
        if (this.canAttack) {
            this.canAttack = false;
            setTimeout(finishAttack, enemySetting.attackRate, this.id);

            playerAttacked();
        }
    }

    

    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.shadowBlur = 5;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "";
    ctx.fill();
}

const finishAttack = (id) => {
    if (enemies[id] != null) {
        enemies[id].canAttack = true;
    }
}

function drawEnemies() {
    for (var i in enemies) {
        enemies[i].draw();
    }
}