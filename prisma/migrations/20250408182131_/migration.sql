/*
  Warnings:

  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aojId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `blogURL` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mofeId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `xId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yukicoderId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atcoderId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `codeforcesId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "aojId" SET NOT NULL,
ALTER COLUMN "aojId" SET DEFAULT '',
ALTER COLUMN "blogURL" SET NOT NULL,
ALTER COLUMN "blogURL" SET DEFAULT '',
ALTER COLUMN "githubId" SET NOT NULL,
ALTER COLUMN "githubId" SET DEFAULT '',
ALTER COLUMN "mofeId" SET NOT NULL,
ALTER COLUMN "mofeId" SET DEFAULT '',
ALTER COLUMN "xId" SET NOT NULL,
ALTER COLUMN "xId" SET DEFAULT '',
ALTER COLUMN "yukicoderId" SET NOT NULL,
ALTER COLUMN "yukicoderId" SET DEFAULT '',
ALTER COLUMN "atcoderId" SET NOT NULL,
ALTER COLUMN "atcoderId" SET DEFAULT '',
ALTER COLUMN "codeforcesId" SET NOT NULL,
ALTER COLUMN "codeforcesId" SET DEFAULT '',
ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '';
