import dotenv from "dotenv";
import { ConnectionConfiguration } from "tedious";

const serverName: string = process.env.DB_SERVER_NAME || "";
const dbAdminPass: string = process.env.DB_ADMIN_PASS || "";

export const config: ConnectionConfiguration = {
  server: serverName,
  authentication: {
    type: "default",
    options: {
      userName: "henry",
      password: dbAdminPass,
    },
  },
  options: {
    encrypt: false, // not using Microsoft Azure
    database: "testing_db",
    trustServerCertificate: true,
  },
};
