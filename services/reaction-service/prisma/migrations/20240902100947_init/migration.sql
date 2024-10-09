-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'LOVE', 'CELEBRATE', 'SAD', 'SUPPORT', 'CURIOUS', 'INSIGHTFUL');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('POST', 'COMMENT');

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "type" "ReactionType" NOT NULL,
    "userId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "targetType" "TargetType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_key" ON "Reaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_targetId_key" ON "Reaction"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_targetType_key" ON "Reaction"("targetType");
