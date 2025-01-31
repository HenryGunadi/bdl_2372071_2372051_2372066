import { APIServer } from "../src/api/server";
import { DB } from "../src/db/db";
import { config } from "./env/config";
import AdminStore from "./dao/adminDao";

const startServer = async () => {
  const db = new DB(config);
  await db.connect();

  const server = new APIServer(8080, db);
  server.run();
};

startServer();
