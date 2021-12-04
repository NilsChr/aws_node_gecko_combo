var channel = geckos({ port: 3000 });

channel.onConnect(function (error) {
  if (error) {
    console.log("error", error);
    console.error(error.message);
    return;
  } else {
    console.log("You're connected!");
  }
  STATE.myId = channel.id;
  STATE.channel = channel;


  channel.emit("chat message", "Hello everyone, I'm " + channel.id);

  channel.onDisconnect(function () {
    console.log("You got disconnected");
  });

  channel.on("chat message", function (data) {
    //    appendMessage(data);
  });

  channel.on("server:playerMoved", function(data) {
    let p = STATE.players.find((p) => p.id === data.id);
    if(!p) return;
    p.x = data.x;
    p.y = data.y;
  })

  channel.on("players", function (data) {
    console.log(STATE);
    console.log("event: players");
    console.log(data);

    data.forEach((newPlayer) => {
      console.log(newPlayer);
      let p = STATE.players.find((p) => p.id === newPlayer.id);
      if(!p) {
        let pObj = new player(newPlayer.id, newPlayer.x, newPlayer.y);
        if(pObj.id === STATE.myId) STATE.myPlayer = pObj;
        STATE.players.push(pObj);
        console.log("New Player ARRIVED");

      }
    });
  });
});
