/*
  Warnings:

  - You are about to drop the column `access_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Board" DROP CONSTRAINT "Board_adminId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "refresh_token",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
