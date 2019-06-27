const player = {
    size: tileSize,
    x: -1,
    y: -1,
    dx: 1,
    dy: 0,
    lastD: 1,
    speed: 8,
    color: "green",
    gravity: 15,
    jumpVelocity: 0,
    jumpForce: 43,
    jumpSpeed: 2,
    canJump: false,
    canMove: false,
    hitboxPadding : 0,
    shooting: false,
    gunSizeX: 0,
    gunSizeY: 0,
    gunOffsetX: 0,
    gunOffsetY: 0,
    gunColor: "#808080"
};
player.hitboxPadding = player.size * 2/100;
player.speed = tileSize * 13/100;
player.jumpForce = tileSize * 85/100;
player.gravity = tileSize * 30/100;
player.gunSizeX = player.size / 2;
player.gunSizeY = player.size / 2.5;
player.gunOffsetY = player.size/4.5;

function drawPlayer() {
    if (playerStartposX != -1 && hasSetPlayerPosition == false) {
        player.x = playerStartposX;
        player.y = playerStartposY;
        hasSetPlayerPosition = true;
        player.canMove = true;
    }

    if (!hasSetPlayerPosition) {
        return;
    }

    
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.rect(player.x, player.y, player.size, player.size);
    ctx.fill();
    ctx.closePath();

    if (player.lastD == 1) {
        player.gunOffsetX = player.size;
    } else {
        player.gunOffsetX = -player.gunSizeX;
    }
    
    ctx.beginPath();
    ctx.fillStyle = player.gunColor;
    ctx.rect(player.x + player.gunOffsetX, player.y + player.gunOffsetY, player.gunSizeX, player.gunSizeY);
    ctx.fill();
    ctx.closePath();
}

function playerPhysics() {
    canMoveLeft = true;
    canMoveRight = true;
    canApplyGravity = true;
    canGoUp = true;
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            var e = map[y][x];
            var posY = y * tileSize + startY;
            var posX = x * tileSize;
            drawBlock(x, y, e);
            if (e == "P" || e == "0" || e == "E") {
                continue;
            }

            if (player.y <= posY && player.y + player.size >= posY) {
                if ((player.x + player.size > posX && player.x + player.size < posX + tileSize) ||
                (player.x > posX && player.x < posX + tileSize) ||
                (player.x <= posX && player.x + player.size >= posX + tileSize)) {
                    canApplyGravity = false;
                    player.y = posY - player.size;
                }
            }
            if (player.y - player.jumpVelocity < posY + tileSize && player.y + player.size > posY) {
                if ((player.x + player.size > posX && player.x + player.size < posX + tileSize) ||
                (player.x > posX && player.x < posX + tileSize) ||
                (player.x <= posX && player.x + player.size >= posX + tileSize)) {
                    canApplyGravity = false;
                    player.y = posY + tileSize + player.hitboxPadding;
                    canGoUp = false;
                    //player.jumpVelocity = -player.speed/2;
                }
            }
            if ((player.y == posY && player.y + player.size ==posY + tileSize) ||
            (player.y > posY && player.y < posY + tileSize) ||
            (player.y + player.size > posY && player.y + player.size < posY + tileSize)) {
                if (player.x + player.dx * player.speed + player.size + 10 > posX && 
                    player.x + player.dx * player.speed + player.size + 10 < posX + tileSize) {
                    player.x = posX - player.size - player.hitboxPadding;
                    canMoveRight = false;
                }
                if (player.x + player.dx * player.speed - 10< posX + tileSize && 
                    player.x + player.dx * player.speed - 10> posX ) {
                    player.x = posX - player.size;
                    canMoveLeft = false;
                    player.x = posX + tileSize + player.hitboxPadding;
                }

            }

            /*var playerVelocity = player.x + player.dx * player.speed + player.hitboxPadding;
            if (player.y + player.size + player.dy * player.speed + player.gravity > posY && player.y < posY &&
                ((playerVelocity < posX + tileSize && playerVelocity + player.size > posX + tileSize) ||
                (playerVelocity + player.size > posX && playerVelocity < posX))
                ) {
                    console.log (x, y);
                canApplyGravity = false;
            }
            if (player.y - player.jumpVelocity < posY + tileSize && player.y + player.size > posY + tileSize &&
                ((playerVelocity < posX + tileSize && playerVelocity + player.size > posX + tileSize) ||
                (playerVelocity + player.size > posX && playerVelocity < posX))
                ) {
                canGoUp = false;
            }
            if (
                (player.y > posY && player.y < posY + tileSize) ||
                (player.y + player.size > posY && player.y + player.size < posY + tileSize)
            ) {
                // Y match
                if (playerVelocity + player.size > posX && 
                    playerVelocity + player.size < posX + tileSize) {
                    canMoveRight = false;
                    continue;
                }
                if (playerVelocity < posX + tileSize &&
                    playerVelocity > posX) {
                    canMoveLeft = false;
                    continue;
                }
            }*/
        }
    }

    if (rightPressed && canMoveRight) {
        player.dx = 1;
        player.lastD = 1;
    } else if (leftPressed && canMoveLeft) {
        player.dx = -1;
        player.lastD = -1;
    } else {
        player.dx = 0;
    }
    
    // gravity
    if (canApplyGravity) {
        player.y += player.gravity;
        player.canJump = false;
    } else {
        player.canJump = true;
    }

    if (!player.canMove) {
        return;
    }

    if (player.jumpVelocity - player.jumpSpeed > 0) {
        player.jumpVelocity -= player.jumpSpeed;
    } else {
        player.jumpVelocity = 0;
    }
    if (player.y - player.jumpVelocity < 0) {
        player.y = 0;
        canGoUp = false;
    }
    if (canGoUp) {
        player.y -= player.jumpVelocity;
    }

    player.x += player.dx * player.speed;
    
    // right and left
    /*if (rightPressed && 
        ((player.x + player.dx < x && player.x + player.dx + player.size < x) ||
        (player.x + player.dx > x + size && player.x + player.dx + player.size > x + size)) && 
        ((player.y + player.dy < y && player.y + player.dy + player.size < y) ||
        (player.y + player.dy > y + size && player.y + player.dy + player.size > y + size))
        ) {
        player.dx = 1;
    } else if (leftPressed) {
        player.dx = -1;
    } else {
        player.dx = 0;
    }
    player.x += player.dx * player.speed;*/

    /*if (
        ((player.x + player.dx + player.size < x && player.x + player.dx < x) ||
        (player.x + player.dx > x + size && player.x + player.dx + player.size > x + size)) && (
        (player.y < y && player.y + player.size < y) || 
        (player.y > y + size && player.y + player.size > y + size)
        )) {
        player.x += player.dx * player.speed;
    }*/

}

function jump() {
    if (player.canJump) {
        player.jumpVelocity = player.jumpForce;
        player.canJump = false;
    }
}

function playerController() {
    drawPlayer();
    playerPhysics();
}

function playerAttacked() {
    life --;
    if (life <= 0) {
        gameOver = true;
        waitForSpaceRestart = true;
        for (var i = 0; i < settings.density*3; i++) {
            new Particle(player.x, player.y, player.color);
        }
        life = 0;
    } else {
        resetWave();
        player.x = playerStartposX;
        player.y = playerStartposY;
        
    }
}