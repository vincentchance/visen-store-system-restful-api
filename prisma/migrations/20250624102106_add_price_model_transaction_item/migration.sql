/*
  Warnings:

  - Added the required column `price` to the `transactionsItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transactionsitem` ADD COLUMN `price` INTEGER NOT NULL;
