/*
  Warnings:

  - You are about to drop the `FollowCount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FollowCount" DROP CONSTRAINT "FollowCount_userId_fkey";

-- DropTable
DROP TABLE "FollowCount";
