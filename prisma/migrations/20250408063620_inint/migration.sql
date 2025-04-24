-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pass` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profile` VARCHAR(191) NULL,
    `otp` INTEGER NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `claimedCount` INTEGER NOT NULL DEFAULT 0,
    `pointsPerOffer` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
