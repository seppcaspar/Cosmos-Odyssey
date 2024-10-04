CREATE TABLE IF NOT EXISTS "dbValidUntil" (
	"id" serial PRIMARY KEY NOT NULL,
	"ValidUntil" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" varchar(256),
	"price" bigint,
	"flightStart" varchar(256),
	"flightEnd" varchar(256),
	"routeID" bigint,
	"validUntilID" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"providerID" bigint,
	"firstName" varchar(256),
	"lastName" varchar(256),
	"validUntilID" bigint
);
