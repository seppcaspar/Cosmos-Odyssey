CREATE TABLE `reservations` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`providerID` bigint,
	`firstName` varchar(256),
	`lastName` varchar(256),
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
