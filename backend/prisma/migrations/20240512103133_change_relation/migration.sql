-- DropForeignKey
ALTER TABLE `detailkriteria` DROP FOREIGN KEY `DetailKriteria_id_kriteria_fkey`;

-- DropForeignKey
ALTER TABLE `hasil` DROP FOREIGN KEY `Hasil_id_penilaian_fkey`;

-- DropForeignKey
ALTER TABLE `hasil` DROP FOREIGN KEY `Hasil_userId_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_id_alternatif_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_id_detail_kriteria_fkey`;

-- DropForeignKey
ALTER TABLE `penilaian` DROP FOREIGN KEY `Penilaian_id_kriteria_fkey`;

-- AddForeignKey
ALTER TABLE `DetailKriteria` ADD CONSTRAINT `DetailKriteria_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `Kriteria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_id_penilaian_fkey` FOREIGN KEY (`id_penilaian`) REFERENCES `Penilaian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_alternatif_fkey` FOREIGN KEY (`id_alternatif`) REFERENCES `Alternatif`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_detail_kriteria_fkey` FOREIGN KEY (`id_detail_kriteria`) REFERENCES `DetailKriteria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `Kriteria`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
