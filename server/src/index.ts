import { APIServer } from "../src/api/server";
import { DB } from "../src/db/db";
import { config } from "./env/config";

const server = new APIServer("8080");
const db = new DB(config);

const startServer = async () => {
  await db.connect();
  server.run();
};

startServer();
