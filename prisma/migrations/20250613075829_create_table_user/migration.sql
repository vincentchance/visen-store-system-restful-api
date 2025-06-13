-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(60) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
