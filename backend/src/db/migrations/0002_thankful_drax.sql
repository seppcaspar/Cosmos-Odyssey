ALTER TABLE `routes` DROP FOREIGN KEY `routes_validUntilID_dbValidUntil_id_fk`;
--> statement-breakpoint
ALTER TABLE `routes` DROP COLUMN `validUntilID`;