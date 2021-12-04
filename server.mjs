import geckos, { iceServers } from "@geckos.io/server";

const io = geckos({
  ordered: false, // in a game, this should be set to false (default is false)
  iceServers: process.env.NODE_ENV === "production" ? iceServers : [],
});

// listen on port 3000 (default is 9208)
io.listen(3000);

var players = [];

io.onConnection((channel) => {
  console.log(`${channel.id} connected`)
  let player = {
    id: channel.id,
    x: 20,
    y: 20
  }
  players.push(player);
  channel.emit("players", players);


  channel.onDisconnect(() => {
    console.log(`${channel.id} got disconnected`);
    players = players.filter(p => p.id != channel.id);
  });

  channel.emit("chat message", `Welcome to the chat ${channel.id}!`);

  channel.on("chat message", (data) => {
    channel.room.emit("chat message", data);
  });

  channel.on("client:playerMoved", (data) => {
    channel.room.emit("server:playerMoved", data);
  });
});
