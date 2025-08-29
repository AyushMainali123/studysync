/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UsersOnBoard` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `provider` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."OAuthProvider" AS ENUM ('google');

-- DropForeignKey
ALTER TABLE "public"."Board" DROP CONSTRAINT "Board_adminId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UsersOnBoard" DROP CONSTRAINT "_UsersOnBoard_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UsersOnBoard" DROP CONSTRAINT "_UsersOnBoard_B_fkey";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "provider",
ADD COLUMN     "provider" "public"."OAuthProvider" NOT NULL;

-- DropTable
DROP TABLE "public"."Board";

-- DropTable
DROP TABLE "public"."_UsersOnBoard";

-- CreateTable
CREATE TABLE "public"."Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_WorkspaceMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_WorkspaceMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_WorkspaceMember_B_index" ON "public"."_WorkspaceMember"("B");

-- CreateIndex
CREATE INDEX "Account_provider_providerAccountId_idx" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "public"."_WorkspaceMember" ADD CONSTRAINT "_WorkspaceMember_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_WorkspaceMember" ADD CONSTRAINT "_WorkspaceMember_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
