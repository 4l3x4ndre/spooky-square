ammoXoffset = player.size/100 * 75;
ammoYoffset = player.size/100 * 50;
ammoSize = player.size/100 * 75;

waveStartSize = ctx.canvas.width * (1-95/100);
waveSize = 0;
waveGrowSpeed = 10;

life = 3;
score = 0;
lifeX = ctx.canvas.width * 5/100;
lifeY = ctx.canvas.height * 10/100;
lifeSize = player.size/100 * 80;

function ammoUI() {
    showText(projectileSettings.ammo, "gold", "Impact", ammoXoffset + player.x, ammoYoffset + player.y,
    "right", ammoSize, 4, "rgba(0,0,0,0.3)");
}

function lifeUI() {
    s = "Life: " + life;
    showText(s, "gold", "Impact", lifeX, lifeY, "left", lifeSize, 0, "rgba(0,0,0,0.0)");
}
function scoreUI() {
    s = "Score: " + score;
    showText(s, "gold", "Impact", lifeX, lifeY + lifeSize, "left", lifeSize, 0, "rgba(0,0,0,0.0)");
}
function UI() {
    lifeUI();
    scoreUI();

    if (waveSettings.pausing) {
        waveUI(waveGrowSpeed);
    } else if (waveSize > 0) {
        waveUI(-waveGrowSpeed);
    }
}

function waveUI(size) {
    var t = "Wave " + (waveSettings.waveId + 1);
    if (size > 0) {
        if (waveSize < waveStartSize) {
            waveSize += size;
        }  else {
            waveSize = waveStartSize;
        }
    } else {
        if (waveSize + size > 0) {
            waveSize += size;
        } else {
            return;
        }
    }
    showText(t, "white", "Impact", ctx.canvas.width/2, ctx.canvas.height/10 + waveSize, "center", waveSize, 10, "red");
}

function showText(text, color, police, x, y, textAlign, textSize, blur, blurColor) {
    ctx.font = textSize + "px " + police;
    ctx.fillStyle = color;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowColor = blurColor;
    ctx.shadowBlur = blur;
    ctx.textAlign = textAlign;
    ctx.fillText(text, x, y);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "";
}