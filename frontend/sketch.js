function start() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(0);
  
    if(!STATE.myPlayer) return;
    
    STATE.players.forEach((p) => {
      if (p.id === STATE.myPlayer.id) {
        p.checkInput();
      }
      p.update();
    });
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
  