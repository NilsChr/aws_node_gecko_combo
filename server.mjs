import geckos, { iceServers } from "@geckos.io/server";
import { readFile } from "fs/promises";
import fs, { readdir } from "fs";
import { createServer } from "http";

const indexHtml = await readFile("index.html", { encoding: "utf-8" });

const requestListener = async (req, res) => {
  if (req.url === "/")
    return res.writeHead(200, { "Content-Type": "text/html" }).end(indexHtml);

  try {
    let file = await readFile("./" + req.url, {
      encoding: "utf-8",
    });

    return res
      .writeHead(200, { "Content-Type": "application/javascript" })
      .end(file);
  } catch (e) {
    console.log(e);
  }

  return res.writeHead(404).end();
};

const server = createServer(requestListener);

const io = geckos({
  iceServers: process.env.NODE_ENV === "production" ? iceServers : [],
});

io.addServer(server);

server.listen(3000, () => {
  console.log("server running on http://127.0.0.1:3000");
});

let players = [];
io.onConnection((channel) => {
  console.log(`${channel.id} connected.`);
  let player = {
    id: channel.id,
    x: 20,
    y: 20,
  };
  players.push(player);
  console.log(` Players online ${players.length}`);
  channel.room.emit("players", players);

  channel.onDisconnect(() => {
    console.log(`${channel.id} got disconnected`);
    channel.room.emit("server:playerDisconnected", channel.id);

    players = players.filter((p) => p.id != channel.id);
    console.log("Players online: " + players.length);
  });

  channel.emit("chat message", `Welcome to the chat ${channel.id}!`);

  channel.on("chat message", (data) => {
    channel.room.emit("chat message", data);
  });

  channel.on("client:playerMoved", (data) => {
    channel.room.emit("server:playerMoved", data);
  });
});
