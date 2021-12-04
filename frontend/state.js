var STATE = {
    SI: null,
    channel: null,
    myId: null,
    myPlayer: null,
    players: [],
    input: {
      MOVE_LEFT: false,
      MOVE_RIGHT: false,
      MOVE_UP: false,
      MOVE_DOWN: false,
    },
    controls: {
      MOVE_LEFT: "a",
      MOVE_RIGHT: "d",
      MOVE_UP: "w",
      MOVE_DOWN: "s",
    },
  };
  
  function player(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  
    this.update = function () {
      fill(255, 0, 0);
      rect(this.x, this.y, 5, 5);
    };
  
    this.checkInput = function () {
      let dx = 0;
      let dy = 0;
      if (STATE.input.MOVE_LEFT) dx--;
      if (STATE.input.MOVE_RIGHT) dx++;
      if (STATE.input.MOVE_DOWN) dy++;
      if (STATE.input.MOVE_UP) dy--;
      //this.move(dx, dy);
      this.sendInput();
    };
  
    this.move = function (x, y) {
      //this.x += x;
      //this.y += y;
  
      STATE.channel.emit("client:playerMoved", this);
    };

    this.sendInput = function() {
      const data = [STATE.input.MOVE_LEFT,STATE.input.MOVE_RIGHT,STATE.input.MOVE_DOWN,STATE.input.MOVE_UP]
      STATE.channel.emit("client:playerInput", data);

    }
  }
  