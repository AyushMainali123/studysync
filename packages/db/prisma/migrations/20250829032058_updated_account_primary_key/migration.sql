/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Account_provider_providerAccountId_idx";

-- DropIndex
DROP INDEX "public"."Account_userId_key";

-- AlterTable
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId");
