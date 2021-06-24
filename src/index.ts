import createServer from "./factories/server";
import routes from "./routes";

const server = createServer(routes);

server.start();