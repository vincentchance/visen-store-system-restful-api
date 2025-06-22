/*
  Warnings:

  - Added the required column `created_by` to the `prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prices` ADD COLUMN `created_by` VARCHAR(191) NOT NULL;
