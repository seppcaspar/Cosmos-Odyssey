import { mysqlTable, bigint, varchar, int } from 'drizzle-orm/mysql-core';
import { drizzle } from "drizzle-orm/mysql2";
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
    distance: varchar('distance', { length: 256 })
});

export const providers = mysqlTable('providers', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    company: varchar('company', { length: 256 }),
    price: int('price'),
    flightStart: varchar('flightStart', { length: 256 }),
    flightEnd: varchar("flightEnd", { length: 256 }),
    routeID: bigint('routeID', { mode: 'number' }),
    validUntilID: bigint('validUntilID', { mode: 'number' })
});

export const reservations = mysqlTable('reservations', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    providerID: bigint('providerID', { mode: 'number' }),
    firstName: varchar('firstName', { length: 256 }),
    lastName: varchar('lastName', { length: 256 }),
    validUntilID: bigint('validUntilID', { mode: 'number' })
});

if (!process.env.DB_URL) {
    throw new Error("DB credentials error");
}
const connection = mysql.createConnection(process.env.DB_URL);

export const db = drizzle(connection);
