/*
  Warnings:

  - You are about to drop the `ProblemSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProblemListRecord" DROP CONSTRAINT "ProblemListRecord_problemListId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemSet" DROP CONSTRAINT "ProblemSet_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_problemListId_fkey";

-- DropTable
DROP TABLE "ProblemSet";

-- CreateTable
CREATE TABLE "ProblemList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProblemList" ADD CONSTRAINT "ProblemList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemListRecord" ADD CONSTRAINT "ProblemListRecord_problemListId_fkey" FOREIGN KEY ("problemListId") REFERENCES "ProblemList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_problemListId_fkey" FOREIGN KEY ("problemListId") REFERENCES "ProblemList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
