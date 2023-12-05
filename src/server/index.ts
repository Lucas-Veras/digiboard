import { createServer } from "http";

import express from "express";
import Next, { NextApiHandler } from "next";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = Next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = createServer(app);

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

  app.get("/health", (req, res) => {
    res.send("healthy");
  });

  io.on("connection", (socket) => {
    console.log("connection");

    socket.on("draw", (moves, options) => {
      console.log("draw", moves, options);
      socket.broadcast.emit("socket_draw", moves, options);
    });

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));
  server.listen(port, () => {
    console.log(`> Server is ready on ${port}`);
  });
});
