/*
  Warnings:

  - You are about to drop the `_WorkspaceMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."StorageItemType" AS ENUM ('folder', 'document');

-- CreateEnum
CREATE TYPE "public"."WorkspaceMemberRole" AS ENUM ('admin', 'member', 'viewer');

-- DropForeignKey
ALTER TABLE "public"."_WorkspaceMember" DROP CONSTRAINT "_WorkspaceMember_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_WorkspaceMember" DROP CONSTRAINT "_WorkspaceMember_B_fkey";

-- DropTable
DROP TABLE "public"."_WorkspaceMember";

-- CreateTable
CREATE TABLE "public"."StorageItem" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "parentItemId" TEXT,
    "name" TEXT NOT NULL,
    "type" "public"."StorageItemType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorageItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkspaceMember" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "role" "public"."WorkspaceMemberRole" NOT NULL DEFAULT 'viewer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("userId","workspaceId")
);

-- AddForeignKey
ALTER TABLE "public"."StorageItem" ADD CONSTRAINT "StorageItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StorageItem" ADD CONSTRAINT "StorageItem_parentItemId_fkey" FOREIGN KEY ("parentItemId") REFERENCES "public"."StorageItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
