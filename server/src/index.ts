import { APIServer } from "../src/api/server";
import { DB } from "../src/db/db";
import { config } from "./env/config";
import AdminStore from "./services/adminStore";

const startServer = async () => {
  const db = new DB(config);
  await db.connect();

  const server = new APIServer(8000, db);
  server.run();
};

startServer();
