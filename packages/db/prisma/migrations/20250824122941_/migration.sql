/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Board` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Board" DROP CONSTRAINT "Board_admin_id_fkey";

-- AlterTable
ALTER TABLE "public"."Board" DROP COLUMN "admin_id",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."_UsersOnBoard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UsersOnBoard_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UsersOnBoard_B_index" ON "public"."_UsersOnBoard"("B");

-- AddForeignKey
ALTER TABLE "public"."Board" ADD CONSTRAINT "Board_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UsersOnBoard" ADD CONSTRAINT "_UsersOnBoard_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UsersOnBoard" ADD CONSTRAINT "_UsersOnBoard_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
