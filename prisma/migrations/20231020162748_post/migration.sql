/*
  Warnings:

  - Added the required column `community_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "community_id" INTEGER NOT NULL;
