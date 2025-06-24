-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(60) NOT NULL,
    `transaction_label` VARCHAR(20) NOT NULL,
    `product_id` VARCHAR(20) NOT NULL,
    `price_id` VARCHAR(20) NOT NULL,
    `total` INTEGER NOT NULL,
    `created_by` VARCHAR(191) NULL,
    `deleted_at` DATETIME(3) NULL,
    `deleted_by` VARCHAR(191) NULL,

    UNIQUE INDEX `transactions_transaction_label_key`(`transaction_label`),
    INDEX `transactions_product_id_idx`(`product_id`),
    INDEX `transactions_price_id_idx`(`price_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `prices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
