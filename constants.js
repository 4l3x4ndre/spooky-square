var canvas  = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var map = [
    //"11111111111111111111111111",
    "100000000000000000000000001",
    "100000001110000000011000001",
    //"11111100000000000000000001",
    "100000000000000000000000001",
    "100000000000000000000000001",
    "100111100000111100111100111",
    "10000000E000000000000000001",
    "1P0000000000000000000000001",
    "100000001110000011111110001",
    "100000000000000000000000001",
    "100000000000000000000000001",
    "111111111111111111111111111",
];

ctx.canvas.width  = window.innerWidth*(1-5/100);
var tileSize = canvas.width/map[0].length;

//ctx.canvas.height = window.innerHeight*(1-13/100);
ctx.canvas.height = map.length * tileSize + tileSize;
//var startY = canvas.height - (map.length * tileSize);
var startY = tileSize;


var colors = ["#362440", "brown"];
var topColors = ["#6b477e"];


var rightPressed = false;
var leftPressed = false;
var playerStartposX = -1;
var playerStartposY = -1;
var hasSetPlayerPosition = false;
var canMoveLeft = true;
var canMoveRight = true;
var canApplyGravity = true;
var canGoUp = true;

var enemiesSpawnPos = {};
var enemiesSpawnIndex = 0;
function SpawnPosition(x, y) {
    this.x = x;
    this.y = y;
    this.id = enemiesSpawnIndex;
}

var gameOver = false;
var waitForSpaceRestart = false;
var waitForFirstTouch = true;
var isPlaying = false;

waveSettings = {
    currentStartCount: 2,
    currentSpeed: [.7, .9],
    currentProba: [0, 1, 1],
    currentSpawnRate: 1,
    count: [2, 10, 15, 20, 30],
    spawnRate: [1, 1, .5, .45, .4],
    speeds: [1, 1.5, 1.75],
    waveId: -1,
    currentCount: 0,
    aliveCount: 0,
    started: false,
    pausing: true,
    pauseTime: 2000
}
// enemies customization
slowEnemy = {
    color: "white",
    speed: 0.9
}
fastEnemy = {
    color: "red",
    speed: 1.5
}
energicEnemy = {
    color: "#9999ff",
    speed: 2
}
enemiesColors = ["white", "red", "#9999ff"];
enemiesTypes = [slowEnemy, fastEnemy, energicEnemy];
enemiesProbabilities = [
    [0, 10, 10],
    [.25, .075, 0],
    [.50, .25, 0],
    [.50, .25, 0],
    [.50, .25, 0],
];
