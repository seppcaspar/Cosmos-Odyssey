import { serial, text, pgTable, pgSchema, bigint, varchar, doublePrecision } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import 'dotenv/config';

export const dbValidUntil = pgTable('dbValidUntil', {
    id: serial('id').primaryKey(),
    ValidUntil: varchar('ValidUntil', { length: 256 }),
});


export const providers = pgTable('providers', {
    id: serial('id').primaryKey(),
    company: varchar('company', { length: 256 }),
    price: doublePrecision('price'),
    flightStart: varchar('flightStart', { length: 256 }),
    flightEnd: varchar("flightEnd", { length: 256 }),
    routeID: bigint('routeID', { mode: 'number' }),
    validUntilID: bigint('validUntilID', { mode: 'number' })
});

export const reservations = pgTable('reservations', {
    id: serial('id').primaryKey(),
    providerID: bigint('providerID', { mode: 'number' }),
    firstName: varchar('firstName', { length: 256 }),
    lastName: varchar('lastName', { length: 256 }),
    validUntilID: bigint('validUntilID', { mode: 'number' })
});

if (!process.env.DB_URL) {
    throw new Error("DB credentials error");
}

const pool = new Pool({ connectionString: process.env.DB_URL });
export const db = drizzle(pool);