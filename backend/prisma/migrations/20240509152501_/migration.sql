-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternatif` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailKriteria` (
    `id` VARCHAR(191) NOT NULL,
    `id_kriteria` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `nilai` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hasil` (
    `id` VARCHAR(191) NOT NULL,
    `id_penilaian` VARCHAR(191) NOT NULL,
    `ranking` INTEGER NOT NULL,
    `nilai` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `bobot` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penilaian` (
    `id` VARCHAR(191) NOT NULL,
    `id_detail_kriteria` VARCHAR(191) NOT NULL,
    `id_alternatif` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKriteria` ADD CONSTRAINT `DetailKriteria_id_kriteria_fkey` FOREIGN KEY (`id_kriteria`) REFERENCES `Kriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_id_penilaian_fkey` FOREIGN KEY (`id_penilaian`) REFERENCES `Penilaian`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hasil` ADD CONSTRAINT `Hasil_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_alternatif_fkey` FOREIGN KEY (`id_alternatif`) REFERENCES `Alternatif`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penilaian` ADD CONSTRAINT `Penilaian_id_detail_kriteria_fkey` FOREIGN KEY (`id_detail_kriteria`) REFERENCES `DetailKriteria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
