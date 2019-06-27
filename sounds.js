var laser = "shot.mp3";
var hitSound = "hit.mp3"
var newWaveSound = "new_wave.mp3";

function playSound(soundpath) {
  var audio = new Audio(soundpath);
  audio.play();
}