/*
  Warnings:

  - Added the required column `created_by` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "created_by" VARCHAR(100) NOT NULL;
