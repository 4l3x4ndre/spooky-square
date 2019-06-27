// INPUTS
function keyDownHandler(event) {
    if (event.keyCode == 38) {
        jump();
    }
    if (event.keyCode == 32) {
        if (waitForFirstTouch) {
            isPlaying = true;
            waitForFirstTouch = false;
            newWave();
            for (var i in particles) {
                delete particles[i];
            }
        } else {
            player.shooting = true;
        }
    }
    if (event.keyCode == 82 && gameOver && waitForSpaceRestart) {
        document.location.reload();
    }
    if (event.keyCode == 39) {
        rightPressed = true;
    } else if (event.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.keyCode == 32) {
        player.shooting = false;
    }
    if (event.keyCode == 39) {
        rightPressed = false;
    } else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// END INPUTS

// init the spawn position for enemies
//checkEnemiesSpawnPos();

// then init the waves
//newWave();

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawMap();

    for (var i in particles) {
        particles[i].draw();
    }

    if (waitForFirstTouch && !isPlaying) {
        showText("Spooky Square", "#33cc33", "Impact", ctx.canvas.width/2, waveStartSize * 1.75,
        "center", waveStartSize * 1.5, 10, "#339966");

        for (var i = 0; i < 1; i++) {
            new Particle(ctx.canvas.width - ctx.canvas.width/3.5, waveStartSize*1.5, "#33cc33");
        }
        
        for (var i = 0; i < 1; i++) {
            new Particle(ctx.canvas.width/3.5, waveStartSize*1.5, "#33cc33");
        }

        showText("Press space to play", "red", "Impact", ctx.canvas.width/2, ctx.canvas.height/2,
        "center", waveStartSize, 10, "gold");
        
        showText("Move with arrows", "white", "Impact", ctx.canvas.width/2, ctx.canvas.height/2 + waveStartSize*2,
        "center", waveStartSize/2, 10, "black");
        showText("Shoot with space", "white", "Impact", ctx.canvas.width/2, ctx.canvas.height/2 + waveStartSize*3,
        "center", waveStartSize/2, 10, "black");

        requestAnimationFrame(draw);
        return;
    }

    if (gameOver) {
        playerPhysics();
        UI();

        showText("Game Over", "red", "Impact", ctx.canvas.width/2, ctx.canvas.height/2,
        "center", waveStartSize * 1.5, 10, "gold");

        for (var i = 0; i < 1; i++) {
            new Particle(ctx.canvas.width/2 - ctx.canvas.width/6.5, ctx.canvas.height/2 - waveStartSize/2, "red");
        }
        
        for (var i = 0; i < 1; i++) {
            new Particle(ctx.canvas.width/2 + ctx.canvas.width/6.5, ctx.canvas.height/2 - waveStartSize/2, "red");
        }

        if (waveSettings.waveId == 0 || waveSettings.waveId == 1) {
        showText(waveSettings.waveId + " wave passed", "red", "Impact",
        ctx.canvas.width/2, ctx.canvas.height/2+waveStartSize * 1.5, "center", waveStartSize * .75, 10, "gold");
        } else {
            showText(waveSettings.waveId + " waves passed", "red", "Impact",
            ctx.canvas.width/2, ctx.canvas.height/2+waveStartSize * 1.5, "center", waveStartSize * .75, 10, "gold");
        }

        showText("Press R to restart", "blue", "Impact",
        ctx.canvas.width/2, ctx.canvas.height/2+waveStartSize * 2.5, "center", waveStartSize * .75, 10, "gold");
        


        requestAnimationFrame(draw);
        return;
    }

    playerController();
    drawProjectiles();
    drawEnemies();
    waveManager();

    UI();

    if (player.shooting) {
        shoot();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);