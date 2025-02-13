/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `JourneyEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JourneyEntry_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "JourneyEntry_userId_id_key" ON "JourneyEntry"("userId", "id");
