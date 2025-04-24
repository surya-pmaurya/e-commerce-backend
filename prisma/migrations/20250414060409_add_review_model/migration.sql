/*
  Warnings:

  - Added the required column `updatedAt` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `review_user_id_product_id_key`(`user_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
