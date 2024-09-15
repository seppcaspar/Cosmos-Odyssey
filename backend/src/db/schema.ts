import { mysqlTable, bigint, varchar, int } from 'drizzle-orm/mysql-core';
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import mysql from "mysql2";
import 'dotenv/config';

export const dbValidUntil = mysqlTable('dbValidUntil', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    ValidUntil: varchar('ValidUntil', { length: 256 }),
});

export const routes = mysqlTable('routes', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    from: varchar('from', { length: 256 }),
    to: varchar('to', { length: 256 }),
    distance: int('distance'),
    validUntilID: bigint('validUntilID', { mode: 'number' }).references(() => dbValidUntil.id)
});

export const providers = mysqlTable('providers', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    company: varchar('company', { length: 256 }),
    price: int('price'),
    flightStart: varchar('flightStart', { length: 256 }),
    flightEnd: varchar("flightEnd", { length: 256 }),
    routeID: bigint('routeID', { mode: 'number' }).references(() => routes.id),
    validUntilID: bigint('validUntilID', { mode: 'number' }).references(() => dbValidUntil.id)
});

if (!process.env.DB_URL) {
    throw new Error("DB credentials error");
}
const connection = mysql.createConnection(process.env.DB_URL);

export const db = drizzle(connection);
