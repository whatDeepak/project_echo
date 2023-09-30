-- CreateTable
CREATE TABLE "FollowCount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "followerCount" INTEGER NOT NULL DEFAULT 0,
    "followingCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FollowCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowCount_userId_key" ON "FollowCount"("userId");

-- AddForeignKey
ALTER TABLE "FollowCount" ADD CONSTRAINT "FollowCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
