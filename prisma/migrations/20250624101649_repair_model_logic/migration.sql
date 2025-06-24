/*
  Warnings:

  - You are about to drop the column `price_id` on the `transactionsitem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactionsitem` DROP FOREIGN KEY `transactionsItem_price_id_fkey`;

-- DropIndex
DROP INDEX `transactionsItem_price_id_idx` ON `transactionsitem`;

-- AlterTable
ALTER TABLE `transactionsitem` DROP COLUMN `price_id`;
