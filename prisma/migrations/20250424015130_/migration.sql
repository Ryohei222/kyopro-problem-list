/*
  Warnings:

  - Made the column `problemKey` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "problemKey" SET NOT NULL,
ALTER COLUMN "problemKey" SET DEFAULT '';
