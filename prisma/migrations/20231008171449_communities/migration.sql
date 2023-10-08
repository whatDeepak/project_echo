/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image" VARCHAR(100),
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Community_email_key" ON "Community"("email");
