/*
  Warnings:

  - You are about to drop the column `created_at` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `d_expense` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `d_expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_user` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `d_expense` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;
