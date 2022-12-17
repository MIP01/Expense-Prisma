/*
  Warnings:

  - You are about to drop the `d_todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `d_todo` DROP FOREIGN KEY `d_todo_user_id_fkey`;

-- DropTable
DROP TABLE `d_todo`;

-- CreateTable
CREATE TABLE `d_expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mutasi` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `nominal` INTEGER NOT NULL,
    `completed` TINYINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `d_expense` ADD CONSTRAINT `d_expense_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
