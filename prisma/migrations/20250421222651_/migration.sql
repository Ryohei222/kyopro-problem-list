/*
  Warnings:

  - You are about to drop the column `contestId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `contestName` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `problemId` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `Problem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "contestId",
DROP COLUMN "contestName",
DROP COLUMN "difficulty",
DROP COLUMN "name",
DROP COLUMN "problemId",
DROP COLUMN "resource";

-- CreateTable
CREATE TABLE "AojProblem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "commonProblemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AojProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtcoderProblem" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contestName" TEXT NOT NULL,
    "difficulty" INTEGER,
    "commonProblemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CodeforcesProblem" (
    "contestId" INTEGER NOT NULL,
    "contestName" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER,
    "rating" INTEGER,
    "commonProblemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "MofeProblem" (
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positon" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "contestSlug" TEXT NOT NULL,
    "contestName" TEXT NOT NULL,
    "commonProblemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "YukicoderProblem" (
    "No" INTEGER NOT NULL,
    "ProblemId" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "Level" DOUBLE PRECISION NOT NULL,
    "commonProblemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YukicoderProblem_pkey" PRIMARY KEY ("No")
);

-- CreateIndex
CREATE UNIQUE INDEX "AojProblem_commonProblemId_key" ON "AojProblem"("commonProblemId");

-- CreateIndex
CREATE UNIQUE INDEX "AtcoderProblem_commonProblemId_key" ON "AtcoderProblem"("commonProblemId");

-- CreateIndex
CREATE UNIQUE INDEX "AtcoderProblem_id_contestId_key" ON "AtcoderProblem"("id", "contestId");

-- CreateIndex
CREATE UNIQUE INDEX "CodeforcesProblem_commonProblemId_key" ON "CodeforcesProblem"("commonProblemId");

-- CreateIndex
CREATE UNIQUE INDEX "CodeforcesProblem_contestId_index_key" ON "CodeforcesProblem"("contestId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "MofeProblem_commonProblemId_key" ON "MofeProblem"("commonProblemId");

-- CreateIndex
CREATE UNIQUE INDEX "MofeProblem_slug_contestSlug_key" ON "MofeProblem"("slug", "contestSlug");

-- CreateIndex
CREATE UNIQUE INDEX "YukicoderProblem_commonProblemId_key" ON "YukicoderProblem"("commonProblemId");

-- AddForeignKey
ALTER TABLE "AojProblem" ADD CONSTRAINT "AojProblem_commonProblemId_fkey" FOREIGN KEY ("commonProblemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtcoderProblem" ADD CONSTRAINT "AtcoderProblem_commonProblemId_fkey" FOREIGN KEY ("commonProblemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeforcesProblem" ADD CONSTRAINT "CodeforcesProblem_commonProblemId_fkey" FOREIGN KEY ("commonProblemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MofeProblem" ADD CONSTRAINT "MofeProblem_commonProblemId_fkey" FOREIGN KEY ("commonProblemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YukicoderProblem" ADD CONSTRAINT "YukicoderProblem_commonProblemId_fkey" FOREIGN KEY ("commonProblemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
