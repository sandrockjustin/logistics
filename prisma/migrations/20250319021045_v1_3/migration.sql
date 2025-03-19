/*
  Warnings:

  - You are about to drop the column `supplierName` on the `Items` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Items` DROP FOREIGN KEY `Items_supplierName_fkey`;

-- DropIndex
DROP INDEX `Items_supplierName_fkey` ON `Items`;

-- AlterTable
ALTER TABLE `Items` DROP COLUMN `supplierName`,
    ADD COLUMN `supplierId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
