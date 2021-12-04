const { SnapshotInterpolation, Vault } = Snap

STATE.SI = new SnapshotInterpolation(15);


function start() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  if (!STATE.myPlayer) return;
  const snapshot = STATE.SI.calcInterpolation('x y') // [deep: string] as optional second parameter
  //console.log(snapshot);
  if(!snapshot) return;

  // access your state
  const { state } = snapshot
  // apply the interpolated values to you game objects
  for(let i = 0; i < state.length; i++) {
    const { id, x, y } = state[i];
    let player = STATE.players.find(p => p.id === id);
    if(!player) return;
    player.x = x;
    player.y = y;
    player.update();
    if (player.id === STATE.myPlayer.id) {
      player.checkInput();
    }
  }
 /* const { id, x, y } = state[0]
  if (STATE.myPlayer.id === id) {
    STATE.myPlayer.x = x
    STATE.myPlayer.y = y
  }
  */
  /*
  STATE.players.forEach((p) => {
    if (p.id === STATE.myPlayer.id) {
      p.checkInput();
    }
    p.update();
  });
  */
}

function keyPressed(e) {
  //console.log(e.key);
  if (e.key === "p") {
    console.log(STATE);
  }

  if (e.key === STATE.controls.MOVE_LEFT) STATE.input.MOVE_LEFT = true;
  if (e.key === STATE.controls.MOVE_RIGHT) STATE.input.MOVE_RIGHT = true;
  if (e.key === STATE.controls.MOVE_UP) STATE.input.MOVE_UP = true;
  if (e.key === STATE.controls.MOVE_DOWN) STATE.input.MOVE_DOWN = true;
}

function keyReleased(e) {
  if (e.key === STATE.controls.MOVE_LEFT) STATE.input.MOVE_LEFT = false;
  if (e.key === STATE.controls.MOVE_RIGHT) STATE.input.MOVE_RIGHT = false;
  if (e.key === STATE.controls.MOVE_UP) STATE.input.MOVE_UP = false;
  if (e.key === STATE.controls.MOVE_DOWN) STATE.input.MOVE_DOWN = false;
}
