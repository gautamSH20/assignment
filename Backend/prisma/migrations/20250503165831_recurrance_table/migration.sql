/*
  Warnings:

  - You are about to drop the column `customData` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `recurrence` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "customData",
DROP COLUMN "recurrence";

-- CreateTable
CREATE TABLE "Recurrance1" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "frequency" "Recurrence" NOT NULL,
    "interval" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recurrance1_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recurrance1" ADD CONSTRAINT "Recurrance1_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
