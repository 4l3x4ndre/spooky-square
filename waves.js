var spawnInterval;

function setSpawnInterval(rate) {
    spawnInterval =  setInterval(spawnEnemy, rate * 1000);
}

function waveInit() {
    if (!waveSettings.started) {
        waveSettings.pausing = false;
        //setSpawnInterval(waveSettings.spawnRate[waveSettings.waveId]);
        setSpawnInterval(waveSettings.currentSpawnRate);
        waveSettings.started = true;
    }
}

function waveManager() {
    if (waveSettings.currentCount >=waveSettings.currentStartCount) {
        clearInterval(spawnInterval);
    }

    if (waveSettings.started == true && waveSettings.aliveCount <= 0) {
        newWave();
        /*if (waveSettings.waveId + 1 < waveSettings.count.length) {
            newWave();
        } else {
            // no more wave
        }*/
    }
}

function newWave() {
    playSound(newWaveSound);
    waveSettings.started = false;
    waveSettings.waveId ++;
    waveSettings.currentCount = 0;

    waveSettings.currentStartCount = (waveSettings.waveId + 1) * Math.ceil((waveSettings.waveId+1)/2);
    waveSettings.currentSpeed[0] += .1;
    waveSettings.currentSpeed[1] += .1;
    waveSettings.currentProba[0] += .05;
    waveSettings.currentProba[1] -= .05;
    waveSettings.currentProba[2] -= .05;
    if (waveSettings.currentSpawnRate - .05 > .1) {
        waveSettings.currentSpawnRate -= .05;
    }

    waveSettings.aliveCount = waveSettings.currentStartCount;
    waveSettings.pausing = true;
    clearInterval(spawnInterval);
    setTimeout(waveInit, waveSettings.pauseTime);
}

function resetWave() {
    waveSettings.waveId --;
    for (var i in enemies) {
        new Particle(enemies[i].x, enemies[i].y, enemies[i].color);
        delete enemies[i];
    }    
    newWave();
}

function spawnEnemy() {
    var x = 0;
    var px = ctx.canvas.width / 4;
    var y = 0;
    var py = ctx.canvas.height / 3;
    var ra = Math.random();
    var ra2 = Math.random();
    if (player.x < px) {
        if (ra > .5) {
            x = -enemySetting.size;
            y = Math.random() * ((player.y + player.size*1.1) - (player.y - player.size*1.1)) + player.y- player.size * 1.1;
        } else {
            x = Math.random() * ((player.x + player.size*1.1) - (player.x - player.size*1.1)) + player.x-player.size*1.1;
            if (ra2 > .5) {
                y = -enemySetting.size;
            } else {
                y = ctx.canvas.height;
            }
        }
        
    } else if (player.x > ctx.canvas.width - px) {
        if (ra > .5) {
            x = ctx.canvas.width;
            y = Math.random() * ((player.y + player.size*1.1) - (player.y - player.size*1.1)) + player.y- player.size * 1.1;
        } else {
            x = Math.random() * ((player.x + player.size*1.1) - (player.x - player.size*1.1)) + player.x-player.size*1.1;
            if (ra2 > .5) {
                y = -enemySetting.size;
            } else {
                y = ctx.canvas.height;
            }
        }
    } else {
        if (ra > .5) {
            y = -enemySetting.size;
        } else {
            y = ctx.canvas.height;
        }
        x = Math.random() * ((player.x + player.size*1.1) - (player.x - player.size*1.1)) + player.x-player.size*1.1;
        
    }
    new Enemy(x, y);
    waveSettings.currentCount ++;
}
