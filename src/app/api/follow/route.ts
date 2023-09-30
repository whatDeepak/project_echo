import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function POST(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }
  const payload: FollowType = await request.json();

  if (!payload.user_id) {
    return NextResponse.json({
      status: 400,
      message: "Bad request. Please pass user id",
    });
  }

  // Check if the user is already following the target user
  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: Number(session.user?.id),
      followingId: Number(payload.user_id),
    },
  });

  if (payload.status === "follow") {
    if (isFollowing) {
      // User is already following, return an error or handle it accordingly
      return NextResponse.json({
        status: 400,
        message: "User is already following this user",
      });
    }

    // Create a new follow relationship
    await prisma.follow.create({
      data: {
        followerId: Number(session.user?.id),
        followingId: Number(payload.user_id),
      },
    });

    // // Update the follower count for the target user
    // await prisma.followCount.update({
    //   where: {
    //     userId: Number(payload.user_id),
    //   },
    //   data: {
    //     followerCount: {
    //       increment: 1,
    //     },
    //   },
    // });
  } else if (payload.status === "unfollow") {
    if (!isFollowing) {
      // User is not following, return an error or handle it accordingly
      return NextResponse.json({
        status: 400,
        message: "User is not following this user",
      });
    }

    // Delete the follow relationship
    await prisma.follow.deleteMany({
      where: {
        followerId: Number(session.user?.id),
        followingId: Number(payload.user_id),
      },
    });

    // // Update the follower count for the target user
    // await prisma.followCount.update({
    //   where: {
    //     userId: Number(payload.user_id),
    //   },
    //   data: {
    //     followerCount: {
    //       decrement: 1,
    //     },
    //   },
    // });
  }

  return NextResponse.json({
    status: 200,
    message:
      payload.status === "follow"
        ? "User followed successfully!"
        : "User unfollowed successfully!",
  });
}
