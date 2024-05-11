/*
  Warnings:

  - Added the required column `id_kriteria` to the `Penilaian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penilaian` ADD COLUMN `id_kriteria` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `Kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
