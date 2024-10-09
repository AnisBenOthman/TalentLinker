/*
  Warnings:

  - A unique constraint covering the columns `[userId,targetId,targetType]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Reaction_targetId_key";

-- DropIndex
DROP INDEX "Reaction_targetType_key";

-- DropIndex
DROP INDEX "Reaction_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_targetId_targetType_key" ON "Reaction"("userId", "targetId", "targetType");
