/*
  Warnings:

  - Made the column `projectId` on table `sections` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sections" ALTER COLUMN "projectId" SET NOT NULL;
