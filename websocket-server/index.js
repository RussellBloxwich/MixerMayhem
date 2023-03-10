const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);
io.on("connection", (client) => {
  client.use((packet, next) => {
    io.emit(...packet);
    next();
  });
});
httpServer.listen(3000);
