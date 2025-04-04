/*
  Warnings:

  - You are about to drop the column `atcoderId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `codeforcesId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "atcoderId",
DROP COLUMN "codeforcesId";
