/*
  Warnings:

  - You are about to drop the column `price_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_price_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_product_id_fkey`;

-- DropIndex
DROP INDEX `transactions_price_id_idx` ON `transactions`;

-- DropIndex
DROP INDEX `transactions_product_id_idx` ON `transactions`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `price_id`,
    DROP COLUMN `product_id`;

-- CreateTable
CREATE TABLE `transactionsItem` (
    `id` VARCHAR(60) NOT NULL,
    `product_id` VARCHAR(60) NOT NULL,
    `price_id` VARCHAR(60) NOT NULL,
    `transaction_id` VARCHAR(60) NOT NULL,
    `amount` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    INDEX `transactionsItem_transaction_id_idx`(`transaction_id`),
    INDEX `transactionsItem_product_id_idx`(`product_id`),
    INDEX `transactionsItem_price_id_idx`(`price_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactionsItem` ADD CONSTRAINT `transactionsItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactionsItem` ADD CONSTRAINT `transactionsItem_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactionsItem` ADD CONSTRAINT `transactionsItem_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
