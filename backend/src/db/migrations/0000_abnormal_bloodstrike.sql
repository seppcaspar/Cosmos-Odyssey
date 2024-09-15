CREATE TABLE `dbValidUntil` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`validUntil` varchar(256),
	CONSTRAINT `dbValidUntil_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`company` varchar(256),
	`price` int,
	`flightStart` varchar(256),
	`flightEnd` varchar(256),
	`routeID` bigint,
	`validUntilID` bigint,
	CONSTRAINT `providers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`from` varchar(256),
	`to` varchar(256),
	`distance` int,
	`validUntilID` bigint,
	CONSTRAINT `routes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `providers` ADD CONSTRAINT `providers_routeID_routes_id_fk` FOREIGN KEY (`routeID`) REFERENCES `routes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `providers` ADD CONSTRAINT `providers_validUntilID_dbValidUntil_id_fk` FOREIGN KEY (`validUntilID`) REFERENCES `dbValidUntil`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `routes` ADD CONSTRAINT `routes_validUntilID_dbValidUntil_id_fk` FOREIGN KEY (`validUntilID`) REFERENCES `dbValidUntil`(`id`) ON DELETE no action ON UPDATE no action;