/*
  Warnings:

  - You are about to drop the column `descriptio` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Task` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "descriptio",
DROP COLUMN "updatedAT",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
