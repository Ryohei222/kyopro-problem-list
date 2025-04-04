/*
  Warnings:

  - A unique constraint covering the columns `[userId,problemSetId]` on the table `Star` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Star_userId_problemSetId_key" ON "Star"("userId", "problemSetId");
