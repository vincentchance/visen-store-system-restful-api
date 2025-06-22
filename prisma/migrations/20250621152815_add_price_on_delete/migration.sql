-- DropForeignKey
ALTER TABLE `prices` DROP FOREIGN KEY `prices_product_id_fkey`;

-- DropIndex
DROP INDEX `prices_product_id_fkey` ON `prices`;

-- AddForeignKey
ALTER TABLE `prices` ADD CONSTRAINT `prices_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
