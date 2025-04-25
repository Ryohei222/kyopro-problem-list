/*
  Warnings:

  - You are about to drop the column `positon` on the `MofeProblem` table. All the data in the column will be lost.
  - Added the required column `position` to the `MofeProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MofeProblem" DROP COLUMN "positon",
ADD COLUMN     "position" TEXT NOT NULL;
