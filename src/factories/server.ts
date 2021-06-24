import express, { Application, Router } from "express";
import { Server } from "http";

const createServer = (routes: Router) => {
  let server: Server;

  const start = () => {
    const app: Application = express();
    console.log("[server] Starting server...");
    app.use(express.json());
    app.use(routes);
    const port = process.env.PORT || 4000;
    server = app.listen(port);
    console.log(`[server] Server is running on port ${port} `);
  };

  const stop = () => {
    console.log("[server] Stopping server...");
    server.close();
    console.log("[server] Server has stopped.");
  };

  return {
    start,
    stop,
  };
};

export default createServer;
