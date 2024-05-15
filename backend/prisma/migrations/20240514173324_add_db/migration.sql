/*
  Warnings:

  - You are about to drop the `hasil` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `hasil` DROP FOREIGN KEY `Hasil_id_penilaian_fkey`;

-- DropForeignKey
ALTER TABLE `hasil` DROP FOREIGN KEY `Hasil_userId_fkey`;

-- DropTable
DROP TABLE `hasil`;

-- CreateTable
CREATE TABLE `Result` (
    `id` VARCHAR(191) NOT NULL,
    `penilaianId` VARCHAR(191) NOT NULL,
    `normalizedMatrix` JSON NOT NULL,
    `weightedNormalizedMatrix` JSON NOT NULL,
    `idealSolution` JSON NOT NULL,
    `negativeIdealSolution` JSON NOT NULL,
    `distancesToIdeal` JSON NOT NULL,
    `distancesToNegativeIdeal` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerformanceScore` (
    `id` VARCHAR(191) NOT NULL,
    `score` DOUBLE NOT NULL,
    `alternative` JSON NOT NULL,
    `resultId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_penilaianId_fkey` FOREIGN KEY (`penilaianId`) REFERENCES `Penilaian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PerformanceScore` ADD CONSTRAINT `PerformanceScore_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `Result`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
