/*
  Warnings:

  - Made the column `taskId` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "taskId" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;
