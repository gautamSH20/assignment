-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('Daily', 'Weekly', 'Monthly', 'Yearly', 'Custom');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recurrence" "Recurrence" NOT NULL DEFAULT 'Daily',
    "customData" TEXT,
    "Tags" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
