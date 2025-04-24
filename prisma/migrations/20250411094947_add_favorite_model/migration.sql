-- CreateTable
CREATE TABLE `favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    UNIQUE INDEX `favorite_user_id_product_id_key`(`user_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
