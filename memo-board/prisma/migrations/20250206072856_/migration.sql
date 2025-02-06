/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Memo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'GROUP');

-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "isPublic",
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';
