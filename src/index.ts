import createServer from "./factories/server";
import createDatabase from "./factories/database";
import routes from "./routes";

const server = createServer(routes);
const database = createDatabase("sqlite", ":memory:");

database.connect();
server.start();
