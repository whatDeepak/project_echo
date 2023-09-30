import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  // Extract the user ID from the request parameters
  const userIdToCheck = params.id;

  // Check if the user is already following the target user
  const isFollowing = await prisma.follow.findFirst({
    where: {
      followerId: Number(session.user?.id),
      followingId: Number(userIdToCheck),
    },
  });

  // Determine the follow status based on the query result
  const followStatus = isFollowing ? "true" : "false";

  return NextResponse.json({ status: 200, data: { followStatus } });
}
