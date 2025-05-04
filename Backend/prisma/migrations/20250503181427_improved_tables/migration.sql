/*
  Warnings:

  - You are about to drop the column `Tags` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Recurrance1` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tags` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recurrance1" DROP CONSTRAINT "Recurrance1_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "Tags",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Recurrance1";

-- DropEnum
DROP TYPE "Recurrence";

-- CreateTable
CREATE TABLE "Recurrence" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "interval" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recurrence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recurrence" ADD CONSTRAINT "Recurrence_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
