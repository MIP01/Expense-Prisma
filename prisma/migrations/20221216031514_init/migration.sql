/*
  Warnings:

  - You are about to drop the column `email` on the `auth_user` table. All the data in the column will be lost.
  - Added the required column `nis` to the `auth_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `auth_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `auth_user_email_key` ON `auth_user`;

-- AlterTable
ALTER TABLE `auth_user` DROP COLUMN `email`,
    ADD COLUMN `nis` INTEGER NOT NULL,
    ADD COLUMN `role` VARCHAR(150) NOT NULL;
