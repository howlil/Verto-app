-- DropForeignKey
ALTER TABLE `performancescore` DROP FOREIGN KEY `PerformanceScore_resultId_fkey`;

-- AddForeignKey
ALTER TABLE `PerformanceScore` ADD CONSTRAINT `PerformanceScore_resultId_fkey` FOREIGN KEY (`resultId`) REFERENCES `Result`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
