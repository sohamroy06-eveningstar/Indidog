import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined");
}

let pool: Pool;

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // ✅ REQUIRED for Neon
    },
  });
}

pool = global._pgPool;
console.log("DB URL:", process.env.DATABASE_URL);

export const db = pool;