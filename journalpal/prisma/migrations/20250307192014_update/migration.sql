/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Analysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_userId_key" ON "Analysis"("userId");

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");
