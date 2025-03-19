/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierName` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Inventory` DROP FOREIGN KEY `Inventory_SKU_fkey`;

-- DropForeignKey
ALTER TABLE `Items` DROP FOREIGN KEY `Items_supplierId_fkey`;

-- DropIndex
DROP INDEX `Inventory_SKU_fkey` ON `Inventory`;

-- DropIndex
DROP INDEX `Items_supplierId_fkey` ON `Items`;

-- AlterTable
ALTER TABLE `Items` DROP COLUMN `supplierId`,
    ADD COLUMN `supplierName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Suppliers_name_key` ON `Suppliers`(`name`);

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_supplierName_fkey` FOREIGN KEY (`supplierName`) REFERENCES `Suppliers`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventory` ADD CONSTRAINT `Inventory_SKU_fkey` FOREIGN KEY (`SKU`) REFERENCES `Items`(`SKU`) ON DELETE CASCADE ON UPDATE CASCADE;
