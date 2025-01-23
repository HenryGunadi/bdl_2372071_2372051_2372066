import sql from "mssql";

const serverName: string = process.env.DB_SERVER_NAME || "";
const dbAdminPass: string = process.env.DB_ADMIN_PASS || "";

export const config: sql.config = {
  user: "henry",
  password: dbAdminPass,
  server: serverName,
  database: "inventory_management",
  options: {
    encrypt: false, // Use encryption for Azure SQL databases
    trustServerCertificate: true, // Set to true if self-signed certs are used
  },
};
