-- AlterTable
ALTER TABLE `prices` ADD COLUMN `deleted_by` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `deleted_by` VARCHAR(191) NULL;
