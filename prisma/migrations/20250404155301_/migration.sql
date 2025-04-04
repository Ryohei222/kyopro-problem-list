/*
  Warnings:

  - The `provider` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProblemProvider" AS ENUM ('ATCODER', 'CODEFORCES', 'YUKICODER', 'AOJ');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "provider",
ADD COLUMN     "provider" "ProblemProvider" NOT NULL DEFAULT 'ATCODER';
