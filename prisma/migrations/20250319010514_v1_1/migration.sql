/*
  Warnings:

  - You are about to drop the column `itemId` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `SKU` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Inventory` DROP FOREIGN KEY `Inventory_itemId_fkey`;

-- DropIndex
DROP INDEX `Inventory_itemId_fkey` ON `Inventory`;

-- AlterTable
ALTER TABLE `Inventory` DROP COLUMN `itemId`,
    ADD COLUMN `SKU` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_SKU_fkey` FOREIGN KEY (`SKU`) REFERENCES `Items`(`SKU`) ON DELETE RESTRICT ON UPDATE CASCADE;
