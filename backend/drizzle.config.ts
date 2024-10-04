import 'dotenv/config';

import { defineConfig } from "drizzle-kit";

if (!process.env.DB_URL) {
    throw new Error("DB URL is missing");
}
export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dbCredentials: {
        url: process.env.DB_URL,
    },
});