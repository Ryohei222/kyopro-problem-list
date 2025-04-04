/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "atcoderId" TEXT,
ADD COLUMN     "codeforcesId" TEXT,
ALTER COLUMN "name" SET NOT NULL;
