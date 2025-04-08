/*
  Warnings:

  - You are about to drop the column `provider` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Problem` table. All the data in the column will be lost.
  - The primary key for the `ProblemSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Star` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `problemSetId` on the `Star` table. All the data in the column will be lost.
  - You are about to drop the column `AOJId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `BlogURL` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CodeforcesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `GitHubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `MOFEId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `XId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `YukicoderId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProblemSetProblem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,problemListId]` on the table `Star` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemListId` to the `Star` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('ATCODER', 'CODEFORCES', 'YUKICODER', 'AOJ', 'MOFE');

-- DropForeignKey
ALTER TABLE "ProblemSetProblem" DROP CONSTRAINT "ProblemSetProblem_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemSetProblem" DROP CONSTRAINT "ProblemSetProblem_problemSetId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_problemSetId_fkey";

-- DropIndex
DROP INDEX "Star_userId_problemSetId_key";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "provider",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "resource" "Resource" NOT NULL DEFAULT 'ATCODER';

-- AlterTable
ALTER TABLE "ProblemSet" DROP CONSTRAINT "ProblemSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProblemSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProblemSet_id_seq";

-- AlterTable
ALTER TABLE "Star" DROP CONSTRAINT "Star_pkey",
DROP COLUMN "problemSetId",
ADD COLUMN     "problemListId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Star_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Star_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "AOJId",
DROP COLUMN "BlogURL",
DROP COLUMN "CodeforcesId",
DROP COLUMN "GitHubId",
DROP COLUMN "MOFEId",
DROP COLUMN "XId",
DROP COLUMN "YukicoderId",
ADD COLUMN     "aojId" TEXT,
ADD COLUMN     "blogURL" TEXT,
ADD COLUMN     "codeforcesId" TEXT,
ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "mofeId" TEXT,
ADD COLUMN     "xId" TEXT,
ADD COLUMN     "yukicoderId" TEXT;

-- DropTable
DROP TABLE "ProblemSetProblem";

-- DropEnum
DROP TYPE "ProblemProvider";

-- CreateTable
CREATE TABLE "ProblemListRecord" (
    "id" SERIAL NOT NULL,
    "problemListId" TEXT NOT NULL,
    "problemId" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProblemListRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Star_userId_problemListId_key" ON "Star"("userId", "problemListId");

-- AddForeignKey
ALTER TABLE "ProblemListRecord" ADD CONSTRAINT "ProblemListRecord_problemListId_fkey" FOREIGN KEY ("problemListId") REFERENCES "ProblemSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemListRecord" ADD CONSTRAINT "ProblemListRecord_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_problemListId_fkey" FOREIGN KEY ("problemListId") REFERENCES "ProblemSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
