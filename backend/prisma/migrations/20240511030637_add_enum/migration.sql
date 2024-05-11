/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `alternatif` table. All the data in the column will be lost.
  - Added the required column `tipe` to the `Kriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alternatif` DROP COLUMN `deskripsi`;

-- AlterTable
ALTER TABLE `kriteria` ADD COLUMN `tipe` ENUM('COST', 'BENEFIT') NOT NULL;
