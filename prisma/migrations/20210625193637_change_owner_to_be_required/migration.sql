/*
  Warnings:

  - Made the column `owner` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "owner" SET NOT NULL;
