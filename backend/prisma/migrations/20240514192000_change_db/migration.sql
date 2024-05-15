/*
  Warnings:

  - You are about to drop the column `penilaianId` on the `result` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_penilaianId_fkey`;

-- AlterTable
ALTER TABLE `result` DROP COLUMN `penilaianId`;
